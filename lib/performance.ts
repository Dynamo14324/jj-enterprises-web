"use client"

import { useEffect, useCallback, useRef } from 'react'
import { ENTERPRISE_CONFIG } from './enterprise-config'

// Web Vitals Metric type (matches web-vitals library)
interface Metric {
  name: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'INP'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'back-forward-cache' | 'prerender'
}

// ============================================================================
// WEB VITALS TYPES
// ============================================================================

interface WebVitalsMetric {
  name: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'INP'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

interface PerformanceMetrics {
  dns: number
  tcp: number
  ssl: number
  ttfb: number
  download: number
  domParse: number
  domReady: number
  loadComplete: number
}

// ============================================================================
// ANALYTICS SENDER
// ============================================================================

function sendToAnalytics(metric: WebVitalsMetric | Metric): void {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
      event_category: 'Web Vitals',
    })
  }

  // Send to console in development
  if (process.env.NODE_ENV === 'development') {
    const rating = getRating(metric.name, metric.value)
    console.log(`📊 Web Vital [${metric.name}]: ${metric.value.toFixed(2)} (${rating})`)
  }

  // Send to custom analytics endpoint if configured
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...metric,
        timestamp: Date.now(),
        url: typeof window !== 'undefined' ? window.location.href : '',
      }),
    }).catch(() => {
      // Silently fail if analytics endpoint is not available
    })
  }
}

// Send custom performance metrics (not standard Web Vitals)
function sendCustomMetric(metric: { name: string; value: number; id: string }): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
      event_category: 'Custom Performance',
    })
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`📈 Custom Metric [${metric.name}]: ${metric.value.toFixed(2)}ms`)
  }
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const budgets = ENTERPRISE_CONFIG.performance

  switch (name) {
    case 'LCP':
      return value <= budgets.lcp * 0.75 ? 'good' : value <= budgets.lcp ? 'needs-improvement' : 'poor'
    case 'FID':
      return value <= budgets.fid * 0.75 ? 'good' : value <= budgets.fid ? 'needs-improvement' : 'poor'
    case 'CLS':
      return value <= budgets.cls * 0.75 ? 'good' : value <= budgets.cls ? 'needs-improvement' : 'poor'
    case 'FCP':
      return value <= budgets.fcp * 0.75 ? 'good' : value <= budgets.fcp ? 'needs-improvement' : 'poor'
    case 'TTFB':
      return value <= budgets.ttfb * 0.75 ? 'good' : value <= budgets.ttfb ? 'needs-improvement' : 'poor'
    default:
      return 'good'
  }
}

// ============================================================================
// WEB VITALS HOOK
// ============================================================================

export function useWebVitals(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return

    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
      onINP(sendToAnalytics)
    }).catch(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vitals library not available')
      }
    })
  }, [])
}

// Performance observer for custom metrics
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Observe navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming

            // Calculate custom metrics
            const metrics = {
              dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
              tcp: navEntry.connectEnd - navEntry.connectStart,
              ssl: navEntry.connectEnd - navEntry.secureConnectionStart,
              ttfb: navEntry.responseStart - navEntry.requestStart,
              download: navEntry.responseEnd - navEntry.responseStart,
              domParse: navEntry.domContentLoadedEventStart - navEntry.responseEnd,
              domReady: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            }

            // Log performance metrics in development
            if (process.env.NODE_ENV === 'development') {
              console.table(metrics)
            }

            // Send to analytics
            Object.entries(metrics).forEach(([name, value]) => {
              if (value > 0) {
                sendCustomMetric({
                  name: `custom_${name}`,
                  value,
                  id: `${Date.now()}-${Math.random()}`,
                })
              }
            })
          }
        }
      })

      navObserver.observe({ entryTypes: ['navigation'] })

      // Observe resource timing for critical resources
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming

          // Track slow resources
          if (resourceEntry.duration > 1000) {
            sendCustomMetric({
              name: 'slow_resource',
              value: resourceEntry.duration,
              id: resourceEntry.name,
            })
          }
        }
      })

      resourceObserver.observe({ entryTypes: ['resource'] })

      // Cleanup observers
      return () => {
        navObserver.disconnect()
        resourceObserver.disconnect()
      }
    }
  }, [])
}

// Component to track page performance
export function PerformanceMonitor({ children }: { children: React.ReactNode }) {
  useWebVitals()
  usePerformanceObserver()

  return children
}

// Hook to measure component render time
export function useRenderTime(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`)
      }

      // Track slow components
      if (renderTime > 100) {
        sendCustomMetric({
          name: 'slow_component_render',
          value: renderTime,
          id: componentName,
        })
      }
    }
  })
}

// Utility to preload critical resources
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // Preload critical images
    const criticalImages = [
      '/optimized/opt-corrugated-boxes-hero.jpg',
      '/optimized/opt-manufacturing-facility.jpg',
    ]

    criticalImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })

    // Preloading critical images is acceptable if specific to LCP
    // Font preloading is handled by next/font in layout.tsx
  }
}


