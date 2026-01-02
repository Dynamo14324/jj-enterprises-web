import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/hooks/use-auth"
import { ErrorBoundary } from "@/components/error-boundary"
import Script from "next/script"
import { organizationSchema, websiteSchema } from "@/lib/seo"
import { SkipToMain } from "@/lib/accessibility"
import { CurrencyProvider } from "@/lib/currency-context"

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: {
        value?: number
        event_label?: string
        non_interaction?: boolean
        event_category?: string
        page_title?: string
        page_location?: string
      }
    ) => void
  }
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f97316",
}

export const metadata: Metadata = {
  title: {
    default: "JJ Enterprises - Premium Paper Box Packaging Solutions | Custom Corrugated Boxes India",
    template: "%s | JJ Enterprises - Paper Packaging Solutions",
  },
  description:
    "Leading manufacturer of custom paper box packaging solutions in India. Specializing in corrugated boxes, pharmaceutical packaging, food-grade boxes, luxury gift boxes with 3D configurator. ISO 9001:2015 certified with 15+ years experience.",
  keywords: [
    "paper packaging India",
    "custom paper boxes",
    "corrugated paper boxes Mumbai",
    "pharmaceutical paper packaging",
    "food grade paper boxes",
    "luxury paper gift boxes",
    "3D packaging configurator",
    "eco-friendly paper packaging",
    "folding cartons India",
    "paper box manufacturer Mumbai",
    "custom packaging solutions",
    "paper packaging supplier",
    "sustainable packaging India",
    "paper box printing",
    "packaging design services",
  ].join(", "),
  authors: [{ name: "JJ Enterprises", url: "https://jjenterprises.com" }],
  creator: "JJ Enterprises",
  publisher: "JJ Enterprises",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jjenterprises.com",
    title: "JJ Enterprises - Premium Paper Box Packaging Solutions | Custom Corrugated Boxes India",
    description:
      "Leading manufacturer of custom paper box packaging solutions in India. ISO 9001:2015 certified with 15+ years experience. Specializing in corrugated boxes, pharmaceutical packaging, and luxury gift boxes.",
    siteName: "JJ Enterprises",
    images: [
      {
        url: "/featured_corrugated_shipping_paper_box.png",
        width: 1200,
        height: 630,
        alt: "JJ Enterprises Custom Paper Box Packaging Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JJ Enterprises - Premium Paper Box Packaging Solutions",
    description:
      "Leading manufacturer of custom paper box packaging solutions in India. ISO 9001:2015 certified with 15+ years experience.",
    images: ["/featured_corrugated_shipping_paper_box.png"],
    creator: "@jjenterprises",
    site: "@jjenterprises",
  },
  generator: "Next.js",
  applicationName: "JJ Enterprises Packaging Solutions",
  referrer: "origin-when-cross-origin",
  category: "Manufacturing",
  classification: "Business",
  alternates: {
    canonical: "https://jjenterprises.com",
    languages: {
      "en-IN": "https://jjenterprises.com",
      "hi-IN": "https://jjenterprises.com/hi",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JJ Enterprises",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SkipToMain />
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <CurrencyProvider>
                <div className="min-h-screen flex flex-col">
                  <Navigation />
                  <main className="flex-1" id="main-content">
                    {children}
                  </main>
                  <Footer />
                </div>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: "white",
                      border: "1px solid #e5e7eb",
                      color: "#374151",
                    },
                  }}
                />
              </CurrencyProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>

        {/* Analytics Scripts */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
        </Script>

        {/* Performance monitoring */}
      </body>
    </html>
  )
}


