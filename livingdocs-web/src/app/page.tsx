"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchDocuments, fetchDriftAlerts } from "@/lib/api-client"
import { Badge } from "@/components/i/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/i/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/i/table"
import { FileText, AlertTriangle, CheckCircle2, GitPullRequest, Activity, Sparkles, RefreshCw } from "lucide-react"

export default function DashboardPage() {
  const { data: docs = [], isLoading: loadingDocs } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  })

  const { data: drifts = [] } = useQuery({
    queryKey: ["drifts"],
    queryFn: fetchDriftAlerts,
  })

  const driftedCount = docs.filter((d: any) => d.status === "drifted").length
  const criticalDrifts = drifts.filter((d: any) => d.severity === "critical").length

  return (
    <div className="space-y-6" translate="no">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-mono">LivingDocs Control Center</h1>
          <p className="text-muted-foreground text-sm">
            Real-time synchronization status between source code and technical documentation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 py-1.5 px-3 gap-1.5">
            <Activity className="h-3.5 w-3.5" /> Webhook Sync: Active
          </Badge>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Tracked Docs</CardTitle>
            <FileText className="h-4 w-4 text-ai-brand" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{docs.length}</div>
            <p className="text-[11px] text-muted-foreground mt-1">Across 3 repositories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Active Drifts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-amber-500">{driftedCount}</div>
            <p className="text-[11px] text-muted-foreground mt-1">Require doc updates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-drift-critical" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-drift-critical">{criticalDrifts}</div>
            <p className="text-[11px] text-muted-foreground mt-1">API breaking changes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Auto-PRs Generated</CardTitle>
            <GitPullRequest className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-emerald-500">12</div>
            <p className="text-[11px] text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Tracked Documents Table */}
      <Card>
        <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ai-brand" />
              <span>Monitored Technical Documents</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Documents automatically monitored for code changes.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {loadingDocs ? (
            <div className="p-6 text-sm text-muted-foreground flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" /> Fetching live document graph...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Title</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Sync Status</TableHead>
                  <TableHead>Drift Severity</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.title}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{doc.path}</TableCell>
                    <TableCell>
                      {doc.status === "drifted" ? (
                        <span className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                          <AlertTriangle className="h-3.5 w-3.5" /> Drifted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Up-to-date
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {doc.driftSeverity === "critical" && <Badge className="bg-drift-critical text-white">Critical</Badge>}
                      {doc.driftSeverity === "medium" && <Badge className="bg-drift-medium text-white">Medium</Badge>}
                      {doc.driftSeverity === "low" && <Badge className="bg-drift-low text-white">Low</Badge>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{doc.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}