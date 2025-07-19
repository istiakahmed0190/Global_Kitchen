"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { LoadingScreen } from "@/components/loading-screen"
import { MainLayout } from "@/components/layout/main-layout"

export default function App() {
  const [currentView, setCurrentView] = useState<"login" | "signup" | "loading" | "main">("loading")
  const [user, setUser] = useState<any>(null)

  // Check for existing authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("globalKitchen_user")
    const savedToken = localStorage.getItem("globalKitchen_token")
    const savedAuthView = localStorage.getItem("globalKitchen_authView")
    
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setCurrentView("main")
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        // Clear corrupted data
        localStorage.removeItem("globalKitchen_user")
        localStorage.removeItem("globalKitchen_token")
        localStorage.removeItem("globalKitchen_authView")
        setCurrentView("login")
      }
    } else {
      // If no user data, restore the last auth view (login/signup)
      setCurrentView(savedAuthView === "signup" ? "signup" : "login")
    }
  }, [])

  const handleSwitchToSignup = () => {
    localStorage.setItem("globalKitchen_authView", "signup")
    setCurrentView("signup")
  }

  const handleSwitchToLogin = () => {
    localStorage.setItem("globalKitchen_authView", "login")
    setCurrentView("login")
  }

  const handleLogin = (userData: any) => {
    // Save user data and token to localStorage
    localStorage.setItem("globalKitchen_user", JSON.stringify(userData))
    localStorage.setItem("globalKitchen_token", userData.token || "demo_token")
    
    setUser(userData)
    setCurrentView("loading")
  }

  const handleSignup = (userData: any) => {
    // Save user data and token to localStorage
    localStorage.setItem("globalKitchen_user", JSON.stringify(userData))
    localStorage.setItem("globalKitchen_token", userData.token || "demo_token")
    
    setUser(userData)
    setCurrentView("loading")
  }

  const handleLoadingComplete = () => {
    setCurrentView("main")
  }

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem("globalKitchen_user")
    localStorage.removeItem("globalKitchen_token")
    localStorage.removeItem("globalKitchen_authView")
    localStorage.removeItem("globalKitchen_activeView")
    
    setUser(null)
    setCurrentView("login")
  }

  if (currentView === "loading") {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  if (currentView === "main" && user) {
    return <MainLayout user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">GlobalKitchen</h1>
          <p className="text-xl md:text-2xl text-purple-200 font-medium">
            Cooking Without Borders where Flavors Meet Cultures
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {currentView === "login" ? (
            <LoginForm onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />
          ) : (
            <SignupForm onSignup={handleSignup} onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </div>
    </div>
  )
}
