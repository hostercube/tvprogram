"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import type { Channel } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Tv } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChannelCardProps {
  channel: Channel
  onSelect: (channel: Channel) => void
  isFocused?: boolean
  tabIndex?: number
}

export default function ChannelCard({ channel, onSelect, isFocused, tabIndex }: ChannelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.focus()
    }
  }, [isFocused])

  const handleClick = () => {
    onSelect(channel)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onSelect(channel)
    }
  }

  return (
    <Card
      ref={cardRef}
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:scale-105",
        "bg-white/10 hover:bg-white/20 border-white/20 hover:border-purple-400",
        "focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none",
        isFocused &&
          "ring-4 ring-purple-400 ring-offset-2 ring-offset-transparent scale-105 bg-white/20 border-purple-400",
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
    >
      <CardContent className="p-4">
        <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
          {channel.logo_url ? (
            <img
              src={channel.logo_url || "/placeholder.svg"}
              alt={channel.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Tv className="h-8 w-8 text-white" />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center",
              isFocused || "group-hover:opacity-100 opacity-0",
              isFocused && "opacity-100",
            )}
          >
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>

        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{channel.name}</h3>

        {channel.category && <p className="text-gray-400 text-xs">{channel.category}</p>}
      </CardContent>
    </Card>
  )
}
