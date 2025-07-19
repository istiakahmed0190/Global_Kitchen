"use client"

function Sidebar({ user, activeView, setActiveView, onCreatePost, onLogout }) {
  const menuItems = [
    { id: "feed", label: "Home", icon: "🏠" }, // Home Icon
    { id: "profile", label: "Profile", icon: "👤" }, // User Icon
    { id: "messages", label: "Messages", icon: "💬" }, // MessageCircle Icon
    { id: "settings", label: "Settings", icon: "⚙️" }, // Settings Icon
  ]

  return (
    <aside className="sidebar">
      {/* User Info as Profile Button */}
      <button className="user-info-button" onClick={() => setActiveView("profile")}>
        <div className="avatar-group">
          <div className="avatar">
            <img src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
            <div className="avatar-fallback">{user.displayName?.[0]?.toUpperCase()}</div>
          </div>
          <div>
            <h3>{user.displayName}</h3>
            <p>@{user.username}</p>
          </div>
        </div>
        <div className="user-stats">
          <div>
            <div className="stat-value">{user.posts}</div>
            <div className="stat-label">Posts</div>
          </div>
          <div>
            <div className="stat-value">{user.followers}</div>
            <div className="stat-label">Followers</div>
          </div>
          <div>
            <div className="stat-value">{user.following}</div>
            <div className="stat-label">Following</div>
          </div>
        </div>
      </button>

      {/* Create Post Button */}
      <button onClick={onCreatePost} className="create-button">
        ➕ {/* Plus Icon */}
        Create
      </button>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`button ${activeView === item.id ? "active" : ""}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-8">
        <button className="logout-button" onClick={onLogout}>
          🚪 {/* LogOut Icon */}
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
