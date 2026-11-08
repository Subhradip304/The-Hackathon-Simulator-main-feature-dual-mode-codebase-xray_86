"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileArchive,
  FileCode2,
  FolderTree,
  LoaderCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import AnalysisResults, { isAnalysisReport, type AnalysisReport } from "@/components/xray/AnalysisResults";

const MAX_ARCHIVE_BYTES = 25 * 1024 * 1024;
const MAX_ARCHIVE_LABEL = "25 MB";

type UploadStatus = "idle" | "selected" | "analyzing" | "success" | "error";

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getApiError(status: number, message?: string): string {
  if (message) return message;
  if (status === 413) return `The ZIP exceeds the ${MAX_ARCHIVE_LABEL} upload limit.`;
  if (status === 415) return "Please select a ZIP archive with a .zip extension.";
  if (status === 422) return "This ZIP could not be analyzed. Check that it is a valid archive containing project files.";
  if (status === 429) return "Too many analyses were requested. Please wait a minute and try again.";
  return `The analysis request returned HTTP ${status} without a safe error message. You can retry without reloading the page.`;
}

function getNetworkErrorMessage(): string {
  return "Could not connect to the analysis API. Check that this app is still reachable at the same address, confirm its server is running, and retry. If the problem continues, check the server logs for the X-Ray processing stage.";
}

const reviewAreas = [
  {
    icon: FolderTree,
    title: "Architecture & stack",
    description: "Inspect detected languages, frameworks, dependencies, and project structure.",
  },
  {
    icon: SearchCheck,
    title: "Implementation review",
    description: "Review source-based feature signals, potential issues, and improvement ideas.",
  },
  {
    icon: ShieldCheck,
    title: "Security signals",
    description: "Surface potential security findings identified during static source analysis.",
  },
];

