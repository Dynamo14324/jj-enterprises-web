import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, MessageSquare, TrendingUp, CheckSquare, Users, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { services } from "@/data/mock-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Packaging Consultation Services | JJ Enterprises",
  description:
    "Expert packaging consultation to optimize your designs, materials, costs, and supply chain. Achieve your business goals with strategic packaging advice.",
}

export default function PackagingConsultationPage() {
  const service = services.find((s) => s.slug === "/services/consultation")

  if (!service) {
    return (
      <PageLayout title="Service Not Found">
        <p>The requested service, Packaging Consultation, could not be found in our data.</p>
        <p>
          Please ensure the `mock-data.ts` file includes an entry for this service with slug `/services/consultation`.
        </p>
      </PageLayout>
    )
  }

  const consultationAreas = [
    {
      title: "Design Optimization",
      description:
        "Reviewing and refining your existing packaging designs for better performance, aesthetics, and cost-effectiveness.",
      icon: Lightbulb,
    },
    {
      title: "Material Selection",
      description:
        "Advising on the optimal materials based on product needs, sustainability goals, and budget constraints.",
      icon: Settings,
    },
    {
      title: "Cost Reduction Strategies",
      description: "Identifying opportunities to reduce packaging costs without compromising quality or protection.",
      icon: TrendingUp,
    },
    {
      title: "Supply Chain Efficiency",
      description:
        "Analyzing your packaging supply chain to improve efficiency, reduce lead times, and minimize waste.",
      icon: Users, // Using Users as a proxy for supply chain/team collaboration
    },
  ]

  return (
    <PageLayout
      title={service.name}
      breadcrumbPaths={[
        { label: "Services", href: "/services" },
        { label: service.name, href: service.slug },
      ]}
      heroImageUrl={service.imageUrl || "/placeholder.svg?width=1200&height=400&text=Packaging+Consultation"}
      heroSubtitle={
        service.description ||
        "Strategic advice and expert insights to help you make informed decisions about your packaging, from concept to consumer."
      }
    >
      <section className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
              Unlock Your Packaging's Full Potential
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              {service.longDescription ||
                "Our packaging consultation services provide you with access to industry experts who can help you navigate the complexities of packaging. Whether you're launching a new product, looking to improve sustainability, or aiming to reduce costs, our tailored advice can guide you to the best solutions."}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We take a holistic view of your packaging needs, considering everything from material science and
              structural design to branding and logistics.
            </p>
            <Link href="/contact?subject=Packaging+Consultation+Inquiry">
              <Button size="lg">
                Schedule a Consultation
                <MessageSquare className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="relative h-80 md:h-96">
            <Image
              src={service.imageUrl || "/placeholder.svg?width=550&height=450&text=Expert+Advice"}
              alt="Packaging consultation session"
              fill
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
            Areas We Cover in Consultation
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {consultationAreas.map((area) => {
            const Icon = area.icon
            return (
              <Card key={area.title} className="text-center flex flex-col">
                <CardHeader>
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{area.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 text-center">
        <CheckSquare className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
          Ready for Expert Packaging Guidance?
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Our consultants are ready to help you optimize your packaging strategy. Contact us today to learn how we can
          support your business objectives.
        </p>
        <Link href="/contact?subject=Book+Consultation">
          <Button variant="outline" size="lg">
            Book Your Consultation Call
          </Button>
        </Link>
      </section>
    </PageLayout>
  )
}
