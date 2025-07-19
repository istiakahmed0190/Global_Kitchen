"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Clock,
  Users,
  ChefHat,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PostCardProps {
  post: any
  currentUser: any
  onLike: (postId: number) => void
  onBookmark: (postId: number) => void
  onComment: (postId: number, comment: string) => void
}

export function PostCard({ post, currentUser, onLike, onBookmark, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [showRecipe, setShowRecipe] = useState(false)

  const handleComment = (e: React.FormEvent) => {
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
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.displayName} />
              <AvatarFallback>{post.author.displayName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-1">
                <h4 className="font-semibold text-gray-900">{post.author.displayName}</h4>
                {post.author.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
              </div>
              <p className="text-sm text-gray-500">
                @{post.author.username} • {post.timestamp}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Follow @{post.author.username}</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        <p className="text-gray-900 leading-relaxed">{post.content}</p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2">
          {post.hashtags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs cursor-pointer hover:bg-gray-200">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="rounded-lg overflow-hidden">
            <img src={post.images[0] || "/placeholder.svg"} alt="Recipe" className="w-full h-64 object-cover" />
          </div>
        )}

        {/* Recipe Card */}
        {post.recipe && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <ChefHat className="w-4 h-4 mr-2 text-orange-500" />
                {post.recipe.title}
              </h3>
              <Badge variant="outline" className="text-orange-600 border-orange-300">
                {post.recipe.cuisine}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {post.recipe.cookTime}
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {post.recipe.servings} servings
              </div>
              <div>
                <span className="font-medium">{post.recipe.difficulty}</span>
              </div>
            </div>

            {showRecipe && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Ingredients:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {post.recipe.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 text-orange-600 border-orange-300 hover:bg-orange-100"
              onClick={() => setShowRecipe(!showRecipe)}
            >
              {showRecipe ? "Hide Recipe" : "View Full Recipe"}
            </Button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`${post.isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-600`}
              onClick={() => onLike(post.id)}
            >
              <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
              {post.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-600"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-1" />
              {post.shares}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`${post.isBookmarked ? "text-blue-500" : "text-gray-500"} hover:text-blue-600`}
            onClick={() => onBookmark(post.id)}
          >
            <Bookmark className={`w-4 h-4 ${post.isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 pt-3 border-t">
            <form onSubmit={handleComment} className="flex space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.displayName} />
                <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={!newComment.trim()}>
                  Post
                </Button>
              </div>
            </form>

            {/* Sample comments */}
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">john_doe</span> This looks absolutely delicious! 😍
                  </p>
                  <p className="text-xs text-gray-500">2h</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
