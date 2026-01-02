"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-24">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>
          </div>
          <p className="text-gray-600">Last updated: January 2024</p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-orange-500" />
                <span>Agreement to Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By accessing and using JJ Enterprises' website and services, you accept and agree to be bound by the
                terms and provision of this agreement. These Terms of Service govern your use of our website, products,
                and services.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">JJ Enterprises provides:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Custom corrugated box manufacturing</li>
                <li>Fancy box and gift packaging solutions</li>
                <li>Pharmaceutical packaging</li>
                <li>3D design and visualization tools</li>
                <li>Custom printing and finishing services</li>
                <li>Packaging consultation and design services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Orders and Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Orders and Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Order Process</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>All orders are subject to acceptance and availability</li>
                  <li>We reserve the right to refuse or cancel orders</li>
                  <li>Order confirmation will be sent via email</li>
                  <li>Custom orders require approval before production</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Payment Terms</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Payment is due as per agreed terms</li>
                  <li>We accept various payment methods</li>
                  <li>Late payments may incur additional charges</li>
                  <li>All prices are in Indian Rupees (INR)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quality and Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Quality Assurance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>All products meet ISO 9001:2015 quality standards</li>
                <li>Materials comply with relevant safety regulations</li>
                <li>Custom specifications must be approved in writing</li>
                <li>Quality control inspections are performed on all orders</li>
                <li>Defective products will be replaced or refunded</li>
              </ul>
            </CardContent>
          </Card>

          {/* Delivery and Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery and Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Delivery Terms</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss transfers upon delivery</li>
                  <li>Inspection should be done upon receipt</li>
                  <li>Delivery delays due to force majeure are not our responsibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Shipping Charges</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Shipping costs are calculated based on weight and distance</li>
                  <li>Free shipping available for orders above ₹5,000</li>
                  <li>Express delivery options available at additional cost</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Returns and Refunds */}
          <Card>
            <CardHeader>
              <CardTitle>Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Custom orders are generally non-returnable</li>
                <li>Defective products can be returned within 7 days</li>
                <li>Return shipping costs may apply</li>
                <li>Refunds will be processed within 7-10 business days</li>
                <li>Cancellations must be made before production begins</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Customer designs and artwork remain customer property</li>
                <li>We retain rights to manufacturing processes and techniques</li>
                <li>Customers must have rights to use submitted designs</li>
                <li>We may use order photos for marketing purposes unless requested otherwise</li>
                <li>Our website content and 3D tools are proprietary</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span>Limitations of Liability</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Our liability is limited to the value of the specific order</li>
                <li>We are not liable for indirect or consequential damages</li>
                <li>Force majeure events excuse performance delays</li>
                <li>Customer assumes responsibility for design compliance</li>
                <li>We recommend insurance for high-value shipments</li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our{" "}
                <Link href="/privacy" className="text-orange-600 hover:text-orange-700 underline">
                  Privacy Policy
                </Link>{" "}
                to understand how we collect, use, and protect your information.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These terms are governed by the laws of India. Any disputes will be resolved in the courts of Mumbai,
                Maharashtra. We encourage resolution through direct communication before pursuing legal action.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">For questions about these Terms of Service, please contact us:</p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> legal@thejjenterprise.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 9819256432
                </p>
                <p>
                  <strong>Address:</strong> P.M, Nehru Road, Goregaon, Mumbai, Maharashtra 400097
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Terms Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an
                updated revision date. Continued use of our services after changes constitutes acceptance of the new
                terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
