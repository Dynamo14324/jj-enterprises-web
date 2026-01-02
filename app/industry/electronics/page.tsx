import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Zap, ShieldAlert, PackageSearch } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const electronicsSolutions = [
  {
    title: "Anti-Static & ESD Packaging",
    description:
      "Specialized materials and designs to protect sensitive electronic components from electrostatic discharge (ESD) damage during shipping and handling.",
    icon: Zap,
    imageUrl: "/placeholder.svg?width=400&height=300&text=ESD+Packaging",
  },
  {
    title: "Protective Cushioning Solutions",
    description:
      "Custom foam inserts, molded pulp, and suspension packaging to safeguard delicate electronics from shock, vibration, and impact.",
    icon: ShieldAlert,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Cushioning",
  },
  {
    title: "Retail & Consumer Electronics Packaging",
    description:
      "High-impact retail boxes, clear clamshells, and secure packaging for consumer electronics that balances protection with brand presentation.",
    icon: PackageSearch,
    imageUrl: "/placeholder.svg?width=400&height=300&text=Retail+Electronics",
  },
  {
    title: "Sustainable Tech Packaging",
    description:
      "Eco-friendly options including recycled materials, minimalist designs, and right-sized packaging to reduce environmental impact for tech products.",
    icon: Cpu, // Using Cpu as a general tech icon
    imageUrl: "/placeholder.svg?width=400&height=300&text=Sustainable+Tech",
  },
]

export default function ElectronicsTechnologyPage() {
  return (
    <PageLayout
      title="Electronics & Technology Packaging"
      breadcrumbPaths={[
        { label: "Industries", href: "/industry" },
        { label: "Electronics & Technology", href: "/industry/electronics" },
      ]}
      heroImageUrl="/placeholder.svg?width=1200&height=400&text=Tech+Industry"
      heroSubtitle="Innovative and protective packaging solutions for the fast-paced electronics and technology sector. Ensuring your products arrive safely and make a great first impression."
    >
      <section className="py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-50">
            Precision Packaging for Modern Technology
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            From sensitive microchips to consumer gadgets, we provide packaging that meets the stringent demands of the
            electronics industry, focusing on protection, sustainability, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {electronicsSolutions.map((solution) => (
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
            Why Choose Us for Electronics Packaging?
          </h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto text-gray-700 dark:text-gray-200">
          <li className="flex items-start">
            <Zap className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
            Expertise in ESD protection and anti-static materials.
          </li>
          <li className="flex items-start">
            <ShieldAlert className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
            Advanced cushioning and shock absorption technologies.
          </li>
          <li className="flex items-start">
            <Cpu className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
            Commitment to sustainable and right-sized packaging.
          </li>
          <li className="flex items-start">
            <PackageSearch className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" />
            Designs that enhance unboxing experience and brand value.
          </li>
        </ul>
      </section>

      <section className="py-12 md:py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-gray-900 dark:text-gray-50 mb-4">
          Secure Your Tech with Smart Packaging
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Let us help you design the perfect packaging solution for your electronic products. Get in touch for a
          customized quote.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Discuss Your Project
        </Link>
      </section>
    </PageLayout>
  )
}
