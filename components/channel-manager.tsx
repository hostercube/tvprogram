"use client"

import type React from "react"

import { useState } from "react"
import type { Channel, Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface ChannelManagerProps {
  channels: Channel[]
  categories: Category[]
}

export default function ChannelManager({ channels: initialChannels, categories }: ChannelManagerProps) {
  const [channels, setChannels] = useState(initialChannels)
  const [isAddingChannel, setIsAddingChannel] = useState(false)
  const [editingChannel, setEditingChannel] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
    stream_url: "",
    stream_type: "hls" as "hls" | "m3u" | "embed",
    embed_code: "",
    category: "",
    is_active: true,
    sort_order: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingChannel) {
        // Update existing channel
        const { error } = await supabase.from("channels").update(formData).eq("id", editingChannel)

        if (!error) {
          setChannels(channels.map((c) => (c.id === editingChannel ? { ...c, ...formData } : c)))
          setEditingChannel(null)
        }
      } else {
        // Add new channel
        const { data, error } = await supabase.from("channels").insert([formData]).select().single()

        if (!error && data) {
          setChannels([data, ...channels])
          setIsAddingChannel(false)
        }
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        logo_url: "",
        stream_url: "",
        stream_type: "hls",
        embed_code: "",
        category: "",
        is_active: true,
        sort_order: 0,
      })
    } catch (error) {
      console.error("Error saving channel:", error)
    }
  }

  const handleEdit = (channel: Channel) => {
    setFormData({
      name: channel.name,
      description: channel.description || "",
      logo_url: channel.logo_url || "",
      stream_url: channel.stream_url,
      stream_type: channel.stream_type,
      embed_code: channel.embed_code || "",
      category: channel.category || "",
      is_active: channel.is_active,
      sort_order: channel.sort_order,
    })
    setEditingChannel(channel.id)
  }

  const handleDelete = async (channelId: string) => {
    if (confirm("আপনি কি নিশ্চিত যে এই চ্যানেলটি মুছে ফেলতে চান?")) {
      const { error } = await supabase.from("channels").delete().eq("id", channelId)

      if (!error) {
        setChannels(channels.filter((c) => c.id !== channelId))
      }
    }
  }

  const renderForm = () => (
    <Card className="bg-white/10 border-white/20 mb-6">
      <CardHeader>
        <CardTitle className="text-white">{editingChannel ? "চ্যানেল সম্পাদনা" : "নতুন চ্যানেল যোগ করুন"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">
                চ্যানেলের নাম *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-white">
                ক্যাটেগরি
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-white">
              বিবরণ
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div>
            <Label htmlFor="logo_url" className="text-white">
              লোগো URL
            </Label>
            <Input
              id="logo_url"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div>
            <Label htmlFor="stream_type" className="text-white">
              স্ট্রিম টাইপ *
            </Label>
            <Select
              value={formData.stream_type}
              onValueChange={(value: "hls" | "m3u" | "embed") => setFormData({ ...formData, stream_type: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hls">HLS Stream</SelectItem>
                <SelectItem value="m3u">M3U Playlist</SelectItem>
                <SelectItem value="embed">Embed Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.stream_type === "embed" ? (
            <div>
              <Label htmlFor="embed_code" className="text-white">
                Embed Code *
              </Label>
              <Textarea
                id="embed_code"
                value={formData.embed_code}
                onChange={(e) => setFormData({ ...formData, embed_code: e.target.value })}
                required={formData.stream_type === "embed"}
                className="bg-white/10 border-white/20 text-white"
                rows={4}
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="stream_url" className="text-white">
                স্ট্রিম URL *
              </Label>
              <Input
                id="stream_url"
                value={formData.stream_url}
                onChange={(e) => setFormData({ ...formData, stream_url: e.target.value })}
                required={formData.stream_type !== "embed"}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          )}

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active" className="text-white">
                সক্রিয়
              </Label>
            </div>
            <div>
              <Label htmlFor="sort_order" className="text-white">
                সাজানোর ক্রম
              </Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: Number.parseInt(e.target.value) || 0 })}
                className="bg-white/10 border-white/20 text-white w-20"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              সংরক্ষণ করুন
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddingChannel(false)
                setEditingChannel(null)
                setFormData({
                  name: "",
                  description: "",
                  logo_url: "",
                  stream_url: "",
                  stream_type: "hls",
                  embed_code: "",
                  category: "",
                  is_active: true,
                  sort_order: 0,
                })
              }}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4 mr-2" />
              বাতিল
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">চ্যানেল ম্যানেজমেন্ট</h2>
        {!isAddingChannel && !editingChannel && (
          <Button onClick={() => setIsAddingChannel(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            নতুন চ্যানেল
          </Button>
        )}
      </div>

      {(isAddingChannel || editingChannel) && renderForm()}

      <div className="grid gap-4">
        {channels.map((channel) => (
          <Card key={channel.id} className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    {channel.logo_url && (
                      <img
                        src={channel.logo_url || "/placeholder.svg"}
                        alt={channel.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">{channel.name}</h3>
                      <p className="text-gray-400 text-sm">{channel.category}</p>
                      <p className="text-gray-500 text-xs">
                        {channel.stream_type.toUpperCase()} • {channel.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(channel)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(channel.id)}
                    className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
