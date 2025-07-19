"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Search,
  User,
  Bell,
  ChefHat,
  LogOut,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  Clock,
  Send,
  Plus,
} from "lucide-react"

interface HomePageProps {
  user: any
  onLogout: () => void
}

const initialPosts = [
  {
    id: 1,
    user: { name: "Maria Rodriguez", username: "@maria_chef", avatar: "/placeholder.svg?height=40&width=40" },
    time: "2 hours ago",
    content:
      "Just made the most amazing Paella Valenciana! 🥘 The secret is using bomba rice and real saffron threads.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 124,
    comments: [
      { id: 1, user: "John", text: "Looks amazing! Can you share the recipe?" },
      { id: 2, user: "Sarah", text: "I love paella! This looks perfect." },
    ],
    rating: 4.8,
    hashtags: ["#paella", "#spanish", "#seafood"],
    ingredients: ["Bomba rice", "Saffron", "Chicken", "Rabbit", "Green beans"],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    user: { name: "Kenji Tanaka", username: "@kenji_kitchen", avatar: "/placeholder.svg?height=40&width=40" },
    time: "4 hours ago",
    content: "Homemade ramen from scratch! 🍜 Spent 12 hours on the tonkotsu broth but it was worth every minute.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 89,
    comments: [{ id: 1, user: "Mike", text: "12 hours?! That's dedication!" }],
    rating: 4.9,
    hashtags: ["#ramen", "#japanese", "#homemade"],
    ingredients: ["Pork bones", "Miso paste", "Ramen noodles", "Green onions", "Soft-boiled eggs"],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 3,
    user: { name: "Priya Sharma", username: "@spice_queen", avatar: "/placeholder.svg?height=40&width=40" },
    time: "6 hours ago",
    content:
      "Butter chicken that melts in your mouth! 🍛 The key is marinating the chicken overnight in yogurt and spices.",
    image: "/placeholder.svg?height=300&width=400",
    likes: 156,
    comments: [],
    rating: 4.7,
    hashtags: ["#butterchicken", "#indian", "#curry"],
    ingredients: ["Chicken", "Yogurt", "Tomatoes", "Cream", "Garam masala", "Butter"],
    isLiked: false,
    isBookmarked: false,
  },
]

export function HomePage({ user, onLogout }: HomePageProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState(initialPosts)
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({})
  const [ingredientSearch, setIngredientSearch] = useState("")
  const [notifications] = useState([
    { id: 1, type: "like", user: "John Doe", action: "liked your Pasta Carbonara recipe", time: "5 min ago" },
    { id: 2, type: "comment", user: "Sarah Wilson", action: "commented on your Pizza Margherita", time: "1 hour ago" },
    { id: 3, type: "follow", user: "Chef Marco", action: "started following you", time: "2 hours ago" },
  ])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleLike = (postId: number) => {
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

  const handleBookmark = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
  }

  const handleComment = (postId: number) => {
    const commentText = newComment[postId]
    if (commentText?.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: Date.now(),
                    user: user.username,
                    text: commentText,
                  },
                ],
              }
            : post,
        ),
      )
      setNewComment({ ...newComment, [postId]: "" })
    }
  }

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.user.name}'s Recipe`,
        text: post.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`Check out this recipe: ${post.content}`)
      alert("Recipe link copied to clipboard!")
    }
  }

  const toggleComments = (postId: number) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] })
  }

  const renderHomeContent = () => (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{post.user.name}</h4>
                  <p className="text-sm text-gray-500">{post.user.username}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {post.time}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{post.content}</p>

            <img
              src={post.image || "/placeholder.svg"}
              alt="Recipe"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {post.hashtags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs cursor-pointer hover:bg-gray-200">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${post.isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-600`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toggleComments(post.id)}>
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments.length}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleShare(post)}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={post.isBookmarked ? "text-blue-500" : "text-gray-500"}
                  onClick={() => handleBookmark(post.id)}
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold">{post.rating}</span>
              </div>
            </div>

            {showComments[post.id] && (
              <div className="border-t pt-4 mt-4">
                <div className="space-y-3 mb-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <span className="font-semibold text-sm">{comment.user}</span>
                        <p className="text-sm text-gray-600">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                    onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                  />
                  <Button size="sm" onClick={() => handleComment(post.id)}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 mt-4"
              onClick={() => alert(`Ingredients: ${post.ingredients.join(", ")}`)}
            >
              <ChefHat className="w-4 h-4 mr-2" />
              View Ingredients & Recipe
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderCookingContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">🍳 Recipe Matching</h3>
          <p className="text-gray-600">Enter ingredients you have, and we'll suggest recipes!</p>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Enter ingredients (e.g., chicken, tomatoes, onions)"
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
            />
            <Button onClick={() => alert(`Searching recipes with: ${ingredientSearch}`)}>Search Recipes</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">🍝 Pasta Carbonara</h4>
              <p className="text-sm text-gray-600 mb-2">Matches: eggs, cheese, pasta</p>
              <Badge variant="secondary">95% match</Badge>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">🍲 Chicken Stir Fry</h4>
              <p className="text-sm text-gray-600 mb-2">Matches: chicken, vegetables</p>
              <Badge variant="secondary">87% match</Badge>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsContent = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">🔔 Notifications</h3>
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  notification.type === "like"
                    ? "bg-red-500"
                    : notification.type === "comment"
                      ? "bg-blue-500"
                      : "bg-green-500"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user}</span> {notification.action}
                </p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderProfileContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="text-2xl">{user.username?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.accountName || user.username}</h2>
              <p className="text-gray-600">@{user.username}</p>
              <p className="text-sm text-gray-500 mt-2">Passionate home cook sharing family recipes 👨‍🍳</p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1.2K</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">234</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                4.8
              </div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Button className="flex-1">
          <Plus className="w-4 h-4 mr-2" />
          New Recipe
        </Button>
        <Button variant="outline">Saved Recipes</Button>
        <Button variant="outline">Photos</Button>
        <Button variant="outline">Videos</Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <button
                onClick={() => handleTabClick("home")}
                className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors cursor-pointer"
              >
                GlobalKitchen
              </button>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search recipes, users, #hashtags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && alert(`Searching for: ${searchQuery}`)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTabClick("home")}
              >
                <Home className="w-4 h-4" />
              </Button>
              <Button
                variant={activeTab === "cooking" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTabClick("cooking")}
                className={activeTab === "cooking" ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
              >
                <ChefHat className="w-4 h-4" />
              </Button>
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTabClick("notifications")}
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTabClick("profile")}
              >
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          {activeTab === "home" && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.accountName || user.username}</h3>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Posts</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Followers</span>
                      <span className="font-semibold">1.2K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Following</span>
                      <span className="font-semibold">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold ml-1">4.8</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content Area */}
          <div className={activeTab === "home" ? "lg:col-span-2" : "lg:col-span-3"}>
            {activeTab === "home" && renderHomeContent()}
            {activeTab === "cooking" && renderCookingContent()}
            {activeTab === "notifications" && renderNotificationsContent()}
            {activeTab === "profile" && renderProfileContent()}
          </div>
        </div>
      </main>
    </div>
  )
}
