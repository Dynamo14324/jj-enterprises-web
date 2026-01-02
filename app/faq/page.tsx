import { PageLayout } from "@/components/page-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqItems } from "@/data/mock-data"
import { HelpCircle, MessageSquare } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | JJ Enterprises",
  description: "Find answers to common questions about our packaging products, services, ordering process, and more.",
}

export default function FaqPage() {
  const breadcrumbPaths = [
    { label: "Support", href: "/support" }, // Assuming a general support page exists or will be created
    { label: "FAQ", href: "/faq" },
  ]

  const categories = Array.from(new Set(faqItems.map((item) => item.category).filter(Boolean)))

  return (
    <PageLayout
      title="Frequently Asked Questions"
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle="Find quick answers to your questions. If you can't find what you're looking for, feel free to contact us."
    >
      {categories.map((category) => (
        <section key={category} className="mb-10 md:mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{category}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems
              .filter((item) => item.category === category)
              .map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger className="text-left hover:no-underline text-base md:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none text-sm md:text-base">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </section>
      ))}

      {faqItems.filter((item) => !item.category).length > 0 && (
        <section className="mb-10 md:mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">General Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems
              .filter((item) => !item.category)
              .map((item) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger className="text-left hover:no-underline text-base md:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none text-sm md:text-base">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </section>
      )}

      <section className="mt-12 md:mt-16 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
        <HelpCircle className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="text-2xl font-semibold mb-3">Can't Find Your Answer?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Our support team is ready to assist you with any further questions or specific inquiries you may have.
        </p>
        <Link href="/contact">
          <Button size="lg">
            <MessageSquare className="mr-2 h-5 w-5" /> Contact Support
          </Button>
        </Link>
      </section>
    </PageLayout>
  )
}
