"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

interface InteractiveBoxProps {
  color: string
  size: [number, number, number]
}

export function InteractiveBox({ color, size }: InteractiveBoxProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1)
    }
  })

  return (
    <group>
      {/* Main Box */}
      <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Box Edges */}
      <mesh>
        <boxGeometry args={[size[0] + 0.05, size[1] + 0.05, size[2] + 0.05]} />
        <meshBasicMaterial color="#000000" wireframe={true} transparent={true} opacity={0.2} />
      </mesh>

      {/* Floating Particles */}
      {hovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}
