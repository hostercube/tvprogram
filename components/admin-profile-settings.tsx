"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Save } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface AdminProfileSettingsProps {
  user: User
}

export default function AdminProfileSettings({ user }: AdminProfileSettingsProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    if (newPassword !== confirmPassword) {
      setError("নতুন পাসওয়ার্ড মিলছে না")
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (err) {
      setError("একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5" />
          প্রোফাইল সেটিংস
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-white">ইমেইল ঠিকানা</Label>
          <Input value={user.email || ""} disabled className="bg-white/5 border-white/10 text-gray-400" />
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <h3 className="text-lg font-semibold text-white">পাসওয়ার্ড পরিবর্তন</h3>

          <div>
            <Label htmlFor="currentPassword" className="text-white">
              বর্তমান পাসওয়ার্ড
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div>
            <Label htmlFor="newPassword" className="text-white">
              নতুন পাসওয়ার্ড
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-white">
              নতুন পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          {error && (
            <Alert className="bg-red-500/20 border-red-500/50">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="bg-green-500/20 border-green-500/50">
              <AlertDescription className="text-green-400">{message}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading || !newPassword || !confirmPassword}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "আপডেট হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন করুন"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
