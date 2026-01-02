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
  Filter,
  Share2,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Expanded product catalog with HD images and comprehensive data
const catalogProducts = [
  {
    id: "cat-001",
    name: "Premium Corrugated Shipping Box - Heavy Duty",
    category: "Corrugated Boxes",
    subcategory: "Shipping Solutions",
    description:
      "Heavy-duty corrugated boxes perfect for e-commerce shipping with superior protection and durability. Triple-wall construction ensures maximum protection.",
    longDescription:
      "Our premium corrugated shipping boxes are engineered for maximum protection during transit. Made from high-quality recycled materials with reinforced corners and edges. Available in multiple wall thicknesses (3-ply, 5-ply, 7-ply) to suit different shipping requirements. Perfect for fragile items, electronics, and heavy products.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Corrugated+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Corrugated+Box+Front",
      "/placeholder.svg?height=800&width=800&text=HD+Corrugated+Box+Side",
      "/placeholder.svg?height=800&width=800&text=HD+Corrugated+Box+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Corrugated+Box+Stack",
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
    material: "Recycled Corrugated Cardboard - Triple Wall",
    features: ["Water Resistant", "Stackable Design", "Easy Assembly", "100% Recyclable", "Reinforced Corners"],
    applications: ["E-commerce", "Retail Shipping", "Storage", "Moving", "Electronics"],
    certifications: ["FSC Certified", "ISO 9001", "ISTA Tested"],
    leadTime: "3-5 business days",
    moq: "100 units",
    tags: ["bestseller", "eco-friendly", "shipping", "durable", "heavy-duty"],
    featured: true,
    discount: 17,
    href: "/products/corrugated/premium-shipping-box",
    pdfCatalog: "/catalogs/corrugated-shipping-boxes.pdf",
    videoUrl: "/videos/corrugated-assembly-demo.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Quality Guarantee",
    customizable: true,
  },
  {
    id: "cat-002",
    name: "Luxury Magnetic Gift Box - Premium Collection",
    category: "Gift Boxes",
    subcategory: "Luxury Packaging",
    description:
      "Elegant rigid gift boxes with magnetic closure, perfect for premium products and special occasions. Features soft-touch coating and premium finishes.",
    longDescription:
      "Create an unforgettable unboxing experience with our luxury magnetic gift boxes. Featuring premium materials, sophisticated finishes, and secure magnetic closures. Ideal for jewelry, cosmetics, electronics, and corporate gifts. Available in multiple sizes and custom printing options.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Luxury+Gift+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Luxury+Box+Closed",
      "/placeholder.svg?height=800&width=800&text=HD+Luxury+Box+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Luxury+Box+Interior",
      "/placeholder.svg?height=800&width=800&text=HD+Luxury+Box+Collection",
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
    features: ["Magnetic Closure", "Soft Touch Finish", "Custom Foiling", "Reusable", "Premium Interior"],
    applications: ["Jewelry", "Cosmetics", "Electronics", "Corporate Gifts", "Luxury Items"],
    certifications: ["Premium Quality", "Luxury Standard", "Custom Print Ready"],
    leadTime: "7-10 business days",
    moq: "50 units",
    tags: ["luxury", "premium", "magnetic", "gift", "corporate"],
    featured: true,
    discount: 11,
    href: "/products/gift-boxes/luxury-magnetic",
    pdfCatalog: "/catalogs/luxury-gift-boxes.pdf",
    videoUrl: "/videos/luxury-box-unboxing.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Premium Quality Guarantee",
    customizable: true,
  },
  {
    id: "cat-003",
    name: "Food Grade Takeout Container - Eco Series",
    category: "Food Packaging",
    subcategory: "Takeout Solutions",
    description:
      "FDA-approved food-safe containers perfect for restaurants, cafes, and food delivery services. Made from sustainable materials with leak-proof design.",
    longDescription:
      "Our food-grade takeout containers are designed to maintain food freshness and safety. Made from FDA-approved materials with grease-resistant coating and secure closure mechanisms. Perfect for hot and cold foods. Microwave and freezer safe with excellent insulation properties.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Food+Container",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Food+Container+Closed",
      "/placeholder.svg?height=800&width=800&text=HD+Food+Container+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Food+Container+Stack",
      "/placeholder.svg?height=800&width=800&text=HD+Food+Container+Sizes",
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
    material: "Food Grade Paperboard with PE Coating",
    features: ["FDA Approved", "Grease Resistant", "Microwave Safe", "Leak Proof", "Stackable"],
    applications: ["Restaurants", "Food Delivery", "Catering", "Takeout", "Food Trucks"],
    certifications: ["FDA Approved", "Food Safe", "BRC Certified"],
    leadTime: "2-4 business days",
    moq: "500 units",
    tags: ["food-safe", "restaurant", "takeout", "approved", "eco-friendly"],
    featured: false,
    discount: 13,
    href: "/products/food-packaging/takeout-container",
    pdfCatalog: "/catalogs/food-packaging-solutions.pdf",
    videoUrl: "/videos/food-container-demo.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Food Safety Guarantee",
    customizable: true,
  },
  {
    id: "cat-004",
    name: "Pharmaceutical Blister Pack - Medical Grade",
    category: "Medical Packaging",
    subcategory: "Pharmaceutical",
    description:
      "Child-resistant pharmaceutical packaging with tamper-evident features for medication safety. Meets all regulatory standards for pharmaceutical products.",
    longDescription:
      "Secure pharmaceutical packaging designed to meet stringent safety standards. Features child-resistant mechanisms, tamper-evident seals, and clear labeling areas for medication information. Compliant with FDA and international pharmaceutical packaging regulations.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Pharma+Pack",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Pharma+Pack+Front",
      "/placeholder.svg?height=800&width=800&text=HD+Pharma+Pack+Back",
      "/placeholder.svg?height=800&width=800&text=HD+Pharma+Pack+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Pharma+Pack+Series",
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
    material: "Medical Grade Cardboard with Barrier Coating",
    features: ["Child Resistant", "Tamper Evident", "Moisture Barrier", "Clear Labeling", "Regulatory Compliant"],
    applications: ["Pharmaceuticals", "Medical Devices", "Supplements", "Healthcare", "OTC Medications"],
    certifications: ["FDA Compliant", "Child Resistant Certified", "ISO 15378"],
    leadTime: "10-14 business days",
    moq: "250 units",
    tags: ["medical", "pharmaceutical", "child-resistant", "secure", "compliant"],
    featured: false,
    discount: 15,
    href: "/products/medical/pharmaceutical-blister",
    pdfCatalog: "/catalogs/pharmaceutical-packaging.pdf",
    videoUrl: "/videos/pharma-safety-features.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Regulatory Compliance Guarantee",
    customizable: true,
  },
  {
    id: "cat-005",
    name: "Eco-Friendly Mailer Box - Sustainable Series",
    category: "E-commerce Packaging",
    subcategory: "Sustainable Solutions",
    description:
      "100% recyclable mailer boxes made from sustainable materials for environmentally conscious brands. Carbon-neutral shipping solution.",
    longDescription:
      "Our eco-friendly mailer boxes are crafted from 100% recyclable materials with water-based inks and biodegradable adhesives. Perfect for brands committed to sustainability without compromising on protection. Features easy-open design and custom branding options.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Eco+Mailer",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Eco+Mailer+Closed",
      "/placeholder.svg?height=800&width=800&text=HD+Eco+Mailer+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Eco+Mailer+Flat",
      "/placeholder.svg?height=800&width=800&text=HD+Eco+Mailer+Branded",
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
    material: "100% Recycled Cardboard with Water-Based Inks",
    features: ["100% Recyclable", "Water-Based Inks", "Carbon Neutral", "Biodegradable", "Easy Assembly"],
    applications: ["E-commerce", "Subscription Boxes", "Retail", "Sustainable Brands", "Online Stores"],
    certifications: ["FSC Certified", "Carbon Neutral", "Recyclable", "PEFC Certified"],
    leadTime: "5-7 business days",
    moq: "200 units",
    tags: ["eco-friendly", "sustainable", "recyclable", "green", "carbon-neutral"],
    featured: true,
    discount: 16,
    href: "/products/ecommerce/eco-mailer",
    pdfCatalog: "/catalogs/eco-friendly-packaging.pdf",
    videoUrl: "/videos/sustainable-packaging-story.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Environmental Commitment Guarantee",
    customizable: true,
  },
  {
    id: "cat-006",
    name: "Custom Printed Folding Carton - Retail Pro",
    category: "Retail Packaging",
    subcategory: "Custom Solutions",
    description:
      "Versatile folding cartons with high-quality custom printing for retail and consumer products. Multiple finish options available.",
    longDescription:
      "Our custom printed folding cartons offer unlimited design possibilities with high-resolution printing, special finishes, and various structural options. Perfect for retail products requiring shelf appeal. Available with spot UV, embossing, foil stamping, and other premium finishes.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Folding+Carton",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Folding+Carton+Front",
      "/placeholder.svg?height=800&width=800&text=HD+Folding+Carton+Back",
      "/placeholder.svg?height=800&width=800&text=HD+Folding+Carton+Flat",
      "/placeholder.svg?height=800&width=800&text=HD+Folding+Carton+Variants",
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
    material: "High-Quality SBS Paperboard",
    features: ["Custom Printing", "Multiple Finishes", "Structural Options", "Shelf Ready", "Premium Quality"],
    applications: ["Retail Products", "Consumer Goods", "Cosmetics", "Electronics", "Food Products"],
    certifications: ["Print Quality Certified", "Retail Ready", "Food Contact Safe"],
    leadTime: "8-12 business days",
    moq: "300 units",
    tags: ["custom", "retail", "printed", "versatile", "premium"],
    featured: false,
    discount: 12,
    href: "/products/retail/custom-folding-carton",
    pdfCatalog: "/catalogs/custom-retail-packaging.pdf",
    videoUrl: "/videos/custom-printing-process.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Print Quality Guarantee",
    customizable: true,
  },
  {
    id: "cat-007",
    name: "Industrial Strength Shipping Box - Heavy Duty Pro",
    category: "Industrial Packaging",
    subcategory: "Heavy Duty",
    description:
      "Extra-strong shipping boxes designed for heavy industrial products and equipment. Maximum protection for valuable items.",
    longDescription:
      "Built for the toughest shipping challenges, our industrial strength boxes feature reinforced construction, high-strength materials, and superior stacking capability for heavy industrial products. Tested to withstand extreme conditions and rough handling.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Industrial+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Industrial+Box+Closed",
      "/placeholder.svg?height=800&width=800&text=HD+Industrial+Box+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Industrial+Box+Stack",
      "/placeholder.svg?height=800&width=800&text=HD+Industrial+Box+Test",
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
    material: "Triple Wall Corrugated with Reinforcement",
    features: [
      "Triple Wall Construction",
      "High Stacking Strength",
      "Reinforced Corners",
      "Heavy Duty",
      "Weather Resistant",
    ],
    applications: ["Industrial Equipment", "Automotive Parts", "Heavy Machinery", "Tools", "Electronics"],
    certifications: ["Industrial Grade", "Heavy Duty Certified", "ISTA 3A Tested"],
    leadTime: "7-10 business days",
    moq: "100 units",
    tags: ["industrial", "heavy-duty", "strong", "equipment", "reinforced"],
    featured: false,
    discount: 10,
    href: "/products/industrial/heavy-duty-shipping",
    pdfCatalog: "/catalogs/industrial-packaging-solutions.pdf",
    videoUrl: "/videos/industrial-strength-test.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Strength Performance Guarantee",
    customizable: true,
  },
  {
    id: "cat-008",
    name: "Cosmetic Display Box - Beauty Collection",
    category: "Cosmetic Packaging",
    subcategory: "Display Solutions",
    description:
      "Elegant display boxes designed specifically for cosmetic products with premium finishes. Perfect for beauty brands and retail display.",
    longDescription:
      "Our cosmetic display boxes combine functionality with aesthetic appeal, featuring premium finishes, clear windows, and secure closures perfect for beauty and personal care products. Available with various window options and custom branding.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Cosmetic+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Cosmetic+Box+Front",
      "/placeholder.svg?height=800&width=800&text=HD+Cosmetic+Box+Window",
      "/placeholder.svg?height=800&width=800&text=HD+Cosmetic+Box+Interior",
      "/placeholder.svg?height=800&width=800&text=HD+Cosmetic+Box+Display",
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
    material: "Premium SBS Paperboard with UV Coating",
    features: ["Premium Finish", "Clear Window", "Secure Closure", "Elegant Design", "Custom Branding"],
    applications: ["Cosmetics", "Beauty Products", "Personal Care", "Skincare", "Retail Display"],
    certifications: ["Cosmetic Grade", "Premium Quality", "Retail Ready"],
    leadTime: "6-8 business days",
    moq: "150 units",
    tags: ["cosmetic", "beauty", "premium", "display", "window"],
    featured: true,
    discount: 10,
    href: "/products/cosmetic/display-box",
    pdfCatalog: "/catalogs/cosmetic-packaging-collection.pdf",
    videoUrl: "/videos/cosmetic-box-showcase.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Premium Quality Guarantee",
    customizable: true,
  },
  // Additional products to expand the catalog
  {
    id: "cat-009",
    name: "Electronics Protective Packaging - Tech Shield",
    category: "Electronics Packaging",
    subcategory: "Protective Solutions",
    description:
      "Anti-static protective packaging designed for sensitive electronic components and devices. ESD-safe materials ensure product integrity.",
    longDescription:
      "Specialized packaging for electronics featuring anti-static properties, cushioning inserts, and secure closures. Protects sensitive components from electrostatic discharge and physical damage during shipping and storage.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Electronics+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Electronics+Box+Closed",
      "/placeholder.svg?height=800&width=800&text=HD+Electronics+Box+Insert",
      "/placeholder.svg?height=800&width=800&text=HD+Electronics+Box+Components",
      "/placeholder.svg?height=800&width=800&text=HD+Electronics+Box+Stack",
    ],
    price: "₹35.50",
    originalPrice: "₹40.00",
    rating: 4.6,
    reviews: 92,
    inStock: true,
    stockCount: 500,
    sku: "EP-TECH-009",
    dimensions: "25cm x 20cm x 10cm",
    weight: "200g",
    material: "Anti-Static Corrugated with Foam Inserts",
    features: ["Anti-Static", "ESD Safe", "Cushioned Interior", "Secure Closure", "Component Protection"],
    applications: ["Electronics", "Computer Parts", "Semiconductors", "Circuit Boards", "Tech Devices"],
    certifications: ["ESD Safe", "Electronics Grade", "Anti-Static Certified"],
    leadTime: "5-7 business days",
    moq: "200 units",
    tags: ["electronics", "anti-static", "protective", "tech", "esd-safe"],
    featured: false,
    discount: 11,
    href: "/products/electronics/protective-packaging",
    pdfCatalog: "/catalogs/electronics-packaging-solutions.pdf",
    videoUrl: "/videos/electronics-protection-demo.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "ESD Protection Guarantee",
    customizable: true,
  },
  {
    id: "cat-010",
    name: "Automotive Parts Box - Auto Pro Series",
    category: "Automotive Packaging",
    subcategory: "Parts Protection",
    description:
      "Robust packaging solutions for automotive parts and components. Oil-resistant and durable construction for harsh environments.",
    longDescription:
      "Heavy-duty packaging designed specifically for automotive parts, featuring oil-resistant coatings, reinforced construction, and secure closures. Perfect for spare parts, components, and aftermarket products.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Auto+Parts+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Auto+Parts+Box+Front",
      "/placeholder.svg?height=800&width=800&text=HD+Auto+Parts+Box+Interior",
      "/placeholder.svg?height=800&width=800&text=HD+Auto+Parts+Box+Parts",
      "/placeholder.svg?height=800&width=800&text=HD+Auto+Parts+Box+Warehouse",
    ],
    price: "₹42.25",
    originalPrice: "₹47.00",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    stockCount: 400,
    sku: "AP-AUTO-010",
    dimensions: "40cm x 30cm x 20cm",
    weight: "450g",
    material: "Heavy-Duty Corrugated with Oil-Resistant Coating",
    features: ["Oil Resistant", "Heavy Duty", "Reinforced Structure", "Parts Protection", "Stackable"],
    applications: ["Auto Parts", "Spare Parts", "Aftermarket", "Automotive", "Industrial Parts"],
    certifications: ["Automotive Grade", "Oil Resistant", "Heavy Duty Certified"],
    leadTime: "6-9 business days",
    moq: "150 units",
    tags: ["automotive", "parts", "oil-resistant", "heavy-duty", "industrial"],
    featured: false,
    discount: 10,
    href: "/products/automotive/parts-packaging",
    pdfCatalog: "/catalogs/automotive-packaging-solutions.pdf",
    videoUrl: "/videos/automotive-parts-protection.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Durability Guarantee",
    customizable: true,
  },
  {
    id: "cat-011",
    name: "Subscription Box - Premium Unboxing Experience",
    category: "Subscription Packaging",
    subcategory: "Experience Design",
    description:
      "Custom-designed subscription boxes that create memorable unboxing experiences. Perfect for subscription services and monthly deliveries.",
    longDescription:
      "Specially designed for subscription services, these boxes feature custom branding, premium materials, and thoughtful design elements that enhance the unboxing experience. Available with various insert options and personalization features.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Subscription+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Subscription+Box+Closed",
      "/placeholder.svg?height=800&width=800&text=HD+Subscription+Box+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Subscription+Box+Contents",
      "/placeholder.svg?height=800&width=800&text=HD+Subscription+Box+Branding",
    ],
    price: "₹55.00",
    originalPrice: "₹62.00",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    stockCount: 300,
    sku: "SB-PREM-011",
    dimensions: "30cm x 25cm x 12cm",
    weight: "320g",
    material: "Premium Rigid Board with Custom Printing",
    features: ["Custom Branding", "Premium Materials", "Unboxing Experience", "Insert Options", "Personalization"],
    applications: ["Subscription Services", "Monthly Boxes", "Curated Products", "Gift Subscriptions", "E-commerce"],
    certifications: ["Premium Quality", "Custom Print Ready", "Subscription Grade"],
    leadTime: "10-14 business days",
    moq: "100 units",
    tags: ["subscription", "premium", "unboxing", "custom", "experience"],
    featured: true,
    discount: 11,
    href: "/products/subscription/premium-box",
    pdfCatalog: "/catalogs/subscription-box-solutions.pdf",
    videoUrl: "/videos/subscription-unboxing-experience.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Premium Experience Guarantee",
    customizable: true,
  },
  {
    id: "cat-012",
    name: "Wine & Spirits Packaging - Luxury Collection",
    category: "Beverage Packaging",
    subcategory: "Luxury Spirits",
    description:
      "Elegant packaging solutions for wine and spirits. Premium materials with protective features for glass bottles and luxury presentation.",
    longDescription:
      "Sophisticated packaging designed for wine and spirits, featuring protective inserts, premium finishes, and elegant design. Perfect for gift sets, premium bottles, and retail presentation. Available with custom branding and foil accents.",
    image: "/placeholder.svg?height=600&width=600&text=HD+Wine+Box",
    images: [
      "/placeholder.svg?height=800&width=800&text=HD+Wine+Box+Closed",
      "/placeholder.svg?height=800&width=800&text=HD+Wine+Box+Open",
      "/placeholder.svg?height=800&width=800&text=HD+Wine+Box+Bottle",
      "/placeholder.svg?height=800&width=800&text=HD+Wine+Box+Gift",
    ],
    price: "₹75.00",
    originalPrice: "₹85.00",
    rating: 4.9,
    reviews: 95,
    inStock: true,
    stockCount: 250,
    sku: "WS-LUX-012",
    dimensions: "35cm x 12cm x 12cm",
    weight: "280g",
    material: "Premium Rigid Board with Velvet Interior",
    features: ["Bottle Protection", "Velvet Interior", "Premium Finish", "Gift Ready", "Custom Branding"],
    applications: ["Wine", "Spirits", "Gift Sets", "Premium Bottles", "Luxury Beverages"],
    certifications: ["Premium Quality", "Luxury Grade", "Gift Ready"],
    leadTime: "8-12 business days",
    moq: "75 units",
    tags: ["wine", "spirits", "luxury", "gift", "premium"],
    featured: false,
    discount: 12,
    href: "/products/beverage/wine-spirits-packaging",
    pdfCatalog: "/catalogs/beverage-packaging-luxury.pdf",
    videoUrl: "/videos/wine-packaging-showcase.mp4",
    manufacturer: "JJ Enterprises",
    warranty: "Luxury Quality Guarantee",
    customizable: true,
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
  "Electronics Packaging",
  "Automotive Packaging",
  "Subscription Packaging",
  "Beverage Packaging",
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
  { value: "popularity", label: "Most Popular" },
]

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-15", label: "Under ₹15" },
  { value: "15-30", label: "₹15 - ₹30" },
  { value: "30-50", label: "₹30 - ₹50" },
  { value: "50-75", label: "₹50 - ₹75" },
  { value: "75+", label: "₹75+" },
]

