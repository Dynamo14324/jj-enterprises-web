import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Recycle, Globe, CheckSquare, HeartHandshake, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { services } from "@/data/mock-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sustainable Sourcing Services | JJ Enterprises",
  description:
    "Partner with us for sustainable packaging material sourcing. We help you find and integrate eco-friendly materials into your supply chain.",
}

export default function SustainableSourcingServicePage() {
  const service = services.find((s) => s.slug === "/services/sustainability")

  if (!service) {
    return (
      <PageLayout title="Service Not Found">
        <p>The requested service, Sustainable Sourcing, could not be found in our data.</p>
        <p>
          Please ensure the `mock-data.ts` file includes an entry for this service with slug `/services/sustainability`.
        </p>
      </PageLayout>
    )
  }

  const features = [
    {
      title: "Eco-Material Identification",
      description:
        "We research and identify the best sustainable materials (recycled, biodegradable, compostable) for your specific packaging needs.",
      icon: Search,
    },
    {
      title: "Supplier Verification",
      description:
        "Our team vets suppliers to ensure they meet ethical and environmental standards, providing transparency in your supply chain.",
      icon: HeartHandshake,
    },
    {
      title: "Lifecycle Assessment Guidance",
      description:
        "We help you understand the environmental impact of different material choices, from raw material extraction to end-of-life.",
      icon: Recycle,
    },
    {
      title: "Regulatory Compliance Support",
      description:
        "Stay ahead of evolving environmental regulations with our expert guidance on material compliance and certifications (e.g., FSC, BPI).",
      icon: CheckSquare,
    },
  ]

  return (
    <PageLayout
      title={service.name}
      breadcrumbPaths={[
        { label: "Services", href: "/services" },
        { label: service.name, href: service.slug },
      ]}
      heroImageUrl={service.imageUrl || "/placeholder.svg?width=1200&height=400&text=Sustainable+Sourcing"}
      heroSubtitle={
        service.description ||
        "Guiding your business towards environmentally responsible packaging through strategic material sourcing and supply chain optimization."
      }
    >
      <section className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
              Partnering for a Greener Packaging Future
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {service.longDescription ||
                "JJ Enterprises offers dedicated Sustainable Sourcing services to help businesses transition to more environmentally friendly packaging. We leverage our industry knowledge and network to find innovative materials and reliable suppliers that align with your sustainability goals and product requirements."}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our approach goes beyond just finding materials; we aim to integrate sustainability into your packaging
              strategy, considering factors like cost-effectiveness, performance, and brand alignment.
            </p>
            <Link href="/contact?subject=Sustainable+Sourcing+Consultation">
              <Button size="lg">
                Discuss Your Sustainability Goals
                <Leaf className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src={service.imageUrl || "/placeholder.svg?width=550&height=450&text=Eco+Materials"}
              alt="Sustainable packaging materials"
              width={550}
              height={450}
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
            How We Help You Source Sustainably
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center flex flex-col">
              <CardHeader>
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 text-center">
        <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
          Make a Positive Impact with Your Packaging
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Let's work together to find sustainable sourcing solutions that benefit your business, your customers, and the
          planet. Our expertise can simplify your transition to greener packaging.
        </p>
        <Link href="/products/eco-friendly">
          <Button variant="outline" size="lg">
            Explore Our Eco-Friendly Products
          </Button>
        </Link>
      </section>
    </PageLayout>
  )
}
