"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Box } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCurrency } from "@/lib/currency-context"
import {
  Package,
  Sparkles,
  ShieldCheck,
  Utensils,
  ShoppingBag,
  Leaf,
  ArrowRight,
  Eye,
  Settings,
  Star,
  CheckCircle,
  Zap,
  Award,
} from "lucide-react"
import Link from "next/link"
import type * as THREE from "three"

// 3D Box Component
function AnimatedBox({
  position,
  color,
  scale = 1,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number]
  color: string
  scale?: number
  rotation?: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <Box ref={meshRef} position={position} scale={[scale, scale, scale]} rotation={rotation}>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

// Product data
const products = [
  {
    id: "corrugated",
    title: "Corrugated Shipping Boxes",
    description: "Durable, lightweight corrugated boxes perfect for e-commerce, shipping, and storage needs.",
    icon: Package,
    color: "#8B4513",
    features: ["Lightweight & Strong", "Cost-Effective", "Recyclable", "Custom Sizes"],
    applications: ["E-commerce", "Shipping", "Storage", "Moving"],
    href: "/products/corrugated",
    badge: "Most Popular",
    stats: { strength: "High", cost: "Low", eco: "100%" },
    priceValue: 8,
  },
  {
    id: "luxury",
    title: "Luxury Rigid Gift Boxes",
    description: "Premium rigid boxes with magnetic closures and elegant finishes for luxury products.",
    icon: Sparkles,
    color: "#8B008B",
    features: ["Magnetic Closure", "Premium Materials", "Elegant Design", "Reusable"],
    applications: ["Jewelry", "Cosmetics", "Electronics", "Gifts"],
    href: "/products/luxury-rigid",
    badge: "Premium",
    stats: { strength: "Very High", cost: "High", eco: "95%" },
    priceValue: 45,
  },
  {
    id: "pharma",
    title: "Pharmaceutical Packaging",
    description: "FDA-compliant packaging with tamper-evident features and child-resistant designs.",
    icon: ShieldCheck,
    color: "#0066CC",
    features: ["FDA Compliant", "Tamper Evident", "Child Resistant", "Secure"],
    applications: ["Medicines", "Medical Devices", "Supplements", "Healthcare"],
    href: "/products/pharma",
    badge: "Certified",
    stats: { strength: "Very High", cost: "Medium", eco: "90%" },
    priceValue: 12,
  },
  {
    id: "food",
    title: "Food-Grade Packaging",
    description: "Safe, food-contact approved packaging that maintains freshness and product integrity.",
    icon: Utensils,
    color: "#228B22",
    features: ["Food Safe", "Grease Resistant", "Fresh Seal", "FDA Approved"],
    applications: ["Bakery", "Restaurant", "Catering", "Food Delivery"],
    href: "/products/food-packaging",
    badge: "Food Safe",
    stats: { strength: "High", cost: "Medium", eco: "100%" },
    priceValue: 6,
  },
  {
    id: "ecommerce",
    title: "E-commerce Mailers",
    description: "Optimized shipping solutions designed for online retail and direct-to-consumer delivery.",
    icon: ShoppingBag,
    color: "#FF6347",
    features: ["Lightweight", "Tear Resistant", "Easy Assembly", "Branded"],
    applications: ["Online Retail", "Subscription", "Returns", "Fulfillment"],
    href: "/products/ecommerce-packaging",
    badge: "Trending",
    stats: { strength: "Medium", cost: "Low", eco: "95%" },
    priceValue: 15,
  },
  {
    id: "eco",
    title: "Eco-Friendly Solutions",
    description: "Sustainable packaging made from recycled materials and biodegradable components.",
    icon: Leaf,
    color: "#32CD32",
    features: ["100% Recyclable", "Biodegradable", "FSC Certified", "Carbon Neutral"],
    applications: ["Green Brands", "Organic Products", "Sustainable Retail", "Eco-conscious"],
    href: "/products/eco-friendly",
    badge: "Sustainable",
    stats: { strength: "High", cost: "Medium", eco: "100%" },
    priceValue: 18,
  },
]

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [isLoading, setIsLoading] = useState(false)
  const { formatPrice } = useCurrency()

  const handleProductSelect = (product: (typeof products)[0]) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedProduct(product)
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="space-y-8">
      {/* Product Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {products.map((product) => (
          <Button
            key={product.id}
            variant={selectedProduct.id === product.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleProductSelect(product)}
            className={`flex items-center space-x-2 transition-all duration-300 ${selectedProduct.id === product.id
              ? "bg-orange-500 hover:bg-orange-600 scale-105"
              : "hover:bg-orange-50 hover:text-orange-600"
              }`}
          >
            <product.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{product.title.split(" ")[0]}</span>
            <span className="sm:hidden">{product.title.split(" ")[0].slice(0, 4)}</span>
            {product.badge && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {product.badge}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Main Product Display */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* 3D Visualization */}
        <div className="relative">
          <Card className="overflow-hidden shadow-2xl border-2 border-gray-200 hover:border-orange-200 transition-colors">
            <div className="h-96 md:h-[500px] relative">
              <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />

                  {/* Main Product Box */}
                  <AnimatedBox position={[0, 0, 0]} color={selectedProduct.color} scale={1.5} />

                  {/* Floating Feature Boxes */}
                  <AnimatedBox
                    position={[-3, 1, -1]}
                    color={selectedProduct.color}
                    scale={0.5}
                    rotation={[0.2, 0.3, 0.1]}
                  />
                  <AnimatedBox
                    position={[3, -1, 1]}
                    color={selectedProduct.color}
                    scale={0.7}
                    rotation={[-0.1, -0.2, 0.2]}
                  />
                  <AnimatedBox
                    position={[0, 2.5, -2]}
                    color={selectedProduct.color}
                    scale={0.4}
                    rotation={[0.3, -0.1, -0.2]}
                  />

                  <Environment preset="warehouse" background={false} />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 4}
                  />
                </Suspense>
              </Canvas>

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-sm text-gray-600">Loading 3D Model...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* 3D Controls Info */}
          <div className="absolute bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
            <p>🖱️ Drag to rotate • 🔍 Scroll to zoom</p>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <selectedProduct.icon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedProduct.title}</h3>
                <p className="text-xl font-semibold text-orange-600 mt-1">
                  Starting from {formatPrice(selectedProduct.priceValue)}
                </p>
                {selectedProduct.badge && <Badge className="mt-1 bg-orange-500">{selectedProduct.badge}</Badge>}
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">{selectedProduct.description}</p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-orange-500" />
              Key Features
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {selectedProduct.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-orange-500" />
              Perfect For
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.applications.map((app, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {app}
                </Badge>
              ))}
            </div>
          </div>

          {/* Product Stats */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-orange-500" />
              Specifications
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Strength</p>
                <p className="font-semibold text-sm">{selectedProduct.stats.strength}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Cost</p>
                <p className="font-semibold text-sm">{selectedProduct.stats.cost}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Eco-Friendly</p>
                <p className="font-semibold text-sm">{selectedProduct.stats.eco}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={selectedProduct.href} className="flex-1">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Link href="/configurator" className="flex-1">
              <Button variant="outline" className="w-full hover:bg-orange-50 hover:text-orange-600">
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </Link>
          </div>

          {/* Quick Quote CTA */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Need a Quick Quote?</p>
                <p className="text-sm text-gray-600">Get pricing in 24-48 hours</p>
              </div>
              <Link href="/contact">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Get Quote
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Product Grid */}
      <div className="mt-12">
        <h4 className="text-xl font-semibold text-center text-gray-800 mb-8">Explore All Our Packaging Solutions</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .filter((p) => p.id !== selectedProduct.id)
            .slice(0, 3)
            .map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => handleProductSelect(product)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <product.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg">{product.title}</CardTitle>
                    </div>
                    {product.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
