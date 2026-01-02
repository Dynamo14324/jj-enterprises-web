"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Mail, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyEmail, resendVerification, user } = useAuth()

  const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading")
  const [isResending, setIsResending] = useState(false)

  const token = searchParams?.get("token")

  useEffect(() => {
    if (token) {
      handleVerification(token)
    } else {
      setStatus("error")
    }
  }, [token])

  const handleVerification = async (verificationToken: string) => {
    try {
      const result = await verifyEmail(verificationToken)

      if (result.success) {
        setStatus("success")
        setTimeout(() => {
          router.push("/auth/login?message=verified")
        }, 3000)
      } else {
        setStatus("expired")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  const handleResendVerification = async () => {
    setIsResending(true)
    try {
      await resendVerification()
    } catch (error) {
      console.error("Failed to resend verification:", error)
    } finally {
      setIsResending(false)
    }
  }

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        )

      case "success":
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now sign in to your account.
            </p>
            <p className="text-sm text-gray-500 mb-4">Redirecting to login page...</p>
            <Link href="/auth/login">
              <Button className="bg-orange-500 hover:bg-orange-600">Continue to Login</Button>
            </Link>
          </div>
        )

      case "expired":
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Link Expired</h2>
            <p className="text-gray-600 mb-6">
              This verification link has expired or is invalid. Please request a new verification email.
            </p>
            <div className="space-y-3">
              {user && (
                <Button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isResending ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              )}
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        )

      case "error":
      default:
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email address. The link may be invalid or expired.
            </p>
            <div className="space-y-3">
              <Link href="/auth/register">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Create New Account</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardContent className="pt-6">{renderContent()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
