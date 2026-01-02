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
  Sparkles,
  Crown,
  Gift,
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
  Palette,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface LuxuryProduct {
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
    finishes: string[]
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
    customization: string[]
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
  luxuryFeatures: {
    magneticClosure: boolean
    foilStamping: boolean
    embossing: boolean
    ribbonPull: boolean
    velvetLining: boolean
    windowCutout: boolean
  }
  rating: number
  reviewCount: number
  tags: string[]
}

const luxuryProducts: LuxuryProduct[] = [
  {
    id: "luxury-magnetic-gift-box",
    name: "Magnetic Closure Gift Box",
    sku: "LUX-MAG-001",
    category: "Luxury Rigid Boxes",
    subcategory: "Gift Boxes",
    description:
      "Premium magnetic closure gift boxes with elegant design and superior build quality for luxury presentations.",
    detailedDescription:
      "Our magnetic closure gift boxes represent the pinnacle of luxury packaging. Crafted from high-quality rigid board with precision engineering, these boxes feature strong neodymium magnets for a satisfying closure experience. The premium materials and flawless construction make them perfect for high-end products, corporate gifts, and special occasions where presentation is paramount.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      materials: ["1200gsm Grey Board", "Art Paper", "Specialty Paper", "Textured Paper"],
      thickness: [2, 3, 4, 5],
      finishes: ["Matte Lamination", "Gloss Lamination", "Soft Touch", "Linen Texture"],
      closures: ["Magnetic", "Ribbon Tie", "Tuck-in Flap"],
      dimensions: {
        minLength: 8,
        maxLength: 50,
        minWidth: 6,
        maxWidth: 40,
        minHeight: 3,
        maxHeight: 25,
      },
      colors: ["Black", "White", "Navy Blue", "Burgundy", "Gold", "Silver", "Custom Pantone"],
      customization: ["Hot Foil Stamping", "Embossing", "Debossing", "UV Spot", "Custom Insert"],
    },
    features: [
      "Strong magnetic closure",
      "Premium rigid construction",
      "Smooth matte finish",
      "Custom foil stamping available",
      "Precision die-cutting",
      "Luxury presentation",
    ],
    benefits: [
      "Creates premium unboxing experience",
      "Reusable and durable",
      "Enhances brand perception",
      "Perfect for gifting",
      "Professional appearance",
      "Customizable branding",
    ],
    applications: [
      "Luxury product packaging",
      "Corporate gifts",
      "Jewelry boxes",
      "Cosmetics packaging",
      "Electronics packaging",
      "Wedding favors",
    ],
    pricing: {
      basePrice: 45.0,
      priceRange: "₹35 - ₹150 per unit",
      moq: 50,
      bulkDiscounts: [
        { quantity: 100, discount: 5 },
        { quantity: 250, discount: 10 },
        { quantity: 500, discount: 15 },
        { quantity: 1000, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "7-10 business days",
    warranty: "Premium quality guarantee - Perfect finish or remake",
    certifications: ["ISO 9001:2015", "FSC Certified", "Luxury Packaging Standards"],
    luxuryFeatures: {
      magneticClosure: true,
      foilStamping: true,
      embossing: true,
      ribbonPull: false,
      velvetLining: false,
      windowCutout: false,
    },
    rating: 4.9,
    reviewCount: 127,
    tags: ["luxury", "magnetic", "premium", "gift", "customizable", "corporate"],
  },
  {
    id: "luxury-jewelry-box-velvet",
    name: "Velvet Lined Jewelry Box",
    sku: "LUX-JEW-002",
    category: "Luxury Rigid Boxes",
    subcategory: "Jewelry Boxes",
    description: "Exquisite jewelry boxes with plush velvet lining and sophisticated design for precious items.",
    detailedDescription:
      "Our velvet-lined jewelry boxes are meticulously crafted for the most precious items. Featuring premium rigid construction with luxurious velvet interior, these boxes provide both protection and elegance. The soft velvet lining prevents scratching while the rigid exterior ensures maximum protection. Perfect for engagement rings, necklaces, watches, and other valuable jewelry pieces.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      materials: ["1500gsm Grey Board", "Leatherette", "Velvet Lining", "Satin Lining"],
      thickness: [3, 4, 5],
      finishes: ["Leatherette Wrap", "Fabric Wrap", "Paper Wrap", "Embossed Texture"],
      closures: ["Hinged Lid", "Magnetic", "Snap Closure"],
      dimensions: {
        minLength: 5,
        maxLength: 30,
        minWidth: 4,
        maxWidth: 25,
        minHeight: 2,
        maxHeight: 15,
      },
      colors: ["Black Velvet", "Red Velvet", "Blue Velvet", "White Satin", "Cream Satin", "Custom Colors"],
      customization: ["Gold Foil Logo", "Embossed Monogram", "Custom Insert Design", "LED Lighting"],
    },
    features: [
      "Plush velvet interior",
      "Scratch-resistant lining",
      "Precision-fit compartments",
      "Elegant exterior finish",
      "Secure closure system",
      "Custom compartment design",
    ],
    benefits: [
      "Ultimate jewelry protection",
      "Luxurious presentation",
      "Prevents tarnishing",
      "Professional display",
      "Gift-ready packaging",
      "Long-lasting durability",
    ],
    applications: [
      "Engagement ring boxes",
      "Watch presentation",
      "Necklace packaging",
      "Earring storage",
      "Jewelry store display",
      "Gift packaging",
    ],
    pricing: {
      basePrice: 65.0,
      priceRange: "₹50 - ₹200 per unit",
      moq: 25,
      bulkDiscounts: [
        { quantity: 50, discount: 5 },
        { quantity: 100, discount: 10 },
        { quantity: 250, discount: 15 },
        { quantity: 500, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "10-14 business days",
    warranty: "Luxury quality guarantee - Perfect craftsmanship assured",
    certifications: ["ISO 9001:2015", "Jewelry Packaging Standards", "Premium Materials Certified"],
    luxuryFeatures: {
      magneticClosure: true,
      foilStamping: true,
      embossing: true,
      ribbonPull: false,
      velvetLining: true,
      windowCutout: false,
    },
    rating: 4.8,
    reviewCount: 89,
    tags: ["jewelry", "velvet", "luxury", "protection", "elegant", "custom"],
  },
  {
    id: "luxury-cosmetics-window-box",
    name: "Window Display Cosmetics Box",
    sku: "LUX-COS-003",
    category: "Luxury Rigid Boxes",
    subcategory: "Cosmetics Boxes",
    description:
      "Sophisticated cosmetics packaging with clear window display and premium finishing for beauty products.",
    detailedDescription:
      "Our window display cosmetics boxes combine functionality with stunning visual appeal. Featuring a crystal-clear PET window that showcases your product while maintaining protection, these boxes are perfect for premium beauty brands. The rigid construction ensures product safety while the elegant design enhances shelf appeal and brand perception.",
    imageUrl: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    specifications: {
      materials: ["1000gsm Grey Board", "Art Paper", "PET Window", "Anti-Scratch Coating"],
      thickness: [2, 3, 4],
      finishes: ["Soft Touch Lamination", "UV Spot Coating", "Holographic Foil", "Metallic Finish"],
      closures: ["Tuck-in Flap", "Magnetic", "Auto-lock Bottom"],
      dimensions: {
        minLength: 6,
        maxLength: 25,
        minWidth: 4,
        maxWidth: 20,
        minHeight: 3,
        maxHeight: 15,
      },
      colors: ["Rose Gold", "Silver", "Black", "White", "Blush Pink", "Custom Pantone"],
      customization: ["Window Shape", "Foil Stamping", "Embossing", "Custom Insert", "Hang Tab"],
    },
    features: [
      "Crystal clear PET window",
      "Premium rigid construction",
      "Anti-scratch coating",
      "Custom window shapes",
      "Elegant finishing options",
      "Secure product protection",
    ],
    benefits: [
      "Product visibility",
      "Enhanced shelf appeal",
      "Premium brand image",
      "Tamper-evident design",
      "Retail-ready packaging",
      "Customer engagement",
    ],
    applications: [
      "Lipstick packaging",
      "Foundation boxes",
      "Perfume packaging",
      "Skincare products",
      "Makeup palettes",
      "Beauty gift sets",
    ],
    pricing: {
      basePrice: 38.0,
      priceRange: "₹30 - ₹120 per unit",
      moq: 100,
      bulkDiscounts: [
        { quantity: 250, discount: 5 },
        { quantity: 500, discount: 10 },
        { quantity: 1000, discount: 15 },
        { quantity: 2500, discount: 20 },
      ],
    },
    availability: "Made to Order",
    leadTime: "8-12 business days",
    warranty: "Quality guarantee - Perfect window clarity and finish",
    certifications: ["ISO 9001:2015", "Cosmetics Packaging Standards", "Food Grade Materials"],
    luxuryFeatures: {
      magneticClosure: false,
      foilStamping: true,
      embossing: true,
      ribbonPull: false,
      velvetLining: false,
      windowCutout: true,
    },
    rating: 4.7,
    reviewCount: 156,
    tags: ["cosmetics", "window", "display", "beauty", "premium", "retail"],
  },
]

const subcategories = ["All", ...new Set(luxuryProducts.map((p) => p.subcategory))]
const materials = ["All", ...new Set(luxuryProducts.flatMap((p) => p.specifications.materials))]
const finishes = ["All", ...new Set(luxuryProducts.flatMap((p) => p.specifications.finishes))]

export default function LuxuryRigidBoxesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [selectedMaterial, setSelectedMaterial] = useState("All")
  const [selectedFinish, setSelectedFinish] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [selectedProduct, setSelectedProduct] = useState<LuxuryProduct | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const router = useRouter()

  const filteredProducts = useMemo(() => {
    const filtered = luxuryProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSubcategory = selectedSubcategory === "All" || product.subcategory === selectedSubcategory
      const matchesMaterial = selectedMaterial === "All" || product.specifications.materials.includes(selectedMaterial)
      const matchesFinish = selectedFinish === "All" || product.specifications.finishes.includes(selectedFinish)

      return matchesSearch && matchesSubcategory && matchesMaterial && matchesFinish
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
  }, [searchTerm, selectedSubcategory, selectedMaterial, selectedFinish, sortBy])

  const handleAddToCart = (product: LuxuryProduct) => {
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

  const handleRequestQuote = (product: LuxuryProduct) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-purple-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Luxury Rigid Boxes</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/products">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury Rigid Boxes</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Premium rigid packaging solutions that create unforgettable unboxing experiences and elevate your brand.
              </p>
            </div>
            <div className="hidden md:block">
              <Crown className="w-32 h-32 text-white/30" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-purple-600" />
              Filter & Search Luxury Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search">Search Products</Label>
                <Input
                  id="search"
                  placeholder="Search luxury boxes..."
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
                <Label htmlFor="finish">Finish</Label>
                <Select value={selectedFinish} onValueChange={setSelectedFinish}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {finishes.map((finish) => (
                      <SelectItem key={finish} value={finish}>
                        {finish}
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
            Showing {filteredProducts.length} of {luxuryProducts.length} luxury products
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Luxury Catalog
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
                className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-purple-200"
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
                            ? "bg-purple-500"
                            : "bg-red-500"
                      }`}
                    >
                      {product.availability}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Luxury
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
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
                  <Badge variant="secondary" className="w-fit mt-2 bg-purple-100 text-purple-700">
                    {product.subcategory}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  {/* Luxury Features */}
                  <div className="flex flex-wrap gap-1">
                    {product.luxuryFeatures.magneticClosure && (
                      <Badge variant="outline" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Magnetic
                      </Badge>
                    )}
                    {product.luxuryFeatures.foilStamping && (
                      <Badge variant="outline" className="text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        Foil Stamp
                      </Badge>
                    )}
                    {product.luxuryFeatures.velvetLining && (
                      <Badge variant="outline" className="text-xs">
                        <Gift className="w-3 h-3 mr-1" />
                        Velvet
                      </Badge>
                    )}
                    {product.luxuryFeatures.windowCutout && (
                      <Badge variant="outline" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Window
                      </Badge>
                    )}
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Premium Features:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-purple-500 mr-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-purple-600">₹{product.pricing.basePrice}</p>
                        <p className="text-xs text-gray-600">MOQ: {product.pricing.moq} units</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Lead Time</p>
                        <p className="text-sm font-medium">{product.leadTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <Palette className="w-3 h-3 mr-1" />
                      {product.specifications.materials[0]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.specifications.finishes[0]}
                    </Badge>
                  </div>
                </CardContent>

                <div className="p-4 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-purple-500 hover:bg-purple-600" onClick={() => handleAddToCart(product)}>
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
            <Crown className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No luxury products found</h3>
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
                    <TabsTrigger value="luxury">Luxury Features</TabsTrigger>
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
                                <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
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
                              <span>Finishes:</span>
                              <span>{selectedProduct.specifications.finishes.join(", ")}</span>
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

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Pricing Structure</h3>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-2">
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

                  <TabsContent value="luxury" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Luxury Features</h3>
                        <div className="space-y-3">
                          {Object.entries(selectedProduct.luxuryFeatures).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="capitalize text-sm">{key.replace(/([A-Z])/g, " $1")}</span>
                              <div className="flex items-center">
                                {value ? (
                                  <CheckCircle className="w-5 h-5 text-purple-500" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Customization Options</h3>
                        <div className="space-y-2">
                          {selectedProduct.specifications.customization.map((option, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2">
                              <Palette className="w-3 h-3 mr-1" />
                              {option}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Available Colors</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.specifications.colors.map((color, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {color}
                              </Badge>
                            ))}
                          </div>
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
                      className="bg-purple-500 hover:bg-purple-600"
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
