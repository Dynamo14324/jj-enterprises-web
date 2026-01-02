import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, ShieldCheck, Truck, CheckCircle } from "lucide-react"
import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from "@/data/mock-data"

export const metadata: Metadata = {
  title: "Bulk & Contract Manufacturing | JJ Enterprises",
  description:
    "High-volume packaging production with consistent quality, competitive pricing, and reliable delivery for your large-scale needs.",
}

export default function BulkOrdersPage() {
  const service = services.find((s) => s.id === "serv-bulk")
  if (!service) return <PageLayout title="Service Not Found">Service details are currently unavailable.</PageLayout>

  const breadcrumbPaths = [
    { label: "Services", href: "/services" },
    { label: service.name, href: service.slug },
  ]

  const benefits = [
    {
      title: "Cost Efficiency",
      description: "Significant savings on per-unit costs with large volume orders.",
      icon: Zap,
    },
    {
      title: "Consistent Quality",
      description: "Stringent quality control processes ensure uniformity across all units.",
      icon: ShieldCheck,
    },
    {
      title: "Reliable Supply",
      description: "Scalable production capacity to meet your ongoing demands.",
      icon: Truck,
    },
    {
      title: "Dedicated Support",
      description: "A dedicated account manager for your bulk order needs.",
      icon: CheckCircle,
    },
  ]

  return (
    <PageLayout
      title={service.name}
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle={service.description}
      heroImageUrl={service.imageUrl || "/placeholder.svg?width=1200&height=400&text=Bulk+Manufacturing"}
      heroCta={{ label: "Discuss Your Volume Needs", href: "/contact?subject=Bulk+Order+Inquiry" }}
    >
      <section className="mb-12 md:mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>{service.longDescription}</p>
          <p>
            Whether you're a large corporation requiring millions of units annually or a growing business scaling up
            your operations, JJ Enterprises is your trusted partner for bulk and contract packaging manufacturing. We
            combine advanced technology, efficient processes, and a skilled workforce to deliver high-quality packaging
            solutions at scale.
          </p>
        </div>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800 dark:text-gray-200 text-center">
          Advantages of Our Bulk Manufacturing
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center">
              <CardHeader>
                <benefit.icon className="w-10 h-10 mx-auto text-primary mb-2" />
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {service.processSteps && (
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-gray-800 dark:text-gray-200 text-center">
            Our Streamlined Process
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {service.processSteps.map((step, index) => (
              <div key={step.title} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full text-primary font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  {index < service.processSteps!.length - 1 && <div className="w-px h-full bg-primary/30 my-1"></div>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Partner with Us for Your High-Volume Needs</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Experience the reliability and quality of JJ Enterprises' contract manufacturing. Let's discuss how we can
          support your growth.
        </p>
        <Link href="/contact?subject=Contract+Manufacturing+Partnership">
          <Button size="lg">Request a Consultation</Button>
        </Link>
      </section>
    </PageLayout>
  )
}
