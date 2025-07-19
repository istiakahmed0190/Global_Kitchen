document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  if (!currentUser) {
    window.location.href = "/index.html" // Redirect to login if no user
    return
  }

  // DOM Elements
  const sidebarAvatar = document.getElementById("sidebar-avatar")
  const sidebarAvatarFallback = document.getElementById("sidebar-avatar-fallback")
  const sidebarDisplayName = document.getElementById("sidebar-display-name")
  const sidebarUsername = document.getElementById("sidebar-username")
  const sidebarPostsCount = document.getElementById("sidebar-posts-count")
  const sidebarFollowersCount = document.getElementById("sidebar-followers-count")
  const sidebarFollowingCount = document.getElementById("sidebar-following-count")
  const logoutButton = document.getElementById("logout-button")
  const createPostButton = document.getElementById("create-post-button")
  const createPostModal = document.getElementById("create-post-modal")
  const closeCreatePostModalButton = document.getElementById("close-create-post-modal")
  const mainContentArea = document.getElementById("main-content-area")
  const logoButton = document.getElementById("logo-button")
  const notificationsButton = document.getElementById("notifications-button")
  const notificationsBadge = document.getElementById("notifications-badge")

  // Create Post Modal Elements
  const createPostAvatar = document.getElementById("create-post-avatar")
  const createPostAvatarFallback = document.getElementById("create-post-avatar-fallback")
  const createPostDisplayName = document.getElementById("create-post-display-name")
  const createPostUsername = document.getElementById("create-post-username")
  const postContentInput = document.getElementById("post-content")
  const toggleRecipeFormButton = document.getElementById("toggle-recipe-form")
  const recipeFormSection = document.getElementById("recipe-form-section")
  const recipeTitleInput = document.getElementById("recipe-title")
  const recipeCuisineInput = document.getElementById("recipe-cuisine")
  const recipeCookTimeInput = document.getElementById("recipe-cook-time")
  const recipeServingsInput = document.getElementById("recipe-servings")
  const recipeDifficultySelect = document.getElementById("recipe-difficulty")
  const addIngredientButton = document.getElementById("add-ingredient")
  const ingredientsList = document.getElementById("ingredients-list")
  const addInstructionButton = document.getElementById("add-instruction")
  const instructionsList = document.getElementById("instructions-list")
  const hashtagsInput = document.getElementById("hashtags-input")
  const charCountSpan = document.getElementById("char-count")
  const cancelPostButton = document.getElementById("cancel-post")
  const sharePostButton = document.getElementById("share-post")
  const photoUploadInput = document.getElementById("photo-upload")
  const videoUploadInput = document.getElementById("video-upload")

  // Update UI with user data
  const updateUserInfo = () => {
    sidebarAvatar.src = currentUser.avatar || "/placeholder.svg?height=40&width=40"
    sidebarAvatarFallback.textContent =
      currentUser.displayName?.[0]?.toUpperCase() || currentUser.username?.[0]?.toUpperCase()
    sidebarDisplayName.textContent = currentUser.displayName || currentUser.username
    sidebarUsername.textContent = `@${currentUser.username}`
    sidebarPostsCount.textContent = currentUser.posts || 0
    sidebarFollowersCount.textContent = currentUser.followers || 0
    sidebarFollowingCount.textContent = currentUser.following || 0

    createPostAvatar.src = currentUser.avatar || "/placeholder.svg?height=40&width=40"
    createPostAvatarFallback.textContent =
      currentUser.displayName?.[0]?.toUpperCase() || currentUser.username?.[0]?.toUpperCase()
    createPostDisplayName.textContent = currentUser.displayName || currentUser.username
    createPostUsername.textContent = `@${currentUser.username}`
  }

  // Render Feed Content (simplified)
  const renderFeed = async () => {
    mainContentArea.innerHTML = `
            <div class="feed-container">
                <div class="feed-header">
                    <h1>Your Feed</h1>
                    <button class="refresh-button" id="refresh-feed-button">
                        <span>🔄</span>Refresh
                    </button>
                </div>
                <div class="story-bar">
                    <div class="story-bar-content" id="story-bar-content">
                        <!-- Stories will be loaded here -->
                    </div>
                </div>
                <div class="space-y-6" id="posts-list">
                    <!-- Posts will be loaded here -->
                </div>
            </div>
        `
    const refreshFeedButton = document.getElementById("refresh-feed-button")
    refreshFeedButton.addEventListener("click", fetchPosts)
    renderStoryBar()
    fetchPosts()
  }

  const renderStoryBar = () => {
    const storyBarContent = document.getElementById("story-bar-content")
    storyBarContent.innerHTML = `
            <div class="story-item">
                <div class="story-avatar">
                    <img src="${currentUser.avatar || "/placeholder.svg?height=60&width=60"}" alt="Your Story">
                    <div class="story-avatar-plus">➕</div>
                </div>
                <p class="story-username">Your Story</p>
            </div>
            ${[
              { id: 1, username: "maria_chef", displayName: "Maria", avatar: "/placeholder.svg?height=60&width=60" },
              { id: 2, username: "kenji_kitchen", displayName: "Kenji", avatar: "/placeholder.svg?height=60&width=60" },
              { id: 3, username: "spice_queen", displayName: "Priya", avatar: "/placeholder.svg?height=60&width=60" },
            ]
              .map(
                (story) => `
                <div class="story-item">
                    <div class="story-avatar">
                        <img src="${story.avatar}" alt="${story.displayName}">
                    </div>
                    <p class="story-username">${story.displayName}</p>
                </div>
            `,
              )
              .join("")}
        `
  }

  const fetchPosts = async () => {
    const postsList = document.getElementById("posts-list")
    postsList.innerHTML = `<p class="text-center text-gray-500">Loading posts...</p>`
    try {
      // In a real app, fetch from Django backend
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
      ]
      postsList.innerHTML = samplePosts
        .map(
          (post) => `
                <div class="post-card">
                    <div class="post-card-header">
                        <div class="author-info">
                            <div class="avatar author-avatar">
                                <img src="${post.author.avatar}" alt="${post.author.displayName}">
                                <div class="avatar-fallback">${post.author.displayName[0]}</div>
                            </div>
                            <div>
                                <div class="flex items-center space-x-1">
                                    <h4 class="author-name">${post.author.displayName}</h4>
                                    ${post.author.verified ? '<span class="text-blue-500">✔️</span>' : ""}
                                </div>
                                <p class="author-username">@${post.author.username} • ${post.timestamp}</p>
                            </div>
                        </div>
                        <button class="action-button">... </button>
                    </div>
                    <div class="post-card-content">
                        <p class="post-content-text">${post.content}</p>
                        <div class="post-hashtags">
                            ${post.hashtags.map((tag) => `<span class="post-hashtag">${tag}</span>`).join("")}
                        </div>
                        ${
                          post.images && post.images.length > 0
                            ? `<div class="rounded-lg overflow-hidden"><img src="${post.images[0]}" alt="Recipe" class="post-image"></div>`
                            : ""
                        }
                        ${
                          post.recipe
                            ? `
                            <div class="recipe-card">
                                <div class="recipe-card-header">
                                    <h3 class="recipe-card-title">
                                        <span>👨‍🍳</span>${post.recipe.title}
                                    </h3>
                                    <span class="recipe-cuisine-badge">${post.recipe.cuisine}</span>
                                </div>
                                <div class="recipe-details">
                                    <div><span>🕒</span>${post.recipe.cookTime}</div>
                                    <div><span>👥</span>${post.recipe.servings} servings</div>
                                    <div><span class="difficulty">${post.recipe.difficulty}</span></div>
                                </div>
                                <button class="view-recipe-button" data-post-id="${post.id}" data-action="toggle-recipe">View Full Recipe</button>
                                <div class="full-recipe-details hidden" id="recipe-details-${post.id}">
                                    <h4 class="recipe-ingredients-title">Ingredients:</h4>
                                    <ul class="recipe-ingredients-list">
                                        ${post.recipe.ingredients.map((ing) => `<li><span></span>${ing}</li>`).join("")}
                                    </ul>
                                    <h4 class="recipe-ingredients-title mt-4">Instructions:</h4>
                                    <ol class="recipe-ingredients-list">
                                        ${post.recipe.instructions.map((inst) => `<li>${inst}</li>`).join("")}
                                    </ol>
                                </div>
                            </div>
                        `
                            : ""
                        }
                        <div class="post-actions">
                            <div class="post-action-group">
                                <button class="post-action-button like ${post.isLiked ? "active" : ""}" data-post-id="${post.id}" data-action="like">
                                    <span>❤️</span>${post.likes}
                                </button>
                                <button class="post-action-button comment" data-post-id="${post.id}" data-action="comment">
                                    <span>💬</span>${post.comments}
                                </button>
                                <button class="post-action-button share" data-post-id="${post.id}" data-action="share">
                                    <span>↗️</span>${post.shares}
                                </button>
                            </div>
                            <button class="post-action-button bookmark ${post.isBookmarked ? "active" : ""}" data-post-id="${post.id}" data-action="bookmark">
                                <span>🔖</span>
                            </button>
                        </div>
                        <div class="comments-section hidden" id="comments-section-${post.id}">
                            <form class="comment-form" data-post-id="${post.id}">
                                <div class="avatar">
                                    <img src="${currentUser.avatar || "/placeholder.svg"}" alt="${currentUser.displayName}">
                                    <div class="avatar-fallback">${currentUser.displayName[0]}</div>
                                </div>
                                <input type="text" placeholder="Add a comment..." class="input comment-input">
                                <button type="submit" class="button" disabled>Post</button>
                            </form>
                            <div class="sample-comments">
                                <div class="sample-comment-item">
                                    <div class="avatar"><div class="avatar-fallback">JD</div></div>
                                    <div>
                                        <p class="comment-text"><span class="comment-author">john_doe</span> This looks absolutely delicious! 😍</p>
                                        <p class="comment-time">2h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
        )
        .join("")

      // Add event listeners for post actions
      postsList.querySelectorAll("[data-action='toggle-recipe']").forEach((button) => {
        button.addEventListener("click", (e) => {
          const postId = e.target.dataset.postId
          const recipeDetails = document.getElementById(`recipe-details-${postId}`)
          recipeDetails.classList.toggle("hidden")
          e.target.textContent = recipeDetails.classList.contains("hidden") ? "View Full Recipe" : "Hide Recipe"
        })
      })

      postsList.querySelectorAll("[data-action='like']").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.target.classList.toggle("active")
          // Simulate like count update
          const likesSpan = e.target.querySelector("span:last-child")
          let likes = Number.parseInt(likesSpan.textContent)
          if (e.target.classList.contains("active")) {
            likes++
          } else {
            likes--
          }
          likesSpan.textContent = likes
        })
      })

      postsList.querySelectorAll("[data-action='comment']").forEach((button) => {
        button.addEventListener("click", (e) => {
          const postId = e.target.dataset.postId
          const commentsSection = document.getElementById(`comments-section-${postId}`)
          commentsSection.classList.toggle("hidden")
        })
      })

      postsList.querySelectorAll(".comment-form").forEach((form) => {
        const commentInput = form.querySelector(".comment-input")
        const postButton = form.querySelector("button[type='submit']")

        commentInput.addEventListener("input", () => {
          postButton.disabled = !commentInput.value.trim()
        })

        form.addEventListener("submit", (e) => {
          e.preventDefault()
          const postId = form.dataset.postId
          const commentText = commentInput.value.trim()
          if (commentText) {
            alert(`Commenting on post ${postId}: ${commentText}`)
            commentInput.value = ""
            postButton.disabled = true
            // In a real app, send comment to backend and update UI
          }
        })
      })
    } catch (error) {
      console.error("Error fetching posts:", error)
      postsList.innerHTML = `<p class="text-center text-red-500">Failed to load posts.</p>`
    }
  }

  // Render Profile Content (simplified)
  const renderProfile = () => {
    mainContentArea.innerHTML = `
            <div class="profile-container">
                <div class="profile-card">
                    <div class="profile-header-content">
                        <div class="profile-avatar-wrapper">
                            <img src="${currentUser.avatar || "/placeholder.svg?height=80&width=80"}" alt="${currentUser.displayName}">
                            <div class="profile-avatar-fallback">${currentUser.displayName?.[0]?.toUpperCase()}</div>
                            <button class="absolute bottom-0 right-0 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center" id="change-profile-picture-button">
                                📷
                            </button>
                            <input type="file" id="profile-picture-upload" class="sr-only" accept="image/*">
                        </div>

                        <div class="profile-info">
                            <div class="profile-name-actions">
                                <div>
                                    <h1 class="profile-name">${currentUser.displayName}</h1>
                                    <p class="profile-username">@${currentUser.username}</p>
                                </div>
                                <button class="profile-share-button">Share Profile</button>
                            </div>

                            <div class="profile-stats">
                                <div class="profile-stat">
                                    <div class="profile-stat-value">${currentUser.posts}</div>
                                    <div class="profile-stat-label">Posts</div>
                                </div>
                                <div class="profile-stat">
                                    <div class="profile-stat-value">${currentUser.followers}</div>
                                    <div class="profile-stat-label">Followers</div>
                                </div>
                                <div class="profile-stat">
                                    <div class="profile-stat-value">${currentUser.following}</div>
                                    <div class="profile-stat-label">Following</div>
                                </div>
                                <div class="profile-stat">
                                    <div class="profile-stat-value profile-stat-rating">
                                        <span>⭐</span>4.8
                                    </div>
                                    <div class="profile-stat-label">Rating</div>
                                </div>
                            </div>

                            <div class="profile-bio">
                                <p>
                                    🍳 Passionate home cook sharing family recipes from around the world
                                    <br>📍 Based in San Francisco, CA
                                    <br>🌟 Specializing in Mediterranean & Asian fusion
                                </p>
                                <div class="profile-meta">
                                    <div><span>📍</span>San Francisco, CA</div>
                                    <div><span>🗓️</span>Joined March 2023</div>
                                    <div><span>🔗</span><a href="#" class="text-orange-600 hover:underline">myblog.com</a></div>
                                </div>
                            </div>

                            <div class="profile-specialties">
                                <span class="profile-specialty-badge">Mediterranean</span>
                                <span class="profile-specialty-badge">Asian Fusion</span>
                                <span class="profile-specialty-badge">Vegetarian</span>
                                <span class="profile-specialty-badge">Baking</span>
                                <span class="profile-specialty-badge">Healthy Cooking</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tabs-container">
                    <div class="tabs-list">
                        <button class="tabs-trigger active" data-tab="posts">
                            <span>🖼️</span>Posts
                        </button>
                        <button class="tabs-trigger" data-tab="recipes">
                            <span>👨‍🍳</span>Recipes
                        </button>
                        <button class="tabs-trigger" data-tab="saved">
                            <span>🔖</span>Saved
                        </button>
                    </div>

                    <div class="tabs-content" id="profile-tabs-content">
                        <!-- Tab content will be loaded here -->
                    </div>
                </div>
            </div>
        `
    const profileTabsContent = document.getElementById("profile-tabs-content")
    const tabsTriggers = document.querySelectorAll(".tabs-trigger")
    const profilePictureUpload = document.getElementById("profile-picture-upload")
    const changeProfilePictureButton = document.getElementById("change-profile-picture-button")

    const renderProfileTabContent = (tab) => {
      const userPosts = [
        { id: 1, image: "/placeholder.svg?height=300&width=300", likes: 234, comments: 45, type: "recipe" },
        { id: 2, image: "/placeholder.svg?height=300&width=300", likes: 189, comments: 32, type: "recipe" },
        { id: 3, image: "/placeholder.svg?height=300&width=300", likes: 312, comments: 58, type: "recipe" },
      ] // Simplified for demo

      if (tab === "posts") {
        profileTabsContent.innerHTML = `
                    <div class="posts-grid">
                        ${userPosts
                          .map(
                            (post) => `
                            <div class="post-thumbnail">
                                <img src="${post.image}" alt="Recipe post">
                                <div class="post-overlay">
                                    <div class="post-stats">
                                        <div class="post-stat-item"><span>❤️</span>${post.likes}</div>
                                        <div class="post-stat-item"><span>💬</span>${post.comments}</div>
                                    </div>
                                </div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
      } else if (tab === "recipes") {
        profileTabsContent.innerHTML = `
                    <div class="empty-state">
                        <span>👨‍🍳</span>
                        <h3>Recipe Collection</h3>
                        <p>Your organized recipe collection will appear here</p>
                        <button>Create Recipe Collection</button>
                    </div>
                `
      } else if (tab === "saved") {
        profileTabsContent.innerHTML = `
                    <div class="empty-state">
                        <span>🔖</span>
                        <h3>Saved Recipes</h3>
                        <p>Recipes you've bookmarked will appear here</p>
                    </div>
                `
      }
    }

    tabsTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        tabsTriggers.forEach((btn) => btn.classList.remove("active"))
        e.target.classList.add("active")
        renderProfileTabContent(e.target.dataset.tab)
      })
    })

    changeProfilePictureButton.addEventListener("click", () => {
      profilePictureUpload.click()
    })

    profilePictureUpload.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        alert(`Selected file: ${file.name}. In a real app, this would be uploaded.`)
        // Here you would typically upload the file to a storage service and update the user's avatar URL.
      }
    })

    renderProfileTabContent("posts") // Default tab
  }

  // Render Notifications Content (simplified)
  const renderNotifications = () => {
    mainContentArea.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
                        <p class="text-sm text-gray-500">You have 3 unread notifications</p>
                    </div>
                    <div class="flex space-x-2">
                        <button class="button">Mark all as read</button>
                        <button class="button"><span>⚙️</span></button>
                    </div>
                </div>
                <div class="tabs-container">
                    <div class="tabs-list">
                        <button class="tabs-trigger active" data-tab="all">All</button>
                        <button class="tabs-trigger" data-tab="likes">Likes</button>
                        <button class="tabs-trigger" data-tab="comments">Comments</button>
                        <button class="tabs-trigger" data-tab="follows">Follows</button>
                    </div>
                    <div class="tabs-content" id="notifications-tabs-content">
                        <!-- Notifications will be loaded here -->
                    </div>
                </div>
            </div>
        `
    const notificationsTabsContent = document.getElementById("notifications-tabs-content")
    const tabsTriggers = document.querySelectorAll("#notifications-tabs-content + .tabs-list .tabs-trigger")

    const notifications = [
      {
        id: 1,
        type: "like",
        user: { displayName: "Maria Rodriguez", avatar: "/placeholder.svg?height=40&width=40" },
        action: "liked your recipe",
        target: "Spaghetti Carbonara",
        timestamp: "2 minutes ago",
        read: false,
      },
      {
        id: 2,
        type: "comment",
        user: { displayName: "Kenji Tanaka", avatar: "/placeholder.svg?height=40&width=40" },
        action: "commented on your recipe",
        target: "Homemade Ramen",
        comment: "This looks delicious!",
        timestamp: "15 minutes ago",
        read: false,
      },
      {
        id: 3,
        type: "follow",
        user: { displayName: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40" },
        action: "started following you",
        timestamp: "1 hour ago",
        read: true,
      },
    ]

    const getNotificationIcon = (type) => {
      switch (type) {
        case "like":
          return "❤️"
        case "comment":
          return "💬"
        case "follow":
          return "➕👤"
        default:
          return "🔔"
      }
    }

    const renderNotificationsTabContent = (tab) => {
      let filteredNotifications = notifications
      if (tab !== "all") {
        filteredNotifications = notifications.filter((n) => n.type === tab)
      }

      notificationsTabsContent.innerHTML = `
                <div class="space-y-4">
                    ${filteredNotifications
                      .map(
                        (notification) => `
                        <div class="card cursor-pointer ${!notification.read ? "bg-orange-50 border-orange-200" : "hover:bg-gray-50"}">
                            <div class="card-content p-4">
                                <div class="flex items-start space-x-3">
                                    <div class="flex-shrink-0">${getNotificationIcon(notification.type)}</div>
                                    <div class="avatar h-10 w-10">
                                        <img src="${notification.user.avatar}" alt="${notification.user.displayName}">
                                        <div class="avatar-fallback">${notification.user.displayName[0]}</div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center justify-between">
                                            <p class="text-sm">
                                                <span class="font-semibold">${notification.user.displayName}</span> ${notification.action}
                                                ${notification.target ? `<span class="font-semibold text-orange-600"> "${notification.target}"</span>` : ""}
                                            </p>
                                            <span class="text-xs text-gray-500">${notification.timestamp}</span>
                                        </div>
                                        ${notification.comment ? `<p class="text-sm text-gray-600 mt-1 italic">"${notification.comment}"</p>` : ""}
                                        ${!notification.read ? '<div class="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>' : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `
    }

    tabsTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        tabsTriggers.forEach((btn) => btn.classList.remove("active"))
        e.target.classList.add("active")
        renderNotificationsTabContent(e.target.dataset.tab)
      })
    })

    renderNotificationsTabContent("all") // Default tab
  }

  // Render Messages Content (simplified)
  const renderMessages = () => {
    mainContentArea.innerHTML = `
            <div class="h-[calc(100vh-8rem)] flex">
                <div class="w-1/3 border-r bg-white">
                    <div class="p-4 border-b">
                        <h1 class="text-xl font-bold text-gray-900 mb-4">Messages</h1>
                        <div class="relative">
                            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4">🔍</span>
                            <input type="search" placeholder="Search conversations..." class="input pl-10">
                        </div>
                    </div>
                    <div class="overflow-y-auto">
                        <!-- Conversations will be loaded here -->
                        <div class="p-4 border-b cursor-pointer hover:bg-gray-50 bg-orange-50 border-r-2 border-r-orange-500">
                            <div class="flex items-center space-x-3">
                                <div class="relative">
                                    <div class="avatar h-12 w-12">
                                        <img src="/placeholder.svg?height=40&width=40" alt="Maria Rodriguez">
                                        <div class="avatar-fallback">MR</div>
                                    </div>
                                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between">
                                        <h3 class="font-semibold text-gray-900 truncate">Maria Rodriguez</h3>
                                        <span class="text-xs text-gray-500">2m ago</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm text-gray-600 truncate">Thanks for the recipe tip! 🍝</p>
                                        <span class="badge bg-orange-500 text-white text-xs">2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 flex flex-col bg-white">
                    <div class="p-4 border-b flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="relative">
                                <div class="avatar h-10 w-10">
                                    <img src="/placeholder.svg?height=40&width=40" alt="Maria Rodriguez">
                                    <div class="avatar-fallback">MR</div>
                                </div>
                                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900">Maria Rodriguez</h3>
                                <p class="text-sm text-gray-500">Active now</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="button">📞</button>
                            <button class="button">📹</button>
                            <button class="button">ℹ️</button>
                            <button class="button">...</button>
                        </div>
                    </div>
                    <div class="flex-1 overflow-y-auto p-4 space-y-4">
                        <!-- Messages will be loaded here -->
                        <div class="flex justify-start">
                            <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
                                <p class="text-sm">Hey! I saw your pasta carbonara post. It looks incredible! 🍝</p>
                                <p class="text-xs mt-1 text-gray-500">10:30 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-orange-500 text-white">
                                <p class="text-sm">Thank you so much! It's my grandmother's recipe. The secret is using fresh eggs and good parmesan.</p>
                                <p class="text-xs mt-1 text-orange-100">10:32 AM</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 border-t">
                        <form class="flex space-x-2">
                            <input type="text" placeholder="Type a message..." class="input flex-1">
                            <button type="submit" class="button"><span>✉️</span></button>
                        </form>
                    </div>
                </div>
            </div>
        `
  }

  // Render Settings Content (simplified)
  const renderSettings = () => {
    mainContentArea.innerHTML = `
            <div class="space-y-6">
                <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
                <div class="tabs-container">
                    <div class="tabs-list">
                        <button class="tabs-trigger active" data-tab="profile"><span>👤</span>Profile</button>
                        <button class="tabs-trigger" data-tab="notifications"><span>🔔</span>Notifications</button>
                        <button class="tabs-trigger" data-tab="privacy"><span>🛡️</span>Privacy</button>
                        <button class="tabs-trigger" data-tab="appearance"><span>🎨</span>Appearance</button>
                    </div>
                    <div class="tabs-content" id="settings-tabs-content">
                        <!-- Settings content will be loaded here -->
                    </div>
                </div>
            </div>
        `
    const settingsTabsContent = document.getElementById("settings-tabs-content")
    const tabsTriggers = document.querySelectorAll("#settings-tabs-content + .tabs-list .tabs-trigger")

    const renderSettingsTabContent = (tab) => {
      if (tab === "profile") {
        settingsTabsContent.innerHTML = `
                    <div class="card">
                        <div class="card-header"><h3 class="card-title">Profile Information</h3></div>
                        <div class="card-content space-y-6">
                            <div class="flex items-center space-x-4">
                                <div class="avatar h-20 w-20">
                                    <img src="${currentUser.avatar || "/placeholder.svg"}" alt="${currentUser.displayName}">
                                    <div class="avatar-fallback text-2xl">${currentUser.displayName[0]}</div>
                                </div>
                                <div>
                                    <button class="button mb-2"><span>📷</span>Change Photo</button>
                                    <p class="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">Display Name</label>
                                    <input value="${currentUser.displayName}" class="input">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">Username</label>
                                    <input value="${currentUser.username}" class="input" placeholder="@username">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Email</label>
                                <input type="email" value="${currentUser.email}" class="input">
                            </div>
                            <button class="button bg-orange-500 hover:bg-orange-600 text-white">Save Profile</button>
                        </div>
                    </div>
                `
      } else if (tab === "notifications") {
        settingsTabsContent.innerHTML = `
                    <div class="card">
                        <div class="card-header"><h3 class="card-title">Notification Preferences</h3></div>
                        <div class="card-content space-y-4">
                            <label class="flex items-center justify-between">
                                <span>Likes</span>
                                <input type="checkbox" checked class="rounded">
                            </label>
                            <label class="flex items-center justify-between">
                                <span>Comments</span>
                                <input type="checkbox" checked class="rounded">
                            </label>
                            <label class="flex items-center justify-between">
                                <span>Follows</span>
                                <input type="checkbox" checked class="rounded">
                            </label>
                            <button class="button bg-orange-500 hover:bg-orange-600 text-white">Save Notifications</button>
                        </div>
                    </div>
                `
      } else if (tab === "privacy") {
        settingsTabsContent.innerHTML = `
                    <div class="card">
                        <div class="card-header"><h3 class="card-title">Privacy Settings</h3></div>
                        <div class="card-content space-y-4">
                            <label class="flex items-center justify-between">
                                <span>Public Profile</span>
                                <input type="checkbox" checked class="rounded">
                            </label>
                            <label class="flex items-center justify-between">
                                <span>Allow Messages</span>
                                <input type="checkbox" checked class="rounded">
                            </label>
                            <button class="button bg-orange-500 hover:bg-orange-600 text-white">Save Privacy</button>
                        </div>
                    </div>
                `
      } else if (tab === "appearance") {
        settingsTabsContent.innerHTML = `
                    <div class="card">
                        <div class="card-header"><h3 class="card-title">Appearance</h3></div>
                        <div class="card-content space-y-4">
                            <p class="text-gray-600">Theme options will be available here.</p>
                            <button class="button bg-orange-500 hover:bg-orange-600 text-white">Save Appearance</button>
                        </div>
                    </div>
                `
      }
    }

    tabsTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        tabsTriggers.forEach((btn) => btn.classList.remove("active"))
        e.target.classList.add("active")
        renderSettingsTabContent(e.target.dataset.tab)
      })
    })

    renderSettingsTabContent("profile") // Default tab
  }

  // Navigation Logic
  const navigateTo = (view) => {
    document.querySelectorAll(".sidebar nav .button").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.getElementById(`${view}-button`).classList.add("active")

    if (view === "feed") {
      renderFeed()
    } else if (view === "profile") {
      renderProfile()
    } else if (view === "messages") {
      renderMessages()
    } else if (view === "notifications") {
      renderNotifications()
    } else if (view === "settings") {
      renderSettings()
    }
  }

  // Event Listeners
  logoButton.addEventListener("click", () => navigateTo("feed"))
  document.getElementById("feed-button").addEventListener("click", () => navigateTo("feed"))
  document.getElementById("profile-button").addEventListener("click", () => navigateTo("profile"))
  document.getElementById("messages-button").addEventListener("click", () => navigateTo("messages"))
  document.getElementById("settings-button").addEventListener("click", () => navigateTo("settings"))
  notificationsButton.addEventListener("click", () => navigateTo("notifications"))

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser")
    window.location.href = "/index.html"
  })

  // Create Post Modal Logic
  createPostButton.addEventListener("click", () => {
    createPostModal.classList.remove("hidden")
  })

  closeCreatePostModalButton.addEventListener("click", () => {
    createPostModal.classList.add("hidden")
    // Reset form
    postContentInput.value = ""
    photoUploadInput.value = ""
    videoUploadInput.value = ""
    recipeFormSection.classList.add("hidden")
    toggleRecipeFormButton.classList.remove("active")
    recipeTitleInput.value = ""
    recipeCuisineInput.value = ""
    recipeCookTimeInput.value = ""
    recipeServingsInput.value = ""
    recipeDifficultySelect.value = ""
    ingredientsList.innerHTML = `
            <div class="create-post-list-item">
                <input placeholder="Ingredient 1" class="create-post-recipe-input ingredient-input">
                <button type="button" class="create-post-remove-button remove-ingredient-button">➖</button>
            </div>
        `
    instructionsList.innerHTML = `
            <div class="create-post-list-item">
                <div class="create-post-instruction-number">1</div>
                <textarea placeholder="Step 1 instructions..." class="create-post-textarea instruction-textarea"></textarea>
                <button type="button" class="create-post-remove-button remove-instruction-button">➖</button>
            </div>
        `
    hashtagsInput.value = ""
    charCountSpan.textContent = "0/2000 characters"
    sharePostButton.disabled = true
  })

  toggleRecipeFormButton.addEventListener("click", () => {
    recipeFormSection.classList.toggle("hidden")
    toggleRecipeFormButton.classList.toggle("active")
    toggleRecipeFormButton.textContent = recipeFormSection.classList.contains("hidden")
      ? "👨‍🍳 Add Recipe"
      : "👨‍🍳 Hide Recipe"
  })

  postContentInput.addEventListener("input", () => {
    charCountSpan.textContent = `${postContentInput.value.length}/2000 characters`
    sharePostButton.disabled = !postContentInput.value.trim()
  })

  addIngredientButton.addEventListener("click", () => {
    const newIndex = ingredientsList.children.length + 1
    const newItem = document.createElement("div")
    newItem.className = "create-post-list-item"
    newItem.innerHTML = `
            <input placeholder="Ingredient ${newIndex}" class="create-post-recipe-input ingredient-input">
            <button type="button" class="create-post-remove-button remove-ingredient-button">➖</button>
        `
    ingredientsList.appendChild(newItem)
    newItem.querySelector(".remove-ingredient-button").addEventListener("click", () => newItem.remove())
  })

  addInstructionButton.addEventListener("click", () => {
    const newIndex = instructionsList.children.length + 1
    const newItem = document.createElement("div")
    newItem.className = "create-post-list-item"
    newItem.innerHTML = `
            <div class="create-post-instruction-number">${newIndex}</div>
            <textarea placeholder="Step ${newIndex} instructions..." class="create-post-textarea instruction-textarea"></textarea>
            <button type="button" class="create-post-remove-button remove-instruction-button">➖</button>
        `
    instructionsList.appendChild(newItem)
    newItem.querySelector(".remove-instruction-button").addEventListener("click", () => newItem.remove())
  })

  // Initial remove buttons for dynamically added items
  ingredientsList.querySelectorAll(".remove-ingredient-button").forEach((button) => {
    button.addEventListener("click", (e) => e.target.closest(".create-post-list-item").remove())
  })
  instructionsList.querySelectorAll(".remove-instruction-button").forEach((button) => {
    button.addEventListener("click", (e) => e.target.closest(".create-post-list-item").remove())
  })

  sharePostButton.addEventListener("click", async () => {
    if (!postContentInput.value.trim()) {
      alert("Post content cannot be empty.")
      return
    }

    sharePostButton.disabled = true
    sharePostButton.textContent = "Posting..."

    const formData = new FormData()
    formData.append("content", postContentInput.value)
    formData.append("hashtags", hashtagsInput.value)

    if (photoUploadInput.files && photoUploadInput.files[0]) {
      formData.append("photo", photoUploadInput.files[0])
    }
    if (videoUploadInput.files && videoUploadInput.files[0]) {
      formData.append("video", videoUploadInput.files[0])
    }

    if (recipeFormSection.classList.contains("hidden") === false) {
      const ingredients = Array.from(ingredientsList.querySelectorAll(".ingredient-input")).map((input) => input.value)
      const instructions = Array.from(instructionsList.querySelectorAll(".instruction-textarea")).map(
        (textarea) => textarea.value,
      )
      const recipeData = {
        title: recipeTitleInput.value,
        cookTime: recipeCookTimeInput.value,
        servings: recipeServingsInput.value,
        difficulty: recipeDifficultySelect.value,
        cuisine: recipeCuisineInput.value,
        ingredients: ingredients.filter(Boolean), // Remove empty strings
        instructions: instructions.filter(Boolean), // Remove empty strings
      }
      formData.append("recipe_data", JSON.stringify(recipeData))
    }

    try {
      const response = await fetch("http://localhost:8000/api/posts/", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (response.ok) {
        alert(data.message || "Post created successfully!")
        createPostModal.classList.add("hidden")
        navigateTo("feed") // Refresh feed
      } else {
        alert(data.message || "Failed to create post.")
      }
    } catch (error) {
      console.error("Post creation error:", error)
      alert("Network error or server is down.")
    } finally {
      sharePostButton.disabled = false
      sharePostButton.textContent = "Share Recipe"
    }
  })

  cancelPostButton.addEventListener("click", () => {
    createPostModal.classList.add("hidden")
  })

  // Initial setup
  updateUserInfo()
  navigateTo("feed") // Default view
})
