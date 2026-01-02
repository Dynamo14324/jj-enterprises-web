import type { Metadata } from "next"
import { BookOpen, Calculator, Award, FileText, Download, ArrowRight, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Packaging Resources & Tools | JJ Enterprises - Guides, Calculator & Industry Insights",
  description:
    "Access comprehensive packaging resources including guides, box calculator, case studies, and industry insights. Free tools and expert knowledge for packaging professionals.",
  keywords:
    "packaging resources, box calculator, packaging guides, case studies, industry insights, packaging tools, corrugated box resources",
}

const resourceCategories = [
  {
    title: "Packaging Guides",
    description: "Comprehensive guides on material selection, design principles, and best practices",
    icon: BookOpen,
    href: "/resources/guides",
    count: "12 Guides",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    featured: true,
  },
  {
    title: "Box Size Calculator",
    description: "Calculate optimal box dimensions and material requirements for your products",
    icon: Calculator,
    href: "/resources/calculator",
    count: "Interactive Tool",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    featured: true,
  },
  {
    title: "Case Studies",
    description: "Real-world examples of successful packaging solutions across industries",
    icon: Award,
    href: "/resources/case-studies",
    count: "8 Studies",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    featured: true,
  },
  {
    title: "Industry Insights",
    description: "Latest trends, regulations, and innovations in packaging industry",
    icon: FileText,
    href: "/resources/insights",
    count: "Latest Articles",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    featured: false,
  },
]

const featuredResources = [
  {
    title: "Complete Guide to Corrugated Box Design",
    description: "Everything you need to know about designing effective corrugated packaging",
    category: "Design Guide",
    downloadCount: "2.3k",
    type: "PDF",
    size: "4.2 MB",
  },
  {
    title: "Packaging Cost Optimization Checklist",
    description: "Step-by-step checklist to reduce packaging costs without compromising quality",
    category: "Cost Guide",
    downloadCount: "1.8k",
    type: "PDF",
    size: "1.1 MB",
  },
  {
    title: "Sustainable Packaging Materials Guide",
    description: "Comprehensive overview of eco-friendly packaging materials and their applications",
    category: "Sustainability",
    downloadCount: "3.1k",
    type: "PDF",
    size: "6.8 MB",
  },
]

const quickTools = [
  {
    name: "Box Calculator",
    description: "Calculate dimensions and costs",
    href: "/resources/calculator",
    icon: Calculator,
  },
  {
    name: "Material Selector",
    description: "Find the right material for your needs",
    href: "/resources/material-selector",
    icon: Filter,
  },
  {
    name: "Packaging Glossary",
    description: "Industry terms and definitions",
    href: "/resources/glossary",
    icon: BookOpen,
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">Knowledge Center</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Packaging Resources
              <span className="text-orange-500 block">& Expert Tools</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Access comprehensive guides, calculators, and industry insights to make informed packaging decisions.
              Everything you need to optimize your packaging strategy.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search resources..." className="pl-10 h-12 text-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickTools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto p-3 bg-orange-100 rounded-lg w-fit mb-4">
                      <tool.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resource Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of packaging resources organized by category
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <Card
                key={index}
                className={`${category.color} hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
              >
                {category.featured && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white">Featured</Badge>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-white shadow-sm ${category.iconColor}`}>
                      <category.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">{category.title}</CardTitle>
                      <CardDescription className="text-gray-600">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.count}</span>
                    <Link href={category.href}>
                      <Button variant="outline" className="group-hover:bg-white group-hover:shadow-sm">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Downloads */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Downloads</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Popular guides and resources downloaded by packaging professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {resource.category}
                  </Badge>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{resource.downloadCount} downloads</span>
                    <span>
                      {resource.type} • {resource.size}
                    </span>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Download className="mr-2 h-4 w-4" />
                    Download Free
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-orange-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated with Latest Resources</h2>
          <p className="text-xl text-orange-100 mb-8">
            Get notified when we publish new guides, tools, and industry insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" className="bg-white" />
            <Button variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
