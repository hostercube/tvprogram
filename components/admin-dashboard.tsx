"use client"

import { useState } from "react"
import type { User } from "@supabase/auth-helpers-nextjs"
import type { Channel, Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Tv, FolderOpen } from "lucide-react"
import { signOut } from "@/lib/actions"
import ChannelManager from "./channel-manager"
import CategoryManager from "./category-manager"
import AdminProfileSettings from "./admin-profile-settings"

interface AdminDashboardProps {
  user: User
  channels: Channel[]
  categories: Category[]
}

export default function AdminDashboard({ user, channels, categories }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">অ্যাডমিন প্যানেল</h1>
                <p className="text-gray-300 text-sm">স্বাগতম, {user.email}</p>
              </div>
            </div>
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                লগ আউট
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              ওভারভিউ
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-purple-600">
              চ্যানেল
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-purple-600">
              ক্যাটেগরি
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              সেটিংস
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">মোট চ্যানেল</CardTitle>
                  <Tv className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{channels.length}</div>
                  <p className="text-xs text-gray-400">{channels.filter((c) => c.is_active).length} টি সক্রিয়</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">ক্যাটেগরি</CardTitle>
                  <FolderOpen className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{categories.length}</div>
                  <p className="text-xs text-gray-400">{categories.filter((c) => c.is_active).length} টি সক্রিয়</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">অ্যাডমিন</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1</div>
                  <p className="text-xs text-gray-400">সক্রিয় ব্যবহারকারী</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">সাম্প্রতিক চ্যানেল</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channels.slice(0, 5).map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{channel.name}</p>
                        <p className="text-gray-400 text-sm">{channel.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{channel.stream_type.toUpperCase()}</p>
                        <p className={`text-xs ${channel.is_active ? "text-green-400" : "text-red-400"}`}>
                          {channel.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels">
            <ChannelManager channels={channels} categories={categories} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager categories={categories} />
          </TabsContent>

          <TabsContent value="settings">
            <AdminProfileSettings user={user} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
