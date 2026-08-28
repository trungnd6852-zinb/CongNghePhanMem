"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  FileText, 
  GitPullRequest, 
  Network, 
  History, 
  Settings, 
  AlertTriangle 
} from "lucide-react"
import { Badge } from "@/components/i/badge"

const navItems = [
  { name: "Documents", href: "/", icon: FileText },
  { name: "Drift Monitor", href: "/drifts", icon: AlertTriangle, badge: "3" },
  { name: "Dependency Graph", href: "/graph", icon: Network },
  { name: "PR Sync Log", href: "/sync-log", icon: GitPullRequest },
  { name: "Version History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card/40 flex flex-col justify-between h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <Badge className="bg-drift-critical text-white h-5 px-1.5 text-[10px]">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="bg-muted/40 p-3 rounded-lg border border-border text-xs space-y-1">
          <div className="font-semibold flex items-center justify-between">
            <span>Sync Engine</span>
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
          </div>
          <p className="text-muted-foreground">Connected to Repo GitHub</p>
        </div>
      </div>
    </aside>
  )
}