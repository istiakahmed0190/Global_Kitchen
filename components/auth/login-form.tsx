"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChefHat, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onLogin: (userData: any) => void
  onSwitchToSignup: () => void
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.username && formData.password) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        onLogin({
          username: formData.username,
          id: Date.now(),
          email: `${formData.username}@example.com`,
          displayName: formData.username,
          avatar: `/placeholder.svg?height=40&width=40`,
          followers: Math.floor(Math.random() * 1000),
          following: Math.floor(Math.random() * 500),
          posts: Math.floor(Math.random() * 50),
          token: `demo_token_${Date.now()}`, // Add token for persistence
        })
        setIsLoading(false)
      }, 1000)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
          <ChefHat className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
        <p className="text-white/70">Sign in to your GlobalKitchen account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-white">
              Username or Email
            </Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Enter your username or email"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-white/80">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Remember me</span>
            </label>
            <button type="button" className="text-orange-400 hover:text-orange-300 text-sm">
              Forgot password?
            </button>
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-6 text-center">
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
