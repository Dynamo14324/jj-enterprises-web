import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Users, Factory, Globe, Leaf, Shield, Target, TrendingUp, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience", value: "15+", icon: Award },
    { label: "Happy Clients", value: "500+", icon: Users },
    { label: "Products Delivered", value: "1M+", icon: Factory },
    { label: "Countries Served", value: "25+", icon: Globe },
  ]

  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "ISO 9001:2015 certified manufacturing processes ensuring consistent quality in every product.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to eco-friendly packaging solutions using recyclable and biodegradable materials.",
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Dedicated to understanding and exceeding customer expectations with personalized service.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously investing in new technologies and design capabilities to stay ahead.",
    },
  ]

  const milestones = [
    { year: "2008", event: "JJ Enterprises founded in Mumbai" },
    { year: "2012", event: "Achieved ISO 9001:2015 certification" },
    { year: "2015", event: "Expanded to pharmaceutical packaging" },
    { year: "2018", event: "Launched eco-friendly product line" },
    { year: "2020", event: "Introduced 3D packaging configurator" },
    { year: "2023", event: "Reached 500+ satisfied clients milestone" },
  ]

  return (
    <PageLayout
      title="About JJ Enterprises"
      heroSubtitle="Learn about our journey, values, and commitment to delivering premium packaging solutions"
    >
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">Established 2008</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Crafting Premium Packaging Solutions for <span className="text-orange-600">15+ Years</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From our humble beginnings in Mumbai to becoming a trusted name in packaging, JJ Enterprises has been
                dedicated to delivering innovative, sustainable, and high-quality packaging solutions that protect your
                products and enhance your brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline">
                    View Our Products
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="JJ Enterprises Manufacturing Facility"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">ISO</div>
                  <div className="text-sm text-gray-600">9001:2015</div>
                  <div className="text-xs text-gray-500">Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              What started as a small packaging business in Mumbai has grown into a leading manufacturer serving clients
              across India and beyond. Our journey is built on trust, quality, and an unwavering commitment to customer
              satisfaction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">From Vision to Reality</h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Founded in 2008 with a vision to revolutionize the packaging industry in India, JJ Enterprises began
                  with a simple mission: to provide high-quality, innovative packaging solutions that meet the evolving
                  needs of businesses.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Over the years, we've expanded our capabilities, invested in cutting-edge technology, and built a team
                  of passionate professionals who share our commitment to excellence. Today, we're proud to serve over
                  500 clients across various industries.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our ISO 9001:2015 certification reflects our dedication to maintaining the highest standards in
                  manufacturing, quality control, and customer service.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">{milestone.year}</span>
                  </div>
                  <div className="flex-1 pt-3">
                    <p className="text-gray-700 font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-lg text-gray-600">
              These core principles guide everything we do and shape our relationships with clients, partners, and the
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  To provide innovative, sustainable, and high-quality packaging solutions that protect our clients'
                  products, enhance their brand value, and contribute to a more sustainable future. We strive to exceed
                  expectations through continuous improvement and exceptional customer service.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  To be the leading packaging solutions provider in India and expand globally, recognized for our
                  innovation, quality, and commitment to sustainability. We envision a future where our packaging
                  solutions contribute to a circular economy and environmental preservation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose JJ Enterprises?</h2>
            <p className="text-lg text-gray-600">
              We combine experience, innovation, and dedication to deliver packaging solutions that exceed expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "15+ years of industry experience",
              "ISO 9001:2015 certified processes",
              "500+ satisfied clients worldwide",
              "Eco-friendly and sustainable options",
              "Custom design and 3D visualization",
              "Competitive pricing and fast delivery",
              "Expert consultation and support",
              "State-of-the-art manufacturing facility",
              "Rigorous quality control standards",
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our packaging solutions can help protect your products and enhance your brand presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Start Your Project
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
