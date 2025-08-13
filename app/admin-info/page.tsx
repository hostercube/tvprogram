import { AdminCredentials } from "@/components/admin-credentials"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings } from "lucide-react"

export default function AdminInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel Access</h1>
          <p className="text-slate-300">Default credentials for admin panel access</p>
        </div>

        <AdminCredentials />

        <div className="text-center mt-8">
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Settings className="h-4 w-4 mr-2" />
              Go to Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
