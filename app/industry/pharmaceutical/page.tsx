import type { Metadata } from "next"
import { Shield, Lock, FileCheck, Award, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pharmaceutical Packaging Solutions | JJ Enterprises - FDA Compliant Medical Packaging",
  description:
    "Specialized pharmaceutical packaging with FDA compliance, tamper-evident features, and serialization capabilities. Secure medical product packaging solutions.",
  keywords:
    "pharmaceutical packaging, FDA compliant boxes, medical packaging, tamper evident packaging, drug packaging, serialization packaging",
}

const features = [
  {
    icon: Shield,
    title: "FDA Compliance",
    description: "All materials and processes meet FDA regulations for pharmaceutical packaging",
  },
  {
    icon: Lock,
    title: "Tamper-Evident",
    description: "Advanced security features to ensure product integrity and patient safety",
  },
  {
    icon: FileCheck,
    title: "Serialization Ready",
    description: "Compatible with track-and-trace requirements and serialization systems",
  },
  {
    icon: Award,
    title: "Quality Certified",
    description: "ISO 9001 certified manufacturing with rigorous quality control processes",
  },
]

const products = [
  {
    name: "Prescription Bottles & Cartons",
    description: "Child-resistant and senior-friendly packaging for prescription medications",
    features: ["Child-resistant caps", "Easy-open for seniors", "Moisture protection", "Light barrier options"],
  },
  {
    name: "Medical Device Packaging",
    description: "Sterile packaging solutions for medical devices and diagnostic equipment",
    features: [
      "Sterile barrier systems",
      "Peel-open design",
      "ETO sterilization compatible",
      "Clear visibility windows",
    ],
  },
  {
    name: "Clinical Trial Packaging",
    description: "Specialized packaging for clinical trials with blinding and randomization features",
    features: ["Blinding capabilities", "Randomization support", "Temperature indicators", "Audit trail features"],
  },
  {
    name: "OTC & Supplement Packaging",
    description: "Consumer-friendly packaging for over-the-counter medications and supplements",
    features: ["Attractive shelf appeal", "Easy opening", "Dosage information display", "Tamper-evident seals"],
  },
]

const compliance = [
  "FDA 21 CFR Part 820 (Quality System Regulation)",
  "FDA 21 CFR Part 211 (Current Good Manufacturing Practice)",
  "ISO 11607 (Packaging for terminally sterilized medical devices)",
  "USP <661> (Plastic packaging systems)",
  "ICH Q1A (Stability testing guidelines)",
  "EU GDP Guidelines (Good Distribution Practice)",
]

export default function PharmaceuticalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Pharmaceutical Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                FDA Compliant
                <span className="text-blue-600 block">Pharmaceutical Packaging</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ensure patient safety and regulatory compliance with our specialized pharmaceutical packaging solutions.
                From prescription bottles to medical device packaging, we meet the highest industry standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Compliance Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/configurator">
                  <Button size="lg" variant="outline">
                    Design Custom Package
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Pharmaceutical packaging solutions"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pharmaceutical Packaging Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our pharmaceutical packaging solutions are designed with patient safety, regulatory compliance, and supply
              chain integrity in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-blue-100 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-blue-600" />
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

      {/* Products Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pharmaceutical Product Range</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive packaging solutions for every pharmaceutical application
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{product.name}</CardTitle>
                  <CardDescription className="text-gray-600">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Regulatory Compliance & Certifications
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We maintain strict adherence to pharmaceutical packaging regulations and industry standards to ensure
                your products meet all compliance requirements.
              </p>
              <div className="space-y-3">
                {compliance.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quality Assurance Process</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-gray-700">Material qualification and testing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-gray-700">Design validation and verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-gray-700">Production process validation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <span className="text-gray-700">Final inspection and documentation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ensure Compliance with Expert Pharmaceutical Packaging
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Partner with us for FDA-compliant packaging solutions that protect your products and patients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Request Compliance Consultation
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
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
