"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Truck,
  Sparkles,
  ShieldCheck,
  PackageSearch,
  Utensils,
  ShoppingBag,
  Building,
  FlaskConical,
  Palette,
  CuboidIcon,
  Menu,
  Award,
  Leaf,
  FileText,
  BookOpen,
  Calculator,
  Paintbrush,
  TestTube,
  Phone,
  Mail,
  Star,
  Clock,
  CheckCircle,
  Package,
  Settings,
  Cpu,
  Car,
  MessageCircle,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CurrencySelector } from "@/components/currency-selector"

const productComponents: {
  title: string
  href: string
  description: string
  icon: React.ElementType
  badge?: string
}[] = [
    {
      title: "Corrugated Shipping Boxes",
      href: "/products/corrugated",
      description: "Durable corrugated boxes for shipping, storage, and e-commerce.",
      icon: Truck,
      badge: "Popular",
    },
    {
      title: "Luxury Rigid Gift Boxes",
      href: "/products/luxury-rigid",
      description: "Premium, sturdy boxes for a high-end unboxing experience.",
      icon: Sparkles,
      badge: "Popular",
    },
    {
      title: "Pharmaceutical Cartons",
      href: "/products/pharma",
      description: "FDA compliant and secure packaging for medical products.",
      icon: ShieldCheck,
      badge: "Certified",
    },
    {
      title: "Food-Grade Boxes",
      href: "/products/food-packaging",
      description: "Safe packaging for direct food contact and beverages.",
      icon: Utensils,
      badge: "Food Safe",
    },
    {
      title: "Folding Paper Cartons",
      href: "/products/folding-cartons",
      description: "Customizable and lightweight cartons for retail products.",
      icon: PackageSearch,
    },
    {
      title: "E-commerce Mailers",
      href: "/products/ecommerce-packaging",
      description: "Optimized mailers and boxes for direct-to-consumer shipping.",
      icon: ShoppingBag,
      badge: "Popular",
    },
  ]

const industrySolutions: {
  title: string
  href: string
  description: string
  icon: React.ElementType
  clients?: string
}[] = [
    {
      title: "Pharmaceutical & Healthcare",
      href: "/industry/pharmaceutical",
      description: "Compliant packaging with security features, tamper-evidence, and tracking.",
      icon: FlaskConical,
      clients: "50+ Pharma Clients",
    },
    {
      title: "Food & Beverage",
      href: "/industry/food-beverage",
      description: "Safe, fresh, and appealing packaging solutions for consumables.",
      icon: Utensils,
      clients: "200+ Food Brands",
    },
    {
      title: "Cosmetics & Personal Care",
      href: "/industry/cosmetics",
      description: "Elegant and protective packaging for beauty and skincare products.",
      icon: Palette,
      clients: "100+ Beauty Brands",
    },
    {
      title: "E-commerce & Retail",
      href: "/industry/ecommerce",
      description: "Efficient, brandable, and durable shipping solutions for online businesses.",
      icon: ShoppingBag,
      clients: "300+ Online Stores",
    },
    {
      title: "Electronics & Technology",
      href: "/industry/electronics",
      description: "Protective, anti-static packaging for sensitive electronic components.",
      icon: Cpu,
    },
    {
      title: "Automotive & Industrial",
      href: "/industry/automotive",
      description: "Heavy-duty packaging for parts, components, and industrial goods.",
      icon: Car,
    },
  ]

const servicesLinks: {
  title: string
  href: string
  description: string
  icon: React.ElementType
  duration?: string
}[] = [
    {
      title: "Custom Design & Prototyping",
      href: "/services/design",
      description: "Collaborate with our designers to create perfect packaging from concept to reality.",
      icon: Paintbrush,
      duration: "3-5 Days",
    },
    {
      title: "Bulk & Contract Manufacturing",
      href: "/services/bulk-orders",
      description: "Reliable, high-volume production with consistent quality for large-scale needs.",
      icon: Building,
      duration: "7-14 Days",
    },
    {
      title: "Quality & Compliance Testing",
      href: "/services/testing",
      description: "Rigorous testing services to ensure your packaging meets all industry standards.",
      icon: TestTube,
      duration: "24-48 Hours",
    },
    {
      title: "Sustainable Sourcing",
      href: "/services/sustainability",
      description: "Choose from our range of eco-friendly materials and sustainable practices.",
      icon: Leaf,
      duration: "Ongoing",
    },
    {
      title: "Packaging Consultation",
      href: "/services/consultation",
      description: "Leverage our expertise to optimize your packaging strategy and reduce costs.",
      icon: MessageCircle,
    },
    {
      title: "3D Packaging Configurator",
      href: "/configurator",
      description: "Visualize and customize your packaging in real-time with our interactive 3D tool.",
      icon: CuboidIcon,
    },
  ]

