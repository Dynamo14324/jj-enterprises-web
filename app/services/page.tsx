import type { Metadata } from "next"
import { Paintbrush, Building, TestTube, Leaf, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Packaging Services | JJ Enterprises - Design, Manufacturing & Testing Services",
  description:
    "Comprehensive packaging services including custom design, bulk manufacturing, quality testing, and sustainable sourcing. Expert packaging solutions.",
  keywords:
    "packaging services, custom design, bulk manufacturing, quality testing, sustainable packaging, packaging consultation",
}

const services = [
  {
    title: "Custom Design & Prototyping",
    description: "Collaborate with our experts to create the perfect packaging from scratch",
    icon: Paintbrush,
    href: "/services/design",
    features: ["Concept Development", "3D Visualization", "Rapid Prototyping", "Design Optimization"],
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Bulk & Contract Manufacturing",
    description: "Reliable, high-volume production with consistent quality for large-scale needs",
    icon: Building,
    href: "/services/bulk-orders",
    features: ["High-Volume Production", "Quality Consistency", "Flexible Scheduling", "Cost Optimization"],
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    title: "Quality & Compliance Testing",
    description: "Rigorous testing to ensure your packaging meets industry standards",
    icon: TestTube,
    href: "/services/testing",
    features: ["Material Testing", "Drop Testing", "Compliance Verification", "Performance Analysis"],
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    title: "Sustainable Sourcing",
    description: "Choose from a range of eco-friendly materials and practices",
    icon: Leaf,
    href: "/services/sustainability",
    features: [
      "Eco-Friendly Materials",
      "Carbon Footprint Reduction",
      "Recyclable Options",
      "Sustainability Consulting",
    ],
    color: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
  },
]

const whyChooseUs = [
  "Expert consultation and technical support",
  "End-to-end packaging solutions",
  "Industry-leading quality standards",
  "Sustainable and eco-friendly options",
  "Competitive pricing and fast turnaround",
  "Comprehensive testing and validation",
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">Comprehensive Services</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete Packaging
              <span className="text-orange-500 block">Solutions & Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From initial design concepts to large-scale manufacturing, we provide comprehensive packaging services
              that cover every aspect of your packaging needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#services">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline">
                  Get Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive packaging services designed to meet all your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card
                key={service.title}
                className={`${service.color} hover:shadow-lg transition-all duration-300 group`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-white shadow-sm ${service.iconColor}`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                      <CardDescription className="text-gray-600">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={service.href}>
                    <Button variant="outline" className="w-full group-hover:bg-white group-hover:shadow-sm">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h2>
              <p className="text-lg text-gray-600 mb-8">
                With decades of experience in packaging solutions, we provide comprehensive services that ensure your
                packaging meets the highest standards of quality, compliance, and performance.
              </p>
              <div className="space-y-4">
                {whyChooseUs.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Packaging services showcase"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Service Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined process that ensures quality results and timely delivery
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "Understanding your specific packaging requirements and goals",
              },
              {
                step: "2",
                title: "Solution Design",
                description: "Creating tailored solutions that meet your needs and budget",
              },
              {
                step: "3",
                title: "Implementation",
                description: "Executing the solution with precision and quality control",
              },
              { step: "4", title: "Support", description: "Ongoing support and optimization for continued success" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
      <section className="py-20 px-4 bg-orange-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Let our experts help you find the perfect packaging solution for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
                Get Free Consultation
              </Button>
            </Link>
            <Link href="/configurator">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-500"
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
