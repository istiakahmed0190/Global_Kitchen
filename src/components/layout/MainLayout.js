"use client"

import { useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Feed from "../feed/Feed"
import Profile from "../profile/Profile"
import CreatePost from "../create/CreatePost"

function MainLayout({ user, onLogout }) {
  const [activeView, setActiveView] = useState("feed")
  const [showCreatePost, setShowCreatePost] = useState(false)

  const handleCreatePost = () => {
    setShowCreatePost(true)
  }

  const handlePostCreated = () => {
    setShowCreatePost(false)
    setActiveView("feed") // Go back to feed after posting
  }

  return (
    <div className="main-layout">
      <Header user={user} onLogout={onLogout} activeView={activeView} setActiveView={setActiveView} />
      <Sidebar
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        onCreatePost={handleCreatePost}
        onLogout={onLogout}
      />
      <main className="main-content">
        {activeView === "feed" && <Feed user={user} />}
        {activeView === "profile" && <Profile user={user} />}
        {/* Add other views here as needed */}
      </main>
      {showCreatePost && <CreatePost user={user} onClose={() => setShowCreatePost(false)} onPost={handlePostCreated} />}
    </div>
  )
}

export default MainLayout
