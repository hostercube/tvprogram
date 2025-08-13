"use client"

import type React from "react"

import { useState } from "react"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface CategoryManagerProps {
  categories: Category[]
}

export default function CategoryManager({ categories: initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    sort_order: 0,
    is_active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingCategory) {
        // Update existing category
        const { error } = await supabase.from("categories").update(formData).eq("id", editingCategory)

        if (!error) {
          setCategories(categories.map((c) => (c.id === editingCategory ? { ...c, ...formData } : c)))
          setEditingCategory(null)
        }
      } else {
        // Add new category
        const { data, error } = await supabase.from("categories").insert([formData]).select().single()

        if (!error && data) {
          setCategories([...categories, data])
          setIsAddingCategory(false)
        }
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        icon: "",
        sort_order: 0,
        is_active: true,
      })
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
      sort_order: category.sort_order,
      is_active: category.is_active,
    })
    setEditingCategory(category.id)
  }

  const handleDelete = async (categoryId: string) => {
    if (confirm("আপনি কি নিশ্চিত যে এই ক্যাটেগরিটি মুছে ফেলতে চান?")) {
      const { error } = await supabase.from("categories").delete().eq("id", categoryId)

      if (!error) {
        setCategories(categories.filter((c) => c.id !== categoryId))
      }
    }
  }

  const renderForm = () => (
    <Card className="bg-white/10 border-white/20 mb-6">
      <CardHeader>
        <CardTitle className="text-white">{editingCategory ? "ক্যাটেগরি সম্পাদনা" : "নতুন ক্যাটেগরি যোগ করুন"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">
                ক্যাটেগরির নাম *
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
              <Label htmlFor="icon" className="text-white">
                আইকন
              </Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="tv, music, film, etc."
                className="bg-white/10 border-white/20 text-white"
              />
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
                setIsAddingCategory(false)
                setEditingCategory(null)
                setFormData({
                  name: "",
                  description: "",
                  icon: "",
                  sort_order: 0,
                  is_active: true,
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
        <h2 className="text-2xl font-bold text-white">ক্যাটেগরি ম্যানেজমেন্ট</h2>
        {!isAddingCategory && !editingCategory && (
          <Button onClick={() => setIsAddingCategory(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            নতুন ক্যাটেগরি
          </Button>
        )}
      </div>

      {(isAddingCategory || editingCategory) && renderForm()}

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                  <p className="text-gray-500 text-xs">
                    ক্রম: {category.sort_order} • {category.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(category)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
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
