"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChefHat } from "lucide-react"

interface SignupFormProps {
  onSignup: (userData: any) => void
  onSwitchToLogin: () => void
}

export function SignupForm({ onSignup, onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    accountName: "",
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.accountName && formData.username && formData.password) {
      onSignup({
        ...formData,
        id: Date.now(),
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
          <ChefHat className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Join GlobalKitchen</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="accountName" className="text-white">
              Account Name
            </Label>
            <Input
              id="accountName"
              type="text"
              value={formData.accountName}
              onChange={(e) => handleChange("accountName", e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Your display name"
              required
            />
          </div>
          <div>
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="@username"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Create a password"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Create Account
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white/80">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-orange-400 hover:text-orange-300 underline">
              Login
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
