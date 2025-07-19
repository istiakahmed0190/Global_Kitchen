"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChefHat } from "lucide-react"

interface LoginFormProps {
  onLogin: (userData: any) => void
  onSwitchToSignup: () => void
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      onLogin({ username, id: Date.now() })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
          <ChefHat className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white/80">
            {"Don't have an account? "}
            <button onClick={onSwitchToSignup} className="text-orange-400 hover:text-orange-300 underline">
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
