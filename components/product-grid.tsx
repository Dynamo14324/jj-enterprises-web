import type { Product } from "@/lib/types" // Ensure this path is correct
import { ProductCard } from "./product-card"
import { AlertTriangle } from "lucide-react"

interface ProductGridProps {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500 dark:text-gray-400">
        <AlertTriangle className="w-12 h-12 mb-4 text-yellow-500" />
        <p className="text-lg font-medium">No products found.</p>
        <p className="text-sm">Please check back later or try a different category.</p>
      </div>
    )
  }
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
