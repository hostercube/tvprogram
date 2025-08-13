"use client"

import { Button } from "@/components/ui/button"
import { Shield, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function AdminLink() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link href="/auth/login">
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-800/80 backdrop-blur-sm border-slate-600 text-white hover:bg-slate-700 shadow-lg"
        >
          <Shield className="w-4 h-4 mr-2" />
          অ্যাডমিন লগইন
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </Link>
    </div>
  )
}
