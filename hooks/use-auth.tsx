"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "customer" | "designer"
  avatar?: string
  phone?: string
  company?: string
  verified: boolean
  createdAt: string
  lastLogin?: string
  preferences: {
    notifications: boolean
    newsletter: boolean
    theme: "light" | "dark" | "system"
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>
  resendVerification: () => Promise<{ success: boolean; error?: string }>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  company?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database - replace with real database
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@jjenterprises.com",
    name: "Admin User",
    role: "admin",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z",
    preferences: {
      notifications: true,
      newsletter: true,
      theme: "system",
    },
  },
  {
    id: "2",
    email: "customer@example.com",
    name: "John Customer",
    role: "customer",
    verified: true,
    createdAt: "2024-01-15T00:00:00Z",
    preferences: {
      notifications: true,
      newsletter: false,
      theme: "light",
    },
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        const userData = localStorage.getItem("user_data")

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          // Validate token (in real app, verify with backend)
          if (isValidToken(token)) {
            setUser(parsedUser)
          } else {
            localStorage.removeItem("auth_token")
            localStorage.removeItem("user_data")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user (replace with real API call)
      const foundUser = MOCK_USERS.find((u) => u.email === email)

      if (!foundUser) {
        return { success: false, error: "Invalid email or password" }
      }

      // In real app, verify password hash
      if (password !== "password123") {
        return { success: false, error: "Invalid email or password" }
      }

      // Generate token (in real app, get from backend)
      const token = generateToken()
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() }

      localStorage.setItem("auth_token", token)
      localStorage.setItem("user_data", JSON.stringify(updatedUser))
      setUser(updatedUser)

      toast.success("Login successful!")
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === data.email)
      if (existingUser) {
        return { success: false, error: "User with this email already exists" }
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: "customer",
        phone: data.phone,
        company: data.company,
        verified: false, // Requires email verification
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: false,
          theme: "system",
        },
      }

      // Add to mock database
      MOCK_USERS.push(newUser)

      // Send verification email (simulate)
      await sendVerificationEmail(newUser.email)

      toast.success("Registration successful! Please check your email to verify your account.")
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setLoading(true)

      // Clear local storage
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
      localStorage.removeItem("cart")
      localStorage.removeItem("configurator-autosave")

      setUser(null)
      toast.success("Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Logout failed")
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user) return { success: false, error: "Not authenticated" }

      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = { ...user, ...data }

      localStorage.setItem("user_data", JSON.stringify(updatedUser))
      setUser(updatedUser)

      toast.success("Profile updated successfully")
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Profile update failed"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = MOCK_USERS.find((u) => u.email === email)
      if (!user) {
        return { success: false, error: "No account found with this email address" }
      }

      // Send reset email (simulate)
      await sendPasswordResetEmail(email)

      toast.success("Password reset email sent! Check your inbox.")
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Password reset failed"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const verifyEmail = async (token: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In real app, verify token with backend
      if (!isValidVerificationToken(token)) {
        return { success: false, error: "Invalid or expired verification token" }
      }

      if (user) {
        const updatedUser = { ...user, verified: true }
        localStorage.setItem("user_data", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      toast.success("Email verified successfully!")
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Email verification failed"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const resendVerification = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user) return { success: false, error: "Not authenticated" }

      await sendVerificationEmail(user.email)

      toast.success("Verification email sent!")
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send verification email"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        resetPassword,
        verifyEmail,
        resendVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Helper functions
function generateToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function isValidToken(token: string): boolean {
  // In real app, verify with backend
  return token.startsWith("token_") && token.length > 20
}

function isValidVerificationToken(token: string): boolean {
  // In real app, verify with backend
  return token.length > 10
}

async function sendVerificationEmail(email: string): Promise<void> {
  // Simulate email sending
  console.log(`Verification email sent to ${email}`)
}

async function sendPasswordResetEmail(email: string): Promise<void> {
  // Simulate email sending
  console.log(`Password reset email sent to ${email}`)
}
