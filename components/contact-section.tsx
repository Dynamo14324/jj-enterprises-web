"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  Calculator,
  MessageSquare,
  Headphones,
  Globe,
  Star,
  Shield,
  Truck,
  Factory,
  Award,
  Users,
  Calendar,
  Download,
  Upload,
  Zap,
  Heart,
  ThumbsUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Our Experts",
    description: "Speak directly with our packaging specialists",
    contact: "+91-98192-56432",
    action: "tel:+919819256432",
    availability: "24/7 Available",
    response: "Immediate",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your detailed requirements",
    contact: "info@jjenterprises.com",
    action: "mailto:info@jjenterprises.com",
    availability: "Always Open",
    response: "Within 2 Hours",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Chat",
    description: "Quick chat for instant responses",
    contact: "+91-98192-56432",
    action: "https://wa.me/919819256432",
    availability: "9 AM - 9 PM",
    response: "Within Minutes",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    icon: Calendar,
    title: "Schedule Meeting",
    description: "Book a consultation with our team",
    contact: "Book Online",
    action: "/schedule-meeting",
    availability: "Mon-Sat",
    response: "Same Day",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  }
]

const quickServices = [
  {
    icon: Calculator,
    title: "Instant Quote Calculator",
    description: "Get pricing estimates in seconds",
    href: "/quote-calculator",
    badge: "Free Tool"
  },
  {
    icon: FileText,
    title: "Download Catalog",
    description: "Complete product specifications",
    href: "/download-catalog",
    badge: "PDF Guide"
  },
  {
    icon: Factory,
    title: "Virtual Factory Tour",
    description: "See our manufacturing process",
    href: "/virtual-tour",
    badge: "360° View"
  },
  {
    icon: Award,
    title: "Quality Certificates",
    description: "View our certifications",
    href: "/certifications",
    badge: "ISO 9001"
  }
]

const industries = [
  "Pharmaceutical & Healthcare",
  "Food & Beverage",
  "Cosmetics & Personal Care",
  "E-commerce & Retail",
  "Electronics & Technology",
  "Automotive & Industrial",
  "Fashion & Apparel",
  "Home & Garden",
  "Sports & Recreation",
  "Other"
]

const packageTypes = [
  "Corrugated Shipping Boxes",
  "Luxury Gift Boxes",
  "Pharmaceutical Packaging",
  "Food-Grade Boxes",
  "Folding Cartons",
  "E-commerce Mailers",
  "Custom Design",
  "Not Sure - Need Consultation"
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    packageType: "",
    quantity: "",
    timeline: "",
    message: "",
    newsletter: false,
    updates: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("quote")
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Quote Request Submitted!",
      description: "We'll get back to you within 2 hours with a detailed quote.",
    })

    setIsSubmitting(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      packageType: "",
      quantity: "",
      timeline: "",
      message: "",
      newsletter: false,
      updates: false
    })
  }

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50" aria-label="Contact and quote section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-orange-500 text-white px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 500+ Companies
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Get Your Custom Paper Packaging Quote
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Ready to transform your packaging? Our experts are here to help you find the perfect paper packaging solution 
            for your business needs. Get started with a free consultation and instant quote.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className={`hover:shadow-xl transition-all duration-300 border-2 ${method.borderColor} ${method.bgColor} group cursor-pointer`}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className={`w-8 h-8 ${method.color}`} />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                <div className="space-y-2">
                  <div className={`font-medium ${method.color}`}>{method.contact}</div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{method.availability}</span>
                    <span>{method.response}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={() => window.open(method.action, method.action.startsWith('tel:') || method.action.startsWith('mailto:') ? '_self' : '_blank')}
                >
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center">
                  <FileText className="w-6 h-6 mr-3" />
                  Request Your Custom Quote
                </CardTitle>
                <p className="text-orange-100">
                  Fill out the form below and get a detailed quote within 2 hours
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="quote" className="flex items-center">
                      <Calculator className="w-4 h-4 mr-2" />
                      Get Quote
                    </TabsTrigger>
                    <TabsTrigger value="consultation" className="flex items-center">
                      <Headphones className="w-4 h-4 mr-2" />
                      Consultation
                    </TabsTrigger>
                    <TabsTrigger value="support" className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Support
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="quote">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@company.com"
                            required
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+91-XXXXX-XXXXX"
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name
                          </label>
                          <Input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Your company name"
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Industry *
                          </label>
                          <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Package Type *
                          </label>
                          <Select value={formData.packageType} onValueChange={(value) => handleInputChange("packageType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select package type" />
                            </SelectTrigger>
                            <SelectContent>
                              {packageTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Quantity
                          </label>
                          <Select value={formData.quantity} onValueChange={(value) => handleInputChange("quantity", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quantity range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100-500">100 - 500 units</SelectItem>
                              <SelectItem value="500-1000">500 - 1,000 units</SelectItem>
                              <SelectItem value="1000-5000">1,000 - 5,000 units</SelectItem>
                              <SelectItem value="5000-10000">5,000 - 10,000 units</SelectItem>
                              <SelectItem value="10000+">10,000+ units</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timeline
                          </label>
                          <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="When do you need this?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent (1-3 days)</SelectItem>
                              <SelectItem value="week">Within a week</SelectItem>
                              <SelectItem value="month">Within a month</SelectItem>
                              <SelectItem value="quarter">Within 3 months</SelectItem>
                              <SelectItem value="planning">Just planning ahead</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Requirements
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us about your specific requirements, dimensions, printing needs, or any other details..."
                          rows={4}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                          />
                          <label htmlFor="newsletter" className="text-sm text-gray-600">
                            Subscribe to our newsletter for packaging tips and industry insights
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="updates"
                            checked={formData.updates}
                            onCheckedChange={(checked) => handleInputChange("updates", checked as boolean)}
                          />
                          <label htmlFor="updates" className="text-sm text-gray-600">
                            Get updates about new products and special offers
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processing Request...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Get My Custom Quote
                          </>
                        )}
                      </Button>

                      <div className="text-center text-sm text-gray-500">
                        <Shield className="w-4 h-4 inline mr-1" />
                        Your information is secure and will never be shared with third parties.
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="consultation">
                    <div className="text-center py-8">
                      <Headphones className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Schedule a Free Consultation
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Book a 30-minute consultation with our packaging experts to discuss your specific needs.
                      </p>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Consultation
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="support">
                    <div className="text-center py-8">
                      <MessageSquare className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Need Technical Support?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Our technical team is available to help with existing orders, quality issues, or general inquiries.
                      </p>
                      <div className="space-y-3">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Support: +91-98192-56432
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          Email: support@jjenterprises.com
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Services */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="w-5 h-5 mr-2 text-orange-500" />
                  Quick Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickServices.map((service, index) => (
                  <Link key={index} href={service.href} className="block">
                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-orange-200">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <service.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-gray-800">{service.title}</h4>
                          <Badge variant="secondary" className="text-xs">{service.badge}</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-orange-500" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Emergency Only</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex items-center justify-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-medium">Currently Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-800">JJ Enterprises</p>
                    <p className="text-gray-600">Mumbai, Maharashtra</p>
                    <p className="text-gray-600">India - 400001</p>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">500+ Happy Clients</p>
                    <p className="text-sm text-gray-600">Average 4.9/5 rating</p>
                  </div>
                  <div className="flex justify-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1 text-green-500" />
                      ISO Certified
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1 text-blue-500" />
                      15+ Years
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our packaging experts are here to help you make the right choice for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => window.open("tel:+919819256432", "_self")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now: +91-98192-56432
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open("https://wa.me/919819256432", "_blank")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
