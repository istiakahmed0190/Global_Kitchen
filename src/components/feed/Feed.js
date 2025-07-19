"use client"

import { useState } from "react"
import PostCard from "./PostCard"
import StoryBar from "./StoryBar"

function Feed({ user }) {
  const samplePosts = [
    {
      id: 1,
      author: {
        id: 1,
        username: "maria_chef",
        displayName: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content:
        "Just made the most amazing Paella Valenciana! 🥘 The secret is using bomba rice and real saffron threads. This recipe has been in my family for generations!",
      images: ["/placeholder.svg?height=400&width=600"],
      video: null,
      recipe: {
        title: "Traditional Paella Valenciana",
        cookTime: "45 min",
        servings: 6,
        difficulty: "Medium",
        ingredients: ["Bomba rice", "Saffron", "Chicken", "Rabbit", "Green beans", "Tomatoes"],
        cuisine: "Spanish",
      },
      likes: 234,
      comments: 45,
      shares: 12,
      bookmarks: 67,
      timestamp: "2 hours ago",
      isLiked: false,
      isBookmarked: false,
      hashtags: ["#paella", "#spanish", "#traditional", "#familyrecipe"],
    },
    {
      id: 2,
      author: {
        id: 2,
        username: "kenji_kitchen",
        displayName: "Kenji Tanaka",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content:
        "Homemade ramen from scratch! 🍜 Spent 12 hours on the tonkotsu broth but it was worth every minute. The depth of flavor is incredible!",
      images: ["/placeholder.svg?height=400&width=600"],
      video: null,
      recipe: {
        title: "Tonkotsu Ramen",
        cookTime: "12 hours",
        servings: 4,
        difficulty: "Hard",
        ingredients: ["Pork bones", "Miso paste", "Ramen noodles", "Soft-boiled eggs", "Green onions"],
        cuisine: "Japanese",
      },
      likes: 189,
      comments: 32,
      shares: 8,
      bookmarks: 45,
      timestamp: "4 hours ago",
      isLiked: true,
      isBookmarked: false,
      hashtags: ["#ramen", "#japanese", "#homemade", "#tonkotsu"],
    },
    {
      id: 3,
      author: {
        id: 3,
        username: "spice_queen",
        displayName: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
      content:
        "Butter chicken that melts in your mouth! 🍛 The key is marinating the chicken overnight in yogurt and spices. Perfect for a cozy dinner!",
      images: ["/placeholder.svg?height=400&width=600"],
      video: null,
      recipe: {
        title: "Creamy Butter Chicken",
        cookTime: "30 min",
        servings: 4,
        difficulty: "Medium",
        ingredients: ["Chicken", "Yogurt", "Tomatoes", "Cream", "Garam masala", "Butter"],
        cuisine: "Indian",
      },
      likes: 312,
      comments: 58,
      shares: 15,
      bookmarks: 89,
      timestamp: "6 hours ago",
      isLiked: false,
      isBookmarked: true,
      hashtags: ["#butterchicken", "#indian", "#curry", "#comfort"],
    },
  ]

  const [posts, setPosts] = useState(samplePosts)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleBookmark = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isBookmarked: !post.isBookmarked,
              bookmarks: post.isBookmarked ? post.bookmarks - 1 : post.bookmarks + 1,
            }
          : post,
      ),
    )
  }

  const handleComment = (postId, comment) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post)))
  }

  return (
    <div className="feed-container">
      {/* Header */}
      <div className="feed-header">
        <h1>Your Feed</h1>
        <button
          onClick={handleRefresh}
          className={`refresh-button ${isRefreshing ? "animate-spin" : ""}`}
          disabled={isRefreshing}
        >
          🔄 {/* RefreshCw Icon */}
          Refresh
        </button>
      </div>

      {/* Stories */}
      <StoryBar user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onComment={handleComment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feed
