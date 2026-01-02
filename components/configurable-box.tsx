"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import * as THREE from "three"

interface BoxConfiguration {
  length: number // cm
  width: number // cm
  height: number // cm
  thickness: number // mm
  color: string
  material: string
  ply: "3-ply" | "5-ply" | "7-ply" | null
  flute: string
  gsm: number
  printing: {
    enabled: boolean
    printingType: "offset" | "digital" | "flexographic" | null
    colors: number
    coverage: string
    customText: string
  }
  finishing: {
    lamination: boolean
    uvCoating: boolean
    embossing: boolean
    foilStamping: boolean
  }
}

interface ConfigurableBoxProps {
  config: BoxConfiguration
}

function createBoxMaterial(config: BoxConfiguration) {
  const baseColor = new THREE.Color(config.color)
  const materialProperties: Record<string, any> = {
    corrugated: { roughness: 0.8, metalness: 0.1, bumpScale: 0.002 },
    kraft: { roughness: 0.9, metalness: 0.05, bumpScale: 0.001 },
    duplex: { roughness: 0.4, metalness: 0.2, bumpScale: 0.0005 },
    art: { roughness: 0.2, metalness: 0.3, bumpScale: 0.0001 },
  }
  const props = materialProperties[config.material] || materialProperties.corrugated

  const material = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: props.roughness,
    metalness: props.metalness,
    side: THREE.DoubleSide,
  })

  if (config.finishing.lamination) {
    material.roughness *= 0.3
    material.metalness += 0.1
  }
  if (config.finishing.uvCoating) {
    material.roughness *= 0.1
    material.metalness += 0.2
  }

  return material
}

function createBoxGeometry(config: BoxConfiguration) {
  const l = config.length / 100 // cm to m
  const w = config.width / 100 // cm to m
  const h = config.height / 100 // cm to m

  let effectiveThickness = config.thickness / 1000 // mm to m
  if (config.material === "corrugated") {
    if (config.ply === "5-ply") effectiveThickness *= 1.5
    else if (config.ply === "7-ply") effectiveThickness *= 2
  }

  const outerGeometry = new THREE.BoxGeometry(l, h, w)
  const innerL = Math.max(0.001, l - effectiveThickness * 2)
  const innerH = Math.max(0.001, h - effectiveThickness * 2)
  const innerW = Math.max(0.001, w - effectiveThickness * 2)
  const innerGeometry = new THREE.BoxGeometry(innerL, innerH, innerW)

  if (config.material === "corrugated") {
    const positions = outerGeometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]
      const fluteFactor = config.flute === "E" ? 0.5 : config.flute === "BC" ? 1.5 : 1
      const corrugation =
        Math.sin(x * 50 * fluteFactor) * 0.0005 * fluteFactor + Math.sin(z * 50 * fluteFactor) * 0.0005 * fluteFactor
      positions[i + 1] += corrugation
    }
    outerGeometry.attributes.position.needsUpdate = true
    outerGeometry.computeVertexNormals()
  }

  return { outerGeometry, innerGeometry }
}

function PrintingOverlay({ config }: { config: BoxConfiguration }) {
  if (!config.printing.enabled || !config.printing.customText) return null

  const baseFontSize = Math.min(config.length / 100, config.height / 100) * 0.1
  const textPositionZ = config.width / 100 / 2 + 0.0015
  const textMaxWidth = (config.length / 100) * 0.85

  let textColor = "#333333"
  if (config.printing.colors > 1) textColor = "#000000"

  return (
    <group>
      {" "}
      {/* R3F group, should be fine */}
      <Text
        position={[0, 0, textPositionZ]}
        fontSize={baseFontSize}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={textMaxWidth}
        font="/fonts/Inter-Bold.ttf"
        outlineWidth={0.0005}
        outlineColor="#FFFFFF"
      >
        {config.printing.customText.substring(0, 50)}
      </Text>
      {config.printing.coverage === "full" && (
        <Text
          position={[config.length / 100 / 2 + 0.0015, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={Math.min(config.width / 100, config.height / 100) * 0.08}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={(config.width / 100) * 0.85}
          font="/fonts/Inter-Regular.ttf"
        >
          JJ Enterprises
        </Text>
      )}
    </group>
  )
}

function DimensionLabels({ config }: { config: BoxConfiguration }) {
  const [showLabels, setShowLabels] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setShowLabels(false), 7000)
    return () => clearTimeout(timer)
  }, [config])

  if (!showLabels) return null

  const l = config.length / 100,
    w = config.width / 100,
    h = config.height / 100
  const labelStyle = "bg-black/80 text-white px-2 py-1 rounded text-xs font-mono whitespace-nowrap shadow-md"

  return (
    <group>
      {" "}
      {/* R3F group, should be fine */}
      <Html position={[0, -h / 2 - 0.05, 0]} center>
        <div className={labelStyle}>{config.length} cm (L)</div>
      </Html>
      <Html position={[l / 2 + 0.05, -h / 2, 0]} rotation={[0, Math.PI / 2, 0]} center transform>
        <div className={labelStyle} style={{ transform: "rotate(-90deg) translateX(50%) translateY(-50%)" }}>
          {config.width} cm (W)
        </div>
      </Html>
      <Html position={[l / 2 + 0.02, 0, w / 2 + 0.02]} center>
        <div className={labelStyle}>{config.height} cm (H)</div>
      </Html>
    </group>
  )
}

export function ConfigurableBox({ config }: ConfigurableBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const { outerGeometry, innerGeometry } = useMemo(() => createBoxGeometry(config), [config])
  const material = useMemo(
    () => createBoxMaterial(config),
    [config.color, config.material, config.finishing], // Added config.finishing to dependencies
  )

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.015
    }
    if (meshRef.current) {
      const targetScale = hovered ? 1.03 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {" "}
      {/* R3F group, should be fine */}
      <mesh ref={meshRef} geometry={outerGeometry} material={material} castShadow receiveShadow />
      <mesh
        geometry={innerGeometry}
        material={
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(config.color).multiplyScalar(0.7),
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.4,
          })
        }
      />
      <PrintingOverlay config={config} />
      <DimensionLabels config={config} />
      <mesh position={[0, -config.height / 100 / 2 - 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[config.length / 50, config.width / 50]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.4} roughness={0.9} />
      </mesh>
      {config.material === "corrugated" && config.ply && ["5-ply", "7-ply"].includes(config.ply) && (
        <lineSegments>
          <edgesGeometry args={[outerGeometry]} />
          <lineBasicMaterial
            color={new THREE.Color(config.color).offsetHSL(0, 0, -0.2)}
            linewidth={config.ply === "7-ply" ? 1.5 : 1}
            transparent
            opacity={0.15}
          />
        </lineSegments>
      )}
      {config.finishing.lamination && (
        <mesh
          geometry={outerGeometry}
          material={
            new THREE.MeshStandardMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.08,
              roughness: 0.05,
              metalness: 0.5,
            })
          }
          scale={[1.002, 1.002, 1.002]}
        />
      )}
      {config.finishing.uvCoating && (
        <mesh
          geometry={outerGeometry}
          material={
            new THREE.MeshStandardMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.1,
              roughness: 0.01,
              metalness: 0.6,
            })
          }
          scale={[1.003, 1.003, 1.003]}
        />
      )}
      {config.gsm > 250 && (
        <Html position={[0, config.height / 100 / 2 + 0.08, 0]} center>
          <div className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse shadow-md">
            HEAVY DUTY
          </div>
        </Html>
      )}
    </group>
  )
}