const resourcesLinks: { title: string; href: string; description: string; icon: React.ElementType; type?: string }[] = [
  {
    title: "Packaging Design Guides",
    href: "/resources/guides",
    description: "Comprehensive articles on material selection, design principles, and best practices.",
    icon: BookOpen,
    type: "Free Guide",
  },
  {
    title: "Box Size Calculator",
    href: "/resources/calculator",
    description: "Smart tool to determine optimal box dimensions and material requirements.",
    icon: Calculator,
    type: "Free Tool",
  },
  {
    title: "Success Case Studies",
    href: "/resources/case-studies",
    description: "Real-world examples of how we've helped businesses transform their packaging.",
    icon: Award,
    type: "Case Study",
  },
  {
    title: "Product Catalog",
    href: "/resources/catalog",
    description: "Browse our complete product catalog with HD images and detailed specifications.",
    icon: FileText,
    type: "HD Catalog",
  },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 shadow-lg"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center shrink-0">
          {" "}
          {/* Added shrink-0 to the main logo container */}
          <Link href="/" className="flex items-center space-x-3 mr-8" aria-label="JJ Enterprises Homepage">
            <div className="relative shrink-0">
              {" "}
              {/* Added shrink-0 to the icon's wrapper */}
              <CuboidIcon className="h-8 w-8 text-orange-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              {/* Added leading-none for consistent line height */}
              <span className="font-bold text-xl text-gray-800 leading-none">JJ Enterprises</span>
              <div className="text-xs text-gray-500 -mt-1 leading-none">Paper Packaging Solutions</div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                  Products
                  <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-700">
                    NEW
                  </Badge>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-50 to-orange-100 p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-shadow"
                          href="/products"
                        >
                          <PackageSearch className="h-8 w-8 text-orange-600 mb-2" />
                          <div className="mb-2 mt-4 text-lg font-medium text-gray-800">Complete Product Range</div>
                          <p className="text-sm leading-tight text-gray-600">
                            Explore our comprehensive collection of packaging solutions for every industry.
                          </p>
                          <Badge className="mt-3 w-fit bg-orange-500">View All Products</Badge>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {productComponents.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        icon={component.icon}
                        badge={component.badge}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                  Industry Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-shadow"
                          href="/solutions"
                        >
                          <Building className="h-8 w-8 text-blue-600 mb-2" />
                          <div className="mb-2 mt-4 text-lg font-medium text-gray-800">Industry-Specific Solutions</div>
                          <p className="text-sm leading-tight text-gray-600">
                            Tailored packaging that meets the unique demands and regulations of your industry.
                          </p>
                          <div className="flex items-center mt-3 text-xs text-blue-600">
                            <Star className="w-3 h-3 mr-1" />
                            500+ Satisfied Clients
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {industrySolutions.map((solution) => (
                      <ListItem
                        key={solution.title}
                        title={solution.title}
                        href={solution.href}
                        icon={solution.icon}
                        subtitle={solution.clients}
                      >
                        {solution.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                    {servicesLinks.map((link) => (
                      <ListItem
                        key={link.title}
                        title={link.title}
                        href={link.href}
                        icon={link.icon}
                        subtitle={link.duration}
                      >
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                    {resourcesLinks.map((link) => (
                      <ListItem key={link.title} title={link.title} href={link.href} icon={link.icon} badge={link.type}>
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-orange-600")}
                  >
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-orange-600")}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Contact Info - Hidden on mobile */}
          <div className="hidden xl:flex items-center space-x-4 text-sm text-gray-600 mr-4">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1 text-orange-500" />
              <span>+91-98192-56432</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-green-500" />
              <span>24/7 Support</span>
            </div>
          </div>

          {/* 3D Configurator Button */}
          <Link href="/configurator" aria-label="Try 3D packaging configurator">
            <Button className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg">
              <CuboidIcon className="w-4 h-4 mr-2" />
              3D Configurator
            </Button>
          </Link>

          {/* Get Quote Button */}
          <Link href="/contact" aria-label="Get instant quote">
            <Button
              variant="outline"
              className="hidden md:inline-flex border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Get Quote
            </Button>
          </Link>

          {/* Currency Selector */}
          <div className="hidden sm:block">
            <CurrencySelector />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileNavigation isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          </div>
        </div>
      </div>

      {/* Quick Access Bar - Only on homepage */}
      {pathname === "/" && (
        <div className="border-t bg-orange-50/50 py-2 hidden md:block">
          <div className="container">
            <div className="flex items-center justify-center space-x-8 text-sm">
              <Link
                href="/products/corrugated"
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Truck className="w-4 h-4 mr-1" />
                Corrugated Boxes
              </Link>
              <Link
                href="/products/luxury-rigid"
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Luxury Boxes
              </Link>
              <Link
                href="/products/pharma"
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 mr-1" />
                Pharma Packaging
              </Link>
              <Link
                href="/services/design"
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Paintbrush className="w-4 h-4 mr-1" />
                Custom Design
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function MobileNavigation({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open mobile menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div className="flex items-center space-x-3">
              <CuboidIcon className="h-8 w-8 text-orange-500 shrink-0" /> {/* Added shrink-0 to the icon */}
              <div>
                {/* Added leading-none for consistent line height */}
                <span className="font-bold text-xl text-gray-800 leading-none">JJ Enterprises</span>
                <div className="text-xs text-gray-500 leading-none">Paper Packaging Solutions</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <CurrencySelector />
          </div>
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Quick Contact</span>
              <Badge className="bg-green-500 text-xs">Online</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-orange-500" />
                <a href="tel:+919819256432" className="hover:text-orange-600">
                  +91-98192-56432
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-orange-500" />
                <a href="mailto:info@jjenterprises.com" className="hover:text-orange-600">
                  info@jjenterprises.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 flex-1">
            <MobileLink href="/products" icon={Package}>
              Products
              <Badge variant="secondary" className="ml-auto text-xs">
                NEW
              </Badge>
            </MobileLink>
            <MobileLink href="/solutions" icon={Building}>
              Industry Solutions
            </MobileLink>
            <MobileLink href="/services" icon={Settings}>
              Services
            </MobileLink>
            <MobileLink href="/resources" icon={BookOpen}>
              Resources
            </MobileLink>
            <MobileLink href="/resources/catalog" icon={FileText}>
              Product Catalog
              <Badge variant="secondary" className="ml-auto text-xs bg-orange-100 text-orange-700">
                HD
              </Badge>
            </MobileLink>
            <MobileLink href="/about" icon={Award}>
              About Us
            </MobileLink>
            <MobileLink href="/contact" icon={MessageCircle}>
              Contact Us
            </MobileLink>

            <hr className="my-4" />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/configurator" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 justify-start">
                  <CuboidIcon className="w-4 h-4 mr-2" />
                  3D Configurator
                </Button>
              </Link>
              <Link href="/contact" className="block">
                <Button
                  variant="outline"
                  className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 justify-start"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Get Instant Quote
                </Button>
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t text-center text-xs text-gray-500">
            <p>© 2024 JJ Enterprises. All rights reserved.</p>
            <p className="mt-1">ISO 9001:2015 Certified</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  icon?: React.ElementType
}

function MobileLink({ href, children, icon: Icon }: MobileLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-2 px-3 rounded-lg hover:bg-orange-50"
    >
      {Icon && <Icon className="w-5 h-5 mr-3 text-gray-500" />}
      {children}
    </Link>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    href: string
    icon: React.ElementType
    badge?: string
    subtitle?: string
  }
>(({ className, title, children, icon: Icon, badge, subtitle, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-all hover:bg-gray-50 hover:shadow-md focus:bg-gray-50 focus:shadow-md border border-transparent hover:border-gray-200",
            className,
          )}
          {...props}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Icon className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium leading-none text-gray-800 truncate">{title}</div>
                  {badge && (
                    <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-700 flex-shrink-0">
                      {badge}
                    </Badge>
                  )}
                </div>
                {subtitle && (
                  <div className="text-xs text-orange-600 mb-1 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {subtitle}
                  </div>
                )}
                <p className="line-clamp-2 text-xs leading-snug text-gray-600">{children}</p>
              </div>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Provide a default export for convenience
export default Navigation
