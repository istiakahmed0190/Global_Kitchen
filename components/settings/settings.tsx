"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Palette, Camera } from "lucide-react"

interface SettingsProps {
  user: any
}

export function Settings({ user }: SettingsProps) {
  const [profileData, setProfileData] = useState({
    displayName: user.displayName,
    username: user.username,
    email: user.email,
    bio: "🍳 Passionate home cook sharing family recipes from around the world",
    location: "San Francisco, CA",
    website: "myblog.com"
  })

  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    recipes: true,
    email: false,
    push: true
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    recipesPublic: true,
    showEmail: false,
    allowMessages: true
  })

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/users/me/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        console.log("Profile saved successfully!");
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  }

  const handleSaveNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/users/me/notifications/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(notifications)
      });
      
      if (response.ok) {
        console.log("Notification settings saved successfully!");
      } else {
        console.error("Failed to save notification settings");
      }
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  }

  const handleSavePrivacy = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/users/me/privacy/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(privacy)
      });
      
      if (response.ok) {
        console.log("Privacy settings saved successfully!");
      } else {
        console.error("Failed to save privacy settings");
      }
    } catch (error) {
      console.error("Error saving privacy:", error);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
                  <AvatarFallback className="text-2xl">{user.displayName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Name</label>
                  <Input
                    value={profileData.displayName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <Input
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="@username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <Input
                    value={profileData.website}
                    onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="w-full">
                Save Profile Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Likes on your recipes</span>
                  <Button
                    variant={notifications.likes ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, likes: !prev.likes }))}
                  >
                    {notifications.likes ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Comments on your recipes</span>
                  <Button
                    variant={notifications.comments ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, comments: !prev.comments }))}
                  >
                    {notifications.comments ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>New followers</span>
                  <Button
                    variant={notifications.follows ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, follows: !prev.follows }))}
                  >
                    {notifications.follows ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Recipe recommendations</span>
                  <Button
                    variant={notifications.recipes ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, recipes: !prev.recipes }))}
                  >
                    {notifications.recipes ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email notifications</span>
                  <Button
                    variant={notifications.email ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                  >
                    {notifications.email ? "On" : "Off"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Push notifications</span>
                  <Button
                    variant={notifications.push ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                  >
                    {notifications.push ? "On" : "Off"}
                  </Button>
                </div>
              </div>
              <Button onClick={handleSaveNotifications} className="w-full">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Public profile</span>
                  <Button
                    variant={privacy.profilePublic ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPrivacy(prev => ({ ...prev, profilePublic: !prev.profilePublic }))}
                  >
                    {privacy.profilePublic ? "Public" : "Private"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Public recipes</span>
                  <Button
                    variant={privacy.recipesPublic ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPrivacy(prev => ({ ...prev, recipesPublic: !prev.recipesPublic }))}
                  >
                    {privacy.recipesPublic ? "Public" : "Private"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Show email address</span>
                  <Button
                    variant={privacy.showEmail ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPrivacy(prev => ({ ...prev, showEmail: !prev.showEmail }))}
                  >
                    {privacy.showEmail ? "Visible" : "Hidden"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Allow direct messages</span>
                  <Button
                    variant={privacy.allowMessages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPrivacy(prev => ({ ...prev, allowMessages: !prev.allowMessages }))}
                  >
                    {privacy.allowMessages ? "Allow" : "Block"}
                  </Button>
                </div>
              </div>
              <Button onClick={handleSavePrivacy} className="w-full">
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">Light</Button>
                    <Button variant="outline" size="sm">Dark</Button>
                    <Button variant="outline" size="sm">Auto</Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Color Scheme</label>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded cursor-pointer"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded cursor-pointer"></div>
                  </div>
                </div>
              </div>
              <Button className="w-full">Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
