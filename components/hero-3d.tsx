"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"
import { HeroBox } from "@/components/hero-box"
import { FloatingBoxes } from "@/components/floating-boxes"

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} className="w-full h-full">
                <Suspense fallback={null}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} />
                    <pointLight position={[-10, -10, -5]} intensity={1} color="#f97316" />
                    <HeroBox />
                    <FloatingBoxes />
                    <Environment preset="night" background={false} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={1.5}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                        enableDamping={true}
                        dampingFactor={0.03}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}
