"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"

export function AdminSetupGuide() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Setup Guide</CardTitle>
          <CardDescription>Follow these steps to create your admin account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              <strong>Important:</strong> You need to create the admin user in Supabase first before logging in.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Step 1: Create Admin User in Supabase</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Go to your Supabase Dashboard → Authentication → Users → Add User
              </p>
              <div className="bg-muted p-3 rounded-md">
                <p>
                  <strong>Email:</strong> admin@tvapp.com
                </p>
                <p>
                  <strong>Password:</strong> admin123
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard("admin@tvapp.com")}
                  className="mt-2 mr-2"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Email
                </Button>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard("admin123")}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Password
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Step 2: Run Database Script</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Run the admin setup script in your Supabase SQL Editor
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Open Supabase Dashboard
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Step 3: Login</h3>
              <p className="text-sm text-muted-foreground">
                After creating the user in Supabase, you can login with the credentials above.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
