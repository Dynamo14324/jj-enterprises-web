import type { Metadata } from "next"
import { BookOpen, Download, Clock, User, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Packaging Guides & Resources | JJ Enterprises - Expert Knowledge Base",
  description:
    "Comprehensive packaging guides covering design, materials, sustainability, and best practices. Expert knowledge for packaging professionals and businesses.",
  keywords:
    "packaging guides, corrugated box design, material selection, sustainable packaging, packaging best practices, design guidelines",
}

const guides = [
  {
    id: 1,
    title: "Complete Guide to Corrugated Box Design",
    description:
      "Master the fundamentals of corrugated box design including structural considerations, material selection, and optimization techniques.",
    category: "Design",
    level: "Beginner",
    readTime: "15 min",
    downloadCount: "2.3k",
    author: "JJ Design Team",
    publishDate: "2024-01-15",
    featured: true,
    topics: ["Box Structure", "Material Selection", "Design Principles", "Cost Optimization"],
  },
  {
    id: 2,
    title: "Sustainable Packaging Materials Guide",
    description:
      "Comprehensive overview of eco-friendly packaging materials, their properties, applications, and environmental impact.",
    category: "Sustainability",
    level: "Intermediate",
    readTime: "20 min",
    downloadCount: "3.1k",
    author: "Sustainability Team",
    publishDate: "2024-01-10",
    featured: true,
    topics: ["Eco Materials", "Recycling", "Carbon Footprint", "Certifications"],
  },
  {
    id: 3,
    title: "Packaging Cost Optimization Strategies",
    description: "Proven strategies to reduce packaging costs while maintaining quality and performance standards.",
    category: "Cost Management",
    level: "Advanced",
    readTime: "25 min",
    downloadCount: "1.8k",
    author: "Operations Team",
    publishDate: "2024-01-05",
    featured: false,
    topics: ["Cost Analysis", "Material Efficiency", "Process Optimization", "Supplier Management"],
  },
  {
    id: 4,
    title: "Food-Grade Packaging Compliance",
    description: "Essential guide to FDA regulations and compliance requirements for food contact packaging materials.",
    category: "Compliance",
    level: "Intermediate",
    readTime: "18 min",
    downloadCount: "1.5k",
    author: "Compliance Team",
    publishDate: "2023-12-20",
    featured: false,
    topics: ["FDA Regulations", "Material Testing", "Documentation", "Quality Assurance"],
  },
  {
    id: 5,
    title: "E-commerce Packaging Best Practices",
    description: "Optimize your e-commerce packaging for protection, cost-efficiency, and customer experience.",
    category: "E-commerce",
    level: "Beginner",
    readTime: "12 min",
    downloadCount: "2.7k",
    author: "E-commerce Team",
    publishDate: "2023-12-15",
    featured: true,
    topics: ["Unboxing Experience", "Damage Prevention", "Shipping Optimization", "Branding"],
  },
  {
    id: 6,
    title: "Pharmaceutical Packaging Guidelines",
    description: "Specialized packaging requirements for pharmaceutical products including security and traceability.",
    category: "Pharmaceutical",
    level: "Advanced",
    readTime: "30 min",
    downloadCount: "987",
    author: "Pharma Team",
    publishDate: "2023-12-10",
    featured: false,
    topics: ["Security Features", "Serialization", "Child Resistance", "Tamper Evidence"],
  },
  {
    id: 7,
    title: "Packaging Testing & Quality Control",
    description: "Comprehensive guide to packaging testing methods and quality control procedures.",
    category: "Quality",
    level: "Intermediate",
    readTime: "22 min",
    downloadCount: "1.2k",
    author: "Quality Team",
    publishDate: "2023-12-05",
    featured: false,
    topics: ["Drop Testing", "Compression Testing", "Edge Crush Test", "Quality Standards"],
  },
  {
    id: 8,
    title: "Custom Printing & Finishing Options",
    description: "Explore various printing techniques and finishing options to enhance your packaging appeal.",
    category: "Printing",
    level: "Beginner",
    readTime: "16 min",
    downloadCount: "2.1k",
    author: "Print Team",
    publishDate: "2023-11-30",
    featured: false,
    topics: ["Printing Methods", "Color Management", "Finishing Techniques", "Brand Guidelines"],
  },
]

const categories = [
  "All",
  "Design",
  "Sustainability",
  "Cost Management",
  "Compliance",
  "E-commerce",
  "Pharmaceutical",
  "Quality",
  "Printing",
]
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto max-w-6xl">
          <Link href="/resources" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Packaging Guides</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Expert knowledge and best practices to help you make informed packaging decisions
            </p>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search guides..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level.toLowerCase()}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {guides
              .filter((guide) => guide.featured)
              .map((guide) => (
                <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <Badge className="bg-orange-500 text-white">Featured</Badge>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {guide.readTime}
                        </span>
                        <span className="flex items-center">
                          <Download className="mr-1 h-4 w-4" />
                          {guide.downloadCount}
                        </span>
                      </div>
                      <Badge variant="outline">{guide.level}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {guide.topics.slice(0, 3).map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Guides</h2>
          <div className="space-y-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">{guide.category}</Badge>
                        <Badge variant="outline">{guide.level}</Badge>
                        {guide.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                      <p className="text-gray-600 mb-4">{guide.description}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {guide.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {guide.author}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {guide.readTime}
                        </span>
                        <span className="flex items-center">
                          <Download className="mr-1 h-4 w-4" />
                          {guide.downloadCount}
                        </span>
                        <span>{new Date(guide.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read Guide
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Custom Packaging Guidance?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our experts are here to help you find the perfect packaging solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Expert Consultation
              </Button>
            </Link>
            <Link href="/configurator">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
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
