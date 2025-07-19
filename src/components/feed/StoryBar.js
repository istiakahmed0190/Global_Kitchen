function StoryBar({ user }) {
  const sampleStories = [
    { id: 1, username: "chef_anna", avatar: "/placeholder.svg?height=60&width=60" },
    { id: 2, username: "foodie_max", avatar: "/placeholder.svg?height=60&width=60" },
    { id: 3, username: "baking_belle", avatar: "/placeholder.svg?height=60&width=60" },
    { id: 4, username: "grill_master", avatar: "/placeholder.svg?height=60&width=60" },
    { id: 5, username: "vegan_vibes", avatar: "/placeholder.svg?height=60&width=60" },
    { id: 6, username: "sweet_tooth", avatar: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="story-bar">
      {/* Your Story */}
      <div className="story-item">
        <div className="story-avatar">
          <img src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
        </div>
        <p className="story-username">Your Story</p>
      </div>

      {/* Other Stories */}
      {sampleStories.map((story) => (
        <div key={story.id} className="story-item">
          <div className="story-avatar">
            <img src={story.avatar || "/placeholder.svg"} alt={story.username} />
          </div>
          <p className="story-username">@{story.username}</p>
        </div>
      ))}
    </div>
  )
}

export default StoryBar
