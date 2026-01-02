"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Award,
  Leaf,
  Star,
  Users,
  Clock,
  CheckCircle,
  Globe,
  Factory,
  Truck,
  Phone,
  Mail,
  Download,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Quality Management System",
    icon: Award,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    verified: true,
  },
  {
    name: "ISO 14001:2015",
    description: "Environmental Management",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
    verified: true,
  },
  {
    name: "FDA Compliant",
    description: "Food & Drug Administration",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-100",
    verified: true,
  },
  {
    name: "FSC Certified",
    description: "Forest Stewardship Council",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
    verified: true,
  },
]

const clientLogos = [
  { name: "Pharma Corp", logo: "/placeholder.svg?height=60&width=120&text=Pharma+Corp" },
  { name: "Food Industries", logo: "/placeholder.svg?height=60&width=120&text=Food+Industries" },
  { name: "Beauty Brand", logo: "/placeholder.svg?height=60&width=120&text=Beauty+Brand" },
  { name: "Tech Solutions", logo: "/placeholder.svg?height=60&width=120&text=Tech+Solutions" },
  { name: "Retail Chain", logo: "/placeholder.svg?height=60&width=120&text=Retail+Chain" },
  { name: "Auto Parts", logo: "/placeholder.svg?height=60&width=120&text=Auto+Parts" },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Mumbai Pharmaceuticals",
    role: "Procurement Manager",
    content:
      "JJ Enterprises has been our trusted packaging partner for over 3 years. Their quality consistency and timely delivery have been exceptional.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=RK",
  },
  {
    name: "Priya Sharma",
    company: "Gourmet Foods Ltd",
    role: "Operations Director",
    content:
      "The food-grade packaging solutions from JJ Enterprises have helped us maintain product freshness and enhance our brand image significantly.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=PS",
  },
  {
    name: "Amit Patel",
    company: "E-commerce Solutions",
    role: "Supply Chain Head",
    content:
      "Their e-commerce packaging has reduced our shipping damages by 40%. The custom branding options are excellent for our unboxing experience.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=AP",
  },
]

const achievements = [
  {
    icon: Users,
    title: "500+ Happy Clients",
    description: "Across diverse industries",
    color: "text-blue-600",
  },
  {
    icon: Star,
    title: "4.9/5 Rating",
    description: "Customer satisfaction score",
    color: "text-yellow-600",
  },
  {
    icon: Clock,
    title: "99.5% On-Time",
    description: "Delivery performance",
    color: "text-green-600",
  },
  {
    icon: Globe,
    title: "Pan-India Reach",
    description: "28 states coverage",
    color: "text-purple-600",
  },
]

export function TrustSignals() {
  return (
    <section className="py-16 md:py-20 bg-white" aria-label="Trust signals and certifications">
      <div className="container mx-auto px-4">
        {/* Certifications Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Certified Excellence & Industry Recognition
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality and sustainability is validated by leading industry certifications and standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 ${cert.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <cert.icon className={`w-8 h-8 ${cert.color}`} />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                {cert.verified && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <achievement.icon className={`w-12 h-12 ${achievement.color} mx-auto mb-4`} />
              <h3 className="font-bold text-xl text-gray-800 mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Client Logos Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Trusted by Leading Brands Across India
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={`${client.name} logo`}
                  width={120}
                  height={60}
                  className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-12">
            What Our Clients Say About Us
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-orange-600">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Experience Our Excellence?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust JJ Enterprises for their packaging needs. Get started with a
            free consultation and quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3"
              onClick={() => window.open("tel:+919819256432", "_self")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now: +91-98192-56432
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="px-8 py-3">
                <Mail className="w-4 h-4 mr-2" />
                Get Free Quote
              </Button>
            </Link>
            <Link href="/resources/catalog">
              <Button variant="outline" className="px-8 py-3">
                <Download className="w-4 h-4 mr-2" />
                Download Catalog
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <span className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Free consultation • No commitment required • 24-48 hour response
            </span>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Factory className="w-12 h-12 text-orange-500 mb-4" />
            <h4 className="font-semibold text-gray-800 mb-2">State-of-the-Art Facility</h4>
            <p className="text-sm text-gray-600">
              Modern manufacturing with advanced technology and quality control systems.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-12 h-12 text-orange-500 mb-4" />
            <h4 className="font-semibold text-gray-800 mb-2">Reliable Logistics</h4>
            <p className="text-sm text-gray-600">
              Pan-India delivery network ensuring timely and safe product delivery.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-12 h-12 text-orange-500 mb-4" />
            <h4 className="font-semibold text-gray-800 mb-2">Quality Guarantee</h4>
            <p className="text-sm text-gray-600">
              100% quality assurance with comprehensive testing and inspection processes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
