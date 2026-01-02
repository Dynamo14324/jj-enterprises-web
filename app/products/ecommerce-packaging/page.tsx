import { PageLayout } from "@/components/page-layout"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByCategory } from "@/data/mock-data"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, ShoppingCart, Zap, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "E-commerce Mailers & Packaging | JJ Enterprises",
  description:
    "Discover our range of durable, efficient, and brandable e-commerce mailers and shipping boxes designed for online retailers.",
}

export default function EcommercePackagingPage() {
  const ecommerceProducts = getProductsByCategory("E-commerce Mailers")
  const breadcrumbPaths = [
    { label: "Products", href: "/products" },
    { label: "E-commerce Packaging", href: "/products/ecommerce-packaging" },
  ]

  const features = [
    {
      title: "Optimized for Shipping",
      description: "Lightweight yet durable materials to reduce shipping costs and protect products.",
      icon: Package,
    },
    {
      title: "Enhanced Unboxing",
      description: "Customizable options to create memorable unboxing experiences for your customers.",
      icon: ShoppingCart,
    },
    {
      title: "Quick Assembly",
      description: "Easy-to-assemble designs to improve fulfillment efficiency.",
      icon: Zap,
    },
    {
      title: "Secure & Protective",
      description: "Robust construction to ensure products arrive safely at their destination.",
      icon: ShieldCheck,
    },
  ]

  return (
    <PageLayout
      title="E-commerce Mailers & Shipping Solutions"
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle="Streamline your shipping and delight your customers with our specialized e-commerce packaging. Designed for durability, efficiency, and brand impact."
      heroImageUrl="/placeholder.svg?width=1200&height=400&text=E-commerce+Packaging"
      heroCta={{ label: "Get a Quote for Mailers", href: "/contact?subject=Ecommerce+Packaging+Inquiry" }}
    >
      <section className="mb-12 md:mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>
            In the fast-paced world of online retail, your packaging is often the first physical interaction a customer
            has with your brand. JJ Enterprises offers a comprehensive range of e-commerce mailers and shipping boxes
            designed to protect your products, optimize your shipping costs, and create a positive brand impression.
          </p>
          <p>
            From lightweight poly mailers for apparel to sturdy corrugated boxes for fragile items, our solutions are
            tailored to meet the diverse needs of online businesses. We focus on materials that are both protective and
            cost-effective, with options for custom printing to showcase your brand.
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
          Our E-commerce Packaging Range
        </h2>
        {ecommerceProducts.length > 0 ? (
          <ProductGrid products={ecommerceProducts} />
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Currently, no specific e-commerce mailers are listed. Please check back soon or contact us for custom
            solutions.
          </p>
        )}
      </section>

      <section className="mt-12 md:mt-16 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Elevate Your E-commerce Packaging?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our packaging experts can help you find the perfect mailers or boxes for your products, balancing
            protection, cost, and branding.
          </p>
          <Link href="/contact?subject=E-commerce+Packaging+Consultation">
            <Button variant="default" size="lg">
              Discuss Your Needs
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
