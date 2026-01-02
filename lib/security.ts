// Enterprise Security Utilities
// Provides comprehensive security functions for authentication, validation, and protection

import { ENTERPRISE_CONFIG } from "./enterprise-config"

// ============================================================================
// INPUT VALIDATION & SANITIZATION
// ============================================================================

/**
 * Sanitizes HTML to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
    const htmlEntities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    }
    return input.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char)
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
}

/**
 * Validates Indian phone number
 */
export function isValidIndianPhone(phone: string): boolean {
    const phoneRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
}

/**
 * Validates international phone number
 */
export function isValidInternationalPhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ""))
}

/**
 * Validates GST number format
 */
export function isValidGST(gst: string): boolean {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return gstRegex.test(gst.toUpperCase())
}

/**
 * Validates Indian PIN code
 */
export function isValidPinCode(pin: string): boolean {
    const pinRegex = /^[1-9][0-9]{5}$/
    return pinRegex.test(pin)
}

// ============================================================================
// PASSWORD SECURITY
// ============================================================================

interface PasswordValidationResult {
    isValid: boolean
    errors: string[]
    strength: "weak" | "medium" | "strong" | "very-strong"
    score: number
}

/**
 * Comprehensive password validation
 */
export function validatePassword(password: string): PasswordValidationResult {
    const { passwordPolicy } = ENTERPRISE_CONFIG.security
    const errors: string[] = []
    let score = 0

    // Length check
    if (password.length < passwordPolicy.minLength) {
        errors.push(`Password must be at least ${passwordPolicy.minLength} characters`)
    } else {
        score += 1
        if (password.length >= 12) score += 1
        if (password.length >= 16) score += 1
    }

    // Uppercase check
    if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter")
    } else if (/[A-Z]/.test(password)) {
        score += 1
    }

    // Lowercase check
    if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter")
    } else if (/[a-z]/.test(password)) {
        score += 1
    }

    // Number check
    if (passwordPolicy.requireNumber && !/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number")
    } else if (/[0-9]/.test(password)) {
        score += 1
    }

    // Special character check
    if (passwordPolicy.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character")
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 1
    }

    // Determine strength
    let strength: PasswordValidationResult["strength"]
    if (score <= 2) strength = "weak"
    else if (score <= 4) strength = "medium"
    else if (score <= 6) strength = "strong"
    else strength = "very-strong"

    return {
        isValid: errors.length === 0,
        errors,
        strength,
        score,
    }
}

// ============================================================================
// RATE LIMITING
// ============================================================================

interface RateLimitEntry {
    count: number
    firstRequest: number
    lastRequest: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Check if a request should be rate limited
 */
export function checkRateLimit(
    identifier: string,
    maxRequests: number = 100,
    windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const entry = rateLimitStore.get(identifier)

    if (!entry || now - entry.firstRequest > windowMs) {
        // New window or expired
        rateLimitStore.set(identifier, {
            count: 1,
            firstRequest: now,
            lastRequest: now,
        })
        return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs }
    }

    if (entry.count >= maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.firstRequest + windowMs,
        }
    }

    entry.count++
    entry.lastRequest = now
    rateLimitStore.set(identifier, entry)

    return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetTime: entry.firstRequest + windowMs,
    }
}

