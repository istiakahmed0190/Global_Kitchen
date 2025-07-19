"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface StoryBarProps {
  user: any
}

const sampleStories = [
  {
    id: 1,
    username: "maria_chef",
    displayName: "Maria",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
  {
    id: 2,
    username: "kenji_kitchen",
    displayName: "Kenji",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
  {
    id: 3,
    username: "spice_queen",
    displayName: "Priya",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
  {
    id: 4,
    username: "pasta_master",
    displayName: "Luigi",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
  {
    id: 5,
    username: "sushi_sensei",
    displayName: "Yuki",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: false,
  },
]

export function StoryBar({ user }: StoryBarProps) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {/* Add Story */}
        <div className="flex flex-col items-center space-y-2 flex-shrink-0">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-gray-200">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
              <AvatarFallback>{user.displayName[0]}</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-orange-500 hover:bg-orange-600 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="text-xs text-gray-600 text-center">Your Story</span>
        </div>

        {/* Stories */}
        {sampleStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer">
            <Avatar className={`h-16 w-16 border-2 ${story.hasStory ? "border-orange-500 p-0.5" : "border-gray-200"}`}>
              <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.displayName} />
              <AvatarFallback>{story.displayName[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 text-center max-w-[60px] truncate">{story.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
