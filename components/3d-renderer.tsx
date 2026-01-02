"use client"

import type React from "react"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

const Box = () => {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export const TouchOptimizedControls = () => {
  return <OrbitControls enableZoom={true} enablePan={true} minDistance={1} maxDistance={25} zoomSpeed={1.5} />
}

interface Enhanced3DCanvasProps {
  children?: React.ReactNode
  camera?: {
    position: [number, number, number]
    fov: number
  }
  shadows?: boolean
  onError?: (error: Error) => void
}

export const Enhanced3DCanvas = ({
  children,
  camera = { position: [5, 5, 5], fov: 60 },
  shadows = true,
  onError,
}: Enhanced3DCanvasProps) => {
  return (
    <Canvas style={{ height: "100%", width: "100%" }} camera={camera} shadows={shadows} onError={onError as any}>
      <Suspense fallback={null}>{children || <Box />}</Suspense>
    </Canvas>
  )
}

const ThreeDRenderer = () => {
  return (
    <Enhanced3DCanvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Box />
      <TouchOptimizedControls />
    </Enhanced3DCanvas>
  )
}

export default ThreeDRenderer
