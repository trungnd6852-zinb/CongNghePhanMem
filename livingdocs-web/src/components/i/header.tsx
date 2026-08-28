"use client"

import React, { useEffect, useState } from "react"
import { Bell, Search, Terminal, LogOut } from "lucide-react"
import { Input } from "@/components/i/input"
import { Button } from "@/components/i/button"
import { ThemeToggle } from "@/components/i/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/i/avatar"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const [userName, setUserName] = useState("Nguyễn Đức Trung")
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        if (parsed.name) setUserName(parsed.name)
      } catch (e) {}
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 justify-between gap-4">
        <div className="flex items-center gap-2 font-mono font-bold text-lg">
          <Terminal className="h-5 w-5 text-ai-brand" />
          <span>LivingDocs</span>
        </div>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation, API refs, or drifts..."
              className="pl-8 bg-muted/50 border-none h-9 text-sm focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-drift-critical animate-pulse" />
          </Button>
          <ThemeToggle />

          {/* User Profile Menu */}
          <div className="relative ml-2">
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-ai-brand text-white font-semibold text-xs">
                  NDT
                </AvatarFallback>
              </Avatar>
            </Button>

            {openMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-popover p-2 shadow-md z-50"
                onClick={() => setOpenMenu(false)}
              >
                <div className="px-2 py-1.5 space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    nguyenductrung@uth.edu.vn
                  </p>
                </div>
                <div className="my-1 h-px bg-border" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1.5 text-sm text-red-500 hover:bg-muted rounded-sm flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}