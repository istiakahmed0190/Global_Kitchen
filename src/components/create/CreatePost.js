"use client"

import { useState } from "react"

function CreatePost({ user, onClose, onPost }) {
  const [postContent, setPostContent] = useState("")
  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [recipeData, setRecipeData] = useState({
    title: "",
    cookTime: "",
    servings: "",
    difficulty: "",
    cuisine: "",
    ingredients: [""],
    instructions: [""],
  })
  const [hashtags, setHashtags] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }))
  }

  const removeIngredient = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const updateIngredient = (index, value) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => (i === index ? value : ing)),
    }))
  }

  const addInstruction = () => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }))
  }

  const removeInstruction = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const updateInstruction = (index, value) => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => (i === index ? value : inst)),
    }))
  }

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedPhoto(event.target.files[0])
      setSelectedVideo(null) // Clear video if photo is selected
    }
  }

  const handleVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedVideo(event.target.files[0])
      setSelectedPhoto(null) // Clear photo if video is selected
    }
  }

  const handlePost = async () => {
    if (!postContent.trim()) return

    setIsPosting(true)
    // Simulate API call to Node.js backend
    const formData = new FormData()
    formData.append("content", postContent)
    if (selectedPhoto) formData.append("photo", selectedPhoto)
    if (selectedVideo) formData.append("video", selectedVideo)
    if (showRecipeForm) formData.append("recipe_data", JSON.stringify(recipeData))
    formData.append("hashtags", hashtags)

    try {
      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        body: formData, // Use FormData for file uploads
      })
      const data = await response.json()
      if (response.ok) {
        alert(data.message || "Post created successfully!")
        onPost()
      } else {
        alert(data.message || "Failed to create post.")
      }
    } catch (error) {
      console.error("Post creation error:", error)
      alert("Network error or server is down.")
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="create-post-overlay">
      <div className="create-post-card">
        <div className="create-post-header">
          <h2 className="create-post-title">
            👨‍🍳 {/* ChefHat Icon */}
            <span>Create Recipe Post</span>
          </h2>
          <button className="create-post-close-button" onClick={onClose}>
            ✖️ {/* X Icon */}
          </button>
        </div>

        <div className="create-post-content">
          {/* User Info */}
          <div className="create-post-user-info">
            <div className="avatar create-post-user-avatar">
              <img src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
              <div className="create-post-user-fallback">{user.displayName[0]}</div>
            </div>
            <div>
              <h4 className="create-post-user-name">{user.displayName}</h4>
              <p className="create-post-user-username">@{user.username}</p>
            </div>
          </div>

          {/* Post Content */}
          <textarea
            placeholder="Share your culinary creation! What's cooking today?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="create-post-textarea"
          />

          {/* Media Upload */}
          <div className="create-post-media-buttons">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <button className="create-post-media-button" as="span">
                📸 {/* ImageIcon */}
                {selectedPhoto ? "Photo Selected" : "Add Photo"}
              </button>
              <input id="photo-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
            </label>
            <label htmlFor="video-upload" className="cursor-pointer">
              <button className="create-post-media-button" as="span">
                📹 {/* Video Icon */}
                {selectedVideo ? "Video Selected" : "Add Video"}
              </button>
              <input id="video-upload" type="file" accept="video/*" className="sr-only" onChange={handleVideoChange} />
            </label>
            <button
              className={`create-post-media-button ${showRecipeForm ? "active" : ""}`}
              onClick={() => setShowRecipeForm(!showRecipeForm)}
            >
              👨‍🍳 {/* ChefHat Icon */}
              {showRecipeForm ? "Hide Recipe" : "Add Recipe"}
            </button>
          </div>

          {/* Recipe Form */}
          {showRecipeForm && (
            <div className="create-post-recipe-form">
              <h3 className="create-post-recipe-form-header">Recipe Details</h3>
              <div className="create-post-recipe-form-content">
                {/* Basic Info */}
                <div className="create-post-recipe-grid">
                  <div>
                    <label className="create-post-recipe-label">Recipe Title</label>
                    <input
                      placeholder="e.g., Grandma's Chocolate Chip Cookies"
                      value={recipeData.title}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, title: e.target.value }))}
                      className="create-post-recipe-input"
                    />
                  </div>
                  <div>
                    <label className="create-post-recipe-label">Cuisine Type</label>
                    <input
                      placeholder="e.g., Italian, Mexican, Asian"
                      value={recipeData.cuisine}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, cuisine: e.target.value }))}
                      className="create-post-recipe-input"
                    />
                  </div>
                </div>

                <div className="create-post-recipe-grid cols-3">
                  <div>
                    <label className="create-post-recipe-label">Cook Time</label>
                    <input
                      placeholder="30 min"
                      value={recipeData.cookTime}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, cookTime: e.target.value }))}
                      className="create-post-recipe-input"
                    />
                  </div>
                  <div>
                    <label className="create-post-recipe-label">Servings</label>
                    <input
                      placeholder="4"
                      type="number"
                      value={recipeData.servings}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, servings: e.target.value }))}
                      className="create-post-recipe-input"
                    />
                  </div>
                  <div>
                    <label className="create-post-recipe-label">Difficulty</label>
                    {/* Simplified Select component */}
                    <select
                      value={recipeData.difficulty}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, difficulty: e.target.value }))}
                      className="create-post-select-trigger"
                    >
                      <option value="">Select</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <div className="create-post-ingredients-header">
                    <label className="create-post-recipe-label">Ingredients</label>
                    <button type="button" className="create-post-add-button" onClick={addIngredient}>
                      ➕ {/* Plus Icon */}
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recipeData.ingredients.map((ingredient, index) => (
                      <div key={index} className="create-post-list-item">
                        <input
                          placeholder={`Ingredient ${index + 1}`}
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          className="create-post-recipe-input"
                        />
                        {recipeData.ingredients.length > 1 && (
                          <button
                            type="button"
                            className="create-post-remove-button"
                            onClick={() => removeIngredient(index)}
                          >
                            ➖ {/* Minus Icon */}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <div className="create-post-instructions-header">
                    <label className="create-post-recipe-label">Instructions</label>
                    <button type="button" className="create-post-add-button" onClick={addInstruction}>
                      ➕ {/* Plus Icon */}
                      Add Step
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recipeData.instructions.map((instruction, index) => (
                      <div key={index} className="create-post-list-item">
                        <div className="create-post-instruction-number">{index + 1}</div>
                        <textarea
                          placeholder={`Step ${index + 1} instructions...`}
                          value={instruction}
                          onChange={(e) => updateInstruction(index, e.target.value)}
                          className="create-post-textarea"
                        />
                        {recipeData.instructions.length > 1 && (
                          <button
                            type="button"
                            className="create-post-remove-button"
                            onClick={() => removeInstruction(index)}
                          >
                            ➖ {/* Minus Icon */}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hashtags */}
          <div>
            <label className="create-post-recipe-label">Hashtags</label>
            <input
              placeholder="#delicious #homemade #recipe"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="create-post-hashtags-input"
            />
          </div>

          {/* Post Actions */}
          <div className="create-post-actions">
            <div className="create-post-char-count">{postContent.length}/2000 characters</div>
            <div className="create-post-action-buttons">
              <button className="create-post-cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={!postContent.trim() || isPosting}
                className="create-post-share-button"
              >
                {isPosting ? "Posting..." : "Share Recipe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
