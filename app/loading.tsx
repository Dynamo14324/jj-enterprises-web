import { Package } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Package className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
        <p className="text-gray-600">Preparing your packaging experience</p>
      </div>
    </div>
  )
}
