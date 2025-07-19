"use client"

import { useEffect } from "react"

function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000) // Simulate loading for 2 seconds
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-4 border-orange-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl">Loading GlobalKitchen...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
