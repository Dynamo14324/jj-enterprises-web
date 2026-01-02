import { PageLayout } from "@/components/page-layout"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByCategory } from "@/data/mock-data"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Layers, Palette, Gift, CheckSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Folding Cartons | JJ Enterprises",
  description:
    "Versatile and customizable folding cartons for retail products, cosmetics, food items, and more. High-quality printing and finishing options.",
}

export default function FoldingCartonsPage() {
  const foldingCartonProducts = getProductsByCategory("Folding Cartons")
  const breadcrumbPaths = [
    { label: "Products", href: "/products" },
    { label: "Folding Cartons", href: "/products/folding-cartons" },
  ]

  const features = [
    {
      title: "Highly Versatile",
      description: "Suitable for a wide range of products across various industries.",
      icon: Layers,
    },
    {
      title: "Customizable Printing",
      description: "Full-color printing and various finishing options to match your brand.",
      icon: Palette,
    },
    {
      title: "Retail Ready",
      description: "Designed for attractive shelf presence and consumer appeal.",
      icon: Gift,
    },
    {
      title: "Eco-Friendly Options",
      description: "Available in recyclable and sustainably sourced materials.",
      icon: CheckSquare,
    },
  ]

  return (
    <PageLayout
      title="Custom Folding Cartons"
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle="Lightweight, versatile, and cost-effective folding cartons perfect for retail packaging. Enhance your product's appeal with our customizable solutions."
      heroImageUrl="/placeholder.svg?width=1200&height=400&text=Folding+Cartons"
      heroCta={{ label: "Request a Folding Carton Quote", href: "/contact?subject=Folding+Carton+Inquiry" }}
    >
      <section className="mb-12 md:mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>
            Folding cartons are a popular and versatile packaging choice for a multitude of products, from cosmetics and
            pharmaceuticals to food items and electronics. At JJ Enterprises, we specialize in designing and
            manufacturing high-quality folding cartons that not only protect your product but also serve as a powerful
            branding tool.
          </p>
          <p>
            Our cartons can be customized in various styles, sizes, and materials, including paperboard and specialty
            stocks. We offer a wide array of printing techniques and finishing options such as embossing, foil stamping,
            and UV coating to make your packaging truly stand out.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <feature.icon className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800 dark:text-gray-200 text-center">
          Explore Our Folding Carton Options
        </h2>
        {foldingCartonProducts.length > 0 ? (
          <ProductGrid products={foldingCartonProducts} />
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Currently, no specific folding cartons are listed. Please check back soon or contact us for custom
            solutions.
          </p>
        )}
      </section>

      <section className="mt-12 md:mt-16 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Need a Unique Folding Carton Design?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our design team can help you create the perfect folding carton that meets your product's needs and aligns
            with your brand identity.
          </p>
          <Link href="/services/design">
            <Button variant="outline" size="lg">
              Learn About Custom Design
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