// ============================================================================
// CSRF PROTECTION
// ============================================================================

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
    if (typeof window === "undefined") {
        return Array.from({ length: 32 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join("")
    }

    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

/**
 * Store CSRF token in session storage
 */
export function setCSRFToken(token: string): void {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("csrf_token", token)
    }
}

/**
 * Get CSRF token from session storage
 */
export function getCSRFToken(): string | null {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("csrf_token")
    }
    return null
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string): boolean {
    const storedToken = getCSRFToken()
    return storedToken !== null && storedToken === token
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

interface SessionData {
    userId: string
    createdAt: number
    lastActivity: number
    deviceInfo: string
    ipHash: string
}

/**
 * Check if session is still valid
 */
export function isSessionValid(session: SessionData): boolean {
    const now = Date.now()
    const { sessionTimeout } = ENTERPRISE_CONFIG.security
    return now - session.lastActivity < sessionTimeout
}

/**
 * Generate device fingerprint for session binding
 */
export function generateDeviceFingerprint(): string {
    if (typeof window === "undefined") return "server"

    const components = [
        navigator.userAgent,
        navigator.language,
        new Date().getTimezoneOffset().toString(),
        screen.width + "x" + screen.height,
        screen.colorDepth.toString(),
    ]

    return hashString(components.join("|"))
}

/**
 * Simple string hashing (for client-side use only)
 */
function hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

// ============================================================================
// AUTHENTICATION HELPERS
// ============================================================================

/**
 * Check login attempt limits
 */
export function checkLoginAttempts(
    identifier: string
): { allowed: boolean; attemptsRemaining: number; lockoutUntil?: number } {
    const { maxLoginAttempts, lockoutDuration } = ENTERPRISE_CONFIG.security
    const storageKey = `login_attempts_${identifier}`

    if (typeof window === "undefined") {
        return { allowed: true, attemptsRemaining: maxLoginAttempts }
    }

    const stored = localStorage.getItem(storageKey)
    if (!stored) {
        return { allowed: true, attemptsRemaining: maxLoginAttempts }
    }

    const data = JSON.parse(stored) as { attempts: number; lastAttempt: number; lockedUntil?: number }

    // Check if currently locked out
    if (data.lockedUntil && Date.now() < data.lockedUntil) {
        return {
            allowed: false,
            attemptsRemaining: 0,
            lockoutUntil: data.lockedUntil,
        }
    }

    // Reset if lockout expired
    if (data.lockedUntil && Date.now() >= data.lockedUntil) {
        localStorage.removeItem(storageKey)
        return { allowed: true, attemptsRemaining: maxLoginAttempts }
    }

    // Reset if last attempt was more than lockout duration ago
    if (Date.now() - data.lastAttempt > lockoutDuration) {
        localStorage.removeItem(storageKey)
        return { allowed: true, attemptsRemaining: maxLoginAttempts }
    }

    return {
        allowed: data.attempts < maxLoginAttempts,
        attemptsRemaining: Math.max(0, maxLoginAttempts - data.attempts),
    }
}

/**
 * Record a failed login attempt
 */
export function recordFailedLogin(identifier: string): void {
    const { maxLoginAttempts, lockoutDuration } = ENTERPRISE_CONFIG.security
    const storageKey = `login_attempts_${identifier}`

    if (typeof window === "undefined") return

    const stored = localStorage.getItem(storageKey)
    const data = stored
        ? (JSON.parse(stored) as { attempts: number; lastAttempt: number; lockedUntil?: number })
        : { attempts: 0, lastAttempt: Date.now() }

    data.attempts++
    data.lastAttempt = Date.now()

    if (data.attempts >= maxLoginAttempts) {
        data.lockedUntil = Date.now() + lockoutDuration
    }

    localStorage.setItem(storageKey, JSON.stringify(data))
}

/**
 * Clear login attempts after successful login
 */
export function clearLoginAttempts(identifier: string): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(`login_attempts_${identifier}`)
}

// ============================================================================
// SECURE STORAGE
// ============================================================================

/**
 * Secure storage wrapper with encryption placeholder
 * Note: In production, implement actual encryption
 */
export const secureStorage = {
    setItem(key: string, value: string): void {
        if (typeof window === "undefined") return
        // In production: encrypt value before storing
        const encoded = btoa(unescape(encodeURIComponent(value)))
        localStorage.setItem(`secure_${key}`, encoded)
    },

    getItem(key: string): string | null {
        if (typeof window === "undefined") return null
        const encoded = localStorage.getItem(`secure_${key}`)
        if (!encoded) return null
        // In production: decrypt value after retrieving
        try {
            return decodeURIComponent(escape(atob(encoded)))
        } catch {
            return null
        }
    },

    removeItem(key: string): void {
        if (typeof window === "undefined") return
        localStorage.removeItem(`secure_${key}`)
    },

    clear(): void {
        if (typeof window === "undefined") return
        const keys = Object.keys(localStorage).filter((k) => k.startsWith("secure_"))
        keys.forEach((k) => localStorage.removeItem(k))
    },
}

// ============================================================================
// CONTENT SECURITY
// ============================================================================

/**
 * Content Security Policy headers
 */
export const CSP_HEADERS = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "font-src": ["'self'", "https://fonts.gstatic.com"],
    "img-src": ["'self'", "data:", "https:"],
    "connect-src": ["'self'", "https://www.google-analytics.com"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
}

/**
 * Generate CSP header string
 */
export function generateCSPString(): string {
    return Object.entries(CSP_HEADERS)
        .map(([key, values]) => `${key} ${values.join(" ")}`)
        .join("; ")
}
