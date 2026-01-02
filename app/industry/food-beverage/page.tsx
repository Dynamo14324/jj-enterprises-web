import type { Metadata } from "next"
import { Leaf, Thermometer, Droplets, CheckCircle, ArrowRight, Award, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Food & Beverage Packaging | JJ Enterprises - FDA Approved Food Grade Boxes",
  description:
    "Safe, compliant food packaging solutions with FDA-approved materials. Moisture-resistant, temperature-controlled packaging for food and beverage products.",
  keywords:
    "food packaging, beverage packaging, FDA approved boxes, food grade materials, moisture resistant packaging, temperature control packaging",
}

const features = [
  {
    icon: Shield,
    title: "FDA Approved Materials",
    description: "All materials are FDA approved for direct food contact and safe consumption",
  },
  {
    icon: Droplets,
    title: "Moisture Resistant",
    description: "Advanced barrier properties to protect against moisture and humidity",
  },
  {
    icon: Thermometer,
    title: "Temperature Control",
    description: "Insulated options for temperature-sensitive food and beverage products",
  },
  {
    icon: Leaf,
    title: "Sustainable Options",
    description: "Eco-friendly materials including recyclable and compostable solutions",
  },
]

const applications = [
  {
    category: "Fresh Foods",
    items: ["Fruits & Vegetables", "Dairy Products", "Meat & Poultry", "Bakery Items"],
    icon: "🥬",
  },
  {
    category: "Processed Foods",
    items: ["Snack Foods", "Frozen Meals", "Canned Goods", "Dry Goods"],
    icon: "🥫",
  },
  {
    category: "Beverages",
    items: ["Bottled Water", "Soft Drinks", "Alcoholic Beverages", "Coffee & Tea"],
    icon: "🥤",
  },
  {
    category: "Specialty Items",
    items: ["Organic Products", "Health Foods", "Gourmet Items", "International Foods"],
    icon: "🌟",
  },
]

const certifications = [
  "FDA 21 CFR 176 (Indirect food additives)",
  "FDA 21 CFR 177 (Indirect food additives: polymers)",
  "USDA Organic Certification",
  "BRC Global Standard for Food Safety",
  "SQF (Safe Quality Food) Certification",
  "HACCP (Hazard Analysis Critical Control Points)",
]

export default function FoodBeveragePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Food & Beverage Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Safe & Fresh
                <span className="text-green-600 block">Food Packaging Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Protect the quality and freshness of your food and beverage products with our FDA-approved packaging
                solutions. From farm to table, we ensure safety and appeal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Get Food-Safe Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/configurator">
                  <Button size="lg" variant="outline">
                    Design Food Package
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Food and beverage packaging solutions"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Food-Grade Packaging Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our food and beverage packaging solutions prioritize safety, freshness, and regulatory compliance while
              maintaining product appeal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-green-100 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Food & Beverage Applications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Versatile packaging solutions for every type of food and beverage product
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{app.icon}</div>
                  <CardTitle className="text-xl text-gray-900">{app.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {app.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Food packaging benefits"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-lg"></div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Food Packaging?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Food Safety First</h3>
                    <p className="text-gray-600">All materials meet strict FDA regulations for food contact safety</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainable Solutions</h3>
                    <p className="text-gray-600">Eco-friendly options including recyclable and compostable materials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                    <p className="text-gray-600">
                      Rigorous testing and quality control processes ensure consistent performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-4 bg-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Food Safety Certifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to food safety is backed by industry-leading certifications and compliance standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Keep Your Food Products Fresh and Safe</h2>
          <p className="text-xl text-green-100 mb-8">
            Partner with us for FDA-approved food packaging that protects quality and enhances shelf appeal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Get Food-Safe Quote
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                View All Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
