import type { Metadata } from "next"
import { FlaskConical, Utensils, Palette, ShoppingBag, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Industry Solutions | JJ Enterprises - Specialized Packaging for Every Sector",
  description:
    "Discover tailored packaging solutions for pharmaceutical, food & beverage, cosmetics, and e-commerce industries. Expert compliance and custom design services.",
  keywords:
    "industry packaging solutions, pharmaceutical packaging, food grade boxes, cosmetic packaging, e-commerce mailers, compliance packaging",
}

const industries = [
  {
    title: "Pharmaceutical",
    description: "Compliant packaging with security and tracking features for medical products",
    icon: FlaskConical,
    href: "/industry/pharmaceutical",
    features: ["FDA Compliant", "Tamper-Evident", "Child-Resistant", "Serialization Ready"],
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    title: "Food & Beverage",
    description: "Safe, fresh, and appealing packaging for consumables with food-grade materials",
    icon: Utensils,
    href: "/industry/food-beverage",
    features: ["Food Grade Materials", "Moisture Resistant", "Temperature Control", "FDA Approved"],
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    title: "Cosmetics & Care",
    description: "Elegant and protective packaging for beauty products that enhances brand appeal",
    icon: Palette,
    href: "/industry/cosmetics",
    features: ["Luxury Finishes", "UV Protection", "Custom Shapes", "Sustainable Options"],
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    title: "E-commerce & Retail",
    description: "Efficient, brandable, and durable shipping solutions for online businesses",
    icon: ShoppingBag,
    href: "/industry/ecommerce",
    features: ["Unboxing Experience", "Damage Protection", "Cost Effective", "Brand Customization"],
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
  },
]

const benefits = [
  "Industry-specific compliance and certifications",
  "Custom design and prototyping services",
  "Scalable production from samples to bulk orders",
  "Quality assurance and testing protocols",
  "Sustainable and eco-friendly material options",
  "Expert consultation and technical support",
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
              Industry-Specific Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Tailored Packaging for
              <span className="text-orange-500 block">Every Industry</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We understand that different industries have unique packaging requirements. Our specialized solutions
              ensure compliance, protection, and brand enhancement for your specific sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#industries">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Explore Industries
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized packaging solutions designed to meet the unique challenges and regulations of your industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {industries.map((industry) => (
              <Card
                key={industry.title}
                className={`${industry.color} hover:shadow-lg transition-all duration-300 group`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-white shadow-sm ${industry.iconColor}`}>
                      <industry.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">{industry.title}</CardTitle>
                      <CardDescription className="text-gray-600">{industry.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {industry.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={industry.href}>
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

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Industry Solutions?</h2>
              <p className="text-lg text-gray-600 mb-8">
                With decades of experience across multiple industries, we bring deep expertise and understanding of
                sector-specific requirements to every project.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
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
                alt="Industry packaging solutions showcase"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-orange-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Packaging Solution?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Let our experts help you design packaging that meets your industry's specific requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
                Get Started Today
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
