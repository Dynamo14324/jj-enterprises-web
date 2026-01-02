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
  Package,
  Shield,
  Leaf,
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
} from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface CorrugatedProduct {
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
    ply: string[]
    flute: string[]
    gsm: number[]
    dimensions: {
      minLength: number
      maxLength: number
      minWidth: number
      maxWidth: number
      minHeight: number
      maxHeight: number
    }
    materials: string[]
    colors: string[]
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
  sustainability: {
    recyclable: boolean
    biodegradable: boolean
    fscCertified: boolean
    carbonNeutral: boolean
  }
  rating: number
  reviewCount: number
  tags: string[]
}

const corrugatedProducts: CorrugatedProduct[] = [
  {
    id: "corrugated-3ply-shipping",
    name: "3-Ply Corrugated Shipping Box",
    sku: "COR-3PLY-001",
    category: "Corrugated Boxes",
    subcategory: "Shipping Boxes",
    description: "Lightweight yet durable 3-ply corrugated boxes perfect for e-commerce and general shipping needs.",
    detailedDescription:
      "Our 3-ply corrugated shipping boxes are engineered for optimal protection during transit while maintaining cost-effectiveness. Made from high-quality kraft paper with precision fluting, these boxes offer excellent stacking strength and cushioning properties. Ideal for lightweight to medium-weight products, they provide reliable protection against impacts, moisture, and compression forces commonly encountered during shipping and handling.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      ply: ["3-ply"],
      flute: ["B", "C", "E"],
      gsm: [125, 150, 175],
      dimensions: {
        minLength: 10,
        maxLength: 100,
        minWidth: 10,
        maxWidth: 80,
        minHeight: 5,
        maxHeight: 60,
      },
      materials: ["Virgin Kraft", "Recycled Kraft", "Test Liner"],
      colors: ["Natural Brown", "White", "Custom Colors"],
    },
    features: [
      "Lightweight construction",
      "Easy assembly design",
      "Excellent printability",
      "Moisture resistant coating available",
      "Custom die-cutting options",
      "Stackable design",
    ],
    benefits: [
      "Cost-effective shipping solution",
      "Reduces shipping costs due to light weight",
      "Environmentally friendly",
      "Customizable for branding",
      "Quick turnaround time",
      "Reliable protection",
    ],
    applications: [
      "E-commerce packaging",
      "Retail product shipping",
      "Document storage",
      "Gift packaging",
      "Subscription boxes",
      "Return packaging",
    ],
    pricing: {
      basePrice: 8.5,
      priceRange: "₹5 - ₹25 per unit",
      moq: 100,
      bulkDiscounts: [
        { quantity: 500, discount: 5 },
        { quantity: 1000, discount: 10 },
        { quantity: 5000, discount: 15 },
        { quantity: 10000, discount: 20 },
      ],
    },
    availability: "In Stock",
    leadTime: "3-5 business days",
    warranty: "Quality guarantee - 100% defect-free or replacement",
    certifications: ["ISO 9001:2015", "FSC Certified", "BIS Standards"],
    sustainability: {
      recyclable: true,
      biodegradable: true,
      fscCertified: true,
      carbonNeutral: false,
    },
    rating: 4.7,
    reviewCount: 234,
    tags: ["shipping", "lightweight", "eco-friendly", "customizable", "cost-effective"],
  },
  {
    id: "corrugated-5ply-heavy-duty",
    name: "5-Ply Heavy Duty Corrugated Box",
    sku: "COR-5PLY-002",
    category: "Corrugated Boxes",
    subcategory: "Heavy Duty Boxes",
    description: "Robust 5-ply corrugated boxes designed for heavy-duty applications and industrial packaging needs.",
    detailedDescription:
      "Our 5-ply heavy-duty corrugated boxes are built to withstand the most demanding packaging requirements. Featuring double-wall construction with superior edge crush strength and burst strength, these boxes are perfect for heavy products, long-distance shipping, and harsh handling conditions. The multi-layer design provides exceptional protection against impacts, compression, and environmental factors.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      ply: ["5-ply"],
      flute: ["BC", "AB", "AC"],
      gsm: [200, 250, 300],
      dimensions: {
        minLength: 20,
        maxLength: 120,
        minWidth: 15,
        maxWidth: 100,
        minHeight: 10,
        maxHeight: 80,
      },
      materials: ["Virgin Kraft", "High-Strength Test Liner", "Medium Fluting"],
      colors: ["Natural Brown", "White", "Custom Colors"],
    },
    features: [
      "Double-wall construction",
      "Superior edge crush strength",
      "High burst strength rating",
      "Reinforced corners available",
      "Weather-resistant options",
      "Custom structural design",
    ],
    benefits: [
      "Maximum product protection",
      "Suitable for heavy items",
      "Long-distance shipping ready",
      "Reduces damage claims",
      "Professional appearance",
      "Stackable for storage efficiency",
    ],
    applications: [
      "Industrial equipment packaging",
      "Automotive parts shipping",
      "Electronics packaging",
      "Machinery components",
      "Export packaging",
      "Warehouse storage",
    ],
    pricing: {
      basePrice: 18.75,
      priceRange: "₹15 - ₹45 per unit",
      moq: 50,
      bulkDiscounts: [
        { quantity: 250, discount: 5 },
        { quantity: 500, discount: 10 },
        { quantity: 2500, discount: 15 },
        { quantity: 5000, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "5-7 business days",
    warranty: "Quality guarantee - 100% defect-free or replacement",
    certifications: ["ISO 9001:2015", "ISTA Certified", "Export Quality"],
    sustainability: {
      recyclable: true,
      biodegradable: true,
      fscCertified: true,
      carbonNeutral: false,
    },
    rating: 4.9,
    reviewCount: 156,
    tags: ["heavy-duty", "industrial", "double-wall", "export-quality", "durable"],
  },
  {
    id: "corrugated-7ply-export",
    name: "7-Ply Export Quality Corrugated Box",
    sku: "COR-7PLY-003",
    category: "Corrugated Boxes",
    subcategory: "Export Boxes",
    description:
      "Premium 7-ply corrugated boxes engineered for international shipping and extreme protection requirements.",
    detailedDescription:
      "Our 7-ply export quality corrugated boxes represent the pinnacle of packaging protection. Featuring triple-wall construction with multiple flute combinations, these boxes are designed to withstand international shipping conditions, extreme temperatures, humidity variations, and rough handling. Perfect for valuable goods, fragile items, and long-haul transportation where maximum protection is essential.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      ply: ["7-ply"],
      flute: ["ABC", "BAC", "CAB"],
      gsm: [275, 325, 375],
      dimensions: {
        minLength: 30,
        maxLength: 150,
        minWidth: 25,
        maxWidth: 120,
        minHeight: 15,
        maxHeight: 100,
      },
      materials: ["Virgin Kraft", "Export Grade Test Liner", "High-Performance Medium"],
      colors: ["Natural Brown", "White", "Custom Colors"],
    },
    features: [
      "Triple-wall construction",
      "Maximum edge crush strength",
      "Moisture barrier coating",
      "Reinforced structural design",
      "Temperature resistant",
      "Custom bracing options",
    ],
    benefits: [
      "Ultimate product protection",
      "International shipping approved",
      "Extreme condition resistance",
      "Zero damage guarantee",
      "Professional export appearance",
      "Insurance claim reduction",
    ],
    applications: [
      "International exports",
      "High-value goods",
      "Fragile item protection",
      "Long-haul transportation",
      "Hazardous material packaging",
      "Military/Defense applications",
    ],
    pricing: {
      basePrice: 32.5,
      priceRange: "₹25 - ₹75 per unit",
      moq: 25,
      bulkDiscounts: [
        { quantity: 100, discount: 5 },
        { quantity: 250, discount: 10 },
        { quantity: 1000, discount: 15 },
        { quantity: 2500, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "7-10 business days",
    warranty: "Premium quality guarantee - Zero defect commitment",
    certifications: ["ISO 9001:2015", "ISTA 3A Certified", "IATA Approved", "Export License"],
    sustainability: {
      recyclable: true,
      biodegradable: true,
      fscCertified: true,
      carbonNeutral: true,
    },
    rating: 4.9,
    reviewCount: 89,
    tags: ["export-quality", "triple-wall", "premium", "international", "maximum-protection"],
  },
]

const subcategories = ["All", ...new Set(corrugatedProducts.map((p) => p.subcategory))]
const plyOptions = ["All", "3-ply", "5-ply", "7-ply"]
const fluteOptions = ["All", "B", "C", "E", "BC", "AB", "AC", "ABC", "BAC", "CAB"]

export default function CorrugatedBoxesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [selectedPly, setSelectedPly] = useState("All")
  const [selectedFlute, setSelectedFlute] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [selectedProduct, setSelectedProduct] = useState<CorrugatedProduct | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const router = useRouter()

  const filteredProducts = useMemo(() => {
    const filtered = corrugatedProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSubcategory = selectedSubcategory === "All" || product.subcategory === selectedSubcategory
      const matchesPly = selectedPly === "All" || product.specifications.ply.includes(selectedPly)
      const matchesFlute = selectedFlute === "All" || product.specifications.flute.includes(selectedFlute)

      return matchesSearch && matchesSubcategory && matchesPly && matchesFlute
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
  }, [searchTerm, selectedSubcategory, selectedPly, selectedFlute, sortBy])

  const handleAddToCart = (product: CorrugatedProduct) => {
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

  const handleRequestQuote = (product: CorrugatedProduct) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-orange-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Corrugated Boxes</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/products">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Corrugated Boxes</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Durable, versatile, and eco-friendly corrugated packaging solutions for all your shipping and storage
                needs.
              </p>
            </div>
            <div className="hidden md:block">
              <Package className="w-32 h-32 text-white/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-orange-600" />
              Filter & Search Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search">Search Products</Label>
                <Input
                  id="search"
                  placeholder="Search by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
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
                <Label htmlFor="ply">Ply Type</Label>
                <Select value={selectedPly} onValueChange={setSelectedPly}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {plyOptions.map((ply) => (
                      <SelectItem key={ply} value={ply}>
                        {ply}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="flute">Flute Type</Label>
                <Select value={selectedFlute} onValueChange={setSelectedFlute}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fluteOptions.map((flute) => (
                      <SelectItem key={flute} value={flute}>
                        {flute}
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
            Showing {filteredProducts.length} of {corrugatedProducts.length} products
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Catalog
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
                className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
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
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
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
                  <Badge variant="secondary" className="w-fit mt-2">
                    {product.subcategory}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  {/* Key Specifications */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Ply:</span> {product.specifications.ply.join(", ")}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Flute:</span> {product.specifications.flute.join(", ")}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-orange-600">₹{product.pricing.basePrice}</p>
                        <p className="text-xs text-gray-600">MOQ: {product.pricing.moq} units</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Lead Time</p>
                        <p className="text-sm font-medium">{product.leadTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sustainability Icons */}
                  <div className="flex items-center space-x-2">
                    {product.sustainability.recyclable && (
                      <Badge variant="outline" className="text-xs">
                        <Leaf className="w-3 h-3 mr-1" />
                        Recyclable
                      </Badge>
                    )}
                    {product.sustainability.fscCertified && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        FSC
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <div className="p-4 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => handleAddToCart(product)}>
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
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
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
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
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
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
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
                          <h3 className="font-semibold mb-2">Construction</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Ply Options:</span>
                              <span>{selectedProduct.specifications.ply.join(", ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Flute Types:</span>
                              <span>{selectedProduct.specifications.flute.join(", ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GSM Range:</span>
                              <span>
                                {Math.min(...selectedProduct.specifications.gsm)} -{" "}
                                {Math.max(...selectedProduct.specifications.gsm)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Materials</h3>
                          <ul className="text-sm space-y-1">
                            {selectedProduct.specifications.materials.map((material, index) => (
                              <li key={index}>• {material}</li>
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

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Pricing Structure</h3>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            ₹{selectedProduct.pricing.basePrice}
                          </div>
                          <p className="text-sm text-gray-600">Base price per unit</p>
                          <p className="text-sm text-gray-600">MOQ: {selectedProduct.pricing.moq} units</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Bulk Discounts</h3>
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

                  <TabsContent value="sustainability" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Environmental Features</h3>
                        <div className="space-y-3">
                          {Object.entries(selectedProduct.sustainability).map(([key, value]) => (
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
                              <Shield className="w-3 h-3 mr-1" />
                              {cert}
                            </Badge>
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
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
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
