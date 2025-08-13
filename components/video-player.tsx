"use client"

import { useEffect, useRef, useState } from "react"
import type { Channel } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { X, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  channel: Channel
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function VideoPlayer({ channel, onClose, onNext, onPrevious }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          if (isFullscreen) {
            exitFullscreen()
          } else {
            onClose()
          }
          break
        case "ArrowRight":
          e.preventDefault()
          onNext()
          break
        case "ArrowLeft":
          e.preventDefault()
          onPrevious()
          break
        case " ":
          e.preventDefault()
          togglePlayPause()
          break
        case "m":
        case "M":
          toggleMute()
          break
        case "f":
        case "F":
          toggleFullscreen()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, onClose, onNext, onPrevious])

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000)
    return () => clearTimeout(timer)
  }, [showControls])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const renderPlayer = () => {
    if (channel.stream_type === "embed" && channel.embed_code) {
      return <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: channel.embed_code }} />
    }

    return (
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls={false}
        autoPlay
        muted={isMuted}
        onError={() => setError("স্ট্রিম লোড করতে সমস্যা হচ্ছে")}
        onLoadStart={() => setError(null)}
      >
        <source src={channel.stream_url} type="application/x-mpegURL" />
        আপনার ব্রাউজার এই ভিডিও ফরম্যাট সাপোর্ট করে না।
      </video>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-bold">{channel.name}</h2>
            {channel.category && <p className="text-gray-300 text-sm">{channel.category}</p>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 relative cursor-pointer" onClick={() => setShowControls(!showControls)}>
        {error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-white text-xl mb-4">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                আবার চেষ্টা করুন
              </Button>
            </div>
          </div>
        ) : (
          renderPlayer()
        )}
      </div>

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex items-center justify-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onPrevious} className="text-white hover:bg-white/20">
            <SkipBack className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={onNext} className="text-white hover:bg-white/20">
            <SkipForward className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
            {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-300 text-sm">
            নেভিগেশন: ← → (চ্যানেল পরিবর্তন) | Space (প্লে/পজ) | M (মিউট) | F (ফুলস্ক্রিন) | Esc (বন্ধ)
          </p>
        </div>
      </div>
    </div>
  )
}
