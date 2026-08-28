export type DriftSeverity = "low" | "medium" | "high" | "critical"

export type DocumentStatus = "up-to-date" | "drifted" | "reviewing"

export interface DocItem {
  id: string
  title: string
  path: string
  lastUpdated: string
  status: DocumentStatus
  driftSeverity?: DriftSeverity
  author: string
}

export interface DriftAlert {
  id: string
  docId: string
  docTitle: string
  severity: DriftSeverity
  detectedAt: string
  commitHash: string
  commitMessage: string
  author: string
  summary: string
  status: "open" | "resolved" | "ignored"
}

export interface DependencyNode {
  id: string
  label: string
  type: "doc" | "code" | "api"
  status?: DocumentStatus
}

export interface DependencyEdge {
  id: string
  source: string
  target: string
  label?: string
}