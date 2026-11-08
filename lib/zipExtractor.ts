import yauzl, { Entry, ZipFile } from "yauzl";

export const MAX_ARCHIVE_BYTES = 25 * 1024 * 1024;
export const MAX_ENTRIES = 1000;
export const MAX_EXTRACTED_BYTES = 50 * 1024 * 1024;
export const MAX_FILE_BYTES = 2 * 1024 * 1024;

export interface ExtractedZipFile {
  path: string;
  sizeBytes: number;
  compressedSizeBytes: number;
  content: Buffer | null;
  isText: boolean;
}

export interface ZipExtractionDiagnostics {
  entryCount: number;
}

export class ZipExtractionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZipExtractionError";
  }
}

const IGNORED_DIRECTORY_NAMES = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  ".venv",
  "venv",
  "__pycache__",
]);

const SECRET_FILE_NAMES = new Set([
  ".env",
  ".env.local",
  ".env.development",
  ".env.production",
  "id_rsa",
  "id_ed25519",
  "credentials",
]);

const TEXT_EXTENSIONS = new Set([
  ".c",
  ".cc",
  ".cpp",
  ".css",
  ".go",
  ".h",
  ".html",
  ".java",
  ".js",
  ".jsx",
  ".json",
  ".mjs",
  ".md",
  ".mts",
  ".php",
  ".py",
  ".rb",
  ".rs",
  ".scss",
  ".sh",
  ".sql",
  ".swift",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".vue",
  ".xml",
  ".yaml",
  ".yml",
]);

function isIgnoredPath(path: string): boolean {
  return path.split("/").some((part) => IGNORED_DIRECTORY_NAMES.has(part));
}

function isSecretPath(path: string): boolean {
  const fileName = path.split("/").pop()?.toLowerCase() || "";
  return SECRET_FILE_NAMES.has(fileName) || fileName.startsWith(".env.");
}

function validateEntryPath(fileName: string): string {
  const normalized = fileName.replace(/\\/g, "/");
  const pathWithoutTrailingSlash = normalized.endsWith("/")
    ? normalized.slice(0, -1)
    : normalized;
  if (
    !pathWithoutTrailingSlash ||
    normalized.startsWith("/") ||
    normalized.includes("\0") ||
    pathWithoutTrailingSlash.split("/").some((part) => part === ".." || part === "")
  ) {
    throw new ZipExtractionError("ZIP contains an unsafe file path.");
  }
  return normalized;
}

function isSymlink(entry: Entry): boolean {
  const mode = (entry.externalFileAttributes >>> 16) & 0xffff;
  return (mode & 0xf000) === 0xa000;
}

function isTextFile(path: string): boolean {
  const dotIndex = path.lastIndexOf(".");
  return dotIndex >= 0 && TEXT_EXTENSIONS.has(path.slice(dotIndex).toLowerCase());
}

function readEntry(zipFile: ZipFile, entry: Entry): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    zipFile.openReadStream(entry, (error, stream) => {
      if (error || !stream) {
        reject(error || new ZipExtractionError("Could not read ZIP entry."));
        return;
      }

      const chunks: Buffer[] = [];
      let total = 0;
      stream.on("data", (chunk: Buffer) => {
        total += chunk.length;
        if (total > MAX_FILE_BYTES) {
          stream.destroy(new ZipExtractionError("A ZIP entry exceeds the per-file size limit."));
          return;
        }
        chunks.push(chunk);
      });
      stream.once("error", reject);
      stream.once("end", () => resolve(Buffer.concat(chunks)));
    });
  });
}

export async function extractZip(
  buffer: Buffer,
  onEntry?: (diagnostics: ZipExtractionDiagnostics) => void,
): Promise<ExtractedZipFile[]> {
  if (buffer.length === 0 || buffer.length > MAX_ARCHIVE_BYTES) {
    throw new ZipExtractionError("ZIP file exceeds the 25 MB upload limit.");
  }

  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(
      buffer,
      { lazyEntries: true, validateEntrySizes: true },
      (error, zipFile) => {
        if (error || !zipFile) {
          reject(new ZipExtractionError("The uploaded file is not a valid ZIP archive."));
          return;
        }

        const files: ExtractedZipFile[] = [];
        let entryCount = 0;
        let extractedBytes = 0;
        let settled = false;

        const fail = (reason: unknown) => {
          if (settled) return;
          settled = true;
          zipFile.close();
          reject(reason instanceof ZipExtractionError
            ? reason
            : new ZipExtractionError("ZIP extraction failed."));
        };

        zipFile.on("error", fail);
        zipFile.on("entry", async (entry: Entry) => {
          if (settled) return;
          try {
            entryCount += 1;
            onEntry?.({ entryCount });
            if (entryCount > MAX_ENTRIES) {
              throw new ZipExtractionError("ZIP contains too many files.");
            }

            const path = validateEntryPath(entry.fileName);
            const isDirectory = /\/$/.test(path);
            if (isDirectory || isIgnoredPath(path) || isSecretPath(path)) {
              zipFile.readEntry();
              return;
            }
            if (isSymlink(entry)) {
              throw new ZipExtractionError("ZIP symlinks are not allowed.");
            }
            if (entry.uncompressedSize > MAX_FILE_BYTES) {
              throw new ZipExtractionError("A ZIP entry exceeds the per-file size limit.");
            }

            const suspiciousRatio =
              entry.compressedSize > 0 && entry.uncompressedSize / entry.compressedSize > 1000;
            if (suspiciousRatio) {
              throw new ZipExtractionError("ZIP compression ratio exceeds the safety limit.");
            }

            const shouldRead = isTextFile(path);
            const content = shouldRead ? await readEntry(zipFile, entry) : null;
            extractedBytes += entry.uncompressedSize;
            if (extractedBytes > MAX_EXTRACTED_BYTES) {
              throw new ZipExtractionError("ZIP expands beyond the 50 MB extraction limit.");
            }

            files.push({
              path,
              sizeBytes: entry.uncompressedSize,
              compressedSizeBytes: entry.compressedSize,
              content,
              isText: shouldRead,
            });
            zipFile.readEntry();
          } catch (entryError) {
            fail(entryError);
          }
        });
        zipFile.once("end", () => {
          if (!settled) {
            settled = true;
            resolve(files);
          }
        });
        zipFile.readEntry();
      },
    );
  });
}
