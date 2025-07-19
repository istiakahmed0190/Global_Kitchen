"use client"

import { useState } from "react"
import LoginForm from "./components/auth/LoginForm"
import SignupForm from "./components/auth/SignupForm"
import MainLayout from "./components/layout/MainLayout"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  const [currentView, setCurrentView] = useState("login")
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView("loading")
  }

  const handleSignup = (userData) => {
    setUser(userData)
    setCurrentView("loading")
  }

  const handleLoadingComplete = () => {
    setCurrentView("main")
  }

  const handleLogout = () => {
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
            <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView("signup")} />
          ) : (
            <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setCurrentView("login")} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
