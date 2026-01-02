"use client"

import { Button } from "@/components/ui/button"
import { Package, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-orange-600" />
        </div>

        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>

        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>

          <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <Link href="/products" className="text-orange-600 hover:text-orange-700">
              Products
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/configurator" className="text-orange-600 hover:text-orange-700">
              3D Configurator
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/#contact" className="text-orange-600 hover:text-orange-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
