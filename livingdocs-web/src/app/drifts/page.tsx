"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchDriftAlerts } from "@/lib/api-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/i/card"
import { Badge } from "@/components/i/badge"
import { Button } from "@/components/i/button"
import { AlertTriangle, GitCommit, Sparkles, Check, X } from "lucide-react"

export default function DriftMonitorPage() {
  const { data: drifts = [], isLoading } = useQuery({
    queryKey: ["drifts"],
    queryFn: fetchDriftAlerts,
  })

  const [selectedDrift, setSelectedDrift] = useState<any>(null)

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-drift-critical text-white">Critical</Badge>
      case "high":
        return <Badge className="bg-drift-high text-white">High</Badge>
      case "medium":
        return <Badge className="bg-drift-medium text-white">Medium</Badge>
      default:
        return <Badge className="bg-drift-low text-white">Low</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-mono">Drift Monitor & Diff Viewer</h1>
        <p className="text-muted-foreground text-sm">
          Analyze code changes that caused document drift and apply AI-suggested updates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Danh sách các cảnh báo Drift (Bên trái) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Detected Drifts ({drifts.length})
          </h2>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading drift alerts...</p>
          ) : (
            drifts.map((drift: any) => (
              <Card
                key={drift.id}
                className={`cursor-pointer transition-all hover:border-ai-brand ${
                  selectedDrift?.id === drift.id ? "border-ai-brand ring-1 ring-ai-brand" : ""
                }`}
                onClick={() => setSelectedDrift(drift)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base font-semibold">{drift.docTitle}</CardTitle>
                    {getSeverityBadge(drift.severity)}
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1.5 font-mono pt-1">
                    <GitCommit className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{drift.commitHash}</span> • <span>{drift.author}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                    {drift.summary}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Màn hình so sánh Diff & AI Fix (Bên phải) */}
        <div className="lg:col-span-7">
          {selectedDrift ? (
            <Card className="h-full border-ai-brand/30">
              <CardHeader className="bg-muted/30 border-b border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-mono">{selectedDrift.docTitle}</CardTitle>
                    <CardDescription className="text-xs">
                      Commit: {selectedDrift.commitMessage}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-ai-brand border-ai-brand/40">
                    <Sparkles className="h-3 w-3 mr-1" /> AI Prepared Fix
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Phân tích nguyên nhân từ AI */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase">Root Cause Analysis</h3>
                  <p className="text-sm bg-muted/50 p-3 rounded-md border border-border text-foreground">
                    {selectedDrift.summary}
                  </p>
                </div>

                {/* Diff Viewer Demo */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase">Proposed Documentation Diff</h3>
                  <div className="font-mono text-xs border border-border rounded-md overflow-hidden">
                    <div className="bg-red-500/10 text-red-400 p-2.5 border-b border-border flex items-center gap-2">
                      <span className="font-bold">-</span>
                      <span>POST /api/v1/auth/refresh (Expires: 24h)</span>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 p-2.5 flex items-center gap-2">
                      <span className="font-bold">+</span>
                      <span>POST /api/v2/auth/refresh (Expires: 1h, sliding refresh token)</span>
                    </div>
                  </div>
                </div>

                {/* Nút thao tác */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <X className="h-4 w-4" /> Ignore
                  </Button>
                  <Button size="sm" className="bg-ai-brand hover:bg-ai-brand/90 text-white gap-1.5">
                    <Check className="h-4 w-4" /> Create PR to Update Doc
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[300px] border-dashed">
              <div className="text-center p-6 space-y-2">
                <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-sm font-medium">Select a drift alert from the left list to view diff & AI fix.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}