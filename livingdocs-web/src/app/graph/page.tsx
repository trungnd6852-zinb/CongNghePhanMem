"use client"

import React, { useCallback } from "react"
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/i/card"
import { Badge } from "@/components/i/badge"
import { GitBranch, FileCode, FileText } from "lucide-react"

// Node khởi tạo mô phỏng mối quan hệ giữa Code và Doc
const initialNodes = [
  {
    id: "code-auth",
    position: { x: 50, y: 100 },
    data: { label: "src/auth/service.ts" },
    style: { background: "#1e1e2e", color: "#60a5fa", border: "1px solid #3b82f6", padding: 10, borderRadius: 8, fontSize: 12 },
  },
  {
    id: "doc-auth",
    position: { x: 350, y: 100 },
    data: { label: "docs/api/auth.md" },
    style: { background: "#1e1e2e", color: "#f59e0b", border: "1px solid #f59e0b", padding: 10, borderRadius: 8, fontSize: 12 },
  },
  {
    id: "code-db",
    position: { x: 50, y: 220 },
    data: { label: "prisma/schema.prisma" },
    style: { background: "#1e1e2e", color: "#60a5fa", border: "1px solid #3b82f6", padding: 10, borderRadius: 8, fontSize: 12 },
  },
  {
    id: "doc-db",
    position: { x: 350, y: 220 },
    data: { label: "docs/architecture/database.md" },
    style: { background: "#1e1e2e", color: "#f59e0b", border: "1px solid #f59e0b", padding: 10, borderRadius: 8, fontSize: 12 },
  },
  {
    id: "code-payment",
    position: { x: 50, y: 340 },
    data: { label: "src/payment/stripe.ts" },
    style: { background: "#1e1e2e", color: "#60a5fa", border: "1px solid #3b82f6", padding: 10, borderRadius: 8, fontSize: 12 },
  },
  {
    id: "doc-payment",
    position: { x: 350, y: 340 },
    data: { label: "docs/services/payment.md" },
    style: { background: "#1e1e2e", color: "#10b981", border: "1px solid #10b981", padding: 10, borderRadius: 8, fontSize: 12 },
  },
]

// Liên kết giữa Code -> Doc
const initialEdges = [
  { id: "e1", source: "code-auth", target: "doc-auth", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2", source: "code-db", target: "doc-db", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3", source: "code-payment", target: "doc-payment", animated: false, markerEnd: { type: MarkerType.ArrowClosed } },
]

export default function GraphPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-mono">Repository Dependency Graph</h1>
        <p className="text-muted-foreground text-sm">
          Visual mapping between codebase components and technical documentation pages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Display (Bên trái/Trung tâm) */}
        <Card className="lg:col-span-8 border-border">
          <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-ai-brand" /> Live Graph Mapping
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                <FileCode className="h-3 w-3 mr-1" /> Source Code
              </Badge>
              <Badge variant="outline" className="text-amber-400 border-amber-500/30">
                <FileText className="h-3 w-3 mr-1" /> Documentation
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[450px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Controls />
              <Background gap={12} size={1} />
            </ReactFlow>
          </CardContent>
        </Card>

        {/* Thông tin Repository (Bên phải) */}
        <Card className="lg:col-span-4 border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Repository Status</CardTitle>
            <CardDescription className="text-xs">
              Linked GitHub Repository: <span className="font-mono text-foreground font-semibold">org/livingdocs-core</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted/40 rounded-lg border border-border space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Total Mapped Files:</span>
                <span className="font-mono font-semibold">6 files</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Relationships:</span>
                <span className="font-mono font-semibold">3 links</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Auto-Sync Status:</span>
                <span className="text-emerald-400 font-semibold">Enabled</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">Legend</h4>
              <ul className="text-xs space-y-1.5 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Source Code File
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Drifted Documentation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Up-to-date Documentation
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}