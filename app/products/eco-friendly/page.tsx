import { PageLayout } from "@/components/page-layout"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByTag } from "@/data/mock-data" // Using getProductsByTag
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf, Recycle, Globe, PackageCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Eco-Friendly Packaging Solutions | JJ Enterprises",
  description:
    "Discover our range of sustainable, recyclable, and biodegradable packaging options. Make a positive impact with environmentally conscious choices.",
}

export default function EcoFriendlyPage() {
  const ecoFriendlyProducts = getProductsByTag("eco-friendly")
  const breadcrumbPaths = [
    { label: "Products", href: "/products" },
    { label: "Eco-Friendly Options", href: "/products/eco-friendly" },
  ]

  const features = [
    {
      title: "Sustainable Materials",
      description: "Made from recycled content, FSC-certified paper, or biodegradable plastics.",
      icon: Leaf,
    },
    {
      title: "Recyclable & Compostable",
      description: "Designed for easy recycling or composting to reduce landfill waste.",
      icon: Recycle,
    },
    {
      title: "Reduced Carbon Footprint",
      description: "Sourced and manufactured with a focus on minimizing environmental impact.",
      icon: Globe,
    },
    {
      title: "Brand Enhancement",
      description: "Showcase your commitment to sustainability to environmentally conscious consumers.",
      icon: PackageCheck,
    },
  ]

  return (
    <PageLayout
      title="Sustainable & Eco-Friendly Packaging"
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle="Choose packaging that's kind to the planet. Explore our innovative range of eco-friendly solutions designed for sustainability without compromising on quality or performance."
      heroImageUrl="/placeholder.svg?width=1200&height=400&text=Eco-Friendly+Packaging"
      heroCta={{ label: "Inquire About Green Packaging", href: "/contact?subject=Eco-Friendly+Packaging+Inquiry" }}
    >
      <section className="mb-12 md:mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>
            At JJ Enterprises, we are committed to a sustainable future. Our eco-friendly packaging options provide
            businesses with the opportunity to reduce their environmental impact while still delivering high-quality,
            protective, and attractive packaging for their products.
          </p>
          <p>
            We offer a variety of sustainable materials, including recycled cardboard, biodegradable plastics,
            compostable films, and FSC-certified papers. Our team can help you navigate the options to find the best
            eco-friendly solution that aligns with your brand values and product requirements.
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
          Our Eco-Friendly Product Highlights
        </h2>
        {ecoFriendlyProducts.length > 0 ? (
          <ProductGrid products={ecoFriendlyProducts} />
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Currently, no specific eco-friendly products are highlighted. Many of our standard products can be made with
            eco-friendly materials. Please contact us for more information.
          </p>
        )}
      </section>

      <section className="mt-12 md:mt-16 py-12 bg-green-50 dark:bg-green-900/30 rounded-lg">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Make a Greener Choice?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Let us help you transition to sustainable packaging solutions that benefit your business and the planet.
          </p>
          <Link href="/services/sustainability">
            <Button variant="default" size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Learn About Our Sustainability Services
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
