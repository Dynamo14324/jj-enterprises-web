"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { Text } from "@react-three/drei"

export function HeroBox() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <group>
      {/* Main Hero Box */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 1.5]} />
        <meshStandardMaterial color="#D97706" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Box Edges */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.05, 2.05, 1.55]} />
        <meshBasicMaterial color="#92400E" wireframe={true} transparent={true} opacity={0.6} />
      </mesh>

      {/* Floating Text */}
      <Text position={[0, 3, 0]} fontSize={0.8} color="#FFFFFF" anchorX="center" anchorY="middle">
        JJ ENTERPRISES
      </Text>

      <Text position={[0, 2.2, 0]} fontSize={0.3} color="#FED7AA" anchorX="center" anchorY="middle">
        Premium Packaging Solutions
      </Text>
    </group>
  )
}
