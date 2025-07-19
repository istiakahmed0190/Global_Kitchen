"use client"

import { useState } from "react"

function LoginForm({ onLogin, onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.username && formData.password) {
      setIsLoading(true)
      // Simulate API call to Node.js backend
      try {
        const response = await fetch("http://localhost:3001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (response.ok) {
          onLogin(data.user) // Assuming backend returns user data
        } else {
          alert(data.message || "Login failed")
        }
      } catch (error) {
        console.error("Login error:", error)
        alert("Network error or server is down.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="mx-auto mb-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
          {/* ChefHat Icon - using simple text for now */}
          <span className="text-white text-2xl">👨‍🍳</span>
        </div>
        <h2 className="card-title">Welcome Back</h2>
        <p className="text-white/70">Sign in to your GlobalKitchen account</p>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="label">
              Username or Email
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              className="input"
              placeholder="Enter your username or email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="input pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? "🙈" : "👁️"} {/* EyeOff / Eye Icons */}
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
          <button
            type="submit"
            className="button w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white/80">
            {"Don't have an account? "}
            <button onClick={onSwitchToSignup} className="text-orange-400 hover:text-orange-300 underline">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
