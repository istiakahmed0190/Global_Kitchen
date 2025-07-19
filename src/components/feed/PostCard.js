"use client"

import { useState } from "react"

function PostCard({ post, currentUser, onLike, onBookmark, onComment }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [showRecipe, setShowRecipe] = useState(false)

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      onComment(post.id, newComment)
      setNewComment("")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.recipe?.title || "Check out this recipe!",
        text: post.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="post-card">
      <div className="post-card-header">
        <div className="author-info">
          <div className="avatar author-avatar">
            <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.displayName} />
            <div className="avatar-fallback">{post.author.displayName[0]}</div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h4 className="author-name">{post.author.displayName}</h4>
              {post.author.verified && <span className="text-blue-500">✔️</span>} {/* CheckCircle Icon */}
            </div>
            <p className="author-username">
              @{post.author.username} • {post.timestamp}
            </p>
          </div>
        </div>
        {/* DropdownMenu (simplified) */}
        <button className="action-button">... {/* MoreHorizontal Icon */}</button>
      </div>

      <div className="post-card-content">
        {/* Post Content */}
        <p className="post-content-text">{post.content}</p>

        {/* Hashtags */}
        <div className="post-hashtags">
          {post.hashtags.map((tag) => (
            <span key={tag} className="post-hashtag">
              {tag}
            </span>
          ))}
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="rounded-lg overflow-hidden">
            <img src={post.images[0] || "/placeholder.svg"} alt="Recipe" className="post-image" />
          </div>
        )}

        {/* Recipe Card */}
        {post.recipe && (
          <div className="recipe-card">
            <div className="recipe-card-header">
              <h3 className="recipe-card-title">
                👨‍🍳 {/* ChefHat Icon */}
                {post.recipe.title}
              </h3>
              <span className="recipe-cuisine-badge">{post.recipe.cuisine}</span>
            </div>

            <div className="recipe-details">
              <div>
                🕒 {/* Clock Icon */}
                {post.recipe.cookTime}
              </div>
              <div>
                👥 {/* Users Icon */}
                {post.recipe.servings} servings
              </div>
              <div>
                <span className="difficulty">{post.recipe.difficulty}</span>
              </div>
            </div>

            {showRecipe && (
              <div className="space-y-2">
                <h4 className="recipe-ingredients-title">Ingredients:</h4>
                <ul className="recipe-ingredients-list">
                  {post.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <span></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button className="view-recipe-button" onClick={() => setShowRecipe(!showRecipe)}>
              {showRecipe ? "Hide Recipe" : "View Full Recipe"}
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="post-actions">
          <div className="post-action-group">
            <button
              className={`post-action-button like ${post.isLiked ? "active" : ""}`}
              onClick={() => onLike(post.id)}
            >
              ❤️ {/* Heart Icon */}
              {post.likes}
            </button>
            <button
              className="post-action-button comment"
              onClick={() => setShowComments(true)} // Always show comments
            >
              💬 {/* MessageCircle Icon */}
              {post.comments}
            </button>
            <button className="post-action-button share" onClick={handleShare}>
              ↗️ {/* Share2 Icon */}
              {post.shares}
            </button>
          </div>
          <button
            className={`post-action-button bookmark ${post.isBookmarked ? "active" : ""}`}
            onClick={() => onBookmark(post.id)}
          >
            🔖 {/* Bookmark Icon */}
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="comments-section">
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="avatar">
                <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.displayName} />
                <div className="avatar-fallback">{currentUser.displayName[0]}</div>
              </div>
              <input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="input"
              />
              <button type="submit" className="button" disabled={!newComment.trim()}>
                Post
              </button>
            </form>

            {/* Sample comments */}
            <div className="sample-comments">
              <div className="sample-comment-item">
                <div className="avatar">
                  <div className="avatar-fallback">JD</div>
                </div>
                <div>
                  <p className="comment-text">
                    <span className="comment-author">john_doe</span> This looks absolutely delicious! 😍
                  </p>
                  <p className="comment-time">2h</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
