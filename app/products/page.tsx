"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Filter, Grid, List, Star, Eye, Calculator, Download, Heart, CheckCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCurrency } from "@/lib/currency-context"
import { addToCart } from "@/lib/cart-utils"
import { toast } from "sonner"

// Product data
const products = [
  {
    id: "corrugated-shipping",
    name: "Corrugated Shipping Boxes",
    category: "Corrugated",
    description:
      "Durable, lightweight corrugated boxes perfect for e-commerce, shipping, and storage needs with excellent protection.",
    image: "/placeholder.svg?height=300&width=400&text=Corrugated+Boxes",
    features: ["Lightweight & Strong", "Cost-Effective", "100% Recyclable", "Custom Sizes Available"],
    applications: ["E-commerce", "Shipping", "Storage", "Moving"],
    href: "/products/corrugated",
    badge: "Most Popular",
    rating: 4.8,
    reviews: 234,
    price: "Starting from ₹8",
    priceValue: 8,
    leadTime: "3-5 days",
    moq: "100 units",
    tags: ["shipping", "ecommerce", "recyclable", "cost-effective"],
  },
  {
    id: "luxury-rigid",
    name: "Luxury Rigid Gift Boxes",
    category: "Luxury",
    description:
      "Premium rigid boxes with magnetic closures and elegant finishes perfect for luxury products and gifts.",
    image: "/placeholder.svg?height=300&width=400&text=Luxury+Gift+Boxes",
    features: ["Magnetic Closure", "Premium Materials", "Elegant Design", "Reusable"],
    applications: ["Jewelry", "Cosmetics", "Electronics", "Corporate Gifts"],
    href: "/products/luxury-rigid",
    badge: "Premium",
    rating: 4.9,
    reviews: 127,
    price: "Starting from ₹45",
    priceValue: 45,
    leadTime: "7-10 days",
    moq: "50 units",
    tags: ["luxury", "premium", "magnetic", "gift"],
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical Packaging",
    category: "Healthcare",
    description:
      "FDA-compliant packaging with tamper-evident features and child-resistant designs for medical products.",
    image: "/placeholder.svg?height=300&width=400&text=Pharma+Packaging",
    features: ["FDA Compliant", "Tamper Evident", "Child Resistant", "Secure"],
    applications: ["Medicines", "Medical Devices", "Supplements", "Healthcare"],
    href: "/products/pharma",
    badge: "Certified",
    rating: 4.9,
    reviews: 78,
    price: "Starting from ₹12",
    priceValue: 12,
    leadTime: "10-14 days",
    moq: "250 units",
    tags: ["pharmaceutical", "fda", "medical", "secure"],
  },
  {
    id: "food-grade",
    name: "Food-Grade Packaging",
    category: "Food & Beverage",
    description: "Safe, food-contact approved packaging that maintains freshness and product integrity for food items.",
    image: "/placeholder.svg?height=300&width=400&text=Food+Grade+Boxes",
    features: ["Food Safe", "Grease Resistant", "Fresh Seal", "FDA Approved"],
    applications: ["Bakery", "Restaurant", "Catering", "Food Delivery"],
    href: "/products/food-packaging",
    badge: "Food Safe",
    rating: 4.7,
    reviews: 156,
    price: "Starting from ₹15",
    priceValue: 15,
    leadTime: "5-7 days",
    moq: "200 units",
    tags: ["food-safe", "restaurant", "bakery", "fresh"],
  },
  {
    id: "ecommerce-mailers",
    name: "E-commerce Mailers",
    category: "E-commerce",
    description:
      "Optimized shipping solutions designed for online retail and direct-to-consumer delivery with branding options.",
    image: "/placeholder.svg?height=300&width=400&text=Ecommerce+Mailers",
    features: ["Lightweight", "Tear Resistant", "Easy Assembly", "Custom Branding"],
    applications: ["Online Retail", "Subscription Boxes", "Returns", "Fulfillment"],
    href: "/products/ecommerce-packaging",
    badge: "Trending",
    rating: 4.6,
    reviews: 203,
    price: "Starting from ₹6",
    priceValue: 6,
    leadTime: "4-6 days",
    moq: "500 units",
    tags: ["ecommerce", "mailers", "online", "branding"],
  },
  {
    id: "eco-friendly",
    name: "Eco-Friendly Solutions",
    category: "Sustainable",
    description:
      "Sustainable packaging made from recycled materials and biodegradable components for environmentally conscious brands.",
    image: "/placeholder.svg?height=300&width=400&text=Eco+Friendly+Packaging",
    features: ["100% Recyclable", "Biodegradable", "FSC Certified", "Carbon Neutral"],
    applications: ["Green Brands", "Organic Products", "Sustainable Retail", "Eco-conscious"],
    href: "/products/eco-friendly",
    badge: "Sustainable",
    rating: 4.8,
    reviews: 89,
    price: "Starting from ₹18",
    priceValue: 18,
    leadTime: "6-8 days",
    moq: "150 units",
    tags: ["eco-friendly", "sustainable", "recyclable", "green"],
  },
  {
    id: "folding-cartons",
    name: "Folding Paper Cartons",
    category: "Retail",
    description:
      "Versatile folding cartons perfect for retail packaging with excellent printability and customization options.",
    image: "/placeholder.svg?height=300&width=400&text=Folding+Cartons",
    features: ["Lightweight", "Printable", "Cost-Effective", "Versatile"],
    applications: ["Retail Products", "Cosmetics", "Electronics", "Consumer Goods"],
    href: "/products/folding-cartons",
    badge: "Versatile",
    rating: 4.5,
    reviews: 112,
    price: "Starting from ₹10",
    priceValue: 10,
    leadTime: "5-7 days",
    moq: "300 units",
    tags: ["folding", "retail", "printable", "versatile"],
  },
  {
    id: "custom-design",
    name: "Custom Design Solutions",
    category: "Custom",
    description: "Bespoke packaging solutions designed from scratch to meet your unique requirements and brand vision.",
    image: "/placeholder.svg?height=300&width=400&text=Custom+Design",
    features: ["Fully Custom", "3D Prototyping", "Brand Integration", "Unique Shapes"],
    applications: ["Unique Products", "Brand Launches", "Special Events", "Premium Lines"],
    href: "/products/custom-design",
    badge: "Bespoke",
    rating: 5.0,
    reviews: 45,
    price: "Quote on Request",
    priceValue: 0,
    leadTime: "14-21 days",
    moq: "25 units",
    tags: ["custom", "bespoke", "unique", "design"],
  },
]

