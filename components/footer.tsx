"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  CuboidIcon,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Award,
  Shield,
  Leaf,
  FileText,
  Download,
  Heart,
  Users,
  Factory,
  Zap,
  MessageSquare,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const productLinks = [
  { name: "Corrugated Shipping Boxes", href: "/products/corrugated", popular: true },
  { name: "Luxury Gift Boxes", href: "/products/luxury-rigid", popular: true },
  { name: "Pharmaceutical Packaging", href: "/products/pharma", popular: false },
  { name: "Food-Grade Boxes", href: "/products/food-packaging", popular: false },
  { name: "Folding Cartons", href: "/products/folding-cartons", popular: false },
  { name: "E-commerce Mailers", href: "/products/ecommerce-packaging", popular: true },
  { name: "Custom Design Solutions", href: "/products/custom-design", popular: false },
  { name: "Eco-Friendly Options", href: "/products/eco-friendly", popular: false },
]

const industryLinks = [
  { name: "Pharmaceutical & Healthcare", href: "/industry/pharmaceutical" },
  { name: "Food & Beverage", href: "/industry/food-beverage" },
  { name: "Cosmetics & Personal Care", href: "/industry/cosmetics" },
  { name: "E-commerce & Retail", href: "/industry/ecommerce" },
  { name: "Electronics & Technology", href: "/industry/electronics" },
  { name: "Automotive & Industrial", href: "/industry/automotive" },
]

const serviceLinks = [
  { name: "Custom Design & Prototyping", href: "/services/design" },
  { name: "Bulk & Contract Manufacturing", href: "/services/bulk-orders" },
  { name: "Quality & Compliance Testing", href: "/services/testing" },
  { name: "Sustainable Sourcing", href: "/services/sustainability" },
  { name: "3D Packaging Configurator", href: "/configurator" },
  { name: "Packaging Consultation", href: "/services/consultation" },
]

const resourceLinks = [
  { name: "Packaging Design Guides", href: "/resources/guides", icon: FileText },
  { name: "Box Size Calculator", href: "/resources/calculator", icon: Zap },
  { name: "Download Product Catalog", href: "/resources/catalog", icon: Download },
  { name: "Case Studies", href: "/resources/case-studies", icon: Award },
  { name: "Quality Certificates", href: "/resources/certificates", icon: Shield },
  { name: "Sustainability Report", href: "/resources/sustainability", icon: Leaf },
]

const companyLinks = [
  { name: "About JJ Enterprises", href: "/about" },
  { name: "Our Manufacturing Process", href: "/manufacturing" },
  { name: "Quality Assurance", href: "/quality" },
  { name: "Sustainability Commitment", href: "/sustainability" },
  { name: "Careers", href: "/careers" },
  { name: "Press & Media", href: "/press" },
]

const supportLinks = [
  { name: "Contact Support", href: "/contact" },
  { name: "Track Your Order", href: "/track-order" },
  { name: "Returns & Exchanges", href: "/returns" },
  { name: "Shipping Information", href: "/shipping" },
  { name: "FAQ", href: "/faq" },
  { name: "Technical Specifications", href: "/specifications" },
]

const certifications = [
  { name: "ISO 9001:2015", icon: Award, color: "text-blue-600" },
  { name: "ISO 14001:2015", icon: Leaf, color: "text-green-600" },
  { name: "FDA Compliant", icon: Shield, color: "text-red-600" },
  { name: "FSC Certified", icon: Leaf, color: "text-green-600" },
]

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/jjenterprises", icon: Facebook, color: "hover:text-blue-600" },
  { name: "Twitter", href: "https://twitter.com/jjenterprises", icon: Twitter, color: "hover:text-blue-400" },
  { name: "Instagram", href: "https://instagram.com/jjenterprises", icon: Instagram, color: "hover:text-pink-600" },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/jjenterprises",
    icon: Linkedin,
    color: "hover:text-blue-700",
  },
  { name: "YouTube", href: "https://youtube.com/jjenterprises", icon: Youtube, color: "hover:text-red-600" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter. You'll receive packaging tips and industry insights.",
    })

    setEmail("")
    setIsSubscribing(false)
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Packaging Insights</h3>
            <p className="text-lg text-white/90 mb-8">
              Get the latest packaging trends, design tips, and industry news delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                required
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-white text-orange-600 hover:bg-gray-100 px-8"
              >
                {isSubscribing ? (
                  <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-white/70 mt-4">Join 5,000+ packaging professionals. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 md:col-span-4 sm:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <CuboidIcon className="h-8 w-8 text-orange-500" />
                <div>
                  <span className="font-bold text-xl">JJ Enterprises</span>
                  <div className="text-sm text-gray-400">Paper Packaging Solutions</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                India's leading manufacturer of premium paper box packaging solutions. With 15+ years of experience, we
                deliver quality-assured, sustainable packaging that elevates your brand and protects your products.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0" />
                  <a href="tel:+919819256432" className="hover:text-orange-400 transition-colors">
                    +91-98192-56432
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0" />
                  <a href="mailto:info@jjenterprises.com" className="hover:text-orange-400 transition-colors">
                    info@jjenterprises.com
                  </a>
                </div>
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-1" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0" />
                  <span>Mon-Sat: 9AM-7PM | 24/7 Support</span>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Certifications & Standards</h4>
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <cert.icon className={`w-4 h-4 mr-2 ${cert.color}`} />
                      {cert.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <CuboidIcon className="w-4 h-4 mr-2 text-orange-500" />
                Products
              </h4>
              <ul className="space-y-2">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors text-sm flex items-center"
                    >
                      {link.name}
                      {link.popular && <Badge className="ml-2 text-xs bg-orange-500 text-white">Popular</Badge>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <Factory className="w-4 h-4 mr-2 text-orange-500" />
                Industries
              </h4>
              <ul className="space-y-2">
                {industryLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-orange-500" />
                Services
              </h4>
              <ul className="space-y-2">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Support */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-orange-500" />
                Resources
              </h4>
              <ul className="space-y-2 mb-6">
                {resourceLinks.slice(0, 4).map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors text-sm flex items-center"
                    >
                      <link.icon className="w-3 h-3 mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-white mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2 text-orange-500" />
                Support
              </h4>
              <ul className="space-y-2">
                {supportLinks.slice(0, 4).map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-1">2,500+</div>
              <div className="text-sm text-gray-400">Product SKUs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-1">500+</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-1">1M+</div>
              <div className="text-sm text-gray-400">Units Delivered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-1">15+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <span>© 2024 JJ Enterprises. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-orange-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                <span>Made in India</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-500" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center">
                <Leaf className="w-4 h-4 mr-1 text-green-500" />
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <Button
          className="bg-green-500 hover:bg-green-600 rounded-full w-14 h-14 shadow-lg"
          onClick={() => window.open("https://wa.me/919819256432", "_blank")}
          aria-label="WhatsApp Chat"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 rounded-full w-14 h-14 shadow-lg"
          onClick={() => window.open("tel:+919819256432", "_self")}
          aria-label="Call Now"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>
    </footer>
  )
}
