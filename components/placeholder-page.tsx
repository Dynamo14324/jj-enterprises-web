import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Construction } from "lucide-react"
import Link from "next/link"

interface PlaceholderPageProps {
  title: string
  description?: string
  showBackButton?: boolean
}

export function PlaceholderPage({
  title,
  description = "This page is currently under construction. Please check back soon!",
  showBackButton = true,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center shadow-xl">
        <CardHeader>
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Construction className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showBackButton && (
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