const categories = [
  "All",
  "Corrugated",
  "Luxury",
  "Healthcare",
  "Food & Beverage",
  "E-commerce",
  "Sustainable",
  "Retail",
  "Custom",
]
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
]

export default function ProductsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  const { formatPrice } = useCurrency()

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return a.price.localeCompare(b.price)
        case "price-high":
          return b.price.localeCompare(a.price)
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id.localeCompare(a.id)
        default: // popular
          return b.reviews - a.reviews
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: any) => {
    const item = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.priceValue > 0 ? `₹${product.priceValue}` : product.price,
      quantity: 1,
      image: product.image,
      sku: `JJ-${product.id.toUpperCase()}`,
      specifications: {
        dimensions: "Standard",
        material: product.category,
        moq: product.moq
      }
    }

    addToCart(item)
    toast.success(`${product.name} added to cart!`, {
      description: "You can view and manage your items in the cart.",
      action: {
        label: "View Cart",
        onClick: () => router.push("/checkout")
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Complete Paper Packaging Solutions</h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our comprehensive range of high-quality paper packaging products designed for every industry and
              application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
                onClick={() => document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Package className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
              <Link href="/configurator">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  3D Configurator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">2,500+</div>
              <div className="text-sm text-gray-600">Product Variants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Product Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24-48h</div>
              <div className="text-sm text-gray-600">Quote Response</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8" id="products-section">
        {/* Filters and Search */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-orange-600" />
              Find Your Perfect Packaging Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </span>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Catalog
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid/List */}
        {filteredAndSortedProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"
            }
          >
            {filteredAndSortedProducts.map((product) => (
              <Card
                key={product.id}
                className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${viewMode === "list" ? "flex flex-col md:flex-row" : ""
                  }`}
              >
                <div className={`relative ${viewMode === "list" ? "md:w-1/3" : "h-48"} overflow-hidden`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
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
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-500">{product.badge}</Badge>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "md:w-2/3 flex flex-col justify-between" : ""}`}>
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {product.applications.slice(0, 3).map((app, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Pricing and Details */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <p className="font-semibold text-orange-600">
                            {product.priceValue > 0 ? `Starting from ${formatPrice(product.priceValue)}` : product.price}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Lead Time:</span>
                          <p className="font-semibold">{product.leadTime}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">MOQ:</span>
                          <p className="font-semibold">{product.moq}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleAddToCart(product)}
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={product.href}>
                        <Button variant="outline" className="w-full" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </Link>
                      <Link href="/configurator">
                        <Button variant="secondary" className="w-full" size="sm">
                          <Calculator className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our packaging experts can help you find the perfect solution or create a custom design that meets your
            specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600">Contact Our Experts</Button>
            </Link>
            <Link href="/products/custom-design">
              <Button variant="outline">Custom Design Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
