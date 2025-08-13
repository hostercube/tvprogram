import { DeploymentStatus } from "@/components/deployment-status"

export default function DeploymentCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-white mb-8">Smart TV App - Deployment Check</h1>
        <DeploymentStatus />
        <div className="text-sm text-slate-400 max-w-md">
          <p>This page helps verify that all services are properly configured for production deployment.</p>
        </div>
      </div>
    </div>
  )
}
