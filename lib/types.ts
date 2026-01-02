// Comprehensive Type Definitions for JJ Enterprises Platform
// This file provides type safety across the entire application

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory | string
  subcategory?: string
  description: string
  shortDescription?: string
  features?: string[]
  specifications?: Partial<ProductSpecifications>
  pricing?: Partial<ProductPricing>
  images?: ProductImage[]
  imageUrl?: string
  variants?: ProductVariant[]
  customizable?: boolean
  minOrderQuantity?: number
  leadTime?: string
  certifications?: string[]
  tags?: string[]
  seoMeta?: Partial<SEOMeta>
  status?: "active" | "draft" | "discontinued"
  createdAt?: string
  updatedAt?: string
}

export type ProductCategory =
  | "corrugated"
  | "luxury-rigid"
  | "folding-cartons"
  | "food-packaging"
  | "pharma"
  | "ecommerce-packaging"
  | "eco-friendly"
  | "custom-design"

export interface ProductSpecifications {
  dimensions?: {
    length: number
    width: number
    height: number
    unit: "mm" | "cm" | "inch"
  }
  material: string
  paperWeight?: string
  flutingType?: "E-Flute" | "B-Flute" | "C-Flute" | "BC-Flute" | "EB-Flute"
  printType?: "Offset" | "Flexo" | "Digital" | "Screen"
  finishOptions?: string[]
  colorOptions?: string[]
  maxLoadCapacity?: string
  closureType?: string
  [key: string]: unknown
}

export interface ProductPricing {
  basePrice: number
  currency: "INR" | "USD" | "AED"
  pricePerUnit?: number
  bulkPricing?: BulkPriceTier[]
  customizationPricing?: CustomizationPricing
}

export interface BulkPriceTier {
  minQuantity: number
  maxQuantity?: number
  pricePerUnit: number
  discount: number
}

export interface CustomizationPricing {
  printing: number
  foiling: number
  embossing: number
  dieCutting: number
  lamination: number
}

export interface ProductImage {
  url: string
  alt: string
  isPrimary: boolean
  width: number
  height: number
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  specifications: Partial<ProductSpecifications>
  inStock: boolean
  stockQuantity?: number
}

// ============================================================================
// ORDER TYPES
// ============================================================================

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: Address
  billingAddress: Address
  pricing: OrderPricing
  timeline: OrderTimeline[]
  notes?: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "printing"
  | "quality-check"
  | "packaging"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "partially-refunded"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  variant?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  specifications: ProductSpecifications
  customizations?: OrderCustomization[]
}

export interface OrderCustomization {
  type: string
  value: string
  additionalCost: number
}

export interface OrderPricing {
  subtotal: number
  discount: number
  discountCode?: string
  shipping: number
  tax: number
  total: number
  currency: "INR" | "USD" | "AED"
}

export interface OrderTimeline {
  status: OrderStatus
  timestamp: string
  description: string
  updatedBy?: string
}

export interface Address {
  fullName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  email?: string
  gstNumber?: string
  isDefault?: boolean
}

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  company?: string
  verified: boolean
  createdAt: string
  lastLogin?: string
  preferences: UserPreferences
  addresses?: Address[]
  paymentMethods?: PaymentMethod[]
}

export type UserRole = "admin" | "customer" | "designer" | "sales" | "manager"

export interface UserPreferences {
  notifications: boolean
  newsletter: boolean
  theme: "light" | "dark" | "system"
  language: string
  currency: "INR" | "USD" | "AED"
}

export interface PaymentMethod {
  id: string
  type: "card" | "upi" | "netbanking" | "wallet"
  last4?: string
  cardBrand?: string
  isDefault: boolean
  expiryMonth?: number
  expiryYear?: number
}

// ============================================================================
// CART TYPES
// ============================================================================

export interface CartItem {
  id: string
  name: string
  category: string
  price: string
  priceValue: number
  quantity: number
  specifications?: Record<string, unknown>
  customizations?: Record<string, unknown>
  image: string
  sku: string
  addedAt: Date
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  estimatedTotal: number
  lastUpdated: Date
  appliedCoupon?: AppliedCoupon
}

export interface AppliedCoupon {
  code: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minOrderValue?: number
  maxDiscount?: number
}

// ============================================================================
// CONFIGURATOR TYPES
// ============================================================================

export interface BoxConfiguration {
  dimensions: {
    width: number
    height: number
    depth: number
    thickness: number
  }
  style: BoxStyle
  material: BoxMaterial
  color: string
  finish: BoxFinish
  printing: boolean
  quantity: number
  customText: string
  logo?: string
  inserts?: BoxInsert[]
}

