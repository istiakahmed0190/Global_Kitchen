"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, MessageCircle, User, Settings, Plus, LogOut } from "lucide-react"

interface SidebarProps {
  user: any
  activeView: string
  setActiveView: (view: string) => void
  onCreatePost: () => void
  onLogout: () => void
}

export function Sidebar({ user, activeView, setActiveView, onCreatePost, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "feed", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* User Info as Profile Button */}
        <Button
          variant="ghost"
          className="w-full h-auto mb-6 p-4 bg-gray-50 rounded-lg flex flex-col items-start justify-start text-left hover:bg-gray-100"
          onClick={() => setActiveView("profile")}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
              <AvatarFallback>{user.displayName?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{user.displayName}</h3>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-sm w-full">
            <div>
              <div className="font-semibold text-gray-900">{user.posts}</div>
              <div className="text-gray-500">Posts</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{user.followers}</div>
              <div className="text-gray-500">Followers</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{user.following}</div>
              <div className="text-gray-500">Following</div>
            </div>
          </div>
        </Button>

        {/* Create Post Button */}
        <Button onClick={onCreatePost} className="w-full mb-6 bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="w-4 h-4" />
          Create
        </Button>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  activeView === item.id
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveView(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}
