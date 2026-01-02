"use client"

import { Suspense, useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import { useParams } from "next/navigation"
import { ConfigurableBox } from "@/components/configurable-box"
import { Enhanced3DCanvas, TouchOptimizedControls } from "@/components/3d-renderer"
import type * as THREE from "three"

// Sample box configurations for different IDs
const boxConfigurations = {
  "1": {
    length: 30,
    width: 20,
    height: 15,
    thickness: 3,
    color: "#8B4513",
    material: "corrugated",
    flute: "B",
    gsm: 150,
    quantity: 100,
    moq: 50,
    printing: {
      enabled: true,
      colors: 2,
      coverage: "partial",
      customText: "Premium Product Box",
    },
    finishing: {
      lamination: false,
      uvCoating: false,
      embossing: false,
      foilStamping: false,
    },
    customRequirements: "",
    urgentDelivery: false,
    version: "1.0",
  },
  "2": {
    length: 25,
    width: 25,
    height: 25,
    thickness: 5,
    color: "#2563EB",
    material: "duplex",
    flute: "C",
    gsm: 200,
    quantity: 500,
    moq: 100,
    printing: {
      enabled: true,
      colors: 4,
      coverage: "full",
      customText: "Luxury Gift Box",
    },
    finishing: {
      lamination: true,
      uvCoating: true,
      embossing: false,
      foilStamping: false,
    },
    customRequirements: "Food grade coating required",
    urgentDelivery: false,
    version: "1.0",
  },
  "3": {
    length: 40,
    width: 30,
    height: 20,
    thickness: 4,
    color: "#059669",
    material: "kraft",
    flute: "A",
    gsm: 180,
    quantity: 250,
    moq: 50,
    printing: {
      enabled: false,
      colors: 0,
      coverage: "none",
      customText: "",
    },
    finishing: {
      lamination: false,
      uvCoating: false,
      embossing: true,
      foilStamping: false,
    },
    customRequirements: "Eco-friendly materials only",
    urgentDelivery: true,
    version: "1.0",
  },
  "4": {
    length: 35,
    width: 25,
    height: 18,
    thickness: 3.5,
    color: "#DC2626",
    material: "art",
    flute: "E",
    gsm: 250,
    quantity: 1000,
    moq: 200,
    printing: {
      enabled: true,
      colors: 6,
      coverage: "full",
      customText: "JJ Enterprises - Premium Quality",
    },
    finishing: {
      lamination: true,
      uvCoating: true,
      embossing: true,
      foilStamping: true,
    },
    customRequirements: "Spot UV on logo area",
    urgentDelivery: false,
    version: "1.0",
  },
  "5": {
    length: 50,
    width: 40,
    height: 30,
    thickness: 6,
    color: "#7C3AED",
    material: "corrugated",
    flute: "BC",
    gsm: 300,
    quantity: 100,
    moq: 25,
    printing: {
      enabled: true,
      colors: 3,
      coverage: "partial",
      customText: "Heavy Duty Shipping Box",
    },
    finishing: {
      lamination: false,
      uvCoating: false,
      embossing: false,
      foilStamping: false,
    },
    customRequirements: "Water resistant coating",
    urgentDelivery: true,
    version: "1.0",
  },
}

// Fallback box for unknown IDs
const defaultBoxConfig = {
  length: 30,
  width: 20,
  height: 15,
  thickness: 3,
  color: "#F97316",
  material: "corrugated",
  flute: "B",
  gsm: 150,
  quantity: 100,
  moq: 50,
  printing: {
    enabled: true,
    colors: 1,
    coverage: "partial",
    customText: "Custom Box Design",
  },
  finishing: {
    lamination: false,
    uvCoating: false,
    embossing: false,
    foilStamping: false,
  },
  customRequirements: "",
  urgentDelivery: false,
  version: "1.0",
}

// Loading component for 3D scene
function SceneLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-sm text-gray-600">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

// Scene lighting setup
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <hemisphereLight args={["#ffffff", "#60666C"]} intensity={0.5} />
    </>
  )
}

// Ground plane component
function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#f8f9fa" transparent opacity={0.8} />
    </mesh>
  )
}

// Main 3D scene component
function BoxScene({ config }: { config: any }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <ConfigurableBox config={config} />
      <GroundPlane />
    </group>
  )
}

// Product info overlay
function ProductInfo({ config, id }: { config: any; id: string }) {
  const [showInfo, setShowInfo] = useState(true)

  return (
    <>
      {/* Info Panel */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-sm z-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">Box Configuration #{id}</h2>
          <button onClick={() => setShowInfo(!showInfo)} className="text-gray-500 hover:text-gray-700">
            {showInfo ? "−" : "+"}
          </button>
        </div>

        {showInfo && (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-gray-600">Dimensions:</span>
                <p className="text-gray-800">
                  {config.length} × {config.width} × {config.height} cm
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Material:</span>
                <p className="text-gray-800 capitalize">{config.material}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">GSM:</span>
                <p className="text-gray-800">{config.gsm}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Quantity:</span>
                <p className="text-gray-800">{config.quantity} units</p>
              </div>
            </div>

            {config.printing.enabled && (
              <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-800">Printing:</span>
                <p className="text-blue-700 text-xs">{config.printing.customText}</p>
                <p className="text-blue-600 text-xs">
                  {config.printing.colors} colors, {config.printing.coverage} coverage
                </p>
              </div>
            )}

            {(config.finishing.lamination ||
              config.finishing.uvCoating ||
              config.finishing.embossing ||
              config.finishing.foilStamping) && (
              <div className="mt-2 p-2 bg-green-50 rounded-lg">
                <span className="font-medium text-green-800">Finishing:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.finishing.lamination && (
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Lamination</span>
                  )}
                  {config.finishing.uvCoating && (
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">UV Coating</span>
                  )}
                  {config.finishing.embossing && (
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Embossing</span>
                  )}
                  {config.finishing.foilStamping && (
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Foil Stamping</span>
                  )}
                </div>
              </div>
            )}

            {config.urgentDelivery && (
              <div className="mt-2 p-2 bg-red-50 rounded-lg">
                <span className="text-red-800 font-medium text-xs">⚡ Urgent Delivery Required</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs max-w-xs">
        <h3 className="font-semibold mb-2">3D Controls:</h3>
        <ul className="space-y-1">
          <li>• Drag to rotate</li>
          <li>• Scroll to zoom</li>
          <li>• Right-click + drag to pan</li>
          <li>• Touch: 1 finger rotate, 2 fingers zoom/pan</li>
        </ul>
      </div>
    </>
  )
}

export default function CustomizePage() {
  const params = useParams()
  const id = (params?.id as string) || "1"

  // Get configuration for the specific ID
  const config = boxConfigurations[id as keyof typeof boxConfigurations] || defaultBoxConfig

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="relative h-[80vh] bg-white rounded-2xl shadow-xl overflow-hidden">
          <Enhanced3DCanvas camera={{ position: [5, 3, 5], fov: 50 }} shadows={true}>
            <SceneLighting />
            <Suspense fallback={<SceneLoader />}>
              <BoxScene config={config} />
              <Environment preset="city" />
            </Suspense>
            <TouchOptimizedControls />
          </Enhanced3DCanvas>

          <ProductInfo config={config} id={id} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold">
            Customize Further
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">
            Get Quote
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
            Add to Cart
          </button>
          <button className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
            Share Design
          </button>
        </div>
      </div>
    </div>
  )
}
