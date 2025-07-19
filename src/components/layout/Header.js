"use client"

import { useState } from "react"

function Header({ user, onLogout, activeView, setActiveView }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [unreadNotificationsCount] = useState(3) // Simulate unread notifications

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, you'd pass the search query to the explore component
      alert(`Searching for: ${searchQuery}`)
    }
  }

  return (
    <header className="header">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <span className="text-orange-500 text-2xl">👨‍🍳</span> {/* ChefHat Icon */}
        <button onClick={() => setActiveView("feed")} className="logo">
          GlobalKitchen
        </button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <form onSubmit={handleSearch} className="relative">
          <span className="search-icon">🔍</span> {/* Search Icon */}
          <input
            type="search"
            placeholder="Search recipes, chefs, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
          />
        </form>
      </div>

      {/* Actions */}
      <div className="actions">
        <button
          className={`action-button ${activeView === "notifications" ? "active" : ""}`}
          onClick={() => setActiveView("notifications")}
        >
          🔔 {/* Bell Icon */}
          {unreadNotificationsCount > 0 && <span className="badge">{unreadNotificationsCount}</span>}
        </button>
      </div>
    </header>
  )
}

export default Header
