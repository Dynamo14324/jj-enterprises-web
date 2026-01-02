import { PageLayout } from "@/components/page-layout"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByCategory } from "@/data/mock-data" // Updated import
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Utensils, Leaf, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Food-Grade Packaging | JJ Enterprises",
  description:
    "Explore our range of safe, compliant, and attractive food-grade boxes and containers for bakeries, restaurants, and food manufacturers.",
}

export default function FoodPackagingPage() {
  const foodProducts = getProductsByCategory("Food-Grade Boxes")
  const breadcrumbPaths = [
    { label: "Products", href: "/products" },
    { label: "Food-Grade Packaging", href: "/products/food-packaging" },
  ]

  const features = [
    {
      title: "Safety Compliant",
      description: "All materials meet FDA and EU food contact regulations.",
      icon: ShieldCheck,
    },
    {
      title: "Freshness Guaranteed",
      description: "Designs that maintain product integrity and extend shelf life.",
      icon: Leaf,
    },
    { title: "Custom Branding", description: "High-quality printing to make your brand pop.", icon: Utensils },
  ]

  return (
    <PageLayout
      title="Food-Grade Packaging Solutions"
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle="Safe, compliant, and appealing packaging designed specifically for direct contact with food and beverages. Perfect for bakeries, restaurants, catering, and food manufacturers."
      heroImageUrl="/placeholder.svg?width=1200&height=400&text=Deliciously+Packaged"
      heroCta={{ label: "Request a Quote", href: "/contact?subject=Food+Packaging+Inquiry" }}
    >
      <section className="mb-12 md:mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>
            At JJ Enterprises, we understand the critical importance of food safety and presentation. Our food-grade
            packaging solutions are manufactured using materials that comply with stringent industry regulations,
            ensuring your products remain fresh, safe, and visually appealing.
          </p>
          <p>
            Whether you need custom printed bakery boxes, durable takeout containers, or specialized packaging for
            perishable goods, we offer a variety of options to meet your specific needs. Our solutions can be customized
            with features like grease resistance, moisture barriers, and clear windows to enhance product visibility.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
          Explore Our Food-Grade Packaging
        </h2>
        <ProductGrid products={foodProducts} />
      </section>

      <section className="mt-12 md:mt-16 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Need a Custom Food Packaging Solution?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            If you have unique requirements or need a fully customized food packaging design, our team of experts is
            here to help. We can assist with material selection, structural design, and branding to create packaging
            that perfectly represents your food products.
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
