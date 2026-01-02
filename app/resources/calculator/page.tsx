"use client"
import { useState, useCallback, useMemo } from "react"
import { Calculator, ArrowLeft, Package, Info, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface CalculatorInputs {
  productLength: number
  productWidth: number
  productHeight: number
  productWeight: number
  quantity: number
  material: string
  cushioning: number
  boxType: string
}

interface CalculatorResults {
  boxLength: number
  boxWidth: number
  boxHeight: number
  boxVolume: number
  materialCost: number
  shippingCost: number
  totalCost: number
  recommendations: string[]
}

const materials = [
  { value: "corrugated-3ply", label: "3-Ply Corrugated", cost: 0.85, description: "Standard strength" },
  { value: "corrugated-5ply", label: "5-Ply Corrugated", cost: 1.2, description: "High strength" },
  { value: "corrugated-7ply", label: "7-Ply Corrugated", cost: 1.55, description: "Extra heavy duty" },
  { value: "kraft", label: "Kraft Paperboard", cost: 0.65, description: "Lightweight" },
  { value: "duplex", label: "Duplex Board", cost: 1.25, description: "Premium finish" },
]

const boxTypes = [
  { value: "regular", label: "Regular Slotted Container (RSC)", multiplier: 1.0 },
  { value: "die-cut", label: "Die-Cut Box", multiplier: 1.2 },
  { value: "mailer", label: "Mailer Box", multiplier: 1.1 },
  { value: "tray", label: "Tray with Lid", multiplier: 1.3 },
]

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    productLength: 20,
    productWidth: 15,
    productHeight: 10,
    productWeight: 0.5,
    quantity: 100,
    material: "corrugated-3ply",
    cushioning: 2,
    boxType: "regular",
  })

  const updateInput = useCallback((key: keyof CalculatorInputs, value: number | string) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }, [])

  const results = useMemo((): CalculatorResults => {
    const cushion = inputs.cushioning
    const boxLength = inputs.productLength + cushion * 2
    const boxWidth = inputs.productWidth + cushion * 2
    const boxHeight = inputs.productHeight + cushion * 2
    const boxVolume = (boxLength * boxWidth * boxHeight) / 1000000 // m³

    const material = materials.find((m) => m.value === inputs.material)
    const boxType = boxTypes.find((b) => b.value === inputs.boxType)

    const surfaceArea = (2 * (boxLength * boxWidth + boxWidth * boxHeight + boxHeight * boxLength)) / 10000 // m²
    const materialCost = (material?.cost || 0.85) * surfaceArea * (boxType?.multiplier || 1.0) * inputs.quantity

    // Simplified shipping cost calculation
    const shippingCost = boxVolume * inputs.quantity * 50 // ₹50 per m³

    const totalCost = materialCost + shippingCost

    const recommendations: string[] = []

    if (boxVolume > 0.1) {
      recommendations.push("Consider reducing box size to optimize shipping costs")
    }
    if (inputs.cushioning < 1) {
      recommendations.push("Increase cushioning for better product protection")
    }
    if (inputs.quantity > 1000 && inputs.material === "corrugated-3ply") {
      recommendations.push("Consider 5-ply corrugated for bulk orders")
    }
    if (materialCost > shippingCost * 2) {
      recommendations.push("Material cost is high - consider alternative materials")
    }

    return {
      boxLength,
      boxWidth,
      boxHeight,
      boxVolume,
      materialCost,
      shippingCost,
      totalCost,
      recommendations,
    }
  }, [inputs])

  const handleExport = () => {
    const data = {
      inputs,
      results,
      timestamp: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "box-calculator-results.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    const shareData = {
      title: "Box Calculator Results - JJ Enterprises",
      text: `Box dimensions: ${results.boxLength.toFixed(1)}×${results.boxWidth.toFixed(1)}×${results.boxHeight.toFixed(1)}cm, Total cost: ₹${results.totalCost.toFixed(2)} for ${inputs.quantity} units`,
      url: window.location.href,
    }

    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
      alert("Results copied to clipboard!")
    }
  }

  const handleOpenConfigurator = () => {
    const configData = {
      dimensions: {
        width: results.boxLength,
        height: results.boxHeight,
        depth: results.boxWidth,
        thickness: inputs.material.includes("5ply") ? 6 : inputs.material.includes("7ply") ? 9 : 3
      },
      style: inputs.boxType,
      material: inputs.material.includes("corrugated") ? "corrugated" : "kraft",
      quantity: inputs.quantity
    }
    localStorage.setItem("boxQuoteData", JSON.stringify({ configuration: configData }))
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-green-600 to-emerald-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <Link href="/resources" className="inline-flex items-center text-green-100 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>

            <div className="mb-8">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-md">Professional Tool</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Box Size Calculator</h1>
              <p className="text-xl text-green-50 max-w-3xl leading-relaxed">
                Optimize your packaging with precision. Calculate ideal dimensions, compare material costs, and get professional recommendations in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="mr-2 h-5 w-5" />
                      Product Dimensions
                    </CardTitle>
                    <CardDescription>Enter your product dimensions in centimeters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="length">Length (cm)</Label>
                        <Input
                          id="length"
                          type="number"
                          value={inputs.productLength}
                          onChange={(e) => updateInput("productLength", Number(e.target.value))}
                          min="1"
                          max="200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="width">Width (cm)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={inputs.productWidth}
                          onChange={(e) => updateInput("productWidth", Number(e.target.value))}
                          min="1"
                          max="200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={inputs.productHeight}
                          onChange={(e) => updateInput("productHeight", Number(e.target.value))}
                          min="1"
                          max="200"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="weight">Product Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={inputs.productWeight}
                        onChange={(e) => updateInput("productWeight", Number(e.target.value))}
                        min="0.1"
                        max="50"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cushioning" className="flex items-center">
                        Cushioning Space (cm)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="ml-1 h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Extra space around product for protection</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Slider
                        value={[inputs.cushioning]}
                        onValueChange={(value) => updateInput("cushioning", value[0])}
                        max={10}
                        min={0.5}
                        step={0.5}
                        className="mt-2"
                      />
                      <div className="text-sm text-gray-500 mt-1">{inputs.cushioning} cm</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Material & Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="material">Material Type</Label>
                      <Select value={inputs.material} onValueChange={(value: string) => updateInput("material", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {materials.map((material) => (
                            <SelectItem key={material.value} value={material.value}>
                              <div className="flex flex-col text-left">
                                <span>{material.label}</span>
                                <span className="text-xs text-gray-500">{material.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="boxType">Box Type</Label>
                      <Select value={inputs.boxType} onValueChange={(value: string) => updateInput("boxType", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {boxTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={inputs.quantity}
                        onChange={(e) => updateInput("quantity", Number(e.target.value))}
                        min={1}
                        max={100000}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculated Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Box Dimensions */}
                    <div>
                      <h4 className="font-semibold mb-3">Recommended Box Dimensions</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{results.boxLength.toFixed(1)}</div>
                          <div className="text-sm text-gray-600">Length (cm)</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{results.boxWidth.toFixed(1)}</div>
                          <div className="text-sm text-gray-600">Width (cm)</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{results.boxHeight.toFixed(1)}</div>
                          <div className="text-sm text-gray-600">Height (cm)</div>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <Badge variant="outline">Volume: {results.boxVolume.toFixed(4)} m³</Badge>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div>
                      <h4 className="font-semibold mb-3">Cost Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Material Cost:</span>
                          <span className="font-semibold">₹{results.materialCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Estimated Shipping:</span>
                          <span className="font-semibold">₹{results.shippingCost.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-semibold">Total Cost:</span>
                          <span className="font-bold text-green-600">₹{results.totalCost.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-gray-500 text-center">
                          ₹{(results.totalCost / inputs.quantity).toFixed(2)} per unit
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button onClick={handleExport} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button onClick={handleShare} variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                {results.recommendations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <Alert key={index}>
                            <Info className="h-4 w-4" />
                            <AlertDescription>{rec}</AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA */}
                <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white border-0 shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Ready to Visualize?</h3>
                    <p className="mb-6 text-green-50">See your calculated box in interactive 3D and customize every detail.</p>
                    <div className="flex flex-col gap-3">
                      <Link href="/configurator" onClick={handleOpenConfigurator}>
                        <Button className="w-full bg-white text-green-700 hover:bg-green-50 font-bold py-6">
                          Open in 3D Configurator
                        </Button>
                      </Link>
                      <Link href="/#contact">
                        <Button
                          variant="outline"
                          className="w-full border-white/50 text-white hover:bg-white/10 backdrop-blur-md py-6"
                        >
                          Request Custom Quote
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TooltipProvider>
  )
}
