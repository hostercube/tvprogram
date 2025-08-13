"use client"

import { useState, useEffect, useRef } from "react"
import type { Channel } from "@/lib/types"
import ChannelCard from "./channel-card"
import VideoPlayer from "./video-player"
import { useRemoteNavigation } from "@/hooks/use-remote-navigation"

interface ChannelGridProps {
  channels: Channel[]
}

export default function ChannelGrid({ channels }: ChannelGridProps) {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [filteredChannels, setFilteredChannels] = useState(channels)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFilteredChannels(channels)
  }, [channels])

  const { isNavigating } = useRemoteNavigation({
    onEnter: () => {
      if (filteredChannels[focusedIndex]) {
        handleChannelSelect(filteredChannels[focusedIndex])
      }
    },
    onUp: () => {
      const cols = getGridColumns()
      const newIndex = Math.max(0, focusedIndex - cols)
      setFocusedIndex(newIndex)
    },
    onDown: () => {
      const cols = getGridColumns()
      const newIndex = Math.min(filteredChannels.length - 1, focusedIndex + cols)
      setFocusedIndex(newIndex)
    },
    onLeft: () => {
      const newIndex = Math.max(0, focusedIndex - 1)
      setFocusedIndex(newIndex)
    },
    onRight: () => {
      const newIndex = Math.min(filteredChannels.length - 1, focusedIndex + 1)
      setFocusedIndex(newIndex)
    },
    onChannelUp: () => {
      const newIndex = Math.max(0, focusedIndex - 1)
      setFocusedIndex(newIndex)
      if (filteredChannels[newIndex]) {
        handleChannelSelect(filteredChannels[newIndex])
      }
    },
    onChannelDown: () => {
      const newIndex = Math.min(filteredChannels.length - 1, focusedIndex + 1)
      setFocusedIndex(newIndex)
      if (filteredChannels[newIndex]) {
        handleChannelSelect(filteredChannels[newIndex])
      }
    },
    onHome: () => {
      setSelectedChannel(null)
      setFocusedIndex(0)
    },
  })

  const getGridColumns = () => {
    if (typeof window === "undefined") return 6
    const width = window.innerWidth
    if (width < 768) return 2
    if (width < 1024) return 3
    if (width < 1280) return 4
    return 6
  }

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel)
  }

  const handleClosePlayer = () => {
    setSelectedChannel(null)
  }

  if (selectedChannel) {
    return (
      <VideoPlayer
        channel={selectedChannel}
        onClose={handleClosePlayer}
        onNext={() => {
          const currentIndex = filteredChannels.findIndex((c) => c.id === selectedChannel.id)
          const nextIndex = (currentIndex + 1) % filteredChannels.length
          setSelectedChannel(filteredChannels[nextIndex])
          setFocusedIndex(nextIndex)
        }}
        onPrevious={() => {
          const currentIndex = filteredChannels.findIndex((c) => c.id === selectedChannel.id)
          const prevIndex = currentIndex === 0 ? filteredChannels.length - 1 : currentIndex - 1
          setSelectedChannel(filteredChannels[prevIndex])
          setFocusedIndex(prevIndex)
        }}
      />
    )
  }

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {filteredChannels.map((channel, index) => (
        <ChannelCard
          key={channel.id}
          channel={channel}
          onSelect={handleChannelSelect}
          isFocused={index === focusedIndex}
          tabIndex={index === focusedIndex ? 0 : -1}
        />
      ))}
    </div>
  )
}
