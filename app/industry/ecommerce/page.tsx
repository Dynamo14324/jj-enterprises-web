import type { Metadata } from "next"
import { ShoppingBag, Package, Truck, Star, CheckCircle, ArrowRight, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "E-commerce Packaging Solutions | JJ Enterprises - Custom Shipping Boxes & Mailers",
  description:
    "Optimize your e-commerce shipping with custom mailers, branded boxes, and protective packaging. Enhance unboxing experience and reduce shipping costs.",
  keywords:
    "ecommerce packaging, shipping boxes, custom mailers, branded packaging, unboxing experience, shipping protection, online retail packaging",
}

const features = [
  {
    icon: Package,
    title: "Unboxing Experience",
    description: "Create memorable unboxing moments that customers love to share",
  },
  {
    icon: Shield,
    title: "Damage Protection",
    description: "Robust protection to ensure products arrive in perfect condition",
  },
  {
    icon: Zap,
    title: "Cost Effective",
    description: "Optimized designs that reduce shipping costs and material waste",
  },
  {
    icon: Star,
    title: "Brand Customization",
    description: "Full customization options to showcase your brand identity",
  },
]

const packageTypes = [
  {
    name: "Corrugated Mailers",
    description: "Lightweight, protective mailers perfect for small to medium items",
    benefits: ["Self-sealing design", "Tear-strip opening", "Crush resistant", "Lightweight"],
    bestFor: "Clothing, books, electronics accessories, small goods",
  },
  {
    name: "Branded Shipping Boxes",
    description: "Custom printed boxes that turn every delivery into a brand experience",
    benefits: ["Full-color printing", "Multiple sizes", "Easy assembly", "Reusable design"],
    bestFor: "Subscription boxes, gift items, premium products, brand building",
  },
  {
    name: "Protective Packaging",
    description: "Heavy-duty packaging for fragile and valuable items",
    benefits: ["Extra cushioning", "Double-wall construction", "Secure closures", "Insurance approved"],
    bestFor: "Electronics, glassware, artwork, high-value items",
  },
  {
    name: "Eco-Friendly Options",
    description: "Sustainable packaging solutions for environmentally conscious brands",
    benefits: ["Recyclable materials", "Biodegradable options", "Minimal waste", "Carbon neutral"],
    bestFor: "Sustainable brands, eco-conscious consumers, green initiatives",
  },
]

const benefits = [
  {
    title: "Reduce Return Rates",
    description: "Proper protection reduces damage-related returns by up to 40%",
    icon: Shield,
  },
  {
    title: "Increase Brand Loyalty",
    description: "Great unboxing experiences increase repeat purchases by 35%",
    icon: Star,
  },
  {
    title: "Lower Shipping Costs",
    description: "Optimized packaging can reduce shipping costs by 15-25%",
    icon: Truck,
  },
  {
    title: "Social Media Buzz",
    description: "Shareable unboxing moments create free marketing opportunities",
    icon: ShoppingBag,
  },
]

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">E-commerce Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Shipping Packaging That
                <span className="text-orange-600 block">Delivers Results</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform your e-commerce shipping with custom packaging that protects your products, reduces costs, and
                creates unforgettable unboxing experiences that drive customer loyalty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Optimize My Shipping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/configurator">
                  <Button size="lg" variant="outline">
                    Design Shipping Box
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="E-commerce packaging solutions"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">E-commerce Packaging Advantages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our e-commerce packaging solutions are designed to optimize your shipping process while creating positive
              customer experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-orange-100 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-orange-600" />
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

      {/* Package Types Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">E-commerce Package Types</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect packaging solution for your specific e-commerce needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {packageTypes.map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                    <p className="text-sm text-gray-600">{pkg.bestFor}</p>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Measurable Business Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See real results from optimized e-commerce packaging
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-orange-100 rounded-lg w-fit">
                    <benefit.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our E-commerce Packaging Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From concept to delivery, we optimize every aspect of your packaging
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Product Analysis",
                description: "We analyze your products and shipping requirements",
              },
              {
                step: "2",
                title: "Design Optimization",
                description: "Create packaging that balances protection and cost",
              },
              {
                step: "3",
                title: "Testing & Validation",
                description: "Rigorous testing to ensure performance standards",
              },
              {
                step: "4",
                title: "Production & Delivery",
                description: "Efficient production and reliable delivery schedules",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-orange-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your E-commerce Packaging?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Let us help you create packaging that protects your products and delights your customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                Get Shipping Analysis
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
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
