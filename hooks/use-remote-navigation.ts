"use client"

import { useEffect, useRef, useState } from "react"

interface NavigationOptions {
  onEnter?: () => void
  onBack?: () => void
  onUp?: () => void
  onDown?: () => void
  onLeft?: () => void
  onRight?: () => void
  onChannelUp?: () => void
  onChannelDown?: () => void
  onVolumeUp?: () => void
  onVolumeDown?: () => void
  onMute?: () => void
  onPlay?: () => void
  onPause?: () => void
  onStop?: () => void
  onMenu?: () => void
  onHome?: () => void
  onInfo?: () => void
}

export function useRemoteNavigation(options: NavigationOptions = {}) {
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setIsNavigating(true)

      // Prevent default behavior for navigation keys
      const navigationKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
        "Space",
        "Escape",
        "Backspace",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ]

      if (navigationKeys.includes(event.key)) {
        event.preventDefault()
      }

      switch (event.key) {
        case "ArrowUp":
          options.onUp?.()
          break
        case "ArrowDown":
          options.onDown?.()
          break
        case "ArrowLeft":
          options.onLeft?.()
          break
        case "ArrowRight":
          options.onRight?.()
          break
        case "Enter":
        case " ": // Space bar
          options.onEnter?.()
          break
        case "Escape":
        case "Backspace":
          options.onBack?.()
          break
        case "PageUp":
        case "ChannelUp":
          options.onChannelUp?.()
          break
        case "PageDown":
        case "ChannelDown":
          options.onChannelDown?.()
          break
        case "+":
        case "=":
          options.onVolumeUp?.()
          break
        case "-":
        case "_":
          options.onVolumeDown?.()
          break
        case "m":
        case "M":
          options.onMute?.()
          break
        case "p":
        case "P":
          options.onPlay?.()
          break
        case "s":
        case "S":
          options.onStop?.()
          break
        case "h":
        case "H":
          options.onHome?.()
          break
        case "i":
        case "I":
          options.onInfo?.()
          break
        case "Menu":
          options.onMenu?.()
          break
      }
    }

    const handleKeyUp = () => {
      setIsNavigating(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [options])

  return { isNavigating }
}

export function useFocusManagement() {
  const focusableElements = useRef<HTMLElement[]>([])
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0)

  const registerFocusable = (element: HTMLElement | null) => {
    if (element && !focusableElements.current.includes(element)) {
      focusableElements.current.push(element)
    }
  }

  const unregisterFocusable = (element: HTMLElement | null) => {
    if (element) {
      const index = focusableElements.current.indexOf(element)
      if (index > -1) {
        focusableElements.current.splice(index, 1)
      }
    }
  }

  const focusNext = () => {
    const nextIndex = (currentFocusIndex + 1) % focusableElements.current.length
    setCurrentFocusIndex(nextIndex)
    focusableElements.current[nextIndex]?.focus()
  }

  const focusPrevious = () => {
    const prevIndex = currentFocusIndex === 0 ? focusableElements.current.length - 1 : currentFocusIndex - 1
    setCurrentFocusIndex(prevIndex)
    focusableElements.current[prevIndex]?.focus()
  }

  const focusElement = (index: number) => {
    if (index >= 0 && index < focusableElements.current.length) {
      setCurrentFocusIndex(index)
      focusableElements.current[index]?.focus()
    }
  }

  return {
    registerFocusable,
    unregisterFocusable,
    focusNext,
    focusPrevious,
    focusElement,
    currentFocusIndex,
    totalElements: focusableElements.current.length,
  }
}
