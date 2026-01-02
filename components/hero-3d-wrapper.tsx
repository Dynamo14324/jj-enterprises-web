"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import the 3D canvas with no SSR
const DynamicHero3D = dynamic(() => import('@/components/hero-3d'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-semibold text-gray-800">Loading 3D Experience</p>
                <p className="text-sm text-gray-600">Please wait...</p>
            </div>
        </div>
    ),
})

export default function Hero3DWrapper() {
    return (
        <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                <div className="flex flex-col items-center justify-center p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg font-semibold text-gray-800">Loading 3D Experience</p>
                    <p className="text-sm text-gray-600">Please wait...</p>
                </div>
            </div>
        }>
            <DynamicHero3D />
        </Suspense>
    )
}
