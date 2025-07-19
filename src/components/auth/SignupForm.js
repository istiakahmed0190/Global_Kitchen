"use client"

import { useState } from "react"

function SignupForm({ onSignup, onSwitchToLogin }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      formData.displayName &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.password === formData.confirmPassword
    ) {
      setIsLoading(true)
      // Simulate API call to Node.js backend
      try {
        const response = await fetch("http://localhost:3001/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (response.ok) {
          onSignup(data.user) // Assuming backend returns user data
        } else {
          alert(data.message || "Signup failed")
        }
      } catch (error) {
        console.error("Signup error:", error)
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
        <h2 className="card-title">Join GlobalKitchen</h2>
        <p className="text-white/70">Create your culinary journey</p>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="label">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
              className="input"
              placeholder="Your display name"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value.toLowerCase() }))}
              className="input"
              placeholder="@username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="input"
              placeholder="your@email.com"
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
                placeholder="Create a password"
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
            {formData.password && (
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    {req.met ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>}
                    <span className={req.met ? "text-green-400" : "text-red-400"}>{req.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className="input pr-10"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showConfirmPassword ? "🙈" : "👁️"} {/* EyeOff / Eye Icons */}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className="mt-1 flex items-center space-x-2 text-xs">
                {formData.password === formData.confirmPassword ? (
                  <>
                    <span className="text-green-400">✓</span>
                    <span className="text-green-400">Passwords match</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-400">✗</span>
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
          <button
            type="submit"
            className="button w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading || formData.password !== formData.confirmPassword}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white/80">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-orange-400 hover:text-orange-300 underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
