"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, ImageIcon, Video, ChefHat, Plus, Minus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreatePostProps {
  user: any
  onClose: () => void
  onPost: () => void
}

export function CreatePost({ user, onClose, onPost }: CreatePostProps) {
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
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }))
  }

  const removeIngredient = (index: number) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const updateIngredient = (index: number, value: string) => {
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

  const removeInstruction = (index: number) => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => (i === index ? value : inst)),
    }))
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedPhoto(event.target.files[0])
      setSelectedVideo(null) // Clear video if photo is selected
    }
  }

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedVideo(event.target.files[0])
      setSelectedPhoto(null) // Clear photo if video is selected
    }
  }

  const handlePost = async () => {
    if (!postContent.trim()) return

    setIsPosting(true)
    // Simulate API call
    console.log("Posting content:", postContent)
    if (selectedPhoto) console.log("Photo:", selectedPhoto.name)
    if (selectedVideo) console.log("Video:", selectedVideo.name)
    if (showRecipeForm) console.log("Recipe Data:", recipeData)
    console.log("Hashtags:", hashtags)

    setTimeout(() => {
      onPost()
      setIsPosting(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <ChefHat className="w-5 h-5 text-orange-500" />
            <span>Create Recipe Post</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
              <AvatarFallback>{user.displayName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{user.displayName}</h4>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Post Content */}
          <Textarea
            placeholder="Share your culinary creation! What's cooking today?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[120px] resize-none"
          />

          {/* Media Upload */}
          <div className="flex space-x-2">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <div className="flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {selectedPhoto ? "Photo Selected" : "Add Photo"}
                </div>
              </Button>
              <input id="photo-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
            </label>
            <label htmlFor="video-upload" className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  {selectedVideo ? "Video Selected" : "Add Video"}
                </div>
              </Button>
              <input id="video-upload" type="file" accept="video/*" className="sr-only" onChange={handleVideoChange} />
            </label>
            <Button
              variant={showRecipeForm ? "default" : "outline"}
              size="sm"
              onClick={() => setShowRecipeForm(!showRecipeForm)}
            >
              <ChefHat className="w-4 h-4 mr-2" />
              {showRecipeForm ? "Hide Recipe" : "Add Recipe"}
            </Button>
          </div>

          {/* Recipe Form */}
          {showRecipeForm && (
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-700">Recipe Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Recipe Title</label>
                    <Input
                      placeholder="e.g., Grandma's Chocolate Chip Cookies"
                      value={recipeData.title}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cuisine Type</label>
                    <Input
                      placeholder="e.g., Italian, Mexican, Asian"
                      value={recipeData.cuisine}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, cuisine: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Cook Time</label>
                    <Input
                      placeholder="30 min"
                      value={recipeData.cookTime}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, cookTime: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Servings</label>
                    <Input
                      placeholder="4"
                      type="number"
                      value={recipeData.servings}
                      onChange={(e) => setRecipeData((prev) => ({ ...prev, servings: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty</label>
                    <Select
                      value={recipeData.difficulty}
                      onValueChange={(value) => setRecipeData((prev) => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Ingredients</label>
                    <Button type="button" size="sm" variant="outline" onClick={addIngredient}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recipeData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder={`Ingredient ${index + 1}`}
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                        />
                        {recipeData.ingredients.length > 1 && (
                          <Button type="button" size="sm" variant="outline" onClick={() => removeIngredient(index)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Instructions</label>
                    <Button type="button" size="sm" variant="outline" onClick={addInstruction}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add Step
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recipeData.instructions.map((instruction, index) => (
                      <div key={index} className="flex space-x-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm font-medium text-orange-700">
                          {index + 1}
                        </div>
                        <Textarea
                          placeholder={`Step ${index + 1} instructions...`}
                          value={instruction}
                          onChange={(e) => updateInstruction(index, e.target.value)}
                          className="min-h-[60px]"
                        />
                        {recipeData.instructions.length > 1 && (
                          <Button type="button" size="sm" variant="outline" onClick={() => removeInstruction(index)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hashtags */}
          <div>
            <label className="block text-sm font-medium mb-1">Hashtags</label>
            <Input
              placeholder="#delicious #homemade #recipe"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </div>

          {/* Post Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-500">{postContent.length}/2000 characters</div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handlePost}
                disabled={!postContent.trim() || isPosting}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isPosting ? "Posting..." : "Share Recipe"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
