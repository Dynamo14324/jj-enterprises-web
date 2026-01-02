"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export type Currency = "INR" | "USD" | "AED"

export interface CurrencyRate {
    code: Currency
    rate: number // Rate relative to base currency (INR)
    symbol: string
    locale: string
    name: string
}

// Base currency is INR
export const DEFAULT_RATES: Record<Currency, CurrencyRate> = {
    INR: { code: "INR", rate: 1, symbol: "₹", locale: "en-IN", name: "Indian Rupee" },
    USD: { code: "USD", rate: 0.012, symbol: "$", locale: "en-US", name: "US Dollar" },
    AED: { code: "AED", rate: 0.044, symbol: "AED", locale: "en-AE", name: "UAE Dirham" }, // en-AE uses Latin digits
}

interface CurrencyContextType {
    currency: Currency
    setCurrency: (currency: Currency) => void
    convertPrice: (priceInInr: number) => number
    formatPrice: (priceInInr: number) => string
    rates: Record<Currency, CurrencyRate>
    isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>("INR")
    const [rates, setRates] = useState<Record<Currency, CurrencyRate>>(DEFAULT_RATES)
    const [isLoading, setIsLoading] = useState(true)

    // Load preference on mount
    useEffect(() => {
        const saved = localStorage.getItem("preferred_currency") as Currency | null
        if (saved && DEFAULT_RATES[saved]) {
            setCurrency(saved)
        }
        setIsLoading(false)

        // TODO: SCALABILITY - Fetch real-time rates here
        // fetch('/api/rates').then(...)
    }, [])

    const handleSetCurrency = useCallback((c: Currency) => {
        setCurrency(c)
        localStorage.setItem("preferred_currency", c)
    }, [])

    const convertPrice = useCallback((priceInInr: number): number => {
        const rate = rates[currency].rate
        // Use a small epsilon for float comparison or financial library for production math
        // Here we round to 2 decimal places for display purposes during conversion intermediate
        return priceInInr * rate
    }, [currency, rates])

    const formatPrice = useCallback((priceInInr: number): string => {
        const converted = convertPrice(priceInInr)
        const { locale, symbol, code } = rates[currency]

        try {
            return new Intl.NumberFormat(locale, {
                style: "currency",
                currency: code,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(converted)
        } catch (e) {
            // Fallback formatting
            return `${symbol} ${converted.toFixed(2)}`
        }
    }, [currency, rates, convertPrice])

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency: handleSetCurrency,
            convertPrice,
            formatPrice,
            rates,
            isLoading
        }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider")
    }
    return context
}