export type BoxStyle = "shipping" | "mailer" | "gift" | "food" | "pharma" | "custom"
export type BoxMaterial = "corrugated" | "kraft" | "cardboard" | "rigid"
export type BoxFinish = "matte" | "glossy" | "satin" | "transparent"

export interface BoxInsert {
  type: "foam" | "cardboard" | "plastic" | "fabric"
  compartments: number
  additionalCost: number
}

export interface ConfiguratorState {
  config: BoxConfiguration
  previewMode: "flat" | "assembled"
  savedConfigs: SavedConfiguration[]
  currentPrice: number
}

export interface SavedConfiguration {
  id: string
  name: string
  config: BoxConfiguration
  createdAt: string
  thumbnail?: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: APIError
  meta?: APIMeta
}

export interface APIError {
  code: string
  message: string
  details?: Record<string, string[]>
}

export interface APIMeta {
  page?: number
  limit?: number
  total?: number
  hasMore?: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  subject: string
  message: string
  preferredContact: "email" | "phone" | "whatsapp"
}

export interface QuoteRequestFormData {
  name: string
  email: string
  phone: string
  company?: string
  productType: ProductCategory
  specifications: Partial<ProductSpecifications>
  quantity: number
  targetPrice?: number
  deadline?: string
  additionalRequirements?: string
  sampleRequired: boolean
}

export interface NewsletterFormData {
  email: string
  interests: ProductCategory[]
  frequency: "daily" | "weekly" | "monthly"
}

// ============================================================================
// SEO TYPES
// ============================================================================

export interface SEOMeta {
  title: string
  description: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
  noIndex?: boolean
  noFollow?: boolean
}

// ============================================================================
// INDUSTRY VERTICAL TYPES
// ============================================================================

export interface IndustryVertical {
  id: string
  name: string
  slug: string
  description: string
  heroImage: string
  icon: string
  products: string[]
  caseStudies: CaseStudy[]
  testimonials: Testimonial[]
  certifications: string[]
  features: IndustryFeature[]
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  challenge: string
  solution: string
  results: string[]
  images: string[]
  testimonialQuote?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  avatar?: string
  rating: number
}

export interface IndustryFeature {
  title: string
  description: string
  icon: string
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface WebVitalsMetric {
  name: "LCP" | "FID" | "CLS" | "FCP" | "TTFB" | "INP"
  value: number
  rating: "good" | "needs-improvement" | "poor"
  delta: number
  id: string
  navigationType: string
}

export interface AnalyticsEvent {
  name: string
  category: string
  action: string
  label?: string
  value?: number
  properties?: Record<string, unknown>
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Nullable<T> = T | null

export type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export type SortDirection = "asc" | "desc"

export interface SortConfig<T> {
  key: keyof T
  direction: SortDirection
}

export interface FilterConfig {
  field: string
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in"
  value: unknown
}



// ============================================================================
// SERVICE TYPES (for mock-data compatibility)
// ============================================================================

import type { LucideIcon } from "lucide-react"

export interface ProcessStep {
  title: string
  description: string
  icon: LucideIcon
}

export interface Service {
  id: string
  name: string
  slug: string
  icon: LucideIcon
  description: string
  longDescription: string
  benefits: string[]
  processSteps: ProcessStep[]
  imageUrl: string
}

// ============================================================================
// RESOURCE TYPES
// ============================================================================

export interface Resource {
  id: string
  title: string
  type: "guide" | "calculator" | "catalog" | "case-study" | "whitepaper" | "video"
  slug: string
  icon: LucideIcon
  description: string
  longDescription: string
  imageUrl: string
  downloadUrl?: string
  datePublished?: string
  author?: string
}

// ============================================================================
// FAQ TYPES
// ============================================================================

export interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
}

// ============================================================================
// TEAM & PRESS TYPES
// ============================================================================

export interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl: string
  bio: string
  linkedin?: string
  twitter?: string
  email?: string
}

export interface PressRelease {
  id: string
  title: string
  date: string
  summary: string
  slug: string
  content?: string
  imageUrl?: string
}

// ============================================================================
// LEGACY PRODUCT TYPE (for mock-data compatibility)
// ============================================================================

// Simpler Product type used by mock-data.ts
// The full Product interface above is for enterprise use
export interface LegacyProduct {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  imageUrl: string
  slug: string
  features: string[]
  tags?: string[]
}

