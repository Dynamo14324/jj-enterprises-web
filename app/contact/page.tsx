import { ContactSection } from "@/components/contact-section" // Assuming this component exists and is styled
import { PageLayout } from "@/components/page-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | JJ Enterprises",
  description:
    "Get in touch with JJ Enterprises for your packaging needs. Fill out our contact form or find our contact details.",
}

export default function ContactPage() {
  const breadcrumbPaths = [{ label: "Contact Us", href: "/contact" }]
  return (
    <PageLayout
      title="Get In Touch"
      breadcrumbPaths={breadcrumbPaths}
      heroSubtitle="We're here to help with all your packaging questions and needs. Reach out to us today!"
    >
      <ContactSection />
    </PageLayout>
  )
}
