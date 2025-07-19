"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Users, ChefHat, Filter, Clock, Star } from "lucide-react"

interface ExploreProps {
  user: any
}

const trendingRecipes = [
  {
    id: 1,
    title: "Viral TikTok Pasta",
    author: "pasta_queen",
    image: "/placeholder.svg?height=200&width=300",
    likes: 12500,
    cookTime: "15 min",
    difficulty: "Easy",
    trending: true,
  },
  {
    id: 2,
    title: "Korean Corn Dogs",
    author: "seoul_kitchen",
    image: "/placeholder.svg?height=200&width=300",
    likes: 8900,
    cookTime: "30 min",
    difficulty: "Medium",
    trending: true,
  },
  {
    id: 3,
    title: "Cloud Bread",
    author: "healthy_baker",
    image: "/placeholder.svg?height=200&width=300",
    likes: 15600,
    cookTime: "45 min",
    difficulty: "Easy",
    trending: true,
  },
]

const featuredChefs = [
  {
    id: 1,
    username: "gordon_chef",
    displayName: "Gordon Ramsay",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: "2.1M",
    specialty: "British Cuisine",
    verified: true,
  },
  {
    id: 2,
    username: "julia_kitchen",
    displayName: "Julia Child",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: "890K",
    specialty: "French Cuisine",
    verified: true,
  },
  {
    id: 3,
    username: "anthony_travels",
    displayName: "Anthony Bourdain",
    avatar: "/placeholder.svg?height=60&width=60",
    followers: "1.5M",
    specialty: "World Cuisine",
    verified: true,
  },
]

const categories = [
  { name: "Italian", count: "2.3K recipes", color: "bg-red-100 text-red-700" },
  { name: "Asian", count: "1.8K recipes", color: "bg-yellow-100 text-yellow-700" },
  { name: "Mexican", count: "1.5K recipes", color: "bg-green-100 text-green-700" },
  { name: "Mediterranean", count: "1.2K recipes", color: "bg-blue-100 text-blue-700" },
  { name: "Indian", count: "1.1K recipes", color: "bg-orange-100 text-orange-700" },
  { name: "French", count: "950 recipes", color: "bg-purple-100 text-purple-700" },
]

export function Explore({ user }: ExploreProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("trending")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search recipes, ingredients, chefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Cuisines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform ${category.color}`}
              >
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm opacity-80">{category.count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending" className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="chefs" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Featured Chefs
          </TabsTrigger>
          <TabsTrigger value="recipes" className="flex items-center">
            <ChefHat className="w-4 h-4 mr-2" />
            Latest Recipes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  {recipe.trending && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">by @{recipe.author}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {recipe.cookTime}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-400" />
                      {recipe.likes.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chefs" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChefs.map((chef) => (
              <Card key={chef.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <img
                    src={chef.avatar || "/placeholder.svg"}
                    alt={chef.displayName}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{chef.displayName}</h3>
                  <p className="text-gray-600 mb-2">@{chef.username}</p>
                  <p className="text-sm text-gray-500 mb-3">{chef.specialty}</p>
                  <p className="text-sm font-medium text-gray-700 mb-4">{chef.followers} followers</p>
                  <Button className="w-full">Follow</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="mt-6">
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Latest Recipes</h3>
            <p className="text-gray-500">Discover the newest recipes from our community</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
