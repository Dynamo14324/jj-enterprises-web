"use client"

import { useEffect, useRef, useState, useCallback, useMemo, Suspense } from "react"
import { Canvas, useFrame, RootState } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, RoundedBox, Html, Float } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Share2,
  RotateCcw,
  Save,
  Eye,
  Package,
  Palette,
  Ruler,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Zap,
  Calculator,
  ShoppingCart,
  Heart,
  Star,
  Layers,
  Box,
  PaintBucket,
  Wrench,
  Sparkles,
  Truck
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { addToCart } from "@/lib/cart-utils"

// Helper component for color swatches to avoid inline styles
const ColorSwatch = ({
  color,
  active,
  onClick,
  className,
}: {
  color: string
  active: boolean
  onClick: (color: string) => void
  className?: string
}) => (
  <button
    className={`w-10 h-10 rounded-xl border-2 transition-all duration-300 ${active ? "border-orange-500 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.4)]" : "border-white/10 hover:border-white/30"}`}
    onClick={() => onClick(color)}
    aria-label={`Select color ${color}`}
    ref={(el) => {
      if (el) el.style.backgroundColor = color
    }}
  />
)

// Enhanced 3D Box Component with High-Fidelity Details
function ConfigurableBox3D({
  config,
  isAnimating,
  viewMode,
  onAnimationComplete,
}: {
  config: BoxConfiguration
  isAnimating: boolean
  viewMode: "flat" | "assembled"
  onAnimationComplete: () => void
}) {
  const boxRef = useRef<THREE.Group>(null)

  const { width, height, depth } = config.dimensions
  const scale = 0.01 // cm to m conversion

  // Realistic material generation
  const material = useMemo(() => {
    const baseColor = new THREE.Color(config.color)
    const roughness = config.finish === "glossy" ? 0.2 : config.finish === "matte" ? 0.9 : 0.5
    const metalness = config.finish === "glossy" ? 0.1 : 0

    return new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: roughness,
      metalness: metalness,
      bumpScale: 0.002,
      side: THREE.DoubleSide
    })
  }, [config.color, config.finish])

  // Corrugation effect for realism
  useFrame((state) => {
    if (boxRef.current && isAnimating) {
      boxRef.current.rotation.y += 0.005
      boxRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={boxRef}>
        {/* Main Box Body with Rounded Corners for Realism */}
        <RoundedBox
          args={[width * scale, height * scale, depth * scale]} // Width, Height, Depth
          radius={0.005} // Smooth corners
          smoothness={4}
          castShadow
          receiveShadow
        >
          <primitive object={material} attach="material" />
        </RoundedBox>

        {/* Dimension Labels within the 3D scene */}
        <Html position={[width * scale / 2 + 0.05, 0, 0]} center>
          <div className="bg-black/80 backdrop-blur-md text-white px-2 py-1 rounded-md text-[10px] font-mono shadow-xl border border-white/10 whitespace-nowrap">
            H: {height}cm
          </div>
        </Html>
        <Html position={[0, -height * scale / 2 - 0.05, 0]} center>
          <div className="bg-black/80 backdrop-blur-md text-white px-2 py-1 rounded-md text-[10px] font-mono shadow-xl border border-white/10 whitespace-nowrap">
            W: {width}cm
          </div>
        </Html>
        <Html position={[0, 0, depth * scale / 2 + 0.05]} center>
          <div className="bg-black/80 backdrop-blur-md text-white px-2 py-1 rounded-md text-[10px] font-mono shadow-xl border border-white/10 whitespace-nowrap">
            D: {depth}cm
          </div>
        </Html>

        {/* Decorative Flaps for Mailer Box Style */}
        {config.style === "mailer" && (
          <group position={[0, height * scale / 2, -depth * scale * 0.4]}>
            <RoundedBox
              args={[width * scale, 0.002, depth * scale * 0.8]}
              radius={0.001}
              smoothness={2}
              rotation={[viewMode === "flat" ? -Math.PI / 1.2 : -Math.PI / 8, 0, 0]}
            >
              <primitive object={material} attach="material" />
            </RoundedBox>
          </group>
        )}
      </group>
    </Float>
  )
}

interface BoxConfiguration {
  dimensions: { width: number, height: number, depth: number, thickness: number }
  style: "shipping" | "mailer" | "gift"
  material: "corrugated" | "kraft" | "cardboard"
  color: string
  finish: "matte" | "glossy" | "satin" | "transparent"
  quantity: number
}

export default function ConfiguratorPage() {
  const { toast } = useToast()
  const [config, setConfig] = useState<BoxConfiguration>({
    dimensions: { width: 25, height: 20, depth: 15, thickness: 3 },
    style: "shipping",
    material: "corrugated",
    color: "#8B4513",
    finish: "matte",
    quantity: 100,
  })

  const [viewMode, setViewMode] = useState<"flat" | "assembled">("assembled")
  const [isAnimating, setIsAnimating] = useState(false)
  const [configChanged, setConfigChanged] = useState(false)
  const [activeTab, setActiveTab] = useState("dimensions")
  const [isLoading, setIsLoading] = useState(false)

  const updateConfig = useCallback((updates: Partial<BoxConfiguration> | { dimensions: any }) => {
    setConfig((prev) => ({ ...prev, ...updates }))
    setConfigChanged(true)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setConfigChanged(false)
    }, 600)
  }, [])

  const calculatedVolume = useMemo(() => {
    const { width, height, depth } = config.dimensions
    return ((width * height * depth) / 1000).toFixed(2)
  }, [config.dimensions])

  const estimatedPrice = useMemo(() => {
    const base = 25
    const vol = Number(calculatedVolume) * 0.5
    const matScale = config.material === "corrugated" ? 1.2 : 1
    return Math.round((base + vol) * matScale)
  }, [config, calculatedVolume])

  const totalPrice = useMemo(() => estimatedPrice * config.quantity, [estimatedPrice, config.quantity])

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: "Custom Box Design",
      price: `₹${estimatedPrice}`,
      quantity: config.quantity,
      category: "Custom",
      image: "/placeholder.svg",
      sku: "CUST-BOX",
    })
    toast({ title: "Added to Cart", description: `${config.quantity} units ready for production.` })
  }

  const handleResetConfiguration = () => {
    setConfig({
      dimensions: { width: 25, height: 20, depth: 15, thickness: 3 },
      style: "shipping",
      material: "corrugated",
      color: "#8B4513",
      finish: "matte",
      quantity: 100,
    })
  }

  const renderKey = useMemo(() => JSON.stringify(config) + viewMode, [config, viewMode])

  return (
    <div className="min-h-screen bg-gradient-mesh pt-24 pb-20">
      <div className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[130px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[110px] rounded-full animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="animate-fade-in-up">
              <Badge variant="outline" className="mb-6 bg-orange-500/10 text-orange-400 border-orange-500/20 py-2 px-6 rounded-full text-sm font-semibold">
                <Sparkles className="w-5 h-5 mr-3" />
                VIRTUAL DESIGN STUDIO v4.2
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] mb-6">
                BOX <span className="gradient-text">ARCHITECT</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
                Precision-engineered packaging for world-class brands. <br />
                Adjust dimensions, select materials, and witness perfection in real-time.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl px-8 py-8 h-auto font-bold transition-all hover:scale-105">
                <Share2 className="w-6 h-6 mr-3" />
                SHARE DESIGN
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-10 py-8 h-auto font-black shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all hover:scale-110">
                <Download className="w-6 h-6 mr-3" />
                EXPORT ASSET
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 group">
            <div className="relative h-[800px] rounded-[3rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl transition-all duration-700 group-hover:border-orange-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 pointer-events-none" />

              <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
                <div className="glass-card px-8 py-4 rounded-2xl flex items-center space-x-6 border-white/5 shadow-2xl">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mb-1">Rendering Engine</span>
                    <span className="text-sm font-bold text-white flex items-center">
                      <Box className="w-4 h-4 mr-2" />
                      {viewMode === "assembled" ? "Final Assembly" : "Blueprint Layout"}
                    </span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]" />
                    <span className="text-[10px] font-black text-white tracking-widest uppercase">Live Link</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl bg-white/5 border-white/10 text-white hover:bg-white/15" onClick={() => setIsAnimating(!isAnimating)}>
                    {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl bg-white/5 border-white/10 text-white hover:bg-white/15" onClick={handleResetConfiguration}>
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {isLoading && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-xl">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 border-t-4 border-orange-500 rounded-full animate-spin mb-6" />
                    <span className="text-white font-black tracking-widest text-sm uppercase animate-pulse">Re-Calculating Geometry</span>
                  </div>
                </div>
              )}

              <Canvas
                key={renderKey}
                camera={{ position: [5, 5, 5], fov: 45 }}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                  <pointLight position={[-10, -10, -5]} intensity={1} color="#f97316" />
                  <spotLight position={[0, 15, 0]} intensity={2} angle={0.15} penumbra={1} castShadow />

                  <ConfigurableBox3D
                    config={config}
                    isAnimating={isAnimating}
                    viewMode={viewMode}
                    onAnimationComplete={() => setConfigChanged(false)}
                  />

                  <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
                  <Environment preset="city" />

                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    maxPolarAngle={Math.PI / 1.8}
                    minDistance={3}
                    maxDistance={12}
                    enableDamping={true}
                    dampingFactor={0.04}
                  />
                </Suspense>
              </Canvas>

              <div className="absolute bottom-8 left-8 glass-card px-6 py-4 rounded-2xl border-white/5 flex space-x-6 text-gray-400">
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                  Left Click: Rotate
                </div>
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                  Right Click: Pan
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-slide-in-right">
            <div className="glass-card p-10 rounded-[3rem] border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[80px] -mr-20 -mt-20" />

              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-white flex items-center">
                  <Zap className="w-8 h-8 mr-4 text-orange-500" />
                  LIFECYCLE
                </h3>
                <Badge className="bg-orange-500/20 text-orange-400 border-none px-4 py-1.5 font-black uppercase text-[10px]">Active Session</Badge>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 rounded-[1.5rem] p-6 border border-white/5">
                  <div className="text-4xl font-black text-white mb-1">{calculatedVolume}L</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Total Volume</div>
                </div>
                <div className="bg-white/5 rounded-[1.5rem] p-6 border border-white/5">
                  <div className="text-4xl font-black text-orange-500 mb-1">₹{estimatedPrice}</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Unit Cost</div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-widest">Material Grade</span>
                  <span className="text-white font-black uppercase">{config.material}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-widest">Print Finish</span>
                  <span className="text-white font-black uppercase">{config.finish}</span>
                </div>
                <Separator className="bg-white/10 my-6" />
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block mb-1">Estimated Total</span>
                    <div className="text-5xl font-black text-white tracking-tighter">₹{totalPrice.toLocaleString()}</div>
                  </div>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-8 py-7 h-auto font-black shadow-2xl transition-all hover:scale-105"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    ORDER
                  </Button>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border-white/10">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 bg-white/5 rounded-2xl h-14 p-1 mb-8">
                  <TabsTrigger value="dimensions" className="rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all">
                    <Ruler className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="style" className="rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all">
                    <Box className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="material" className="rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all">
                    <Layers className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="finish" className="rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all">
                    <Palette className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dimensions" className="space-y-10 animate-fade-in">
                  {['width', 'height', 'depth'].map((dim) => (
                    <div key={dim} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{dim} (cm)</Label>
                        <span className="text-white font-black tabular-nums">{config.dimensions[dim as keyof typeof config.dimensions]}</span>
                      </div>
                      <Slider
                        value={[config.dimensions[dim as keyof typeof config.dimensions]]}
                        onValueChange={([val]) => updateConfig({ dimensions: { ...config.dimensions, [dim]: val } })}
                        max={100}
                        min={5}
                        step={1}
                        className="opacity-80 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                  <div className="space-y-4 pt-6 text-center">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Production Quantity</Label>
                    <div className="flex items-center justify-center space-x-6">
                      <Button variant="outline" className="w-12 h-12 rounded-full border-white/10" onClick={() => updateConfig({ quantity: Math.max(10, config.quantity - 10) })}>-</Button>
                      <span className="text-4xl font-black text-white tabular-nums">{config.quantity}</span>
                      <Button variant="outline" className="w-12 h-12 rounded-full border-white/10" onClick={() => updateConfig({ quantity: config.quantity + 10 })}>+</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'shipping', name: 'Standard Shipping', icon: Box },
                      { id: 'mailer', name: 'Premium Mailer', icon: Box },
                      { id: 'gift', name: 'Luxury Gift Box', icon: Star }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateConfig({ style: style.id as any })}
                        className={`flex items-center p-6 rounded-[1.5rem] border-2 transition-all group ${config.style === style.id ? 'bg-orange-500 border-orange-400 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}
                      >
                        <Box className={`w-8 h-8 mr-6 ${config.style === style.id ? 'text-white' : 'text-orange-500'}`} />
                        <span className="font-black uppercase tracking-tight text-lg">{style.name}</span>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="material" className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'corrugated', name: 'Heavy-Duty Corrugated', desc: 'Maximum protection for shipping' },
                      { id: 'kraft', name: 'Eco-Kraft Natural', desc: 'Rustic, planet-friendly aesthetic' },
                      { id: 'cardboard', name: 'Smooth Cardboard', desc: 'Premium retail finish' }
                    ].map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => updateConfig({ material: mat.id as any })}
                        className={`text-left p-6 rounded-[1.5rem] border-2 transition-all ${config.material === mat.id ? 'bg-orange-500 border-orange-400 text-white shadow-2xl' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}
                      >
                        <div className="font-black uppercase text-xl mb-1">{mat.name}</div>
                        <div className={`text-xs ${config.material === mat.id ? 'text-white/80' : 'text-gray-500'}`}>{mat.desc}</div>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="finish" className="space-y-8 animate-fade-in">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Surface Pigments</Label>
                    <div className="grid grid-cols-6 gap-3">
                      {[
                        { hex: "#8B4513" }, { hex: "#D2691E" }, { hex: "#CD853F" },
                        { hex: "#F4A460" }, { hex: "#FFFFFF" }, { hex: "#F5F5DC" },
                        { hex: "#FFE4B5" }, { hex: "#FFEFD5" }, { hex: "#E6E6FA" },
                        { hex: "#F0F8FF" }, { hex: "#F5FFFA" }, { hex: "#FFF8DC" },
                      ].map((preset) => (
                        <ColorSwatch
                          key={preset.hex}
                          color={preset.hex}
                          active={config.color === preset.hex}
                          onClick={(c) => updateConfig({ color: c })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Pro Coating</Label>
                    <Select value={config.finish} onValueChange={(value: any) => updateConfig({ finish: value })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-14">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        <SelectItem value="matte">Pure Matte</SelectItem>
                        <SelectItem value="glossy">Ultra Glossy</SelectItem>
                        <SelectItem value="satin">Premium Satin</SelectItem>
                        <SelectItem value="transparent">Clear Coat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: "Proprietary 3D Engine", desc: "Experience near-photorealistic ray tracing." },
            { icon: Calculator, title: "Dynamic Economics", desc: "Instant volume and material cost analysis." },
            { icon: Wrench, title: "Production Ready", desc: "Instantly validated for structural integrity." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-orange-500/20 transition-all group">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500">
                <item.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
