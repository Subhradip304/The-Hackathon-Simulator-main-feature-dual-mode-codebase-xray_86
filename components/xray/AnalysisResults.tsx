import { AlertTriangle, CheckCircle2, FileText, Info, ShieldAlert, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AnalysisMode = "static-fallback" | "ai-enriched";
type Severity = "critical" | "high" | "medium" | "low" | "info";

interface ProjectTechnology {
  name: string;
  type: "language" | "framework" | "dependency" | "runtime" | "tool";
  confidence: number;
  evidence: string[];
}

interface ProjectFile {
  path: string;
  sizeBytes: number;
  kind: "source" | "config" | "test" | "documentation" | "asset" | "unknown";
  importance: "high" | "medium" | "low";
}

interface ProjectFinding {
  title: string;
  description: string;
  severity: Severity;
  filePaths: string[];
  evidence: string[];
}

export interface AnalysisReport {
  projectName: string;
  projectSummary: string;
  languages: ProjectTechnology[];
  frameworks: ProjectTechnology[];
  dependencies: ProjectTechnology[];
  folderStructure: string[];
  importantFiles: ProjectFile[];
  architecture: {
    entryPoints: string[];
    layers: string[];
    notes: string[];
  };
  implementedFeatures: ProjectFinding[];
  incompleteFeatures: ProjectFinding[];
  potentialIssues: ProjectFinding[];
  securityFindings: ProjectFinding[];
  improvementSuggestions: string[];
  analysisMode: AnalysisMode;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isTechnology(value: unknown): value is ProjectTechnology {
  if (!isRecord(value)) return false;
  return (
    typeof value.name === "string" &&
    ["language", "framework", "dependency", "runtime", "tool"].includes(String(value.type)) &&
    typeof value.confidence === "number" &&
    isStringArray(value.evidence)
  );
}

function isProjectFile(value: unknown): value is ProjectFile {
  if (!isRecord(value)) return false;
  return (
    typeof value.path === "string" &&
    typeof value.sizeBytes === "number" &&
    ["source", "config", "test", "documentation", "asset", "unknown"].includes(String(value.kind)) &&
    ["high", "medium", "low"].includes(String(value.importance))
  );
}

function isFinding(value: unknown): value is ProjectFinding {
  if (!isRecord(value)) return false;
  return (
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    ["critical", "high", "medium", "low", "info"].includes(String(value.severity)) &&
    isStringArray(value.filePaths) &&
    isStringArray(value.evidence)
  );
}

export function isAnalysisReport(value: unknown): value is AnalysisReport {
  if (!isRecord(value) || !isRecord(value.architecture)) return false;
  const architecture = value.architecture;
  return (
    typeof value.projectName === "string" &&
    typeof value.projectSummary === "string" &&
    Array.isArray(value.languages) && value.languages.every(isTechnology) &&
    Array.isArray(value.frameworks) && value.frameworks.every(isTechnology) &&
    Array.isArray(value.dependencies) && value.dependencies.every(isTechnology) &&
    isStringArray(value.folderStructure) &&
    Array.isArray(value.importantFiles) && value.importantFiles.every(isProjectFile) &&
    isStringArray(architecture.entryPoints) &&
    isStringArray(architecture.layers) &&
    isStringArray(architecture.notes) &&
    Array.isArray(value.implementedFeatures) && value.implementedFeatures.every(isFinding) &&
    Array.isArray(value.incompleteFeatures) && value.incompleteFeatures.every(isFinding) &&
    Array.isArray(value.potentialIssues) && value.potentialIssues.every(isFinding) &&
    Array.isArray(value.securityFindings) && value.securityFindings.every(isFinding) &&
    isStringArray(value.improvementSuggestions) &&
    (value.analysisMode === "static-fallback" || value.analysisMode === "ai-enriched")
  );
}

const severityStyles: Record<Severity, string> = {
  critical: "border-red-300 bg-red-50 text-red-900",
  high: "border-orange-300 bg-orange-50 text-orange-900",
  medium: "border-amber-300 bg-amber-50 text-amber-900",
  low: "border-blue-200 bg-blue-50 text-blue-900",
  info: "border-neutral-200 bg-neutral-50 text-neutral-700",
};

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2">
        <h3 className="font-sans text-sm font-bold">{title}</h3>
        {count !== undefined && (
          <span className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[9px] font-bold text-neutral-500">
            {count}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="font-sans text-xs text-neutral-500">No {label} were reported by this analysis.</p>;
}

function FindingList({ findings }: { findings: ProjectFinding[] }) {
  if (findings.length === 0) return <EmptyState label="findings" />;
  return (
    <ul className="space-y-3">
      {findings.map((finding, index) => (
        <li key={`${finding.title}-${index}`} className={`rounded-md border p-3 ${severityStyles[finding.severity]}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-sans text-xs font-bold">{finding.title}</p>
            <span className="text-[9px] font-bold uppercase tracking-wider">{finding.severity}</span>
          </div>
          <p className="mt-1 font-sans text-xs leading-relaxed">{finding.description}</p>
          {finding.filePaths.length > 0 && (
            <p className="mt-2 break-all font-mono text-[10px]">{finding.filePaths.join(" · ")}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

function TechnologyList({ items }: { items: ProjectTechnology[] }) {
  if (items.length === 0) return <EmptyState label="technologies" />;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={`${item.type}-${item.name}`} className="rounded border border-neutral-200 bg-neutral-50 px-2.5 py-1.5">
          <span className="font-sans text-xs font-semibold">{item.name}</span>
          <span className="ml-2 text-[9px] uppercase tracking-wider text-neutral-500">{item.type}</span>
        </li>
      ))}
    </ul>
  );
}

function StringList({ items, emptyLabel }: { items: string[]; emptyLabel: string }) {
  if (items.length === 0) return <EmptyState label={emptyLabel} />;
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="break-all font-mono text-[10px] text-neutral-700">{item}</li>
      ))}
    </ul>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AnalysisResults({ report }: { report: AnalysisReport }) {
  return (
    <article aria-labelledby="analysis-report-title" className="space-y-4">
      <header className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500">Static source analysis</p>
            <h2 id="analysis-report-title" className="mt-1 break-words font-sans text-xl font-black tracking-tight sm:text-2xl">
              {report.projectName}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-600">
            {report.analysisMode === "ai-enriched" ? (
              <><Sparkles aria-hidden="true" className="h-3 w-3" /> AI-enriched</>
            ) : (
              <><CheckCircle2 aria-hidden="true" className="h-3 w-3" /> Static report</>
            )}
          </span>
        </div>
        <p className="mt-3 font-sans text-sm font-light leading-relaxed text-neutral-700">{report.projectSummary}</p>
        <p className="mt-3 flex items-start gap-2 rounded bg-blue-50 px-3 py-2 font-sans text-[11px] leading-relaxed text-blue-900">
          <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Findings are based on static source inspection only. The project was not executed or runtime-tested.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Programming languages" count={report.languages.length}>
          <TechnologyList items={report.languages} />
        </Section>
        <Section title="Frameworks" count={report.frameworks.length}>
          <TechnologyList items={report.frameworks} />
        </Section>
        <Section title="Dependencies" count={report.dependencies.length}>
          <TechnologyList items={report.dependencies} />
        </Section>
        <Section title="Architecture">
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">Layers</p>
              <StringList items={report.architecture.layers} emptyLabel="architecture layers" />
            </div>
            <div>
              <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">Entry points</p>
              <StringList items={report.architecture.entryPoints} emptyLabel="entry points" />
            </div>
            {report.architecture.notes.length > 0 && (
              <div>
                <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-neutral-500">Notes</p>
                <StringList items={report.architecture.notes} emptyLabel="architecture notes" />
              </div>
            )}
          </div>
        </Section>

        <Section title="Folder structure" count={report.folderStructure.length}>
          <div className="max-h-64 overflow-auto rounded bg-neutral-50 p-3">
            {report.folderStructure.length > 0 ? (
              <ul className="space-y-1">
                {report.folderStructure.map((folder) => (
                  <li key={folder} className="break-all font-mono text-[10px] text-neutral-700">{folder}</li>
                ))}
              </ul>
            ) : <EmptyState label="folders" />}
          </div>
        </Section>

        <Section title="Important files" count={report.importantFiles.length}>
          {report.importantFiles.length === 0 ? <EmptyState label="important files" /> : (
            <ul className="max-h-64 space-y-2 overflow-auto">
              {report.importantFiles.map((file) => (
                <li key={file.path} className="flex items-start gap-2">
                  <FileText aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                  <div className="min-w-0">
                    <p className="break-all font-mono text-[10px] text-neutral-800">{file.path}</p>
                    <p className="mt-0.5 text-[9px] uppercase text-neutral-500">
                      {file.kind} · {file.importance} · {formatBytes(file.sizeBytes)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Implemented features" count={report.implementedFeatures.length}>
          <FindingList findings={report.implementedFeatures} />
        </Section>
        <Section title="Incomplete features" count={report.incompleteFeatures.length}>
          <FindingList findings={report.incompleteFeatures} />
        </Section>
        <Section title="Potential issues" count={report.potentialIssues.length}>
          <FindingList findings={report.potentialIssues} />
        </Section>
        <Section title="Security findings" count={report.securityFindings.length}>
          {report.securityFindings.length > 0 && (
            <p className="mb-3 flex items-center gap-2 font-sans text-[10px] text-neutral-600">
              <ShieldAlert aria-hidden="true" className="h-3.5 w-3.5" />
              Static signals require manual verification.
            </p>
          )}
          <FindingList findings={report.securityFindings} />
        </Section>

        <Section title="Improvement suggestions" count={report.improvementSuggestions.length}>
          {report.improvementSuggestions.length === 0 ? <EmptyState label="suggestions" /> : (
            <ul className="space-y-2">
              {report.improvementSuggestions.map((suggestion, index) => (
                <li key={`${suggestion}-${index}`} className="flex gap-2 font-sans text-xs leading-relaxed text-neutral-700">
                  <AlertTriangle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </article>
  );
}
