"use client"

import { Button } from "@/components/ui/button"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChefHat, Search, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge" // Import Badge component

interface HeaderProps {
  user: any
  onLogout: () => void
  onCreatePost: () => void
  activeView: string
  setActiveView: (view: string) => void
}

export function Header({ user, onLogout, onCreatePost, activeView, setActiveView }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [unreadNotificationsCount] = useState(3) // Simulate unread notifications

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setActiveView("explore")
      // In a real app, you'd pass the search query to the explore component
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <ChefHat className="w-8 h-8 text-orange-500" />
          <button
            onClick={() => setActiveView("feed")}
            className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
          >
            GlobalKitchen
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto">
          {" "}
          {/* Changed max-w-md to max-w-2xl */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search recipes, chefs, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-orange-500"
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveView("notifications")}
            className={`relative ${activeView === "notifications" ? "bg-gray-100" : ""}`}
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {unreadNotificationsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
