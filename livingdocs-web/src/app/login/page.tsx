"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/i/card"
import { Input } from "@/components/i/input"
import { Button } from "@/components/i/button"
import { Terminal, Lock, Mail, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("nguyenductrung@uth.edu.vn")
  const [password, setPassword] = useState("12345678")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Lưu thông tin session giả định vào localStorage
    localStorage.setItem("user", JSON.stringify({ name: "Nguyễn Đức Trung", email }))
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center items-center gap-2 font-mono font-bold text-2xl text-foreground">
            <Terminal className="h-7 w-7 text-ai-brand" />
            <span>LivingDocs</span>
          </div>
          <CardTitle className="text-xl">Sign in to your account</CardTitle>
          <CardDescription className="text-xs">
            Enter your credentials to access the self-updating documentation platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 text-sm"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-ai-brand hover:bg-ai-brand/90 text-white gap-2 mt-2">
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}