export default function XRayWorkspace() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const submissionInProgressRef = useRef(false);
  const isMountedRef = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const selectFile = (candidate?: File) => {
    setError(null);
    if (!candidate) return;
    if (!candidate.name.toLowerCase().endsWith(".zip")) {
      setError("Only ZIP files are accepted. Choose a file with a .zip extension.");
      return;
    }
    if (candidate.size === 0) {
      setError("This ZIP file is empty. Choose a non-empty project archive.");
      return;
    }
    if (candidate.size > MAX_ARCHIVE_BYTES) {
      setError(`This file is larger than the ${MAX_ARCHIVE_LABEL} upload limit.`);
      return;
    }

    setFile(candidate);
    setReport(null);
    setStatus("selected");
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.currentTarget.files?.[0]);
    event.currentTarget.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (status === "analyzing") return;
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleDropzoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInputRef.current?.click();
    }
  };

  const removeFile = () => {
    setFile(null);
    setReport(null);
    setError(null);
    setStatus("idle");
  };

  const cancelAnalysis = () => {
    abortControllerRef.current?.abort();
  };

  const submitAnalysis = async () => {
    if (!file || submissionInProgressRef.current) return;

    const controller = new AbortController();
    submissionInProgressRef.current = true;
    abortControllerRef.current = controller;
    setStatus("analyzing");
    setError(null);
    setReport(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/analyze-project", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      let payload: unknown;
      const responseBody = await response.text();
      try {
        payload = responseBody ? JSON.parse(responseBody) : null;
      } catch {
        if (!response.ok) {
          setError(getApiError(response.status));
          setStatus("error");
          return;
        }
        throw new Error("The analysis API returned an unreadable success response. Please retry.");
      }

      if (!response.ok) {
        const apiMessage =
          typeof payload === "object" &&
          payload !== null &&
          "error" in payload &&
          typeof payload.error === "string"
            ? payload.error
            : undefined;
        setError(getApiError(response.status, apiMessage));
        setStatus("error");
        return;
      }

      if (!isAnalysisReport(payload)) {
        throw new Error("The analysis API returned an incomplete report. Your ZIP is still selected; please retry.");
      }

      setReport(payload);
      setStatus("success");
    } catch (requestError) {
      if (!isMountedRef.current) return;
      if (requestError instanceof Error && requestError.name === "AbortError") {
        setStatus("selected");
        setError("Analysis cancelled. You can try again when ready.");
      } else {
        setStatus("error");
        setError(
          requestError instanceof TypeError
            ? getNetworkErrorMessage()
            : requestError instanceof Error
              ? requestError.message
              : getNetworkErrorMessage(),
        );
      }
    } finally {
      if (abortControllerRef.current === controller) abortControllerRef.current = null;
      submissionInProgressRef.current = false;
      if (isMountedRef.current) {
        setStatus((current) => current === "analyzing" ? "selected" : current);
      }
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#fafaf8] font-mono text-xs text-neutral-900">
      <div className="pointer-events-none absolute inset-0 z-0 grid-pattern opacity-[0.35]" />

      <header className="relative z-10 flex items-center justify-between border-b border-neutral-200 bg-[#fafaf8]/70 px-5 py-4 backdrop-blur-sm sm:px-8">
        <Link
          href="/"
          className="inline-flex min-h-10 items-center gap-2 rounded px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All modes
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Codebase X-Ray</span>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-10 sm:px-8 sm:py-14">
        <section className="mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-900 shadow-sm">
            <FileArchive aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            Project analysis workspace
          </p>
          <h1 className="mt-3 font-sans text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Codebase X-Ray
          </h1>
          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-neutral-600 sm:text-base">
            Upload a hackathon project ZIP to inspect its actual source, technologies, architecture, and opportunities to improve.
          </p>
        </section>

        <section aria-label="Analysis capabilities" className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
          {reviewAreas.map(({ icon: Icon, title, description }) => (
            <article key={title} className="flex gap-3 rounded-lg border border-neutral-200 bg-white/90 p-4">
              <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-neutral-700" />
              <div>
                <h2 className="font-sans text-xs font-bold">{title}</h2>
                <p className="mt-1 font-sans text-[11px] font-light leading-relaxed text-neutral-600">{description}</p>
              </div>
            </article>
          ))}
        </section>

        <section aria-labelledby="upload-heading" className="mx-auto mt-8 w-full max-w-3xl rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-7">
          <div className="mb-5">
            <h2 id="upload-heading" className="font-sans text-lg font-bold tracking-tight">Analyze a project archive</h2>
            <p className="mt-1 font-sans text-xs font-light leading-relaxed text-neutral-600">
              ZIP files only, up to {MAX_ARCHIVE_LABEL}. Analysis is static source inspection; uploaded code is not executed or runtime-tested.
            </p>
          </div>

          <input
            ref={fileInputRef}
            id="xray-zip-input"
            type="file"
            accept=".zip,application/zip"
            onChange={handleFileInput}
            disabled={status === "analyzing"}
            className="sr-only"
            aria-label="Select a project ZIP file"
          />

          {!file && (
            <div
              role="button"
              tabIndex={0}
              aria-label="ZIP upload area. Press Enter or Space to browse for a file, or drop a ZIP file here."
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={handleDropzoneKeyDown}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDragging(false);
              }}
              onDrop={handleDrop}
              className={`flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
                isDragging ? "border-neutral-900 bg-neutral-100" : "border-neutral-300 bg-neutral-50/60 hover:border-neutral-500 hover:bg-neutral-50"
              }`}
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-800">
                <Upload aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="font-sans text-sm font-semibold">Drop your project ZIP here</p>
              <p className="mt-1 font-sans text-xs text-neutral-500">or use the browse button below</p>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-neutral-400">.zip · maximum {MAX_ARCHIVE_LABEL}</p>
            </div>
          )}

          {file && (
            <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-800">
                  <FileCode2 aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-sans text-sm font-semibold" title={file.name}>{file.name}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-neutral-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              {status !== "analyzing" && (
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="min-h-10 rounded border border-neutral-300 bg-white px-3 text-[10px] font-bold uppercase tracking-wider transition-colors hover:border-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={removeFile}
                    aria-label="Remove selected ZIP"
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-600 transition-colors hover:border-red-300 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {status === "analyzing" && (
            <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4" role="status" aria-live="polite">
              <div className="flex items-center gap-3">
                <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin text-neutral-800" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider">Uploading and analyzing</p>
                  <p className="mt-1 font-sans text-xs text-neutral-600">Inspecting the archive on the server. This can take a little while.</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-neutral-800" />
              </div>
            </div>
          )}

          {error && (
            <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
              <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="font-sans text-xs leading-relaxed">{error}</p>
            </div>
          )}

          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {status === "analyzing" ? (
              <button
                type="button"
                onClick={cancelAnalysis}
                className="min-h-11 rounded border border-neutral-300 bg-white px-5 text-[10px] font-bold uppercase tracking-wider transition-colors hover:border-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                Cancel analysis
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-11 rounded border border-neutral-300 bg-white px-5 text-[10px] font-bold uppercase tracking-wider transition-colors hover:border-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  {file ? "Browse another ZIP" : "Browse ZIP files"}
                </button>
                <button
                  type="button"
                  onClick={submitAnalysis}
                  disabled={!file}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-neutral-900 bg-neutral-900 px-5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-200 disabled:text-neutral-500"
                >
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                  Analyze project
                </button>
              </>
            )}
          </div>
        </section>

        {status === "success" && report && (
          <div className="mx-auto mt-8 w-full max-w-5xl">
            <div className="mb-4 flex items-center gap-2 text-emerald-800" role="status">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
              <p className="text-[10px] font-bold uppercase tracking-wider">Analysis report ready</p>
            </div>
            <AnalysisResults report={report} />
          </div>
        )}

        <p className="mx-auto mt-6 max-w-3xl text-center font-sans text-[10px] leading-relaxed text-neutral-500">
          Archives are validated and inspected by the existing analysis service. Uploaded source code is treated as untrusted data and is never executed by this workspace.
        </p>
      </div>
    </main>
  );
}
