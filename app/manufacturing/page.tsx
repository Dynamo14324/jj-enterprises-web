"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Factory, Settings, Award, CheckCircle, Clock, Zap, Shield, Recycle, Globe } from "lucide-react"
import Link from "next/link"

function ManufacturingVisualization() {
  return (
    <group>
      {/* Factory Building */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[4, 2, 2]} />
        <meshStandardMaterial color="#6B7280" />
      </mesh>

      {/* Conveyor Belt */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.2, 0.5]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Production Boxes */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.4]} />
          <meshStandardMaterial color="#D97706" />
        </mesh>
      ))}

      {/* Machinery */}
      <mesh position={[-3, 0.5, -1]}>
        <cylinderGeometry args={[0.5, 0.5, 1]} />
        <meshStandardMaterial color="#059669" />
      </mesh>

      <mesh position={[3, 0.5, -1]}>
        <cylinderGeometry args={[0.5, 0.5, 1]} />
        <meshStandardMaterial color="#7C3AED" />
      </mesh>
    </group>
  )
}

export default function ManufacturingPage() {
  const capabilities = [
    {
      title: "Daily Production Capacity",
      value: "50,000+",
      description: "Units per day across all product lines",
      icon: <Factory className="w-6 h-6" />,
      color: "text-blue-600",
    },
    {
      title: "Manufacturing Lines",
      value: "12",
      description: "Dedicated production lines for different products",
      icon: <Settings className="w-6 h-6" />,
      color: "text-green-600",
    },
    {
      title: "Quality Control Points",
      value: "25+",
      description: "Inspection stages throughout production",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-orange-600",
    },
    {
      title: "Lead Time",
      value: "3-7",
      description: "Days for standard orders",
      icon: <Clock className="w-6 h-6" />,
      color: "text-purple-600",
    },
  ]

  const processes = [
    {
      step: "01",
      title: "Design & Planning",
      description: "Customer requirements analysis and technical design preparation",
      features: ["3D Design Validation", "Material Selection", "Cost Optimization", "Timeline Planning"],
    },
    {
      step: "02",
      title: "Material Preparation",
      description: "High-quality raw material sourcing and preparation",
      features: ["Quality Inspection", "Material Testing", "Inventory Management", "Supplier Verification"],
    },
    {
      step: "03",
      title: "Die Cutting & Forming",
      description: "Precision cutting and shaping using advanced machinery",
      features: ["CNC Die Cutting", "Automated Forming", "Dimension Verification", "Edge Finishing"],
    },
    {
      step: "04",
      title: "Printing & Finishing",
      description: "Custom printing and premium finishing applications",
      features: ["Offset Printing", "Digital Printing", "Lamination", "Special Coatings"],
    },
    {
      step: "05",
      title: "Quality Assurance",
      description: "Comprehensive testing and quality verification",
      features: ["Strength Testing", "Print Quality Check", "Dimension Accuracy", "Final Inspection"],
    },
    {
      step: "06",
      title: "Packaging & Dispatch",
      description: "Secure packaging and timely delivery coordination",
      features: ["Protective Packaging", "Inventory Tracking", "Logistics Coordination", "Delivery Confirmation"],
    },
  ]

  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management System",
      icon: <Award className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "ISO 14001:2015",
      description: "Environmental Management",
      icon: <Recycle className="w-8 h-8 text-green-600" />,
    },
    {
      name: "FDA Compliant",
      description: "Food & Drug Safety Standards",
      icon: <Shield className="w-8 h-8 text-red-600" />,
    },
    {
      name: "FSC Certified",
      description: "Sustainable Forest Management",
      icon: <Globe className="w-8 h-8 text-emerald-600" />,
    },
  ]

  const equipment = [
    {
      name: "Heidelberg Offset Press",
      type: "Printing Equipment",
      capacity: "15,000 sheets/hour",
      features: ["6-Color Printing", "Auto Registration", "Quality Control Systems"],
    },
    {
      name: "Bobst Die Cutting Machine",
      type: "Converting Equipment",
      capacity: "8,000 sheets/hour",
      features: ["Precision Cutting", "Waste Stripping", "Quality Monitoring"],
    },
    {
      name: "Lamination Units",
      type: "Finishing Equipment",
      capacity: "12,000 sheets/hour",
      features: ["Matt/Gloss Finish", "UV Protection", "Scratch Resistance"],
    },
    {
      name: "Folder Gluer Lines",
      type: "Assembly Equipment",
      capacity: "25,000 units/hour",
      features: ["Auto Folding", "Precision Gluing", "Quality Inspection"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-6 flex items-center gap-4">
              <Factory className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">Manufacturing Excellence</h1>
                <p className="text-gray-500">Precision and quality in every product.</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              We combine cutting-edge technology with decades of experience to deliver superior manufacturing solutions.
              From design to delivery, we ensure precision, quality, and efficiency.
            </p>
          </div>
        </section>

        {/* 3D Visualization */}
        <section className="mb-12">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Factory Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <Suspense fallback={<div>Loading...</div>}>
                  <Canvas camera={{ position: [5, 2, 5] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 3, 2]} intensity={1} />
                    <ManufacturingVisualization />
                    <OrbitControls />
                    <Environment preset="city" />
                  </Canvas>
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Capabilities */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Key Capabilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {item.icon}
                    <span className={item.color}>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">{item.value}</div>
                  <p className="text-gray-500">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Manufacturing Process</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {processes.map((process, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Badge className="bg-secondary text-secondary-foreground">{process.step}</Badge>
                    {process.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-600">{process.description}</p>
                  <ul>
                    {process.features.map((feature, i) => (
                      <li key={i} className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                        <Zap className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Certifications</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4">{cert.icon}</div>
                  <div className="text-lg font-semibold text-gray-800">{cert.name}</div>
                  <p className="text-gray-500">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Equipment */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Equipment</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {equipment.map((item, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-gray-600">
                    <span className="font-semibold">Type:</span> {item.type}
                  </p>
                  <p className="mb-2 text-gray-600">
                    <span className="font-semibold">Capacity:</span> {item.capacity}
                  </p>
                  <ul>
                    {item.features.map((feature, i) => (
                      <li key={i} className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
