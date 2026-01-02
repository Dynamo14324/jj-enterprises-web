"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Search, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getStatusColor, getStatusIcon } from "@/lib/status-utils"

interface OrderStatus {
  id: string
  status: "pending" | "confirmed" | "manufacturing" | "shipped" | "delivered"
  timestamp: string
  location?: string
  description: string
}

interface TrackingInfo {
  orderId: string
  customerName: string
  productName: string
  quantity: number
  orderDate: string
  estimatedDelivery: string
  currentStatus: string
  trackingNumber?: string
  statuses: OrderStatus[]
  shippingAddress: string
  contactInfo: {
    phone: string
    email: string
  }
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState(searchParams?.get("id") || "")
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const mockTrackingData: { [key: string]: TrackingInfo } = {
    JJ001: {
      orderId: "JJ001",
      customerName: "John Doe",
      productName: "Custom Corrugated Box",
      quantity: 100,
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-25",
      currentStatus: "manufacturing",
      trackingNumber: "TRK123456789",
      shippingAddress: "123 Business Street, Mumbai, Maharashtra 400001",
      contactInfo: {
        phone: "+91 9876543210",
        email: "john@company.com",
      },
      statuses: [
        {
          id: "1",
          status: "pending",
          timestamp: "2024-01-15T10:00:00Z",
          description: "Order received and payment confirmed",
        },
        {
          id: "2",
          status: "confirmed",
          timestamp: "2024-01-15T14:30:00Z",
          description: "Order confirmed and sent to production",
        },
        {
          id: "3",
          status: "manufacturing",
          timestamp: "2024-01-16T09:00:00Z",
          location: "JJ Enterprises Factory, Mumbai",
          description: "Manufacturing in progress",
        },
      ],
    },
    JJ002: {
      orderId: "JJ002",
      customerName: "Jane Smith",
      productName: "Fancy Gift Box",
      quantity: 50,
      orderDate: "2024-01-10",
      estimatedDelivery: "2024-01-20",
      currentStatus: "delivered",
      trackingNumber: "TRK987654321",
      shippingAddress: "456 Corporate Avenue, Delhi, Delhi 110001",
      contactInfo: {
        phone: "+91 9123456789",
        email: "jane@business.com",
      },
      statuses: [
        {
          id: "1",
          status: "pending",
          timestamp: "2024-01-10T10:00:00Z",
          description: "Order received and payment confirmed",
        },
        {
          id: "2",
          status: "confirmed",
          timestamp: "2024-01-10T15:00:00Z",
          description: "Order confirmed and sent to production",
        },
        {
          id: "3",
          status: "manufacturing",
          timestamp: "2024-01-11T09:00:00Z",
          location: "JJ Enterprises Factory, Mumbai",
          description: "Manufacturing completed",
        },
        {
          id: "4",
          status: "shipped",
          timestamp: "2024-01-12T16:00:00Z",
          location: "Mumbai Distribution Center",
          description: "Package shipped via Express Delivery",
        },
        {
          id: "5",
          status: "delivered",
          timestamp: "2024-01-15T11:30:00Z",
          location: "Delhi, Delhi",
          description: "Package delivered successfully",
        },
      ],
    },
  }

  useEffect(() => {
    if (orderId && mockTrackingData[orderId.toUpperCase()]) {
      handleTrackOrder()
    }
  }, [])

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter an order ID")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const tracking = mockTrackingData[orderId.toUpperCase()]
    if (tracking) {
      setTrackingInfo(tracking)
    } else {
      setError("Order not found. Please check your order ID and try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order ID to track the status of your packaging order</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g., JJ001)"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleTrackOrder} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Tracking..." : "Track Order"}
                </Button>
              </div>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </CardContent>
        </Card>

        {/* Demo Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Demo Orders (For Testing)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold">Order ID: JJ001</h4>
                <p className="text-sm text-gray-600">Status: Manufacturing</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setOrderId("JJ001")
                    handleTrackOrder()
                  }}
                >
                  Track This Order
                </Button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold">Order ID: JJ002</h4>
                <p className="text-sm text-gray-600">Status: Delivered</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setOrderId("JJ002")
                    handleTrackOrder()
                  }}
                >
                  Track This Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingInfo && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{trackingInfo.orderId}</CardTitle>
                    <p className="text-gray-600 mt-1">{trackingInfo.productName}</p>
                  </div>
                  <Badge className={getStatusColor(trackingInfo.currentStatus)}>
                    {trackingInfo.currentStatus.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-semibold">{trackingInfo.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-semibold">{trackingInfo.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold">{new Date(trackingInfo.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Est. Delivery</p>
                    <p className="font-semibold">{new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                </div>

                {trackingInfo.trackingNumber && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="font-mono font-semibold">{trackingInfo.trackingNumber}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingInfo.statuses.map((status, index) => (
                    <div key={status.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(status.status)}
                        {index < trackingInfo.statuses.length - 1 && <div className="w-px h-8 bg-gray-300 mt-2"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold capitalize">{status.status.replace("-", " ")}</h4>
                          <Badge variant="outline" className="text-xs">
                            {new Date(status.timestamp).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{status.description}</p>
                        {status.location && (
                          <div className="flex items-center space-x-1 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{status.location}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{new Date(status.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact & Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <p className="text-gray-600">{trackingInfo.shippingAddress}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600">{trackingInfo.contactInfo.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-600">{trackingInfo.contactInfo.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => window.open("tel:+919819256432")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call +91 9819256432
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
