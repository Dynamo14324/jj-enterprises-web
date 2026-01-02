"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Package,
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  User,
  Settings,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Building,
  Lock,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

interface Order {
  id: string
  items: any[]
  orderData: any
  total: number
  status: "pending" | "confirmed" | "manufacturing" | "shipped" | "delivered"
  createdAt: string
  estimatedDelivery?: string
}

interface SavedDesign {
  id: string
  name: string
  config: any
  pricing: any
  createdAt: string
  updatedAt: string
  status: "draft" | "quoted" | "ordered"
  tags: string[]
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    activeDesigns: 0,
    completedOrders: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/dashboard")
      return
    }

    if (user) {
      loadDashboardData()
    }
  }, [user, loading, router])

  const loadDashboardData = () => {
    try {
      // Load orders
      const ordersData = JSON.parse(localStorage.getItem("orders") || "[]")
      setOrders(ordersData)

      // Load saved designs
      const designsData = JSON.parse(localStorage.getItem("savedDesigns") || "[]")
      setSavedDesigns(designsData)

      // Calculate stats
      // Make sure every `total` is a number before summing
      const totalSpent = ordersData.reduce((sum: number, order: Order) => sum + Number(order.total ?? 0), 0)
      const completedOrders = ordersData.filter((order: Order) => order.status === "delivered").length
      const activeDesigns = designsData.filter((design: SavedDesign) => design.status === "draft").length

      setStats({
        totalOrders: ordersData.length,
        totalSpent,
        activeDesigns,
        completedOrders,
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast.error("Failed to load dashboard data")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "manufacturing":
        return "bg-purple-100 text-purple-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "manufacturing":
        return <Settings className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <Package className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleDeleteDesign = (designId: string) => {
    try {
      const updatedDesigns = savedDesigns.filter((design) => design.id !== designId)
      setSavedDesigns(updatedDesigns)
      localStorage.setItem("savedDesigns", JSON.stringify(updatedDesigns))
      toast.success("Design deleted successfully")
    } catch (error) {
      toast.error("Failed to delete design")
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Manage your orders, designs, and account settings</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={user.verified ? "default" : "destructive"}>
                {user.verified ? "Verified" : "Unverified"}
              </Badge>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                Logout
              </Button>
            </div>
          </div>

          {!user.verified && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Please verify your email address to access all features.{" "}
                <Button variant="link" className="p-0 h-auto text-yellow-800 underline">
                  Resend verification email
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="designs">Designs</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">{stats.completedOrders} completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{Number(stats.totalSpent ?? 0).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Across all orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Designs</CardTitle>
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeDesigns}</div>
                  <p className="text-xs text-muted-foreground">Draft designs</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalOrders > 0 ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Order completion rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest packaging orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(order.status)}
                            <div>
                              <p className="font-medium">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                            <p className="text-sm font-medium mt-1">₹{Number(order.total ?? 0).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      <Link href="/dashboard?tab=orders">
                        <Button variant="outline" className="w-full">
                          View All Orders
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <Link href="/configurator">
                        <Button className="bg-orange-500 hover:bg-orange-600">Create Your First Order</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Designs</CardTitle>
                  <CardDescription>Your custom box configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedDesigns.length > 0 ? (
                    <div className="space-y-4">
                      {savedDesigns.slice(0, 3).map((design) => (
                        <div key={design.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{design.name}</p>
                            <p className="text-sm text-gray-600">{new Date(design.updatedAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{design.status}</Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Link href="/dashboard?tab=designs">
                        <Button variant="outline" className="w-full">
                          View All Designs
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Edit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No saved designs</p>
                      <Link href="/configurator">
                        <Button className="bg-orange-500 hover:bg-orange-600">Start Designing</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/configurator">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <Plus className="w-6 h-6" />
                      <span className="text-sm">New Design</span>
                    </Button>
                  </Link>
                  <Link href="/track-order">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <Truck className="w-6 h-6" />
                      <span className="text-sm">Track Order</span>
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <Package className="w-6 h-6" />
                      <span className="text-sm">Browse Products</span>
                    </Button>
                  </Link>
                  <Link href="/#contact">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                    >
                      <Phone className="w-6 h-6" />
                      <span className="text-sm">Contact Support</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order History</h2>
              <Link href="/configurator">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Order
                </Button>
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-md text-xs font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">₹{Number(order.total ?? 0).toLocaleString()}</p>
                          {order.estimatedDelivery && (
                            <p className="text-sm text-gray-600">Est. delivery: {order.estimatedDelivery}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Items</p>
                          <p className="font-medium">{order.items.length} item(s)</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment Method</p>
                          <p className="font-medium capitalize">{order.orderData?.paymentMethod || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Delivery Address</p>
                          <p className="font-medium text-sm">
                            {order.orderData?.billingAddress?.city}, {order.orderData?.billingAddress?.state}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Link href={`/track-order?id=${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Track Order
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </Button>
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-gray-600 mb-6">Start by creating your first custom packaging design</p>
                  <Link href="/configurator">
                    <Button className="bg-orange-500 hover:bg-orange-600">Create Your First Order</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Designs Tab */}
          <TabsContent value="designs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Saved Designs</h2>
              <Link href="/configurator">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Design
                </Button>
              </Link>
            </div>

            {savedDesigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDesigns.map((design) => (
                  <Card key={design.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold truncate">{design.name}</h3>
                        <Badge variant="outline">{design.status}</Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Dimensions:</span>
                          <span className="font-medium">
                            {design.config?.length}×{design.config?.width}×{design.config?.height} cm
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Material:</span>
                          <span className="font-medium capitalize">{design.config?.material}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{design.config?.quantity}</span>
                        </div>
                        {design.pricing && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-medium text-orange-600">₹{design.pricing.total}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {design.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-gray-500 mb-4">
                        Updated: {new Date(design.updatedAt).toLocaleDateString()}
                      </p>

                      <div className="flex items-center space-x-2">
                        <Link href={`/configurator?design=${design.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteDesign(design.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Saved Designs</h3>
                  <p className="text-gray-600 mb-6">Create and save custom box designs for future use</p>
                  <Link href="/configurator">
                    <Button className="bg-orange-500 hover:bg-orange-600">Start Designing</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <Badge variant={user.verified ? "default" : "destructive"} className="mt-1">
                      {user.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      {user.company && (
                        <div className="flex items-center space-x-3">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span>{user.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Account Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                      {user.lastLogin && (
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Last login {new Date(user.lastLogin).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <span className="capitalize">{user.role} Account</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about your orders</p>
                      </div>
                      <input type="checkbox" checked={user.preferences?.notifications} className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-gray-600">Get the latest news and offers</p>
                      </div>
                      <input type="checkbox" checked={user.preferences?.newsletter} className="toggle" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Security</h4>
                  <div className="space-y-3">
                    <Button variant="outline">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-red-600">Danger Zone</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-200">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
