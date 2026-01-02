"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Minus, ArrowLeft, ShoppingCart, Star, Palette, Layers, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Enhancement {
  id: string
  name: string
  description: string
  price: number
  category: "printing" | "finishing" | "protection" | "branding"
  icon: React.ReactNode
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  basePrice: number
  enhancements: string[]
}

export default function EnhanceOrderPage() {
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Custom Corrugated Box",
      quantity: 100,
      basePrice: 25,
      enhancements: [],
    },
  ])

  const [selectedEnhancements, setSelectedEnhancements] = useState<{ [key: string]: boolean }>({})
  const [customRequirements, setCustomRequirements] = useState("")

  const enhancements: Enhancement[] = [
    {
      id: "full-color-print",
      name: "Full Color Printing",
      description: "High-quality CMYK printing on all surfaces",
      price: 15,
      category: "printing",
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: "spot-uv",
      name: "Spot UV Coating",
      description: "Premium glossy finish on selected areas",
      price: 12,
      category: "finishing",
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: "lamination",
      name: "Lamination",
      description: "Protective lamination for durability",
      price: 8,
      category: "protection",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: "embossing",
      name: "Embossing/Debossing",
      description: "Raised or recessed design elements",
      price: 20,
      category: "finishing",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: "foil-stamping",
      name: "Foil Stamping",
      description: "Metallic foil application for premium look",
      price: 25,
      category: "branding",
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: "die-cutting",
      name: "Custom Die Cutting",
      description: "Unique shapes and window cutouts",
      price: 18,
      category: "finishing",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: "water-resistant",
      name: "Water Resistant Coating",
      description: "Protection against moisture and spills",
      price: 10,
      category: "protection",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: "custom-inserts",
      name: "Custom Inserts",
      description: "Foam or cardboard inserts for product protection",
      price: 30,
      category: "protection",
      icon: <Package className="w-5 h-5" />,
    },
  ]

  const toggleEnhancement = (enhancementId: string) => {
    setSelectedEnhancements((prev) => ({
      ...prev,
      [enhancementId]: !prev[enhancementId],
    }))
  }

  const updateQuantity = (itemId: string, change: number) => {
    setOrderItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const calculateEnhancementTotal = () => {
    return Object.entries(selectedEnhancements)
      .filter(([_, selected]) => selected)
      .reduce((total, [enhancementId]) => {
        const enhancement = enhancements.find((e) => e.id === enhancementId)
        return total + (enhancement?.price || 0)
      }, 0)
  }

  const calculateOrderTotal = () => {
    const baseTotal = orderItems.reduce((total, item) => total + item.basePrice * item.quantity, 0)
    const enhancementTotal = calculateEnhancementTotal() * orderItems.reduce((total, item) => total + item.quantity, 0)
    return baseTotal + enhancementTotal
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "printing":
        return "bg-blue-100 text-blue-800"
      case "finishing":
        return "bg-purple-100 text-purple-800"
      case "protection":
        return "bg-green-100 text-green-800"
      case "branding":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleProceedToCheckout = () => {
    // Store enhancement data for checkout
    const enhancementData = {
      selectedEnhancements: Object.entries(selectedEnhancements)
        .filter(([_, selected]) => selected)
        .map(([id]) => enhancements.find((e) => e.id === id))
        .filter(Boolean),
      customRequirements,
      orderItems,
      total: calculateOrderTotal(),
    }

    localStorage.setItem("enhancementData", JSON.stringify(enhancementData))
    router.push("/checkout")
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Enhance Your Order</h1>
          <p className="text-gray-600">Add premium features and customizations to make your packaging stand out</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhancement Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Order */}
            <Card>
              <CardHeader>
                <CardTitle>Current Order</CardTitle>
              </CardHeader>
              <CardContent>
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">Base price: ₹{item.basePrice} per unit</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhancement Categories */}
            {["printing", "finishing", "protection", "branding"].map((category) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">{category} Enhancements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {enhancements
                      .filter((e) => e.category === category)
                      .map((enhancement) => (
                        <div
                          key={enhancement.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedEnhancements[enhancement.id]
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                          onClick={() => toggleEnhancement(enhancement.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">{enhancement.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{enhancement.name}</h4>
                                <Badge className={getCategoryColor(enhancement.category)}>+₹{enhancement.price}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{enhancement.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Custom Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="custom-requirements">Special Instructions</Label>
                    <Textarea
                      id="custom-requirements"
                      value={customRequirements}
                      onChange={(e) => setCustomRequirements(e.target.value)}
                      placeholder="Describe any specific requirements, custom designs, or special instructions..."
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Our team will review your requirements and contact you with a custom quote if needed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Enhanced Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Base Order */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Base Order</h4>
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{(item.basePrice * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Selected Enhancements */}
                {Object.entries(selectedEnhancements).some(([_, selected]) => selected) && (
                  <div className="space-y-2 border-t pt-4">
                    <h4 className="font-semibold">Selected Enhancements</h4>
                    {Object.entries(selectedEnhancements)
                      .filter(([_, selected]) => selected)
                      .map(([enhancementId]) => {
                        const enhancement = enhancements.find((e) => e.id === enhancementId)
                        const totalQuantity = orderItems.reduce((total, item) => total + item.quantity, 0)
                        return enhancement ? (
                          <div key={enhancementId} className="flex justify-between text-sm">
                            <span>{enhancement.name}</span>
                            <span>₹{(enhancement.price * totalQuantity).toLocaleString()}</span>
                          </div>
                        ) : null
                      })}
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">₹{calculateOrderTotal().toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including all enhancements</p>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    size="lg"
                    onClick={handleProceedToCheckout}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Save for Later
                  </Button>
                </div>

                {/* Contact for Custom Quote */}
                <div className="bg-orange-50 rounded-lg p-4 mt-4">
                  <h5 className="font-semibold text-sm mb-2">Need Something Custom?</h5>
                  <p className="text-xs text-gray-600 mb-3">
                    Contact our experts for specialized requirements and bulk discounts.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open("tel:+919819256432")}
                  >
                    Call +91 9819256432
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
