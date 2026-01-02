"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Grid,
  List,
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Download,
  Package,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Enhanced product data with more comprehensive information
const catalogProducts = [
  {
    id: "cat-001",
    name: "Premium Corrugated Shipping Box",
    category: "Corrugated Boxes",
    subcategory: "Shipping Solutions",
    description: "Heavy-duty corrugated boxes perfect for e-commerce shipping with superior protection and durability.",
    longDescription:
      "Our premium corrugated shipping boxes are engineered for maximum protection during transit. Made from high-quality recycled materials with reinforced corners and edges. Available in multiple wall thicknesses (3-ply, 5-ply, 7-ply) to suit different shipping requirements.",
    image: "/placeholder.svg?height=400&width=400&text=Corrugated+Box",
    images: [
      "/placeholder.svg?height=400&width=400&text=Corrugated+Box+1",
      "/placeholder.svg?height=400&width=400&text=Corrugated+Box+2",
      "/placeholder.svg?height=400&width=400&text=Corrugated+Box+3",
    ],
    price: "₹12.50",
    originalPrice: "₹15.00",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    stockCount: 1500,
    sku: "CB-PREM-001",
    dimensions: "30cm x 20cm x 15cm",
    weight: "250g",
    material: "Recycled Corrugated Cardboard",
    features: ["Water Resistant", "Stackable Design", "Easy Assembly", "100% Recyclable"],
    applications: ["E-commerce", "Retail Shipping", "Storage", "Moving"],
    certifications: ["FSC Certified", "ISO 9001"],
    leadTime: "3-5 business days",
    moq: "100 units",
    tags: ["bestseller", "eco-friendly", "shipping", "durable"],
    featured: true,
    discount: 17,
    href: "/products/corrugated/premium-shipping-box",
  },
  {
    id: "cat-002",
    name: "Luxury Magnetic Gift Box",
    category: "Gift Boxes",
    subcategory: "Luxury Packaging",
    description: "Elegant rigid gift boxes with magnetic closure, perfect for premium products and special occasions.",
    longDescription:
      "Create an unforgettable unboxing experience with our luxury magnetic gift boxes. Featuring premium materials, sophisticated finishes, and secure magnetic closures. Ideal for jewelry, cosmetics, electronics, and corporate gifts.",
    image: "/placeholder.svg?height=400&width=400&text=Luxury+Gift+Box",
    images: [
      "/placeholder.svg?height=400&width=400&text=Luxury+Box+1",
      "/placeholder.svg?height=400&width=400&text=Luxury+Box+2",
      "/placeholder.svg?height=400&width=400&text=Luxury+Box+3",
    ],
    price: "₹85.00",
    originalPrice: "₹95.00",
    rating: 4.9,
    reviews: 127,
    inStock: true,
    stockCount: 450,
    sku: "GB-LUX-002",
    dimensions: "25cm x 20cm x 8cm",
    weight: "180g",
    material: "Rigid Cardboard with Soft Touch Coating",
    features: ["Magnetic Closure", "Soft Touch Finish", "Custom Foiling", "Reusable"],
    applications: ["Jewelry", "Cosmetics", "Electronics", "Corporate Gifts"],
    certifications: ["Premium Quality", "Luxury Standard"],
    leadTime: "7-10 business days",
    moq: "50 units",
    tags: ["luxury", "premium", "magnetic", "gift"],
    featured: true,
    discount: 11,
    href: "/products/gift-boxes/luxury-magnetic",
  },
  {
    id: "cat-003",
    name: "Food Grade Takeout Container",
    category: "Food Packaging",
    subcategory: "Takeout Solutions",
    description: "FDA-approved food-safe containers perfect for restaurants, cafes, and food delivery services.",
    longDescription:
      "Our food-grade takeout containers are designed to maintain food freshness and safety. Made from FDA-approved materials with grease-resistant coating and secure closure mechanisms. Perfect for hot and cold foods.",
    image: "/placeholder.svg?height=400&width=400&text=Food+Container",
    images: [
      "/placeholder.svg?height=400&width=400&text=Food+Container+1",
      "/placeholder.svg?height=400&width=400&text=Food+Container+2",
    ],
    price: "₹8.75",
    originalPrice: "₹10.00",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    stockCount: 2000,
    sku: "FC-TAKE-003",
    dimensions: "20cm x 15cm x 6cm",
    weight: "45g",
    material: "Food Grade Paperboard",
    features: ["FDA Approved", "Grease Resistant", "Microwave Safe", "Leak Proof"],
    applications: ["Restaurants", "Food Delivery", "Catering", "Takeout"],
    certifications: ["FDA Approved", "Food Safe"],
    leadTime: "2-4 business days",
    moq: "500 units",
    tags: ["food-safe", "restaurant", "takeout", "approved"],
    featured: false,
    discount: 13,
    href: "/products/food-packaging/takeout-container",
  },
  {
    id: "cat-004",
    name: "Pharmaceutical Blister Pack",
    category: "Medical Packaging",
    subcategory: "Pharmaceutical",
    description: "Child-resistant pharmaceutical packaging with tamper-evident features for medication safety.",
    longDescription:
      "Secure pharmaceutical packaging designed to meet stringent safety standards. Features child-resistant mechanisms, tamper-evident seals, and clear labeling areas for medication information.",
    image: "/placeholder.svg?height=400&width=400&text=Pharma+Pack",
    images: [
      "/placeholder.svg?height=400&width=400&text=Pharma+Pack+1",
      "/placeholder.svg?height=400&width=400&text=Pharma+Pack+2",
    ],
    price: "₹15.25",
    originalPrice: "₹18.00",
    rating: 4.9,
    reviews: 78,
    inStock: true,
    stockCount: 800,
    sku: "MP-BLIS-004",
    dimensions: "12cm x 8cm x 2cm",
    weight: "25g",
    material: "Medical Grade Cardboard",
    features: ["Child Resistant", "Tamper Evident", "Moisture Barrier", "Clear Labeling"],
    applications: ["Pharmaceuticals", "Medical Devices", "Supplements", "Healthcare"],
    certifications: ["FDA Compliant", "Child Resistant Certified"],
    leadTime: "10-14 business days",
    moq: "250 units",
    tags: ["medical", "pharmaceutical", "child-resistant", "secure"],
    featured: false,
    discount: 15,
    href: "/products/medical/pharmaceutical-blister",
  },
  {
    id: "cat-005",
    name: "Eco-Friendly Mailer Box",
    category: "E-commerce Packaging",
    subcategory: "Sustainable Solutions",
    description: "100% recyclable mailer boxes made from sustainable materials for environmentally conscious brands.",
    longDescription:
      "Our eco-friendly mailer boxes are crafted from 100% recyclable materials with water-based inks and biodegradable adhesives. Perfect for brands committed to sustainability without compromising on protection.",
    image: "/placeholder.svg?height=400&width=400&text=Eco+Mailer",
    images: [
      "/placeholder.svg?height=400&width=400&text=Eco+Mailer+1",
      "/placeholder.svg?height=400&width=400&text=Eco+Mailer+2",
    ],
    price: "₹18.50",
    originalPrice: "₹22.00",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stockCount: 1200,
    sku: "EM-ECO-005",
    dimensions: "35cm x 25cm x 5cm",
    weight: "120g",
    material: "Recycled Cardboard",
    features: ["100% Recyclable", "Water-Based Inks", "Carbon Neutral", "Biodegradable"],
    applications: ["E-commerce", "Subscription Boxes", "Retail", "Sustainable Brands"],
    certifications: ["FSC Certified", "Carbon Neutral", "Recyclable"],
    leadTime: "5-7 business days",
    moq: "200 units",
    tags: ["eco-friendly", "sustainable", "recyclable", "green"],
    featured: true,
    discount: 16,
    href: "/products/ecommerce/eco-mailer",
  },
  {
    id: "cat-006",
    name: "Custom Printed Folding Carton",
    category: "Retail Packaging",
    subcategory: "Custom Solutions",
    description: "Versatile folding cartons with high-quality custom printing for retail and consumer products.",
    longDescription:
      "Our custom printed folding cartons offer unlimited design possibilities with high-resolution printing, special finishes, and various structural options. Perfect for retail products requiring shelf appeal.",
    image: "/placeholder.svg?height=400&width=400&text=Folding+Carton",
    images: [
      "/placeholder.svg?height=400&width=400&text=Folding+Carton+1",
      "/placeholder.svg?height=400&width=400&text=Folding+Carton+2",
    ],
    price: "₹22.00",
    originalPrice: "₹25.00",
    rating: 4.5,
    reviews: 203,
    inStock: true,
    stockCount: 950,
    sku: "RC-FOLD-006",
    dimensions: "18cm x 12cm x 4cm",
    weight: "85g",
    material: "High-Quality Paperboard",
    features: ["Custom Printing", "Multiple Finishes", "Structural Options", "Shelf Ready"],
    applications: ["Retail Products", "Consumer Goods", "Cosmetics", "Electronics"],
    certifications: ["Print Quality Certified", "Retail Ready"],
    leadTime: "8-12 business days",
    moq: "300 units",
    tags: ["custom", "retail", "printed", "versatile"],
    featured: false,
    discount: 12,
    href: "/products/retail/custom-folding-carton",
  },
  {
    id: "cat-007",
    name: "Industrial Strength Shipping Box",
    category: "Industrial Packaging",
    subcategory: "Heavy Duty",
    description: "Extra-strong shipping boxes designed for heavy industrial products and equipment.",
    longDescription:
      "Built for the toughest shipping challenges, our industrial strength boxes feature reinforced construction, high-strength materials, and superior stacking capability for heavy industrial products.",
    image: "/placeholder.svg?height=400&width=400&text=Industrial+Box",
    images: [
      "/placeholder.svg?height=400&width=400&text=Industrial+Box+1",
      "/placeholder.svg?height=400&width=400&text=Industrial+Box+2",
    ],
    price: "₹45.00",
    originalPrice: "₹50.00",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    stockCount: 600,
    sku: "IP-IND-007",
    dimensions: "50cm x 40cm x 30cm",
    weight: "850g",
    material: "Triple Wall Corrugated",
    features: ["Triple Wall Construction", "High Stacking Strength", "Reinforced Corners", "Heavy Duty"],
    applications: ["Industrial Equipment", "Automotive Parts", "Heavy Machinery", "Tools"],
    certifications: ["Industrial Grade", "Heavy Duty Certified"],
    leadTime: "7-10 business days",
    moq: "100 units",
    tags: ["industrial", "heavy-duty", "strong", "equipment"],
    featured: false,
    discount: 10,
    href: "/products/industrial/heavy-duty-shipping",
  },
  {
    id: "cat-008",
    name: "Cosmetic Display Box",
    category: "Cosmetic Packaging",
    subcategory: "Display Solutions",
    description: "Elegant display boxes designed specifically for cosmetic products with premium finishes.",
    longDescription:
      "Our cosmetic display boxes combine functionality with aesthetic appeal, featuring premium finishes, clear windows, and secure closures perfect for beauty and personal care products.",
    image: "/placeholder.svg?height=400&width=400&text=Cosmetic+Box",
    images: [
      "/placeholder.svg?height=400&width=400&text=Cosmetic+Box+1",
      "/placeholder.svg?height=400&width=400&text=Cosmetic+Box+2",
    ],
    price: "₹28.75",
    originalPrice: "₹32.00",
    rating: 4.7,
    reviews: 145,
    inStock: true,
    stockCount: 750,
    sku: "CP-COSM-008",
    dimensions: "15cm x 10cm x 6cm",
    weight: "95g",
    material: "Premium Paperboard",
    features: ["Premium Finish", "Clear Window", "Secure Closure", "Elegant Design"],
    applications: ["Cosmetics", "Beauty Products", "Personal Care", "Skincare"],
    certifications: ["Cosmetic Grade", "Premium Quality"],
    leadTime: "6-8 business days",
    moq: "150 units",
    tags: ["cosmetic", "beauty", "premium", "display"],
    featured: true,
    discount: 10,
    href: "/products/cosmetic/display-box",
  },
]

