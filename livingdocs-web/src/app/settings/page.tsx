"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/i/card"
import { Input } from "@/components/i/input"
import { Button } from "@/components/i/button"
import { Badge } from "@/components/i/badge"
import { GitBranch, Key, Bell, Shield, Save, Check } from "lucide-react"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [repoUrl, setRepoUrl] = useState("github.com/org/livingdocs-core")
  const [apiKey, setApiKey] = useState("sk-livingdocs-************************")
  const [branch, setBranch] = useState("main")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-mono">Platform Settings</h1>
        <p className="text-muted-foreground text-sm">
          Configure GitHub webhooks, AI model keys, and document synchronization rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Repository Integration */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-ai-brand" /> Repository Connection
            </CardTitle>
            <CardDescription className="text-xs">
              Connect your codebase repository for real-time AST change monitoring.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">GitHub Repository URL</label>
                <Input
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Monitored Branch</label>
                <Input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI & Provider Configuration */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Key className="h-4 w-4 text-ai-brand" /> AI Engine Credentials
            </CardTitle>
            <CardDescription className="text-xs">
              API key used for generating documentation diffs and automated Pull Requests.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">LivingDocs AI Key</label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Automation */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-ai-brand" /> Automation Rules
            </CardTitle>
            <CardDescription className="text-xs">
              Customize when LivingDocs automatically opens GitHub PRs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
              <div>
                <p className="text-sm font-medium">Auto-Create PR on Critical Drift</p>
                <p className="text-xs text-muted-foreground">Automatically draft a PR when breaking API changes are detected.</p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
              <div>
                <p className="text-sm font-medium">Slack / Discord Webhook Notifications</p>
                <p className="text-xs text-muted-foreground">Send alert messages when document drift is identified.</p>
              </div>
              <Badge variant="outline" className="text-muted-foreground">Disabled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <Button type="submit" className="bg-ai-brand hover:bg-ai-brand/90 text-white gap-2">
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saved ? "Settings Saved!" : "Save Configuration"}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}