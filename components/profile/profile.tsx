"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, LinkIcon, Grid3X3, Bookmark, ChefHat, Star, MessageCircle, Heart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Camera, Eye } from "lucide-react"

interface ProfileProps {
  user: any
}

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

export function Profile({ user }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleViewProfilePicture = () => {
    alert("Viewing profile picture!")
    // In a real application, you would open a modal or a new page with the full-size profile picture.
  }

  const handleChangeProfilePicture = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      alert(`Selected file: ${file.name}. In a real app, this would be uploaded.`)
      // Here you would typically upload the file to a storage service and update the user's avatar URL.
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-32 w-32 cursor-pointer">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
                  <AvatarFallback className="text-4xl">{user.displayName[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start" forceMount>
                <DropdownMenuItem onClick={handleViewProfilePicture}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>See profile picture</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleChangeProfilePicture}>
                  <Camera className="mr-2 h-4 w-4" />
                  <span>Change profile picture</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Remove profile picture</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="sr-only" accept="image/*" />

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.displayName}</h1>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
                <div className="flex space-x-2">
                  {/* Removed Edit Profile Button */}
                  <Button>Share Profile</Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.posts}</div>
                  <div className="text-sm text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.followers}</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.following}</div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    4.8
                  </div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <p className="text-gray-900">
                  🍳 Passionate home cook sharing family recipes from around the world
                  <br />📍 Based in San Francisco, CA
                  <br />🌟 Specializing in Mediterranean & Asian fusion
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined March 2023
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-1" />
                    <a href="#" className="text-orange-600 hover:underline">
                      myblog.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Mediterranean</Badge>
                <Badge variant="secondary">Asian Fusion</Badge>
                <Badge variant="secondary">Vegetarian</Badge>
                <Badge variant="secondary">Baking</Badge>
                <Badge variant="secondary">Healthy Cooking</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 gap-2">
          <TabsTrigger value="posts" className="flex items-center">
            <Grid3X3 className="w-4 h-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="recipes" className="flex items-center">
            <ChefHat className="w-4 h-4 mr-2" />
            Recipes
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPosts.map((post) => (
              <div key={post.id} className="relative group cursor-pointer">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Recipe post"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-4 text-white">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="mt-6">
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recipe Collection</h3>
            <p className="text-gray-500 mb-4">Your organized recipe collection will appear here</p>
            <Button>Create Recipe Collection</Button>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Recipes</h3>
            <p className="text-gray-500">Recipes you've bookmarked will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
