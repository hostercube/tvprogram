"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Gamepad2 } from "lucide-react"

export default function RemoteNavigationGuide() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show guide on first visit
    const hasSeenGuide = localStorage.getItem("tv-app-remote-guide")
    if (!hasSeenGuide) {
      setIsVisible(true)
    }

    // Show guide when 'h' or 'H' is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") {
        setIsVisible(true)
      }
      if (e.key === "Escape") {
        setIsVisible(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("tv-app-remote-guide", "seen")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-slate-800 to-purple-900 border-purple-500/50 max-w-2xl w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">রিমোট কন্ট্রোল গাইড</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-300">নেভিগেশন</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>↑ ↓ ← →</span>
                  <span>চ্যানেল নেভিগেট</span>
                </div>
                <div className="flex justify-between">
                  <span>Enter / Space</span>
                  <span>চ্যানেল সিলেক্ট</span>
                </div>
                <div className="flex justify-between">
                  <span>Escape / Back</span>
                  <span>পেছনে যান</span>
                </div>
                <div className="flex justify-between">
                  <span>Page Up/Down</span>
                  <span>চ্যানেল পরিবর্তন</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-300">প্লেয়ার কন্ট্রোল</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Space</span>
                  <span>প্লে/পজ</span>
                </div>
                <div className="flex justify-between">
                  <span>M</span>
                  <span>মিউট/আনমিউট</span>
                </div>
                <div className="flex justify-between">
                  <span>F</span>
                  <span>ফুলস্ক্রিন</span>
                </div>
                <div className="flex justify-between">
                  <span>+ / -</span>
                  <span>ভলিউম</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-300">শর্টকাট</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>H</span>
                  <span>হেল্প দেখান</span>
                </div>
                <div className="flex justify-between">
                  <span>Home</span>
                  <span>হোম পেজ</span>
                </div>
                <div className="flex justify-between">
                  <span>I</span>
                  <span>চ্যানেল ইনফো</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-300">টিপস</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• সব বাটন রিমোট দিয়ে কাজ করে</p>
                <p>• ফোকাস দেখার জন্য হাইলাইট দেখুন</p>
                <p>• যেকোনো সময় H চাপুন হেল্পের জন্য</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button onClick={handleClose} className="bg-purple-600 hover:bg-purple-700">
              বুঝেছি
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
