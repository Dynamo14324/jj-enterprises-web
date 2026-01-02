import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Shield, Wrench } from "lucide-react"
import Image from "next/image"

const automotiveSolutions = [
  {
    title: "Heavy-Duty Parts Packaging",
    description:
      "Robust corrugated boxes, custom foam inserts, and protective wraps designed to secure heavy, sensitive, or irregularly shaped automotive components during transit and storage.",
    icon: Package,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Parts+Packaging",
  },
  {
    title: "Supply Chain Optimization",
    description:
      "Returnable and reusable packaging systems, kitting solutions, and just-in-time delivery packaging to streamline your automotive supply chain and reduce waste.",
    icon: Wrench,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Supply+Chain",
  },
  {
    title: "Compliance & Safety Packaging",
    description:
      "Solutions meeting specific automotive industry standards (e.g., VDA, AIAG), including hazardous materials packaging and anti-static options for electronic components.",
    icon: Shield,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Compliance",
  },
  {
    title: "Aftermarket & Retail Packaging",
    description:
      "Attractive and durable packaging for aftermarket parts and accessories, enhancing brand presence and protecting products on retail shelves or in e-commerce shipments.",
    icon: Package,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Aftermarket",
  },
]

const benefits = [
  "Reduced in-transit damage for valuable components",
  "Improved handling efficiency in manufacturing and assembly lines",
  "Compliance with stringent industry regulations and OEM requirements",
  "Enhanced brand image for aftermarket products",
  "Sustainable options to meet corporate responsibility goals",
]

export default function AutomotiveIndustrialPage() {
  return (
    <PageLayout
      title="Automotive & Industrial Packaging"
      breadcrumbPaths={[
        { label: "Industries", href: "/industry" }, // Assuming an /industry overview page exists or will be created
        { label: "Automotive & Industrial", href: "/industry/automotive" },
      ]}
      heroImageUrl="/placeholder.svg?width=1200&height=400&text=Automotive+Industry"
      heroSubtitle="Durable and efficient packaging solutions engineered for the demanding automotive and industrial sectors. Protecting your components from factory to assembly line."
    >
      <section className="py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
            Tailored Solutions for Tough Challenges
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            We understand the unique packaging needs of the automotive and industrial markets, from protecting delicate
            electronics to securing heavy-duty machinery parts. Our solutions are designed for performance, efficiency,
            and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {automotiveSolutions.map((solution) => (
            <Card key={solution.title} className="overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={solution.imageUrl || "/placeholder.svg"}
                  alt={solution.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-48 md:h-56"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <div className="flex items-center mb-3">
                  <solution.icon className="w-8 h-8 text-primary mr-3" />
                  <CardTitle className="text-xl font-semibold">{solution.title}</CardTitle>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
            Key Benefits of Our Solutions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start p-4">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-200">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
          Partner with Us for Your Automotive Packaging Needs
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Whether you need standard solutions or highly customized designs, our team is ready to assist. Contact us
          today to discuss your specific requirements.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Request a Consultation
        </Link>
      </section>
    </PageLayout>
  )
}
