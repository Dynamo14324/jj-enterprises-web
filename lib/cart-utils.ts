// Cart and product selection utilities

export interface CartItem {
  id: string
  name: string
  category: string
  price: string
  quantity: number
  specifications?: Record<string, any>
  customizations?: Record<string, any>
  image: string
  sku: string
  addedAt: Date
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  estimatedTotal: number
  lastUpdated: Date
}

// Cart management functions
export const getCart = (): CartState => {
  if (typeof window === "undefined") return { items: [], totalItems: 0, estimatedTotal: 0, lastUpdated: new Date() }

  const stored = localStorage.getItem("jj_cart")
  if (!stored) return { items: [], totalItems: 0, estimatedTotal: 0, lastUpdated: new Date() }

  try {
    const cart = JSON.parse(stored)
    return {
      ...cart,
      lastUpdated: new Date(cart.lastUpdated),
    }
  } catch {
    return { items: [], totalItems: 0, estimatedTotal: 0, lastUpdated: new Date() }
  }
}

export const saveCart = (cart: CartState): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("jj_cart", JSON.stringify(cart))
}

export const addToCart = (item: Omit<CartItem, "addedAt">): CartState => {
  const cart = getCart()
  const existingIndex = cart.items.findIndex(
    (i) => i.id === item.id && JSON.stringify(i.specifications) === JSON.stringify(item.specifications),
  )

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += item.quantity
  } else {
    cart.items.push({ ...item, addedAt: new Date() })
  }

  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  cart.estimatedTotal = cart.items.reduce(
    (sum, item) => sum + Number.parseFloat(item.price.replace("₹", "")) * item.quantity,
    0,
  )
  cart.lastUpdated = new Date()

  saveCart(cart)
  return cart
}

export const removeFromCart = (itemId: string, specifications?: Record<string, any>): CartState => {
  const cart = getCart()
  cart.items = cart.items.filter(
    (item) => !(item.id === itemId && JSON.stringify(item.specifications) === JSON.stringify(specifications)),
  )

  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  cart.estimatedTotal = cart.items.reduce(
    (sum, item) => sum + Number.parseFloat(item.price.replace("₹", "")) * item.quantity,
    0,
  )
  cart.lastUpdated = new Date()

  saveCart(cart)
  return cart
}

export const updateCartItemQuantity = (
  itemId: string,
  quantity: number,
  specifications?: Record<string, any>,
): CartState => {
  const cart = getCart()
  const itemIndex = cart.items.findIndex(
    (item) => item.id === itemId && JSON.stringify(item.specifications) === JSON.stringify(specifications),
  )

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = quantity
    }
  }

  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  cart.estimatedTotal = cart.items.reduce(
    (sum, item) => sum + Number.parseFloat(item.price.replace("₹", "")) * item.quantity,
    0,
  )
  cart.lastUpdated = new Date()

  saveCart(cart)
  return cart
}

export const clearCart = (): CartState => {
  const emptyCart = { items: [], totalItems: 0, estimatedTotal: 0, lastUpdated: new Date() }
  saveCart(emptyCart)
  return emptyCart
}
