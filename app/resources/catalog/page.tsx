import type { Metadata } from "next"
import ProductCatalogClientPage from "./ProductCatalogClientPage"

// SEO Metadata
export const metadata: Metadata = {
  title: "Product Catalog - Premium Packaging Solutions | JJ Enterprises",
  description:
    "Browse our comprehensive catalog of premium packaging solutions including corrugated boxes, gift boxes, food packaging, and custom solutions. Download detailed product catalogs and specifications.",
  keywords:
    "product catalog, packaging solutions, corrugated boxes, gift boxes, food packaging, custom packaging, JJ Enterprises, packaging catalog, HD product images",
  openGraph: {
    title: "Product Catalog - Premium Packaging Solutions | JJ Enterprises",
    description:
      "Discover our extensive range of premium packaging solutions with HD images and detailed specifications. Download product catalogs and get instant quotes.",
    images: ["/placeholder.svg?height=1200&width=630&text=JJ+Enterprises+Product+Catalog"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Catalog - Premium Packaging Solutions",
    description:
      "Browse our comprehensive catalog of premium packaging solutions with HD images and detailed specifications.",
  },
}

export default function ProductCatalogPage() {
  return <ProductCatalogClientPage />
}
