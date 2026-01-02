"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export function FloatingBoxes() {
  const boxes = useRef<Mesh[]>([])

  useFrame((state) => {
    boxes.current.forEach((box, index) => {
      if (box) {
        box.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1)
        box.rotation.y = state.clock.elapsedTime * (0.3 + index * 0.05)
        box.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5
      }
    })
  })

  const boxPositions = [
    [-6, 2, -3],
    [6, -1, -2],
    [-4, -3, -4],
    [5, 3, -5],
    [-7, 0, -1],
    [7, -2, -3],
  ]

  return (
    <group>
      {boxPositions.map((position, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) boxes.current[index] = el
          }}
          position={position as [number, number, number]}
        >
          <boxGeometry args={[0.8, 0.6, 0.4]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#F59E0B" : "#D97706"}
            roughness={0.4}
            metalness={0.2}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
