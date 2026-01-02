"use client"

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Skip to main content link for keyboard navigation
export function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-md z-50 font-medium transition-all duration-200 focus:ring-2 focus:ring-orange-300"
    >
      Skip to main content
    </a>
  )
}

// Focus trap for modals and dropdowns
export function useFocusTrap(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [isActive])
}

// Announce changes to screen readers
export function useAnnouncer() {
  const [announcer, setAnnouncer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const element = document.createElement('div')
    element.setAttribute('aria-live', 'polite')
    element.setAttribute('aria-atomic', 'true')
    element.className = 'sr-only'
    document.body.appendChild(element)
    setAnnouncer(element)

    return () => {
      document.body.removeChild(element)
    }
  }, [])

  const announce = (message: string) => {
    if (announcer) {
      announcer.textContent = message
    }
  }

  return announce
}

// Enhanced button with better accessibility
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
}

export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Loading...',
  className,
  disabled,
  ...props
}: AccessibleButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-300',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-300',
    ghost: 'text-orange-500 hover:bg-orange-50 focus:ring-orange-300'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg'
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="sr-only">{loadingText}</span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Enhanced link with better accessibility
interface AccessibleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  external?: boolean
}

export function AccessibleLink({ children, external, className, ...props }: AccessibleLinkProps) {
  const baseClasses = 'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 rounded-sm'
  
  return (
    <a
      className={cn(baseClasses, className)}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${children} (opens in new tab)`
      })}
      {...props}
    >
      {children}
      {external && (
        <span className="sr-only"> (opens in new tab)</span>
      )}
    </a>
  )
}

// Color contrast checker (development only)
export function useColorContrast() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const checkContrast = () => {
      const elements = document.querySelectorAll('*')
      const issues: string[] = []

      elements.forEach((element) => {
        const styles = window.getComputedStyle(element)
        const color = styles.color
        const backgroundColor = styles.backgroundColor

        // Simple contrast check (would need more sophisticated implementation for production)
        if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
          // This is a simplified check - in production, you'd use a proper contrast ratio calculation
          const textContent = element.textContent?.trim()
          if (textContent && textContent.length > 0) {
            // Log potential contrast issues for manual review
            console.log(`Check contrast for element:`, element, { color, backgroundColor })
          }
        }
      })
    }

    // Run contrast check after page load
    setTimeout(checkContrast, 1000)
  }, [])
}

// Keyboard navigation helper
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to close modals/dropdowns
      if (e.key === 'Escape') {
        const openDropdowns = document.querySelectorAll('[data-state="open"]')
        openDropdowns.forEach((dropdown) => {
          const closeButton = dropdown.querySelector('[aria-label*="close"], [aria-label*="Close"]')
          if (closeButton instanceof HTMLElement) {
            closeButton.click()
          }
        })
      }

      // Arrow key navigation for menus
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeElement = document.activeElement
        if (activeElement?.getAttribute('role') === 'menuitem') {
          e.preventDefault()
          const menu = activeElement.closest('[role="menu"]')
          if (menu) {
            const menuItems = Array.from(menu.querySelectorAll('[role="menuitem"]'))
            const currentIndex = menuItems.indexOf(activeElement)
            const nextIndex = e.key === 'ArrowDown' 
              ? (currentIndex + 1) % menuItems.length
              : (currentIndex - 1 + menuItems.length) % menuItems.length
            
            const nextItem = menuItems[nextIndex] as HTMLElement
            nextItem?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}

// Screen reader announcements for dynamic content
export function ScreenReaderAnnouncement({ message, priority = 'polite' }: { 
  message: string
  priority?: 'polite' | 'assertive' 
}) {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// Reduced motion preference detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// High contrast mode detection
export function useHighContrast() {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}
