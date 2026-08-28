"use client"

import React from "react"
import { Card, CardContent } from "@/components/i/card"
import { Badge } from "@/components/i/badge"
import { Button } from "@/components/i/button"
import { GitCommit, RotateCcw, Eye } from "lucide-react"

const mockHistory = [
  {
    id: "v-1.2",
    version: "v1.2.0",
    docTitle: "Authentication API Specification",
    commitHash: "a1b2c3d",
    author: "livingdocs-bot[bot]",
    timestamp: "2026-08-27 14:32",
    changeType: "AI Auto-Sync",
    description: "Updated refresh token endpoint to v2 specs",
  },
  {
    id: "v-1.1",
    version: "v1.1.0",
    docTitle: "Authentication API Specification",
    commitHash: "f9e8d7c",
    author: "Nguyen Duc Trung",
    timestamp: "2026-08-20 09:15",
    changeType: "Manual Update",
    description: "Added OAuth2 Google provider documentation",
  },
  {
    id: "v-1.0",
    version: "v1.0.0",
    docTitle: "Authentication API Specification",
    commitHash: "e5d4c3b",
    author: "Nguyen Duc Trung",
    timestamp: "2026-08-10 16:45",
    changeType: "Initial Commit",
    description: "Initial release of Auth API docs",
  },
]

export default function VersionHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-mono">Version History</h1>
        <p className="text-muted-foreground text-sm">
          Track historical revisions of documents and rollback to previous versions.
        </p>
      </div>

      <div className="space-y-4">
        {mockHistory.map((item) => (
          <Card key={item.id} className="border-border">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono bg-muted text-foreground">
                    {item.version}
                  </Badge>
                  <h3 className="text-base font-semibold">{item.docTitle}</h3>
                  <Badge className="bg-ai-brand/20 text-ai-brand border-ai-brand/30">
                    {item.changeType}
                  </Badge>
                </div>

                <p className="text-xs text-foreground/80">{item.description}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <GitCommit className="h-3.5 w-3.5" /> {item.commitHash}
                  </span>
                  <span>•</span>
                  <span>Author: {item.author}</span>
                  <span>•</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs text-amber-500 border-amber-500/30 hover:bg-amber-500/10">
                  <RotateCcw className="h-3.5 w-3.5" /> Rollback
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}