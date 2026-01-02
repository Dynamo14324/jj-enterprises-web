"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  FlaskConical,
  Lock,
  Star,
  Download,
  Share2,
  Heart,
  ShoppingCart,
  Calculator,
  Eye,
  Filter,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Thermometer,
} from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface PharmaProduct {
  id: string
  name: string
  sku: string
  category: string
  subcategory: string
  description: string
  detailedDescription: string
  imageUrl: string
  images: string[]
  specifications: {
    materials: string[]
    thickness: number[]
    barriers: string[]
    closures: string[]
    dimensions: {
      minLength: number
      maxLength: number
      minWidth: number
      maxWidth: number
      minHeight: number
      maxHeight: number
    }
    colors: string[]
    printing: string[]
  }
  features: string[]
  benefits: string[]
  applications: string[]
  pricing: {
    basePrice: number
    priceRange: string
    moq: number
    bulkDiscounts: { quantity: number; discount: number }[]
  }
  availability: "In Stock" | "Made to Order" | "Out of Stock"
  leadTime: string
  warranty: string
  certifications: string[]
  complianceFeatures: {
    fdaApproved: boolean
    childResistant: boolean
    tamperEvident: boolean
    moistureBarrier: boolean
    lightProtection: boolean
    temperatureStable: boolean
  }
  rating: number
  reviewCount: number
  tags: string[]
}

