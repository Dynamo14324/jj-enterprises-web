// Enhanced SEO utilities for JJ Enterprises
export const siteConfig = {
  name: "JJ Enterprises",
  description: "Leading manufacturer of custom paper box packaging solutions in India with 15+ years experience.",
  url: "https://jjenterprises.com",
  ogImage: "https://jjenterprises.com/featured_corrugated_shipping_paper_box.png",
  links: {
    twitter: "https://twitter.com/jjenterprises",
    facebook: "https://facebook.com/jjenterprises",
    linkedin: "https://linkedin.com/company/jjenterprises",
    instagram: "https://instagram.com/jjenterprises",
    youtube: "https://youtube.com/@jjenterprises",
  },
  contact: {
    phone: "+91-98192-56432",
    email: "info@jjenterprises.com",
    address: {
      street: "Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400001"
    }
  }
}

// Enhanced JSON-LD schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://jjenterprises.com/#organization",
  name: "JJ Enterprises",
  alternateName: "JJ Enterprises Packaging Solutions",
  url: "https://jjenterprises.com",
  logo: {
    "@type": "ImageObject",
    url: "https://jjenterprises.com/logo.png",
    width: 300,
    height: 100
  },
  description: "Leading manufacturer of custom paper box packaging solutions in India with 15+ years experience. ISO 9001:2015 certified company specializing in corrugated boxes, pharmaceutical packaging, food-grade boxes, and luxury gift boxes.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mumbai",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400001",
    addressCountry: "IN"
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-98192-56432",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN"
    },
    {
      "@type": "ContactPoint",
      email: "info@jjenterprises.com",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN"
    }
  ],
  sameAs: [
    "https://www.linkedin.com/company/jjenterprises",
    "https://www.facebook.com/jjenterprises",
    "https://twitter.com/jjenterprises",
    "https://www.instagram.com/jjenterprises",
    "https://www.youtube.com/@jjenterprises"
  ],
  foundingDate: "2008",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 100
  },
  industry: "Packaging and Printing",
  areaServed: {
    "@type": "Country",
    name: "India"
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ISO 9001:2015 Quality Management System",
      recognizedBy: {
        "@type": "Organization",
        name: "International Organization for Standardization"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ISO 14001:2015 Environmental Management",
      recognizedBy: {
        "@type": "Organization",
        name: "International Organization for Standardization"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "FDA Compliant",
      recognizedBy: {
        "@type": "Organization",
        name: "Food and Drug Administration"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "FSC Certified",
      recognizedBy: {
        "@type": "Organization",
        name: "Forest Stewardship Council"
      }
    }
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Corrugated Shipping Boxes",
        description: "Durable corrugated boxes for shipping, storage, and e-commerce applications"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Luxury Rigid Gift Boxes",
        description: "Premium, sturdy boxes for high-end unboxing experience"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Pharmaceutical Packaging",
        description: "FDA compliant and secure packaging for medical products"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Food-Grade Boxes",
        description: "Safe packaging for direct food contact and beverages"
      }
    }
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://jjenterprises.com/#website",
  url: "https://jjenterprises.com",
  name: "JJ Enterprises - Paper Packaging Solutions",
  description: "Leading manufacturer of custom paper box packaging solutions in India",
  publisher: {
    "@id": "https://jjenterprises.com/#organization"
  },
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://jjenterprises.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  ],
  inLanguage: "en-IN"
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const productSchema = (product: {
  name: string
  description: string
  image?: string
  category: string
  manufacturer: string
  brand: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image || "https://jjenterprises.com/placeholder.jpg",
  category: product.category,
  manufacturer: {
    "@type": "Organization",
    name: product.manufacturer,
    "@id": "https://jjenterprises.com/#organization"
  },
  brand: {
    "@type": "Brand",
    name: product.brand
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
    seller: {
      "@id": "https://jjenterprises.com/#organization"
    }
  }
})

export const serviceSchema = (service: {
  name: string
  description: string
  serviceType: string
  areaServed: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  serviceType: service.serviceType,
  provider: {
    "@id": "https://jjenterprises.com/#organization"
  },
  areaServed: {
    "@type": "Country",
    name: service.areaServed
  }
})

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
})

// SEO meta tag generators
export const generateMetaTags = (page: {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
}) => ({
  title: page.title,
  description: page.description,
  keywords: page.keywords?.join(", "),
  openGraph: {
    title: page.title,
    description: page.description,
    url: page.url || siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: page.image || siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: page.title,
      },
    ],
    locale: "en_IN",
    type: page.type || "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
    images: [page.image || siteConfig.ogImage],
    creator: "@jjenterprises",
    site: "@jjenterprises",
  },
})

// Core Web Vitals tracking
export const trackWebVitals = (metric: any) => {
  // Track Core Web Vitals
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
      event_category: 'Web Vitals',
    })
  }
}
