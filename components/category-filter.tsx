"use client"

import { useState, useEffect, useRef } from "react"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRemoteNavigation } from "@/hooks/use-remote-navigation"

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [focusedIndex, setFocusedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const allCategories = [{ id: "all", name: "সব চ্যানেল" }, ...categories.map((c) => ({ id: c.id, name: c.name }))]

  const { isNavigating } = useRemoteNavigation({
    onLeft: () => {
      const newIndex = Math.max(0, focusedIndex - 1)
      setFocusedIndex(newIndex)
    },
    onRight: () => {
      const newIndex = Math.min(allCategories.length - 1, focusedIndex + 1)
      setFocusedIndex(newIndex)
    },
    onEnter: () => {
      const category = allCategories[focusedIndex]
      setSelectedCategory(category.id === "all" ? "all" : category.name)
    },
  })

  useEffect(() => {
    const buttons = containerRef.current?.querySelectorAll("button")
    if (buttons && buttons[focusedIndex]) {
      buttons[focusedIndex].focus()
    }
  }, [focusedIndex])

  return (
    <div className="mb-8">
      <div ref={containerRef} className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "transition-all duration-200",
            selectedCategory === "all"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-white/10 hover:bg-white/20 text-white border-white/20",
            focusedIndex === 0 && "ring-2 ring-purple-400",
          )}
          tabIndex={focusedIndex === 0 ? 0 : -1}
        >
          সব চ্যানেল
        </Button>
        {categories.map((category, index) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.name ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.name)}
            className={cn(
              "transition-all duration-200",
              selectedCategory === category.name
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20",
              focusedIndex === index + 1 && "ring-2 ring-purple-400",
            )}
            tabIndex={focusedIndex === index + 1 ? 0 : -1}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
