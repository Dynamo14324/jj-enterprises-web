import type { Metadata } from "next"
import { Palette, Sparkles, Eye, Heart, CheckCircle, ArrowRight, Award, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cosmetics & Beauty Packaging | JJ Enterprises - Luxury Beauty Product Boxes",
  description:
    "Premium cosmetics packaging with luxury finishes, UV protection, and custom shapes. Elegant beauty product packaging that enhances brand appeal.",
  keywords:
    "cosmetics packaging, beauty product boxes, luxury packaging, makeup packaging, skincare packaging, perfume boxes, custom beauty packaging",
}

const features = [
  {
    icon: Sparkles,
    title: "Luxury Finishes",
    description: "Premium finishes including foil stamping, embossing, and soft-touch coatings",
  },
  {
    icon: Eye,
    title: "UV Protection",
    description: "Specialized coatings and materials to protect products from UV damage",
  },
  {
    icon: Palette,
    title: "Custom Shapes",
    description: "Unique die-cut designs and custom shapes to match your brand aesthetic",
  },
  {
    icon: Leaf,
    title: "Sustainable Options",
    description: "Eco-friendly materials and sustainable packaging solutions for conscious brands",
  },
]

const productTypes = [
  {
    name: "Skincare Packaging",
    description: "Protective and elegant packaging for serums, creams, and treatments",
    features: ["Light protection", "Airless pump compatibility", "Tamper-evident seals", "Premium unboxing"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Makeup Packaging",
    description: "Eye-catching packaging for cosmetics that stands out on shelves",
    features: ["Vibrant printing", "Magnetic closures", "Mirror inserts", "Compact designs"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Fragrance Packaging",
    description: "Luxurious packaging that reflects the essence of your fragrance",
    features: ["Cushioned inserts", "Elegant finishes", "Gift-ready presentation", "Brand storytelling"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Gift Sets & Collections",
    description: "Coordinated packaging systems for product collections and gift sets",
    features: ["Modular designs", "Coordinated branding", "Premium presentation", "Reusable packaging"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

const finishOptions = [
  { name: "Foil Stamping", description: "Metallic accents in gold, silver, or custom colors" },
  { name: "Embossing/Debossing", description: "Raised or recessed designs for tactile appeal" },
  { name: "Soft Touch Coating", description: "Velvety smooth finish that feels luxurious" },
  { name: "Spot UV", description: "High-gloss accents on specific design elements" },
  { name: "Holographic Effects", description: "Eye-catching holographic patterns and textures" },
  { name: "Window Cutouts", description: "Strategic windows to showcase product inside" },
]

export default function CosmeticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
                Cosmetics & Beauty Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Luxury Packaging for
                <span className="text-purple-600 block">Beauty Brands</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Elevate your beauty products with premium packaging that captures attention, protects your formulations,
                and creates an unforgettable unboxing experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Get Luxury Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/configurator">
                  <Button size="lg" variant="outline">
                    Design Beauty Package
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Luxury cosmetics packaging"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Premium Beauty Packaging Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our cosmetics packaging combines aesthetic appeal with functional protection to showcase your beauty
              products in the best light.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto p-3 bg-purple-100 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-purple-600" />
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

      {/* Product Types Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beauty Product Packaging Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized packaging for every type of beauty and cosmetics product
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {productTypes.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{product.name}</CardTitle>
                  <CardDescription className="text-gray-600">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-500" />
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

      {/* Finish Options Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Luxury Finish Options</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our premium finishing techniques to create packaging that truly stands out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finishOptions.map((finish, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{finish.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{finish.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Beauty Brands Choose Us</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Enhancement</h3>
                    <p className="text-gray-600">
                      Packaging that elevates your brand perception and creates emotional connections
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                    <p className="text-gray-600">Exceptional craftsmanship and attention to detail in every package</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Unboxing Experience</h3>
                    <p className="text-gray-600">
                      Create memorable moments that customers want to share on social media
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Premium cosmetics packaging showcase"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Create Packaging That Captivates</h2>
          <p className="text-xl text-purple-100 mb-8">
            Let us help you design luxury packaging that makes your beauty products irresistible
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Your Luxury Project
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
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
