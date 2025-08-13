import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Key, Mail, AlertTriangle } from "lucide-react"

export function AdminCredentials() {
  return (
    <Card className="max-w-md mx-auto mt-8 border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <Key className="h-5 w-5" />
          Default Admin Credentials
        </CardTitle>
        <CardDescription className="text-amber-700">Use these credentials for initial admin access</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-amber-600" />
            <span className="font-medium">Email:</span>
          </div>
          <Badge variant="secondary" className="font-mono">
            admin@tvapp.com
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-amber-600" />
            <span className="font-medium">Password:</span>
          </div>
          <Badge variant="secondary" className="font-mono">
            admin123
          </Badge>
        </div>

        <div className="flex items-start gap-2 p-3 bg-amber-100 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Change these credentials immediately after first login for security.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
