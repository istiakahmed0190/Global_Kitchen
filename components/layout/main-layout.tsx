"use client"

import { useState, useEffect } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Feed } from "../feed/feed"
import { Profile } from "../profile/profile"
import { Explore } from "../explore/explore"
import { Messages } from "../messages/messages"
import { Notifications } from "../notifications/notifications"
import { Settings } from "../settings/settings"
import { CreatePost } from "../create/create-post"

interface MainLayoutProps {
  user: any
  onLogout: () => void
}

export function MainLayout({ user, onLogout }: MainLayoutProps) {
  const [activeView, setActiveView] = useState("feed")
  const [showCreatePost, setShowCreatePost] = useState(false)

  // Load saved active view on component mount
  useEffect(() => {
    const savedActiveView = localStorage.getItem("globalKitchen_activeView")
    if (savedActiveView) {
      setActiveView(savedActiveView)
    }
  }, [])

  // Save active view whenever it changes
  const handleViewChange = (view: string) => {
    setActiveView(view)
    localStorage.setItem("globalKitchen_activeView", view)
  }

  const renderContent = () => {
    switch (activeView) {
      case "feed":
        return <Feed user={user} />
      case "profile":
        return <Profile user={user} />
      case "explore":
        return <Explore user={user} />
      case "messages":
        return <Messages user={user} />
      case "notifications":
        return <Notifications user={user} />
      case "settings":
        return <Settings user={user} />
      default:
        return <Feed user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogout={onLogout}
        onCreatePost={() => setShowCreatePost(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div className="flex">
        <Sidebar
          user={user}
          activeView={activeView}
          setActiveView={setActiveView}
          onCreatePost={() => setShowCreatePost(true)}
          onLogout={onLogout}
        />

          return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogout={onLogout}
        onCreatePost={() => setShowCreatePost(true)}
        activeView={activeView}
        setActiveView={handleViewChange}
      />

      <div className="flex">
        <Sidebar
          user={user}
          activeView={activeView}
          setActiveView={handleViewChange}
          onCreatePost={() => setShowCreatePost(true)}
          onLogout={onLogout}
        />

        <main className="flex-1 ml-64 p-8">
          {renderContent()}
        </main>
      </div>

      {showCreatePost && (
        <CreatePost
          user={user}
          onClose={() => setShowCreatePost(false)}
          onPost={() => setShowCreatePost(false)}
        />
      )}
    </div>
  )
      </div>

      {showCreatePost && (
        <CreatePost
          user={user}
          onClose={() => setShowCreatePost(false)}
          onPost={() => {
            setShowCreatePost(false)
            setActiveView("feed")
          }}
        />
      )}
    </div>
  )
}
