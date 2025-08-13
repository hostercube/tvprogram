"use client"

import { useState } from "react"
import { Menu, Settings, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TV</span>
            </div>
            <span className="text-white text-xl font-bold hidden md:block">স্মার্ট টিভি</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-purple-300 transition-colors">
              হোম
            </Link>
            <Link href="/categories" className="text-white hover:text-purple-300 transition-colors">
              ক্যাটেগরি
            </Link>
            <Link href="/favorites" className="text-white hover:text-purple-300 transition-colors">
              পছন্দের
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-white hover:text-purple-300 transition-colors py-2">
                হোম
              </Link>
              <Link href="/categories" className="text-white hover:text-purple-300 transition-colors py-2">
                ক্যাটেগরি
              </Link>
              <Link href="/favorites" className="text-white hover:text-purple-300 transition-colors py-2">
                পছন্দের
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
