import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types" // Ensure this path is correct
import { ArrowRight, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={product.slug} className="block aspect-[4/3] overflow-hidden">
          <Image
            src={product.images?.[0]?.url || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {product.tags && product.tags.includes("best-seller") && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Best Seller
          </Badge>
        )}
        {product.tags && product.tags.includes("eco-friendly") && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-green-500 text-white">
            Eco-Friendly
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 leading-tight">
          <Link href={product.slug} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{product.description}</p>
        {product.features && product.features.length > 0 && (
          <div className="mt-2 space-y-1">
            {product.features.slice(0, 2).map((feature) => (
              <div key={feature} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Tag className="w-3 h-3 mr-1.5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={product.slug} className="w-full">
          <Button variant="outline" className="w-full group">
            View Details <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
