"use client"

import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Package,
  Truck,
  Award,
  Users,
  ShieldCheck,
  FileText,
  CuboidIcon as Cube,
  Settings,
  CheckSquare,
  BarChartHorizontalBig,
  Star,
  Clock,
  Globe,
  Leaf,
  Factory,
  MessageCircle,
  Play,
  Download,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HeroBox } from "@/components/hero-box"
import { FeatureImage } from "@/components/optimized-image"
import { PerformanceMonitor } from "@/lib/performance"
import { ProductShowcase } from "@/components/product-showcase"
import { ContactSection } from "@/components/contact-section"
import { TrustSignals } from "@/components/trust-signals"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FloatingBoxes } from "@/components/floating-boxes"

function SimpleLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold text-gray-800">Loading 3D Experience</p>
        <p className="text-sm text-gray-600">Please wait...</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <PerformanceMonitor>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Premium Hero Section */}
        <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-mesh" aria-label="Hero section with 3D packaging showcase">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} className="w-full h-full">
              <Suspense fallback={null}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#f97316" />
                <HeroBox />
                <FloatingBoxes />
                <Environment preset="night" background={false} />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={1.5}
                  maxPolarAngle={Math.PI / 1.5}
                  minPolarAngle={Math.PI / 3}
                  enableDamping={true}
                  dampingFactor={0.03}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Glass Overlay Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
            <div className="text-center">
              <Badge
                variant="secondary"
                className="mb-8 bg-orange-500/10 text-orange-400 border-orange-500/20 py-2.5 px-8 text-base shadow-[0_0_15px_rgba(249,115,22,0.2)] rounded-full animate-fade-in-down"
              >
                <ShieldCheck className="w-5 h-5 mr-3" />
                ISO 9001:2015 Certified • Est. 2008
              </Badge>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter animate-fade-in leading-[0.9]">
                <span className="block opacity-90">FUTURE OF</span>
                <span className="gradient-text drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">PREMIUM PACKAGING</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed font-light">
                Elevating brands through precision-engineered paper solutions. <br className="hidden md:block" />
                Where master craftsmanship meets <span className="text-orange-400 font-medium">next-generation sustainability.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-bounce-in mb-16">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-7 text-xl font-bold transition-all duration-500 hover:scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] rounded-2xl group"
                  >
                    <FileText className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    GET FREE QUOTE
                  </Button>
                </Link>
                <Link href="/configurator" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/5 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 px-12 py-7 text-xl font-bold transition-all duration-500 hover:scale-110 shadow-2xl rounded-2xl border-2"
                  >
                    <Cube className="w-6 h-6 mr-3 text-orange-400" />
                    3D CONFIGURATOR
                  </Button>
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in opacity-80">
                {[
                  { icon: Factory, text: "50,000+ Daily Capacity" },
                  { icon: Leaf, text: "Eco-Friendly Materials" },
                  { icon: Truck, text: "Pan-India Logistics" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center bg-white/5 rounded-full px-5 py-2 border border-white/5 backdrop-blur-md">
                    <item.icon className="w-4 h-4 mr-2 text-orange-400" />
                    <span className="text-sm font-medium text-gray-400">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20">
            <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center p-2 backdrop-blur-sm">
              <div className="w-1.5 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Enhanced Statistics Section */}
        <section className="py-16 md:py-20 bg-white" aria-label="Company statistics and achievements">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Trusted by Industry Leaders Across India
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Over 15 years of excellence in delivering innovative paper packaging solutions across Mumbai,
                Maharashtra, and all of India.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  icon: Package,
                  count: "2,500+",
                  label: "Product SKUs",
                  desc: "Corrugated, Fancy, Pharma & More",
                  color: "text-blue-600",
                  bgColor: "bg-blue-100 group-hover:bg-blue-200",
                },
                {
                  icon: Users,
                  count: "500+",
                  label: "Happy Clients",
                  desc: "Across Diverse Industries",
                  color: "text-green-600",
                  bgColor: "bg-green-100 group-hover:bg-green-200",
                },
                {
                  icon: Truck,
                  count: "1M+",
                  label: "Units Delivered",
                  desc: "On-Time & Quality Assured",
                  color: "text-purple-600",
                  bgColor: "bg-purple-100 group-hover:bg-purple-200",
                },
                {
                  icon: Award,
                  count: "15+",
                  label: "Years Experience",
                  desc: "Unmatched Industry Expertise",
                  color: "text-orange-600",
                  bgColor: "bg-orange-100 group-hover:bg-orange-200",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-counter group p-4 rounded-lg hover:bg-orange-50 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 transition-all duration-300 group-hover:scale-110`}
                  >
                    <stat.icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color}`} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">{stat.count}</h3>
                  <p className="text-gray-700 font-medium text-sm md:text-base">{stat.label}</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-16 md:py-20 bg-gray-50" aria-label="Key features and capabilities">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Why Choose JJ Enterprises for Paper Packaging?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                We combine cutting-edge technology, sustainable practices, and unmatched expertise to deliver paper
                packaging solutions that exceed expectations and drive your business forward.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Factory,
                  title: "State-of-the-Art Manufacturing",
                  description:
                    "12+ advanced production lines with Heidelberg Speedmaster XL 106 for superior print quality and precision manufacturing.",
                  features: ["50,000+ daily capacity", "Automated finishing", "Precision die-cutting"],
                  image: "/manufacturing-facility.png",
                },
                {
                  icon: Leaf,
                  title: "Sustainable & Eco-Friendly",
                  description:
                    "FSC certified paper materials and environmentally responsible manufacturing processes for a greener future.",
                  features: ["FSC certified materials", "Recyclable packaging", "Carbon-neutral shipping"],
                  image: "/sustainability.png",
                },
                {
                  icon: Globe,
                  title: "Pan-India Reach",
                  description:
                    "Extensive distribution network ensuring timely delivery across all Indian states with real-time tracking.",
                  features: ["28 states coverage", "Real-time tracking", "Express delivery options"],
                  image: "/corrugated-boxes-hero.png",
                },
                {
                  icon: Star,
                  title: "Premium Quality Standards",
                  description:
                    "ISO 9001:2015 certified processes with 25+ quality checkpoints ensuring consistent excellence.",
                  features: ["ISO 9001:2015 certified", "25+ quality checks", "Zero-defect guarantee"],
                  image: "/quality-assurance.png",
                },
                {
                  icon: Clock,
                  title: "Fast Turnaround Time",
                  description:
                    "Streamlined production processes enabling quick delivery without compromising on quality standards.",
                  features: ["24-48 hour quotes", "7-day production", "Emergency orders accepted"],
                  image: "/production-process.png",
                },
                {
                  icon: Settings,
                  title: "Custom Design Services",
                  description:
                    "In-house design team with 3D configurator technology for personalized packaging solutions.",
                  features: ["3D visualization", "Custom printing", "Brand integration"],
                  image: "/luxury-gift-boxes.png",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 group overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <FeatureImage
                      src={feature.image || "/placeholder.svg"}
                      alt={`${feature.title} - JJ Enterprises packaging solution`}
                      width={300}
                      height={200}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-500">
                          <CheckSquare className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals Component */}
        <TrustSignals />

        {/* Enhanced Product Showcase */}
        <section
          id="products"
          className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-orange-50"
          aria-label="Interactive product showcase"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
                Interactive 3D Product Gallery
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto animate-slide-up">
                Explore our comprehensive range of paper packaging solutions including corrugated boxes, luxury gift
                boxes, pharmaceutical packaging, and eco-friendly options with real-time 3D visualization and
                customization capabilities.
              </p>
            </div>
            <ProductShowcase />
            <div className="text-center mt-12 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" aria-label="View all paper packaging products">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all px-8 py-3"
                  >
                    <Package className="w-5 h-5 mr-2" />
                    View All Products
                  </Button>
                </Link>
                <Link href="/configurator" aria-label="Try 3D packaging configurator">
                  <Button size="lg" variant="outline" className="hover:bg-orange-50 hover:text-orange-600 px-8 py-3">
                    <Cube className="w-5 h-5 mr-2" />
                    Try 3D Configurator
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Can't find what you're looking for?{" "}
                <Link href="#contact" className="text-orange-600 hover:underline">
                  Contact our experts
                </Link>{" "}
                for custom solutions.
              </p>
            </div>
          </div>
        </section>

        {/* New Video/Demo Section */}
        <section className="py-16 md:py-20 bg-white" aria-label="Manufacturing process showcase">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  See Our Manufacturing Excellence in Action
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Take a virtual tour of our state-of-the-art manufacturing facility and witness the precision, quality,
                  and innovation that goes into every package we create.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Advanced Heidelberg printing technology",
                    "Automated quality control systems",
                    "Eco-friendly production processes",
                    "Real-time order tracking",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckSquare className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Virtual Tour
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/premium_luxury_packaging_hero_1767390512762.png"
                    alt="Manufacturing Process Video"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="bg-white/90 text-orange-600 hover:bg-white rounded-full w-20 h-20">
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <ContactSection />

        {/* Enhanced CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-orange-500 to-amber-500" aria-label="Call to action">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Paper Packaging?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join 500+ satisfied clients who trust JJ Enterprises for their paper packaging needs. Get started with our
              3D configurator or speak with our packaging experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/configurator" aria-label="Start designing with 3D configurator">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg hover:scale-105 transition-all border-2 border-white"
                >
                  <Cube className="w-5 h-5 mr-2" />
                  Start 3D Design
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg hover:scale-105 transition-all"
                onClick={() => window.open("tel:+919819256432", "_self")}
                aria-label="Call packaging expert now"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Expert Now
              </Button>
              <Link href="#contact" aria-label="Get instant quote">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Quote
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80 text-sm">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                24-48 Hour Quote Response
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Zero Commitment Consultation
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                15+ Years Trusted Experience
              </span>
            </div>
          </div>
        </section>
      </div>
    </PerformanceMonitor>
  )
}
