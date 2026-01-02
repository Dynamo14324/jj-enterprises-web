"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error)
  }, [error])

  const getErrorMessage = () => {
    if (error.message.includes("Network")) {
      return {
        title: "Connection Error",
        description: "Unable to connect to our servers. Please check your internet connection.",
        suggestion: "Try refreshing the page or check your network connection.",
      }
    }

    if (error.message.includes("Authentication")) {
      return {
        title: "Authentication Error",
        description: "Your session has expired or is invalid.",
        suggestion: "Please log in again to continue.",
      }
    }

    if (error.message.includes("Permission")) {
      return {
        title: "Access Denied",
        description: "You don't have permission to access this resource.",
        suggestion: "Contact support if you believe this is an error.",
      }
    }

    return {
      title: "Something went wrong",
      description: "An unexpected error occurred while processing your request.",
      suggestion: "Try refreshing the page or contact support if the problem persists.",
    }
  }

  const errorInfo = getErrorMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">{errorInfo.title}</CardTitle>
          <CardDescription className="text-gray-600">{errorInfo.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500 text-center">{errorInfo.suggestion}</p>

          {process.env.NODE_ENV === "development" && (
            <details className="bg-gray-50 p-3 rounded-lg text-xs">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 whitespace-pre-wrap text-red-600">
                {error.message}
                {error.stack && `\n\nStack trace:\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="flex flex-col space-y-2">
            <Button onClick={reset} className="bg-orange-500 hover:bg-orange-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => window.history.back()} className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