const pharmaProducts: PharmaProduct[] = [
  {
    id: "pharma-blister-pack",
    name: "Pharmaceutical Blister Pack",
    sku: "PHA-BLI-001",
    category: "Pharma Packaging",
    subcategory: "Blister Packs",
    description:
      "FDA-approved blister packaging for tablets and capsules with superior barrier properties and tamper evidence.",
    detailedDescription:
      "Our pharmaceutical blister packs are engineered to meet the highest standards of drug packaging. Featuring multi-layer barrier films and precision thermoforming, these packs provide excellent protection against moisture, oxygen, and light while maintaining product integrity throughout the shelf life. The tamper-evident design ensures patient safety and regulatory compliance.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      materials: ["PVC/PVDC", "Aclar", "Cold Form Aluminum", "Paper Board"],
      thickness: [0.25, 0.3, 0.35, 0.4],
      barriers: ["Moisture Barrier", "Oxygen Barrier", "Light Barrier", "Aroma Barrier"],
      closures: ["Heat Seal", "Peelable Seal", "Push-Through"],
      dimensions: {
        minLength: 5,
        maxLength: 30,
        minWidth: 3,
        maxWidth: 20,
        minHeight: 0.5,
        maxHeight: 2,
      },
      colors: ["Clear", "Amber", "White", "Custom"],
      printing: ["Flexographic", "Gravure", "Digital", "Screen Print"],
    },
    features: [
      "FDA approved materials",
      "Tamper-evident design",
      "Superior barrier properties",
      "Child-resistant options",
      "Precision cavity formation",
      "Easy peel backing",
    ],
    benefits: [
      "Extended shelf life",
      "Patient safety assurance",
      "Regulatory compliance",
      "Dose accuracy",
      "Contamination prevention",
      "Brand protection",
    ],
    applications: [
      "Tablet packaging",
      "Capsule packaging",
      "Medical devices",
      "Diagnostic kits",
      "Nutraceuticals",
      "Veterinary medicines",
    ],
    pricing: {
      basePrice: 2.5,
      priceRange: "₹2 - ₹15 per unit",
      moq: 1000,
      bulkDiscounts: [
        { quantity: 5000, discount: 5 },
        { quantity: 10000, discount: 10 },
        { quantity: 25000, discount: 15 },
        { quantity: 50000, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "10-14 business days",
    warranty: "Quality guarantee - FDA compliance assured",
    certifications: ["FDA Approved", "ISO 15378", "GMP Certified", "USP Class VI"],
    complianceFeatures: {
      fdaApproved: true,
      childResistant: true,
      tamperEvident: true,
      moistureBarrier: true,
      lightProtection: true,
      temperatureStable: true,
    },
    rating: 4.9,
    reviewCount: 78,
    tags: ["blister", "fda-approved", "tamper-evident", "barrier", "pharmaceutical"],
  },
  {
    id: "pharma-bottle-label",
    name: "Pharmaceutical Bottle with Label",
    sku: "PHA-BOT-002",
    category: "Pharma Packaging",
    subcategory: "Bottles & Vials",
    description: "High-quality pharmaceutical bottles with compliant labeling for liquid medications and supplements.",
    detailedDescription:
      "Our pharmaceutical bottles are manufactured from USP Class VI materials with precision molding for consistent quality. Each bottle comes with FDA-compliant labeling options including variable data printing for lot numbers, expiry dates, and barcodes. The child-resistant closures and tamper-evident features ensure maximum safety and regulatory compliance.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      materials: ["HDPE", "PET", "Glass Type III", "Amber Glass"],
      thickness: [1.0, 1.5, 2.0, 2.5],
      barriers: ["UV Protection", "Moisture Barrier", "Chemical Resistance"],
      closures: ["Child Resistant Cap", "Tamper Evident", "Dropper Cap", "Pump Dispenser"],
      dimensions: {
        minLength: 3,
        maxLength: 15,
        minWidth: 3,
        maxWidth: 10,
        minHeight: 5,
        maxHeight: 25,
      },
      colors: ["Clear", "Amber", "Blue", "White", "Custom"],
      printing: ["Direct Print", "Label Application", "Sleeve Label", "Shrink Sleeve"],
    },
    features: [
      "USP Class VI materials",
      "Child-resistant closures",
      "Tamper-evident seals",
      "UV protection available",
      "Precision volume control",
      "Leak-proof design",
    ],
    benefits: [
      "Patient safety compliance",
      "Extended product stability",
      "Accurate dosing",
      "Regulatory approval",
      "Brand differentiation",
      "Inventory efficiency",
    ],
    applications: [
      "Liquid medications",
      "Syrups and suspensions",
      "Eye drops",
      "Nasal sprays",
      "Dietary supplements",
      "Veterinary liquids",
    ],
    pricing: {
      basePrice: 8.75,
      priceRange: "₹6 - ₹35 per unit",
      moq: 500,
      bulkDiscounts: [
        { quantity: 1000, discount: 5 },
        { quantity: 2500, discount: 10 },
        { quantity: 5000, discount: 15 },
        { quantity: 10000, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "12-16 business days",
    warranty: "Quality guarantee - USP compliance assured",
    certifications: ["FDA Approved", "USP Class VI", "ISO 15378", "cGMP Certified"],
    complianceFeatures: {
      fdaApproved: true,
      childResistant: true,
      tamperEvident: true,
      moistureBarrier: true,
      lightProtection: true,
      temperatureStable: true,
    },
    rating: 4.8,
    reviewCount: 92,
    tags: ["bottles", "liquid", "child-resistant", "usp-class-vi", "compliant"],
  },
  {
    id: "pharma-sterile-pouch",
    name: "Sterile Medical Device Pouch",
    sku: "PHA-STE-003",
    category: "Pharma Packaging",
    subcategory: "Sterile Packaging",
    description:
      "Sterile barrier pouches for medical devices with validated sterilization compatibility and aseptic presentation.",
    detailedDescription:
      "Our sterile medical device pouches are designed for critical healthcare applications requiring aseptic presentation. Manufactured in ISO 14644 cleanroom environments, these pouches feature validated barrier materials compatible with gamma, ETO, and steam sterilization. The transparent film allows for easy product identification while maintaining sterile integrity until point of use.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      materials: ["Tyvek", "Medical Grade Paper", "Transparent Film", "Coextruded Film"],
      thickness: [0.05, 0.08, 0.1, 0.12],
      barriers: ["Microbial Barrier", "Particulate Barrier", "Moisture Control"],
      closures: ["Heat Seal", "Self Seal", "Chevron Seal"],
      dimensions: {
        minLength: 5,
        maxLength: 50,
        minWidth: 3,
        maxWidth: 40,
        minHeight: 0.1,
        maxHeight: 5,
      },
      colors: ["Clear/Blue", "Clear/White", "All Clear", "Custom"],
      printing: ["Medical Grade Ink", "Sterilization Indicators", "Lot Coding"],
    },
    features: [
      "Sterile barrier system",
      "Validated sterilization",
      "Aseptic presentation",
      "Tear-resistant design",
      "Easy peel opening",
      "Cleanroom manufactured",
    ],
    benefits: [
      "Patient safety assurance",
      "Sterility maintenance",
      "Regulatory compliance",
      "Contamination prevention",
      "Shelf life extension",
      "Cost-effective solution",
    ],
    applications: [
      "Surgical instruments",
      "Medical implants",
      "Diagnostic devices",
      "Catheters and tubing",
      "Wound care products",
      "Laboratory equipment",
    ],
    pricing: {
      basePrice: 12.5,
      priceRange: "₹8 - ₹45 per unit",
      moq: 250,
      bulkDiscounts: [
        { quantity: 500, discount: 5 },
        { quantity: 1000, discount: 10 },
        { quantity: 2500, discount: 15 },
        { quantity: 5000, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "14-21 business days",
    warranty: "Sterility guarantee - Validated barrier performance",
    certifications: ["ISO 11607", "ISO 14644", "FDA 510(k)", "CE Marked"],
    complianceFeatures: {
      fdaApproved: true,
      childResistant: false,
      tamperEvident: true,
      moistureBarrier: true,
      lightProtection: false,
      temperatureStable: true,
    },
    rating: 4.9,
    reviewCount: 45,
    tags: ["sterile", "medical-device", "barrier", "cleanroom", "validated"],
  },
]

const subcategories = ["All", ...new Set(pharmaProducts.map((p) => p.subcategory))]
const materials = ["All", ...new Set(pharmaProducts.flatMap((p) => p.specifications.materials))]
const barriers = ["All", ...new Set(pharmaProducts.flatMap((p) => p.specifications.barriers))]

export default function PharmaPackagingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [selectedMaterial, setSelectedMaterial] = useState("All")
  const [selectedBarrier, setSelectedBarrier] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [selectedProduct, setSelectedProduct] = useState<PharmaProduct | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const router = useRouter()

  const filteredProducts = useMemo(() => {
    const filtered = pharmaProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSubcategory = selectedSubcategory === "All" || product.subcategory === selectedSubcategory
      const matchesMaterial = selectedMaterial === "All" || product.specifications.materials.includes(selectedMaterial)
      const matchesBarrier = selectedBarrier === "All" || product.specifications.barriers.includes(selectedBarrier)

      return matchesSearch && matchesSubcategory && matchesMaterial && matchesBarrier
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricing.basePrice - b.pricing.basePrice
        case "price-high":
          return b.pricing.basePrice - a.pricing.basePrice
        case "rating":
          return b.rating - a.rating
        case "popularity":
          return b.reviewCount - a.reviewCount
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedSubcategory, selectedMaterial, selectedBarrier, sortBy])

  const handleAddToCart = (product: PharmaProduct) => {
    const cartItem = {
      id: Date.now(),
      type: "product",
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.pricing.basePrice,
      quantity: product.pricing.moq,
      image: product.imageUrl,
      specifications: product.specifications,
      createdAt: new Date().toISOString(),
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]))

    toast.success(`${product.name} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => router.push("/checkout"),
      },
    })
  }

  const handleRequestQuote = (product: PharmaProduct) => {
    const quoteData = {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      specifications: product.specifications,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("quoteRequest", JSON.stringify(quoteData))
    router.push(`/quote?product=${product.id}`)
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Pharmaceutical Packaging</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/products">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Pharmaceutical Packaging</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                FDA-compliant, sterile, and secure packaging solutions designed for the pharmaceutical and medical
                device industries.
              </p>
            </div>
            <div className="hidden md:block">
              <FlaskConical className="w-32 h-32 text-white/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Compliance Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Regulatory Compliance Assured</h3>
              <p className="text-blue-800 text-sm">
                All pharmaceutical packaging products are manufactured in compliance with FDA, ISO 15378, and cGMP
                standards. Each product includes necessary documentation for regulatory submissions.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-blue-600" />
              Filter & Search Pharmaceutical Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search">Search Products</Label>
                <Input
                  id="search"
                  placeholder="Search pharmaceutical packaging..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="subcategory">Category</Label>
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="material">Material</Label>
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="barrier">Barrier Type</Label>
                <Select value={selectedBarrier} onValueChange={setSelectedBarrier}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {barriers.map((barrier) => (
                      <SelectItem key={barrier} value={barrier}>
                        {barrier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sort">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {pharmaProducts.length} pharmaceutical products
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Compliance Docs
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-blue-200"
              >
                <div className="relative">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${
                        product.availability === "In Stock"
                          ? "bg-green-500"
                          : product.availability === "Made to Order"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                    >
                      {product.availability}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      FDA Approved
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviewCount})</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit mt-2 bg-blue-100 text-blue-700">
                    {product.subcategory}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  {/* Compliance Features */}
                  <div className="flex flex-wrap gap-1">
                    {product.complianceFeatures.fdaApproved && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        FDA
                      </Badge>
                    )}
                    {product.complianceFeatures.childResistant && (
                      <Badge variant="outline" className="text-xs">
                        <Lock className="w-3 h-3 mr-1" />
                        Child Resistant
                      </Badge>
                    )}
                    {product.complianceFeatures.tamperEvident && (
                      <Badge variant="outline" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Tamper Evident
                      </Badge>
                    )}
                    {product.complianceFeatures.temperatureStable && (
                      <Badge variant="outline" className="text-xs">
                        <Thermometer className="w-3 h-3 mr-1" />
                        Temp Stable
                      </Badge>
                    )}
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-blue-500 mr-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-blue-600">₹{product.pricing.basePrice}</p>
                        <p className="text-xs text-gray-600">MOQ: {product.pricing.moq} units</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Lead Time</p>
                        <p className="text-sm font-medium">{product.leadTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <FileCheck className="w-3 h-3 mr-1" />
                      {product.certifications[0]}
                    </Badge>
                    {product.certifications.length > 1 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.certifications.length - 1} more
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <div className="p-4 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" onClick={() => handleRequestQuote(product)}>
                      Get Quote
                    </Button>
                  </div>
                  <Link href={`/configurator?productId=${product.id}`}>
                    <Button variant="secondary" className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Customize
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FlaskConical className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No pharmaceutical products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  <Button variant="ghost" onClick={() => setSelectedProduct(null)}>
                    ×
                  </Button>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={selectedProduct.imageUrl || "/placeholder.svg"}
                          alt={selectedProduct.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Description</h3>
                          <p className="text-gray-600">{selectedProduct.detailedDescription}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Key Benefits</h3>
                          <ul className="space-y-1">
                            {selectedProduct.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Materials & Construction</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Materials:</span>
                              <span>{selectedProduct.specifications.materials.join(", ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thickness:</span>
                              <span>
                                {Math.min(...selectedProduct.specifications.thickness)} -{" "}
                                {Math.max(...selectedProduct.specifications.thickness)}mm
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Barriers:</span>
                              <span>{selectedProduct.specifications.barriers.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Closure Options</h3>
                          <ul className="text-sm space-y-1">
                            {selectedProduct.specifications.closures.map((closure, index) => (
                              <li key={index}>• {closure}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Dimensions (cm)</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Length:</span>
                              <span>
                                {selectedProduct.specifications.dimensions.minLength} -{" "}
                                {selectedProduct.specifications.dimensions.maxLength}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Width:</span>
                              <span>
                                {selectedProduct.specifications.dimensions.minWidth} -{" "}
                                {selectedProduct.specifications.dimensions.maxWidth}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Height:</span>
                              <span>
                                {selectedProduct.specifications.dimensions.minHeight} -{" "}
                                {selectedProduct.specifications.dimensions.maxHeight}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Applications</h3>
                          <ul className="text-sm space-y-1">
                            {selectedProduct.applications.map((app, index) => (
                              <li key={index}>• {app}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="compliance" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Compliance Features</h3>
                        <div className="space-y-3">
                          {Object.entries(selectedProduct.complianceFeatures).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="capitalize text-sm">{key.replace(/([A-Z])/g, " $1")}</span>
                              <div className="flex items-center">
                                {value ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Certifications</h3>
                        <div className="space-y-2">
                          {selectedProduct.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2">
                              <FileCheck className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Documentation Available</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Certificate of Analysis (COA)</li>
                            <li>• Material Safety Data Sheet (MSDS)</li>
                            <li>• FDA Drug Master File (DMF)</li>
                            <li>• Extractables & Leachables Study</li>
                            <li>• Validation Protocols</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Pricing Structure</h3>
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            ₹{selectedProduct.pricing.basePrice}
                          </div>
                          <p className="text-sm text-gray-600">Base price per unit</p>
                          <p className="text-sm text-gray-600">MOQ: {selectedProduct.pricing.moq} units</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Volume Discounts</h3>
                        <div className="space-y-2">
                          {selectedProduct.pricing.bulkDiscounts.map((discount, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm">{discount.quantity}+ units</span>
                              <Badge variant="secondary">{discount.discount}% off</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator className="my-6" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={() => toggleFavorite(selectedProduct.id)}>
                      <Heart
                        className={`w-4 h-4 mr-2 ${favorites.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                      {favorites.includes(selectedProduct.id) ? "Favorited" : "Add to Favorites"}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => handleRequestQuote(selectedProduct)}>
                      Get Quote
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => handleAddToCart(selectedProduct)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
