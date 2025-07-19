"use client"

import { useState, useRef } from "react"

function Profile({ user }) {
  const [activeTab, setActiveTab] = useState("posts")
  const fileInputRef = useRef(null)

  const userPosts = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300",
      likes: 234,
      comments: 45,
      type: "recipe",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=300",
      likes: 189,
      comments: 32,
      type: "recipe",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=300",
      likes: 312,
      comments: 58,
      type: "recipe",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=300",
      likes: 156,
      comments: 23,
      type: "recipe",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=300&width=300",
      likes: 278,
      comments: 41,
      type: "recipe",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=300&width=300",
      likes: 195,
      comments: 29,
      type: "recipe",
    },
  ]

  const handleViewProfilePicture = () => {
    alert("Viewing profile picture!")
    // In a real application, you would open a modal or a new page with the full-size profile picture.
  }

  const handleChangeProfilePicture = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      alert(`Selected file: ${file.name}. In a real app, this would be uploaded.`)
      // Here you would typically upload the file to a storage service and update the user's avatar URL.
    }
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-card">
        <div className="profile-header-content">
          {/* Avatar */}
          <div className="profile-avatar-wrapper">
            <img src={user.avatar || "/placeholder.svg"} alt={user.displayName} onClick={handleViewProfilePicture} />
            <div className="profile-avatar-fallback" onClick={handleViewProfilePicture}>
              {user.displayName?.[0]?.toUpperCase()}
            </div>
            {/* Dropdown menu functionality is simplified for basic HTML/CSS/JS */}
            <button
              onClick={handleChangeProfilePicture}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              📷 {/* Camera Icon */}
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />

          {/* Profile Info */}
          <div className="profile-info">
            <div className="profile-name-actions">
              <div>
                <h1 className="profile-name">{user.displayName}</h1>
                <p className="profile-username">@{user.username}</p>
              </div>
              <button className="profile-share-button">Share Profile</button>
            </div>

            {/* Stats */}
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-value">{user.posts}</div>
                <div className="profile-stat-label">Posts</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">{user.followers}</div>
                <div className="profile-stat-label">Followers</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">{user.following}</div>
                <div className="profile-stat-label">Following</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value profile-stat-rating">
                  ⭐ {/* Star Icon */}
                  4.8
                </div>
                <div className="profile-stat-label">Rating</div>
              </div>
            </div>

            {/* Bio */}
            <div className="profile-bio">
              <p>
                🍳 Passionate home cook sharing family recipes from around the world
                <br />📍 Based in San Francisco, CA
                <br />🌟 Specializing in Mediterranean & Asian fusion
              </p>
              <div className="profile-meta">
                <div>
                  📍 {/* MapPin Icon */}
                  San Francisco, CA
                </div>
                <div>
                  🗓️ {/* Calendar Icon */}
                  Joined March 2023
                </div>
                <div>
                  🔗 {/* LinkIcon Icon */}
                  <a href="#" className="text-orange-600 hover:underline">
                    myblog.com
                  </a>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="profile-specialties">
              <span className="profile-specialty-badge">Mediterranean</span>
              <span className="profile-specialty-badge">Asian Fusion</span>
              <span className="profile-specialty-badge">Vegetarian</span>
              <span className="profile-specialty-badge">Baking</span>
              <span className="profile-specialty-badge">Healthy Cooking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="tabs-container">
        <div className="tabs-list">
          <button
            className={`tabs-trigger ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            🖼️ {/* Grid3X3 Icon */}
            Posts
          </button>
          <button
            className={`tabs-trigger ${activeTab === "recipes" ? "active" : ""}`}
            onClick={() => setActiveTab("recipes")}
          >
            👨‍🍳 {/* ChefHat Icon */}
            Recipes
          </button>
          <button
            className={`tabs-trigger ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            🔖 {/* Bookmark Icon */}
            Saved
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === "posts" && (
            <div className="posts-grid">
              {userPosts.map((post) => (
                <div key={post.id} className="post-thumbnail">
                  <img src={post.image || "/placeholder.svg"} alt="Recipe post" />
                  <div className="post-overlay">
                    <div className="post-stats">
                      <div className="post-stat-item">
                        ❤️ {/* Heart Icon */}
                        {post.likes}
                      </div>
                      <div className="post-stat-item">
                        💬 {/* MessageCircle Icon */}
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "recipes" && (
            <div className="empty-state">
              👨‍🍳 {/* ChefHat Icon */}
              <h3>Recipe Collection</h3>
              <p>Your organized recipe collection will appear here</p>
              <button>Create Recipe Collection</button>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="empty-state">
              🔖 {/* Bookmark Icon */}
              <h3>Saved Recipes</h3>
              <p>Recipes you've bookmarked will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
