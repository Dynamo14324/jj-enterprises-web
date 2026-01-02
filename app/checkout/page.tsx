"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, Package, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
// Add import for sonner toast
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"

interface CartItem {
  id: number
  type: string
  config: any
  price: string
  quantity: number
  createdAt: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [orderData, setOrderData] = useState({
    billingAddress: {
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
    },
    shippingAddress: {
      firstName: "",
      lastName: "",
      company: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    },
    sameAsBilling: true,
    paymentMethod: "cod",
    specialInstructions: "",
    agreedToTerms: false,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: Package },
  ]

  useEffect(() => {
    // Load cart items from localStorage
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const enhancementData = JSON.parse(localStorage.getItem("enhancementData") || "{}")

      let items = cart
      if (enhancementData.orderItems) {
        items = [...items, ...enhancementData.orderItems]
      }

      setCartItems(items)
    } catch (error) {
      console.error("Error loading cart:", error)
      setError("Failed to load cart items")
    }
  }, [])

  const handleInputChange = (section: string, field: string, value: any) => {
    setOrderData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object),
        [field]: value,
      },
    }))
    setError(null)
  }

  // Modify validateForm to be more specific
  const validateForm = () => {
    const { billingAddress, shippingAddress, sameAsBilling, agreedToTerms } = orderData
    const addressToValidate = sameAsBilling ? billingAddress : shippingAddress

    const requiredBillingFields = [
      { key: "firstName", name: "Billing First Name" },
      { key: "lastName", name: "Billing Last Name" },
      { key: "address", name: "Billing Address" },
      { key: "city", name: "Billing City" },
      { key: "state", name: "Billing State" },
      { key: "pincode", name: "Billing Pincode" },
      { key: "phone", name: "Billing Phone" },
      { key: "email", name: "Billing Email" },
    ]

    for (const field of requiredBillingFields) {
      if (!billingAddress[field.key as keyof typeof billingAddress]) {
        setError(`${field.name} is required.`)
        return false
      }
    }

    if (!sameAsBilling) {
      const requiredShippingFields = [
        { key: "firstName", name: "Shipping First Name" },
        { key: "lastName", name: "Shipping Last Name" },
        { key: "address", name: "Shipping Address" },
        { key: "city", name: "Shipping City" },
        { key: "state", name: "Shipping State" },
        { key: "pincode", name: "Shipping Pincode" },
        { key: "phone", name: "Shipping Phone" },
      ]
      for (const field of requiredShippingFields) {
        if (!shippingAddress[field.key as keyof typeof shippingAddress]) {
          setError(`${field.name} is required.`)
          return false
        }
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(billingAddress.email)) {
      setError("Please enter a valid email address for billing.")
      return false
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/ // More generic international phone regex
    if (!phoneRegex.test(billingAddress.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid phone number for billing (e.g., +919876543210 or 9876543210).")
      return false
    }
    if (!sameAsBilling && !phoneRegex.test(shippingAddress.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid phone number for shipping.")
      return false
    }

    // Pincode validation (example for India)
    const pincodeRegex = /^[1-9][0-9]{5}$/
    if (!pincodeRegex.test(billingAddress.pincode)) {
      setError("Please enter a valid 6-digit pincode for billing.")
      return false
    }
    if (!sameAsBilling && !pincodeRegex.test(shippingAddress.pincode)) {
      setError("Please enter a valid 6-digit pincode for shipping.")
      return false
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions to place an order.")
      return false
    }

    setError(null) // Clear error if all validations pass
    return true
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === "string" ? Number.parseFloat(item.price) : item.price
      return total + price * item.quantity
    }, 0)
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    setError(null)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Save order to localStorage (in real app, send to backend)
      const order = {
        id: Date.now(),
        items: cartItems,
        orderData,
        total: calculateTotal(),
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }

      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([...existingOrders, order]))

      // Clear cart
      localStorage.removeItem("cart")
      localStorage.removeItem("enhancementData")

      setOrderComplete(true)
      toast.success("Order Placed Successfully!")
    } catch (error) {
      console.error("Order processing error:", error)
      setError("Failed to process order. Please try again.") // Keep this for the Alert
      toast.error("Order Processing Failed", {
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll contact you within 24 hours to confirm details and provide a delivery
              timeline.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => router.push("/dashboard")}>
                View Order Status
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const total = calculateTotal()
  const gst = total * 0.18
  const deliveryCharges = total > 5000 ? 0 : 200
  const finalTotal = total + gst + deliveryCharges

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-16">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Checkout</h1>
              </div>
            </div>
            {/* Progress Stepper */}
            <div className="hidden md:flex items-center space-x-8">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${activeStep >= step.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                    {activeStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`text-sm font-medium ${activeStep >= step.id ? "text-orange-600" : "text-gray-400"
                    }`}>
                    {step.name}
                  </span>
                  {step.id < 3 && <div className="w-8 h-[2px] bg-gray-100" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <Card className="text-center p-8">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-4">Add some products to get started</p>
            <Link href="/products">
              <Button className="bg-orange-500 hover:bg-orange-600">Browse Products</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {activeStep === 1 && (
                <Card className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-orange-500" />
                      Shipping Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={orderData.billingAddress.firstName}
                          onChange={(e) => handleInputChange("billingAddress", "firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={orderData.billingAddress.lastName}
                          onChange={(e) => handleInputChange("billingAddress", "lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={orderData.billingAddress.company}
                        onChange={(e) => handleInputChange("billingAddress", "company", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Full Address *</Label>
                      <Input
                        id="address"
                        value={orderData.billingAddress.address}
                        onChange={(e) => handleInputChange("billingAddress", "address", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={orderData.billingAddress.city}
                          onChange={(e) => handleInputChange("billingAddress", "city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("billingAddress", "state", value)}
                          value={orderData.billingAddress.state}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={orderData.billingAddress.pincode}
                          onChange={(e) => handleInputChange("billingAddress", "pincode", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          value={orderData.billingAddress.phone}
                          onChange={(e) => handleInputChange("billingAddress", "phone", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={orderData.billingAddress.email}
                          onChange={(e) => handleInputChange("billingAddress", "email", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
                      onClick={() => {
                        if (validateForm()) setActiveStep(2)
                      }}
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {activeStep === 2 && (
                <Card className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-orange-500" />
                        Payment Method
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveStep(1)} className="text-orange-600">
                        Edit Shipping
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      {["cod", "online", "bank"].map((method) => (
                        <div
                          key={method}
                          className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${orderData.paymentMethod === method ? "border-orange-500 bg-orange-50" : "border-gray-100 hover:border-orange-200"
                            }`}
                          onClick={() => setOrderData((prev) => ({ ...prev, paymentMethod: method }))}
                        >
                          <input
                            type="radio"
                            id={`payment-${method}`}
                            name="payment-method"
                            checked={orderData.paymentMethod === method}
                            onChange={() => { }}
                            className="text-orange-600 focus:ring-orange-500"
                            aria-label={method === "cod" ? "Cash on Delivery" : method === "online" ? "Online Payment" : "Bank Transfer"}
                          />
                          <Label htmlFor={`payment-${method}`} className="flex items-center space-x-3 cursor-pointer">
                            {method === "cod" && <Truck className="w-5 h-5 text-gray-600" />}
                            {method === "online" && <CreditCard className="w-5 h-5 text-gray-600" />}
                            {method === "bank" && <Shield className="w-5 h-5 text-gray-600" />}
                            <div className="flex-1">
                              <p className="font-semibold capitalize">{method === "cod" ? "Cash on Delivery" : method === "online" ? "Online Payment (UPI/Cards)" : "Direct Bank Transfer"}</p>
                              <p className="text-xs text-gray-500">
                                {method === "cod" ? "Pay when you receive the order" : "Secure payment via gateway"}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
                      onClick={() => setActiveStep(3)}
                    >
                      Review Order
                    </Button>
                  </CardContent>
                </Card>
              )}

              {activeStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                          Final Review
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveStep(2)} className="text-orange-600">
                          Edit Payment
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-bold text-sm text-gray-500 uppercase mb-2">Shipping To</h4>
                          <p className="font-semibold">{orderData.billingAddress.firstName} {orderData.billingAddress.lastName}</p>
                          <p className="text-sm text-gray-600">{orderData.billingAddress.address}</p>
                          <p className="text-sm text-gray-600">{orderData.billingAddress.city}, {orderData.billingAddress.state} - {orderData.billingAddress.pincode}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-bold text-sm text-gray-500 uppercase mb-2">Payment Via</h4>
                          <p className="font-semibold capitalize">{orderData.paymentMethod.replace("-", " ")}</p>
                          <p className="text-sm text-gray-600">Secure transaction confirmed</p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                        <Textarea
                          id="specialInstructions"
                          placeholder="Any special requirements or delivery instructions..."
                          value={orderData.specialInstructions}
                          onChange={(e) => setOrderData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <span className="font-medium">
                            {item.type === "custom-design" ? "Custom Box Design" : item.config?.name || "Product"}
                          </span>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity} units</p>
                          {item.config && (
                            <p className="text-xs text-gray-500">
                              {item.config.length}×{item.config.width}×{item.config.height}cm
                            </p>
                          )}
                        </div>
                        <span className="font-semibold">
                          ₹{(Number.parseFloat(item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}

                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>GST (18%)</span>
                        <span>₹{gst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Delivery Charges</span>
                        <span>{deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-orange-600">₹{finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4" />
                      <span>Free delivery above ₹5,000</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="terms"
                      checked={orderData.agreedToTerms}
                      onCheckedChange={(checked: boolean | "indeterminate") => setOrderData((prev) => ({ ...prev, agreedToTerms: !!checked }))}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link href="/terms" className="text-orange-600 hover:underline" target="_blank">
                          Terms and Conditions
                        </Link>
                      </label>
                      <p className="text-xs text-muted-foreground">
                        By placing this order, you agree to our terms of service and privacy policy.
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
                    size="lg"
                    onClick={handleSubmitOrder}
                    disabled={isProcessing || cartItems.length === 0 || !orderData.agreedToTerms}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Order...</span>
                      </div>
                    ) : (
                      `Place Order - ₹${finalTotal.toLocaleString()}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
