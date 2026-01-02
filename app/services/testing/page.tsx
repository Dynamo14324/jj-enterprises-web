import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Microscope } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { services } from "@/data/mock-data" // Assuming services are in mock-data

export default function TestingPage() {
  const service = services.find((s) => s.slug === "/services/testing")

  if (!service) {
    return (
      <PageLayout title="Service Not Found">
        <p>The requested service could not be found.</p>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={service.name}
      breadcrumbPaths={[
        { label: "Services", href: "/services" }, // Assuming a /services overview page
        { label: service.name, href: service.slug },
      ]}
      heroImageUrl={service.imageUrl || "/placeholder.svg?width=1200&height=400&text=Quality+Testing"}
      heroSubtitle={service.description}
    >
      <section className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
              Ensure Packaging Integrity and Compliance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{service.longDescription}</p>
            {service.benefits && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Key Benefits:</h3>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckSquare className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            <Image
              src={service.imageUrl || "/placeholder.svg?width=500&height=400&text=Testing+Process"}
              alt={`${service.name} illustration`}
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
              Our Testing Process
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.processSteps.map((step) => {
              const Icon = step.icon
              return (
                <Card key={step.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      {Icon && <Icon className="w-8 h-8 text-primary" />}
                    </div>
                    <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
          Ready to Validate Your Packaging?
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Contact us to discuss your specific testing needs and ensure your products are protected and compliant.
        </p>
        <Link href="/contact">
          <Button size="lg">
            Get a Testing Quote
            <Microscope className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </PageLayout>
  )
}
