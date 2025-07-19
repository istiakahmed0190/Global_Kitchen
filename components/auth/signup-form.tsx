"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChefHat, Eye, EyeOff, Check, X } from "lucide-react"

interface SignupFormProps {
  onSignup: (userData: any) => void
  onSwitchToLogin: () => void
}

export function SignupForm({ onSignup, onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains number", met: /\d/.test(formData.password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.displayName &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.password === formData.confirmPassword
    ) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        onSignup({
          ...formData,
          id: Date.now(),
          avatar: `/placeholder.svg?height=40&width=40`,
          followers: 0,
          following: 0,
          posts: 0,
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
        <CardTitle className="text-2xl text-white">Join GlobalKitchen</CardTitle>
        <p className="text-white/70">Create your culinary journey</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="displayName" className="text-white">
              Display Name
            </Label>
            <Input
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value.toLowerCase() }))}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="your@email.com"
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
                placeholder="Create a password"
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
            {formData.password && (
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    {req.met ? <Check className="w-3 h-3 text-green-400" /> : <X className="w-3 h-3 text-red-400" />}
                    <span className={req.met ? "text-green-400" : "text-red-400"}>{req.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-10"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className="mt-1 flex items-center space-x-2 text-xs">
                {formData.password === formData.confirmPassword ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Passwords match</span>
                  </>
                ) : (
                  <>
                    <X className="w-3 h-3 text-red-400" />
                    <span className="text-red-400">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex items-start space-x-2">
            <input type="checkbox" required className="mt-1" />
            <span className="text-xs text-white/80">
              I agree to the{" "}
              <button type="button" className="text-orange-400 hover:text-orange-300 underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="text-orange-400 hover:text-orange-300 underline">
                Privacy Policy
              </button>
            </span>
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading || formData.password !== formData.confirmPassword}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white/80">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-orange-400 hover:text-orange-300 underline">
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
