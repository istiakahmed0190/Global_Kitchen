"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Send, MoreHorizontal, Phone, Video, Info } from "lucide-react"

interface MessagesProps {
  user: any
}

const conversations = [
  {
    id: 1,
    user: {
      username: "maria_chef",
      displayName: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "Thanks for the recipe tip! 🍝",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    user: {
      username: "kenji_kitchen",
      displayName: "Kenji Tanaka",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "The ramen broth recipe was amazing!",
    timestamp: "1h ago",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    user: {
      username: "spice_queen",
      displayName: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    lastMessage: "Can you share the spice blend recipe?",
    timestamp: "3h ago",
    unread: 1,
    online: true,
  },
]

const messages = [
  {
    id: 1,
    sender: "maria_chef",
    content: "Hey! I saw your pasta carbonara post. It looks incredible! 🍝",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "current_user",
    content: "Thank you so much! It's my grandmother's recipe. The secret is using fresh eggs and good parmesan.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "maria_chef",
    content: "That's amazing! Family recipes are the best. Would you mind sharing the exact measurements?",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "current_user",
    content: "Of course! I'll send you the full recipe. It's perfect for 4 people.",
    timestamp: "10:36 AM",
    isOwn: true,
  },
  {
    id: 5,
    sender: "maria_chef",
    content: "Thanks for the recipe tip! 🍝",
    timestamp: "10:38 AM",
    isOwn: false,
  },
]

export function Messages({ user }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation.id === conversation.id ? "bg-orange-50 border-r-2 border-r-orange-500" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={conversation.user.avatar || "/placeholder.svg"}
                      alt={conversation.user.displayName}
                    />
                    <AvatarFallback>{conversation.user.displayName[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.user.displayName}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <Badge className="bg-orange-500 text-white text-xs">{conversation.unread}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={selectedConversation.user.avatar || "/placeholder.svg"}
                  alt={selectedConversation.user.displayName}
                />
                <AvatarFallback>{selectedConversation.user.displayName[0]}</AvatarFallback>
              </Avatar>
              {selectedConversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedConversation.user.displayName}</h3>
              <p className="text-sm text-gray-500">{selectedConversation.online ? "Active now" : "Last seen 1h ago"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Info className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isOwn ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? "text-orange-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
