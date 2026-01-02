import type { Metadata } from "next"
import { Paintbrush, Lightbulb, Layers, Zap, CheckCircle, ArrowRight, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Custom Design & Prototyping Services | JJ Enterprises - Expert Packaging Design",
  description:
    "Professional packaging design and prototyping services. Collaborate with our experts to create perfect packaging from concept to production.",
  keywords:
    "custom packaging design, prototyping services, packaging consultation, design collaboration, packaging development, custom box design",
}

const designServices = [
  {
    icon: Lightbulb,
    title: "Concept Development",
    description: "Transform your ideas into viable packaging concepts with our creative team",
  },
  {
    icon: Layers,
    title: "3D Visualization",
    description: "See your packaging come to life with detailed 3D renderings and mockups",
  },
  {
    icon: Paintbrush,
    title: "Graphic Design",
    description: "Professional graphic design services for branding and visual appeal",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Quick turnaround on physical prototypes for testing and validation",
  },
]

const designProcess = [
  {
    step: "1",
    title: "Discovery & Brief",
    description: "We understand your product, brand, and packaging requirements",
    duration: "1-2 days",
  },
  {
    step: "2",
    title: "Concept Design",
    description: "Initial design concepts and structural solutions",
    duration: "3-5 days",
  },
  {
    step: "3",
    title: "3D Visualization",
    description: "Detailed 3D renderings and virtual prototypes",
    duration: "2-3 days",
  },
  {
    step: "4",
    title: "Physical Prototype",
    description: "Create physical samples for testing and approval",
    duration: "5-7 days",
  },
  {
    step: "5",
    title: "Refinement",
    description: "Iterate based on feedback and testing results",
    duration: "2-4 days",
  },
  {
    step: "6",
    title: "Production Ready",
    description: "Final files and specifications for manufacturing",
    duration: "1-2 days",
  },
]

const designCapabilities = [
  "Structural packaging design",
  "Graphic design and branding",
  "3D modeling and visualization",
  "Material selection guidance",
  "Sustainability consulting",
  "Regulatory compliance review",
  "Cost optimization analysis",
  "Production feasibility assessment",
]

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Design & Prototyping Services</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Custom Packaging
                <span className="text-blue-600 block">Design & Prototyping</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Collaborate with our expert design team to create packaging that perfectly fits your product, brand, and
                budget. From initial concept to production-ready files.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Design Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/configurator">
                  <Button size="lg" variant="outline">
                    Try 3D Configurator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Custom packaging design process"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Design Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive design and prototyping services to bring your packaging vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Design Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach that ensures your packaging meets all requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designProcess.map((phase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                      {phase.step}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{phase.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{phase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Design Capabilities</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive design capabilities cover every aspect of packaging development, from initial concept
                to production optimization.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {designCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Design capabilities showcase"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Collaborative Design Approach</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We work closely with you throughout the design process to ensure the final result exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Expert Team</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Work with experienced packaging designers, engineers, and brand specialists
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Fast Iterations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Quick design iterations and feedback cycles to refine your packaging</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Timely Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Structured timelines and regular updates to keep your project on track
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Design Your Perfect Package?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let our expert design team help you create packaging that stands out and performs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Design Project
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
