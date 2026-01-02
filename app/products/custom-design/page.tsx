import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Lightbulb, PackagePlus, Palette, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByTag } from "@/data/mock-data"

export const metadata: Metadata = {
  title: "Custom Design Solutions | JJ Enterprises",
  description:
    "Unlock unique packaging possibilities with our bespoke custom design solutions. From concept to creation, we bring your brand vision to life.",
}

export default function CustomDesignSolutionsPage() {
  const breadcrumbPaths = [
    { label: "Products", href: "/products" },
    { label: "Custom Design Solutions", href: "/products/custom-design" },
  ]
  const customExamples = getProductsByTag("custom")

  const processSteps = [
    {
      title: "Consultation & Ideation",
      description: "We start by understanding your brand, product, target audience, and objectives.",
      icon: Lightbulb,
    },
    {
      title: "Concept & Prototyping",
      description: "Our designers create innovative concepts and tangible prototypes for your review.",
      icon: Palette,
    },
    {
      title: "Manufacturing & Quality",
      description: "Precision manufacturing ensures your custom design is perfectly executed.",
      icon: PackagePlus,
    },
    {
      title: "Delivery & Impact",
      description: "Receive unique packaging that elevates your brand and captivates customers.",
      icon: Sparkles,
    },
  ]

  return (
    <PageLayout
      title="Bespoke Custom Design Solutions"
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle="Elevate your brand with packaging that's as unique as your product. Our custom design services turn innovative ideas into impactful realities."
      heroImageUrl="/placeholder.svg?width=1200&height=400&text=Unique+Packaging+Designs"
      heroCta={{ label: "Start Your Custom Project", href: "/contact?subject=Custom+Design+Inquiry" }}
    >
      <section className="mb-12 md:mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>
            Standard packaging doesn't always tell your brand's full story. At JJ Enterprises, our Custom Design
            Solutions service is dedicated to creating packaging that is truly one-of-a-kind. We partner with you to
            develop bespoke solutions that not only protect your product but also create unforgettable unboxing
            experiences and reinforce your brand identity.
          </p>
          <p>
            Our team of experienced designers and engineers leverages cutting-edge technology and creative flair to
            tackle any challenge. Whether you need intricate structural designs, unique material combinations, or
            innovative printing techniques, we have the expertise to deliver packaging that stands out.
          </p>
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800 dark:text-gray-200 text-center">
          Our Custom Design Process
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <Card key={step.title} className="text-center">
              <CardHeader>
                <step.icon className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {customExamples.length > 0 && (
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800 dark:text-gray-200 text-center">
            Examples of Our Custom Work
          </h2>
          <ProductGrid products={customExamples} />
        </section>
      )}

      <section className="grid md:grid-cols-2 gap-8 items-center mb-12 md:mb-16">
        <div className="rounded-lg overflow-hidden order-last md:order-first">
          <Image
            src="/placeholder.svg?width=550&height=400&text=Collaborative+Design"
            alt="Collaborative Design Session"
            width={550}
            height={400}
            className="object-cover w-full"
          />
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold mb-3">Your Vision, Our Expertise</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We believe in a collaborative approach. Your insights combined with our technical skills and creative vision
            lead to packaging that is not just functional but also a powerful marketing tool. Let's discuss how we can
            bring your most ambitious packaging ideas to life.
          </p>
          <Link href="/services/design">
            <Button variant="secondary">More on Our Design Services</Button>
          </Link>
        </div>
      </section>

      <section className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Ready to Create Something Extraordinary?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Our team is excited to hear about your project. Contact us today for a consultation.
        </p>
        <Link href="/contact?subject=Custom+Packaging+Project">
          <Button size="lg">Get in Touch</Button>
        </Link>
      </section>
    </PageLayout>
  )
}
