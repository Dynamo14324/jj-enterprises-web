import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

interface BreadcrumbPath {
  label: string
  href: string
}

interface PageLayoutProps {
  title: string
  breadcrumbPaths?: BreadcrumbPath[]
  children: React.ReactNode
  heroImageUrl?: string
  heroSubtitle?: string
  heroCta?: {
    label: string
    href: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  }
  showTitleWithinContent?: boolean // If true, title is shown below hero/breadcrumb
}

export function PageLayout({
  title,
  breadcrumbPaths,
  children,
  heroImageUrl,
  heroSubtitle,
  heroCta,
  showTitleWithinContent = false,
}: PageLayoutProps) {
  const hasHero = heroImageUrl || heroSubtitle

  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        {hasHero && (
          <section
            className={`relative py-16 md:py-24 lg:py-32 ${heroImageUrl ? "bg-cover bg-center bg-no-repeat" : "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"}`}
            style={
              heroImageUrl
                ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroImageUrl})` }
                : {}
            }
          >
            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
              <h1
                className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl ${heroImageUrl ? "text-white" : "text-gray-900 dark:text-gray-50"}`}
              >
                {title}
              </h1>
              {heroSubtitle && (
                <p
                  className={`mt-6 max-w-3xl mx-auto text-lg md:text-xl ${heroImageUrl ? "text-gray-200" : "text-gray-600 dark:text-gray-300"}`}
                >
                  {heroSubtitle}
                </p>
              )}
              {heroCta && (
                <div className="mt-10">
                  <Link
                    href={heroCta.href}
                    className={`inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      heroCta.variant === "outline"
                        ? heroImageUrl
                          ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
                          : "border-primary text-primary hover:bg-primary hover:text-white"
                        : heroImageUrl
                          ? "bg-white text-primary hover:bg-gray-100"
                          : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    {heroCta.label}
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          {breadcrumbPaths && breadcrumbPaths.length > 0 && (
            <Breadcrumb className="mb-6 md:mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbPaths.map((path, index) => (
                  <React.Fragment key={path.href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === breadcrumbPaths.length - 1 ? (
                        <BreadcrumbPage>{path.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={path.href}>{path.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {(!hasHero || showTitleWithinContent) && (
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8 text-gray-900 dark:text-gray-50">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}
