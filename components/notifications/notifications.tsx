"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, UserPlus, ChefHat, Star, Share2, Settings, Check, X } from "lucide-react"

interface NotificationsProps {
  user: any
}

const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      username: "maria_chef",
      displayName: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "liked your recipe",
    target: "Spaghetti Carbonara",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      username: "kenji_kitchen",
      displayName: "Kenji Tanaka",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "commented on your recipe",
    target: "Homemade Ramen",
    comment: "This looks absolutely delicious! Can you share the broth recipe?",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      username: "spice_queen",
      displayName: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "started following you",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "recipe",
    user: {
      username: "pasta_master",
      displayName: "Luigi Rossi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "shared a new recipe",
    target: "Authentic Bolognese",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "rating",
    user: {
      username: "healthy_baker",
      displayName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "rated your recipe",
    target: "Chocolate Chip Cookies",
    rating: 5,
    timestamp: "3 hours ago",
    read: true,
  },
]

const followRequests = [
  {
    id: 1,
    user: {
      username: "new_chef_2024",
      displayName: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    mutualFollows: 3,
    timestamp: "1 day ago",
  },
  {
    id: 2,
    user: {
      username: "baking_enthusiast",
      displayName: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    mutualFollows: 7,
    timestamp: "2 days ago",
  },
]

export function Notifications({ user }: NotificationsProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "follow":
        return <UserPlus className="w-5 h-5 text-green-500" />
      case "recipe":
        return <ChefHat className="w-5 h-5 text-orange-500" />
      case "rating":
        return <Star className="w-5 h-5 text-yellow-500" />
      case "share":
        return <Share2 className="w-5 h-5 text-purple-500" />
      default:
        return <Heart className="w-5 h-5 text-gray-500" />
    }
  }

  const unreadCount = notificationList.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && <p className="text-sm text-gray-500">You have {unreadCount} unread notifications</p>}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && <Badge className="ml-2 bg-red-500 text-white text-xs">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="follows">Follows</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {notificationList.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors ${
                  !notification.read ? "bg-orange-50 border-orange-200" : "hover:bg-gray-50"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={notification.user.avatar || "/placeholder.svg"}
                        alt={notification.user.displayName}
                      />
                      <AvatarFallback>{notification.user.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.displayName}</span> {notification.action}
                          {notification.target && (
                            <span className="font-semibold text-orange-600"> "{notification.target}"</span>
                          )}
                          {notification.rating && (
                            <span className="ml-1">
                              {Array.from({ length: notification.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 inline text-yellow-400 fill-current" />
                              ))}
                            </span>
                          )}
                        </p>
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      </div>
                      {notification.comment && (
                        <p className="text-sm text-gray-600 mt-1 italic">"{notification.comment}"</p>
                      )}
                      {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="likes" className="mt-6">
          <div className="space-y-4">
            {notificationList
              .filter((n) => n.type === "like")
              .map((notification) => (
                <Card key={notification.id} className="hover:bg-gray-50 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-red-500" />
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={notification.user.avatar || "/placeholder.svg"}
                          alt={notification.user.displayName}
                        />
                        <AvatarFallback>{notification.user.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.displayName}</span> liked your recipe{" "}
                          <span className="font-semibold text-orange-600">"{notification.target}"</span>
                        </p>
                        <p className="text-xs text-gray-500">{notification.timestamp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          <div className="space-y-4">
            {notificationList
              .filter((n) => n.type === "comment")
              .map((notification) => (
                <Card key={notification.id} className="hover:bg-gray-50 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-blue-500 mt-1" />
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={notification.user.avatar || "/placeholder.svg"}
                          alt={notification.user.displayName}
                        />
                        <AvatarFallback>{notification.user.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.displayName}</span> commented on{" "}
                          <span className="font-semibold text-orange-600">"{notification.target}"</span>
                        </p>
                        {notification.comment && (
                          <p className="text-sm text-gray-600 mt-1 italic">"{notification.comment}"</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="follows" className="mt-6">
          <div className="space-y-6">
            {/* Follow Requests */}
            {followRequests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Follow Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {followRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.displayName} />
                          <AvatarFallback>{request.user.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-sm">{request.user.displayName}</h4>
                          <p className="text-xs text-gray-500">@{request.user.username}</p>
                          <p className="text-xs text-gray-400">
                            {request.mutualFollows} mutual connections • {request.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Check className="w-3 h-3 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          <X className="w-3 h-3 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Follow Notifications */}
            <div className="space-y-4">
              {notificationList
                .filter((n) => n.type === "follow")
                .map((notification) => (
                  <Card key={notification.id} className="hover:bg-gray-50 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <UserPlus className="w-5 h-5 text-green-500" />
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={notification.user.avatar || "/placeholder.svg"}
                              alt={notification.user.displayName}
                            />
                            <AvatarFallback>{notification.user.displayName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">
                              <span className="font-semibold">{notification.user.displayName}</span> started following
                              you
                            </p>
                            <p className="text-xs text-gray-500">{notification.timestamp}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Follow Back
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