const categories = [
  "All Categories",
  "Corrugated Boxes",
  "Gift Boxes",
  "Food Packaging",
  "Medical Packaging",
  "E-commerce Packaging",
  "Retail Packaging",
  "Industrial Packaging",
  "Cosmetic Packaging",
]

const sortOptions = [
  { value: "featured", label: "Featured First" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "discount", label: "Best Deals" },
]

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-10", label: "Under ₹10" },
  { value: "10-25", label: "₹10 - ₹25" },
  { value: "25-50", label: "₹25 - ₹50" },
  { value: "50-100", label: "₹50 - ₹100" },
  { value: "100+", label: "₹100+" },
]

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const itemsPerPage = 12

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = catalogProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory

      const matchesPrice = (() => {
        if (selectedPriceRange === "all") return true
        const price = Number.parseFloat(product.price.replace("₹", ""))
        switch (selectedPriceRange) {
          case "0-10":
            return price < 10
          case "10-25":
            return price >= 10 && price <= 25
          case "25-50":
            return price >= 25 && price <= 50
          case "50-100":
            return price >= 50 && price <= 100
          case "100+":
            return price > 100
          default:
            return true
        }
      })()

      const matchesStock = !inStockOnly || product.inStock
      const matchesFeatured = !featuredOnly || product.featured

      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesFeatured
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-asc":
          return Number.parseFloat(a.price.replace("₹", "")) - Number.parseFloat(b.price.replace("₹", ""))
        case "price-desc":
          return Number.parseFloat(b.price.replace("₹", "")) - Number.parseFloat(a.price.replace("₹", ""))
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id.localeCompare(a.id)
        case "discount":
          return (b.discount || 0) - (a.discount || 0)
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy, inStockOnly, featuredOnly])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const featuredProducts = catalogProducts.filter((product) => product.featured)

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy, inStockOnly, featuredOnly])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* SEO Meta Tags */}
      <head>
        <title>Product Catalog - JJ Enterprises | Premium Packaging Solutions</title>
        <meta
          name="description"
          content="Browse our comprehensive catalog of premium packaging solutions including corrugated boxes, gift boxes, food packaging, and custom solutions. Find the perfect packaging for your needs."
        />
        <meta
          name="keywords"
          content="product catalog, packaging solutions, corrugated boxes, gift boxes, food packaging, custom packaging, JJ Enterprises"
        />
        <link rel="canonical" href="https://jjenterprises.com/catalog" />
      </head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Product Catalog</h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our comprehensive range of premium packaging solutions designed for every industry and
              application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
                onClick={() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Package className="w-4 h-4 mr-2" />
                Browse Catalog
              </Button>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
                >
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{catalogProducts.length}+</div>
              <div className="text-sm text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Product Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.7★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-sm text-gray-600">Quote Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and innovative packaging solutions, carefully selected for their quality and
              performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-orange-500">Featured</Badge>
                  </div>
                  {product.discount && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="destructive">{product.discount}% OFF</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-orange-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>

                  <Link href={product.href}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="catalog-section" className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Search className="w-5 h-5 mr-2 text-orange-600" />
                  Search & Filter Products
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg py-3"
                />
              </div>

              {/* Filters */}
              <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${showFilters ? "block" : "hidden md:grid"}`}>
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

                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
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

                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">In Stock Only</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Featured Products</span>
                </label>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t">
                <span>
                  Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                </span>
                <div className="flex items-center space-x-4">
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid/List */}
          {paginatedProducts.length > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
              >
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : ""
                    }`}
                  >
                    <div
                      className={`relative ${viewMode === "list" ? "md:w-1/3 h-64 md:h-auto" : "h-48"} overflow-hidden`}
                    >
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
                      <div className="absolute top-3 left-3 flex flex-col space-y-1">
                        {product.featured && <Badge className="bg-orange-500">Featured</Badge>}
                        {product.discount && <Badge variant="destructive">{product.discount}% OFF</Badge>}
                        {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                      </div>
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "md:w-2/3 flex flex-col justify-between" : ""}`}>
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
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

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>

                        {/* Key Features */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500">SKU:</span>
                              <p className="font-medium">{product.sku}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">MOQ:</span>
                              <p className="font-medium">{product.moq}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Lead Time:</span>
                              <p className="font-medium">{product.leadTime}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Stock:</span>
                              <p className="font-medium text-green-600">{product.stockCount} units</p>
                            </div>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-xl text-orange-600">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                            )}
                          </div>
                          {product.discount && (
                            <Badge variant="destructive" className="text-xs">
                              Save {product.discount}%
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Link href={product.href}>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full" size="sm">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Quote
                          </Button>
                        </div>
                        <Link href="/configurator">
                          <Button variant="secondary" className="w-full" size="sm">
                            <Package className="w-4 h-4 mr-2" />
                            Customize
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Categories")
                  setSelectedPriceRange("all")
                  setInStockOnly(false)
                  setFeaturedOnly(false)
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Custom Packaging Solutions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find exactly what you're looking for? Our packaging experts can create custom solutions tailored to
              your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-orange-500 hover:bg-orange-600">Contact Our Experts</Button>
              </Link>
              <Link href="/products/custom-design">
                <Button variant="outline">Custom Design Services</Button>
              </Link>
              <Link href="/configurator">
                <Button variant="secondary">
                  <Package className="w-4 h-4 mr-2" />
                  3D Configurator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
