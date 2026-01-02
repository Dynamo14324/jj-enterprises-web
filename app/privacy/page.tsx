"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
            <Shield className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">Last updated: January 2024</p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-orange-500" />
                <span>Introduction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                At JJ Enterprises, we are committed to protecting your privacy and ensuring the security of your
                personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Name, email address, and phone number</li>
                  <li>Company name and business information</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Website usage data and analytics</li>
                  <li>Device information and IP addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>3D configurator usage and design preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-500" />
                <span>Information Sharing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We do not sell, trade, or rent your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Service providers who assist in our operations</li>
                <li>Shipping and logistics partners</li>
                <li>Payment processors</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-orange-500" />
                <span>Data Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
                <li>Compliance with industry standards</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
                <li>File a complaint with regulatory authorities</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage</li>
                <li>Provide personalized content</li>
                <li>Enable social media features</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookies through your browser settings, but some features may not work properly if
                cookies are disabled.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> privacy@thejjenterprise.com
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
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to
                review this Privacy Policy periodically.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