export default function ProductCatalogClientPage() {
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
  const [customizableOnly, setCustomizableOnly] = useState(false)

  const itemsPerPage = 12

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = catalogProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory

      const matchesPrice = (() => {
        if (selectedPriceRange === "all") return true
        const price = Number.parseFloat(product.price.replace("₹", ""))
        switch (selectedPriceRange) {
          case "0-15":
            return price < 15
          case "15-30":
            return price >= 15 && price <= 30
          case "30-50":
            return price >= 30 && price <= 50
          case "50-75":
            return price >= 50 && price <= 75
          case "75+":
            return price > 75
          default:
            return true
        }
      })()

      const matchesStock = !inStockOnly || product.inStock
      const matchesFeatured = !featuredOnly || product.featured
      const matchesCustomizable = !customizableOnly || product.customizable

      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesFeatured && matchesCustomizable
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
        case "popularity":
          return b.reviews - a.reviews
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy, inStockOnly, featuredOnly, customizableOnly])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const featuredProducts = catalogProducts.filter((product) => product.featured)

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleShare = async (product: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.origin + product.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + product.href)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy, inStockOnly, featuredOnly, customizableOnly])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Hero Section with Enhanced SEO */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Packaging Solutions Catalog</h1>
            <p className="text-xl text-white/90 mb-8">
              Discover our comprehensive range of high-quality packaging solutions with HD images, detailed
              specifications, and downloadable catalogs. Find the perfect packaging for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3"
                onClick={() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Package className="w-4 h-4 mr-2" />
                Browse Catalog
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
                onClick={() => window.open("/catalogs/complete-product-catalog.pdf", "_blank")}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Complete Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
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
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">HD</div>
              <div className="text-sm text-gray-600">Quality Images</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and innovative packaging solutions, carefully selected for their quality,
              performance, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} - Premium packaging solution by JJ Enterprises`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={true}
                  />
                  <div className="absolute top-3 right-3 flex space-x-1">
                    <Badge className="bg-orange-500">Featured</Badge>
                    {product.discount && <Badge variant="destructive">{product.discount}% OFF</Badge>}
                  </div>
                  <div className="absolute top-3 left-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white p-1"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`Add ${product.name} to favorites`}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  </div>

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
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link href={product.href}>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="sm"
                      onClick={() => window.open(product.pdfCatalog, "_blank")}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Main Catalog Section */}
      <section id="catalog-section" className="py-16">
        <div className="container mx-auto px-4">
          {/* Enhanced Search and Filters */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Search className="w-5 h-5 mr-2 text-orange-600" />
                  Advanced Product Search & Filters
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Enhanced Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products by name, description, features, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg py-3"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchTerm("")}
                  >
                    ×
                  </Button>
                )}
              </div>

              {/* Enhanced Filters */}
              <div className={`grid grid-cols-1 md:grid-cols-6 gap-4 ${showFilters ? "block" : "hidden md:grid"}`}>
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
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("/catalogs/complete-product-catalog.pdf", "_blank")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>

              {/* Additional Enhanced Filters */}
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
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customizableOnly}
                    onChange={(e) => setCustomizableOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Customizable</span>
                </label>
              </div>

              {/* Enhanced Results Summary */}
              <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t">
                <span>
                  Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                  {searchTerm && ` for "${searchTerm}"`}
                </span>
                <div className="flex items-center space-x-4">
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("All Categories")
                      setSelectedPriceRange("all")
                      setInStockOnly(false)
                      setFeaturedOnly(false)
                      setCustomizableOnly(false)
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Products Grid/List */}
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
                        alt={`${product.name} - ${product.description} by JJ Enterprises`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 right-3 flex flex-col space-y-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white p-1"
                          onClick={() => toggleFavorite(product.id)}
                          aria-label={`Add ${product.name} to favorites`}
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white p-1"
                          onClick={() => handleShare(product)}
                          aria-label={`Share ${product.name}`}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3 flex flex-col space-y-1">
                        {product.featured && <Badge className="bg-orange-500 text-xs">Featured</Badge>}
                        {product.discount && (
                          <Badge variant="destructive" className="text-xs">
                            {product.discount}% OFF
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge variant="secondary" className="text-xs">
                            Out of Stock
                          </Badge>
                        )}
                        {product.customizable && <Badge className="bg-blue-500 text-xs">Customizable</Badge>}
                      </div>
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "md:w-2/3 flex flex-col justify-between" : ""}`}>
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Badge variant="secondary" className="text-xs mb-2">
                              {product.category}
                            </Badge>
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.description}</p>

                        {/* Enhanced Key Features */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 4).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Product Details */}
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

                        {/* Enhanced Pricing */}
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

                      {/* Enhanced Action Buttons */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <Link href={product.href}>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                            onClick={() => window.open(product.pdfCatalog, "_blank")}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Quote
                          </Button>
                        </div>
                        {product.customizable && (
                          <Link href="/configurator">
                            <Button variant="secondary" className="w-full" size="sm">
                              <Package className="w-4 h-4 mr-2" />
                              Customize This Product
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Enhanced Pagination */}
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
                    {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                      let page: number
                      if (totalPages <= 7) {
                        page = i + 1
                      } else if (currentPage <= 4) {
                        page = i + 1
                      } else if (currentPage >= totalPages - 3) {
                        page = totalPages - 6 + i
                      } else {
                        page = currentPage - 3 + i
                      }

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
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or filter criteria to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Categories")
                  setSelectedPriceRange("all")
                  setInStockOnly(false)
                  setFeaturedOnly(false)
                  setCustomizableOnly(false)
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Enhanced Bottom CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Custom Packaging Solutions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find exactly what you're looking for? Our packaging experts can create custom solutions tailored to
              your specific requirements. Download our complete catalog or get in touch for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Our Experts
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.open("/catalogs/complete-product-catalog.pdf", "_blank")}>
                <Download className="w-4 h-4 mr-2" />
                Download Complete Catalog
              </Button>
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
