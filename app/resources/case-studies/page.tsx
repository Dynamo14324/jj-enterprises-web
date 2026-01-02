import type { Metadata } from "next"
import { ArrowLeft, TrendingUp, Users, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Packaging Case Studies | JJ Enterprises - Success Stories & Results",
  description:
    "Real-world packaging success stories and case studies. See how we've helped businesses optimize their packaging solutions across various industries.",
  keywords:
    "packaging case studies, success stories, packaging solutions, cost reduction, sustainability, e-commerce packaging, pharmaceutical packaging",
}

const caseStudies = [
  {
    id: 1,
    title: "E-commerce Giant Reduces Packaging Costs by 35%",
    client: "Major Online Retailer",
    industry: "E-commerce",
    challenge: "High packaging costs and customer complaints about oversized boxes",
    solution: "Implemented right-sized packaging system with custom mailer boxes",
    results: [
      "35% reduction in packaging costs",
      "50% reduction in shipping volume",
      "90% improvement in customer satisfaction",
      "25% reduction in damage claims",
    ],
    timeline: "3 months",
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
    metrics: {
      costSaving: "₹2.5M annually",
      volumeReduction: "50%",
      satisfaction: "90%",
    },
  },
  {
    id: 2,
    title: "Pharmaceutical Company Achieves 100% Compliance",
    client: "Leading Pharma Manufacturer",
    industry: "Pharmaceutical",
    challenge: "Meeting stringent FDA regulations while maintaining cost efficiency",
    solution: "Developed tamper-evident packaging with serialization capabilities",
    results: [
      "100% regulatory compliance achieved",
      "Zero compliance violations in 2 years",
      "15% reduction in packaging costs",
      "Improved supply chain traceability",
    ],
    timeline: "6 months",
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
    metrics: {
      compliance: "100%",
      costReduction: "15%",
      violations: "0",
    },
  },
  {
    id: 3,
    title: "Food Brand Achieves Carbon Neutral Packaging",
    client: "Organic Food Company",
    industry: "Food & Beverage",
    challenge: "Transitioning to sustainable packaging without compromising product protection",
    solution: "Developed biodegradable packaging with enhanced barrier properties",
    results: [
      "100% biodegradable packaging",
      "Carbon neutral certification",
      "20% increase in brand loyalty",
      "Zero compromise on product freshness",
    ],
    timeline: "4 months",
    featured: false,
    image: "/placeholder.svg?height=200&width=300",
    metrics: {
      sustainability: "100%",
      brandLoyalty: "+20%",
      freshness: "Maintained",
    },
  },
  {
    id: 4,
    title: "Cosmetics Brand Enhances Unboxing Experience",
    client: "Premium Beauty Brand",
    industry: "Cosmetics",
    challenge: "Creating Instagram-worthy packaging that drives social media engagement",
    solution: "Designed luxury rigid boxes with magnetic closures and custom inserts",
    results: [
      "300% increase in social media mentions",
      "45% increase in repeat purchases",
      "Premium brand positioning achieved",
      "25% increase in average order value",
    ],
    timeline: "2 months",
    featured: false,
    image: "/placeholder.svg?height=200&width=300",
    metrics: {
      socialMentions: "+300%",
      repeatPurchases: "+45%",
      orderValue: "+25%",
    },
  },
  {
    id: 5,
    title: "Electronics Manufacturer Eliminates Damage Claims",
    client: "Consumer Electronics Brand",
    industry: "Electronics",
    challenge: "High damage rates during shipping causing customer dissatisfaction",
    solution: "Engineered custom protective packaging with shock-absorbing materials",
    results: [
      "95% reduction in damage claims",
      "Improved customer satisfaction scores",
      "Reduced return processing costs",
      "Enhanced brand reputation",
    ],
    timeline: "5 months",
    featured: true,
    image: "/placeholder.svg?height=200&width=300",
    metrics: {
      damageReduction: "95%",
      satisfaction: "Improved",
      returns: "Reduced",
    },
  },
  {
    id: 6,
    title: "Startup Scales Packaging Operations 10x",
    client: "Fast-Growing Startup",
    industry: "Consumer Goods",
    challenge: "Scaling packaging operations while maintaining quality and cost efficiency",
    solution: "Implemented automated packaging line with flexible box designs",
    results: [
      "10x increase in production capacity",
      "30% reduction in per-unit costs",
      "Maintained quality standards",
      "Reduced lead times by 50%",
    ],
    timeline: "8 months",
    featured: false,
    image: "/placeholder.svg?height=200&width=300",
    metrics: {
      capacity: "10x",
      costReduction: "30%",
      leadTime: "-50%",
    },
  },
]

const industries = [
  "All",
  "E-commerce",
  "Pharmaceutical",
  "Food & Beverage",
  "Cosmetics",
  "Electronics",
  "Consumer Goods",
]

export default function CaseStudiesPage() {
  const featuredStudies = caseStudies.filter((study) => study.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="container mx-auto max-w-6xl">
          <Link href="/resources" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Real-world examples of how we've helped businesses optimize their packaging solutions and achieve
              measurable results
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">₹100M+</div>
              <div className="text-gray-600">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-gray-600">Industries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Success Stories</h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredStudies.slice(0, 2).map((study) => (
              <Card key={study.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-purple-500 text-white">Featured</Badge>
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    {study.industry}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    <span className="font-medium">{study.client}</span> • {study.timeline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Results</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {study.results.slice(0, 4).map((result, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Case Studies */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Case Studies</h2>
            <div className="flex gap-2">
              {industries.map((industry) => (
                <Badge key={industry} variant="outline" className="cursor-pointer hover:bg-purple-50">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{study.industry}</Badge>
                    {study.featured && <Badge className="bg-purple-500 text-white">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg">{study.title}</CardTitle>
                  <CardDescription>
                    <span className="font-medium">{study.client}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm">{study.challenge}</p>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      {Object.entries(study.metrics)
                        .slice(0, 2)
                        .map(([key, value]) => (
                          <div key={key} className="p-2 bg-purple-50 rounded">
                            <div className="font-semibold text-purple-600">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                          </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {study.timeline}
                      </span>
                      <span className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {study.industry}
                      </span>
                    </div>

                    <Button variant="outline" className="w-full">
                      Read Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Create Your Success Story?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Let us help you optimize your packaging and achieve measurable results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Your Project
              </Button>
            </Link>
            <Link href="/configurator">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                Try 3D Configurator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
