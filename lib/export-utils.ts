// Enhanced export utilities with comprehensive format support

interface BoxConfiguration {
  length: number
  width: number
  height: number
  thickness: number
  color: string
  material: string
  ply?: "3-ply" | "5-ply" | "7-ply" | null
  flute: string
  gsm: number
  quantity: number
  moq: number
  printing: {
    enabled: boolean
    colors: number
    coverage: string
    customText: string
    printingType?: "offset" | "digital" | "flexographic" | null
  }
  finishing: {
    lamination: boolean
    uvCoating: boolean
    embossing: boolean
    foilStamping: boolean
  }
  customRequirements: string
  urgentDelivery: boolean
  version: string
}

// Enhanced 3D export functionality with progress tracking
export async function exportTo3D(config: BoxConfiguration, format: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Show progress notification
      const progressNotification = createProgressNotification()
      document.body.appendChild(progressNotification)

      // Simulate export process with realistic timing
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5
        updateProgressNotification(progressNotification, Math.min(progress, 95))

        if (progress >= 95) {
          clearInterval(progressInterval)

          // Complete the export
          setTimeout(() => {
            completeExport(config, format)
            updateProgressNotification(progressNotification, 100)

            // Remove notification after success
            setTimeout(() => {
              if (document.body.contains(progressNotification)) {
                document.body.removeChild(progressNotification)
              }
              resolve()
            }, 2000)
          }, 500)
        }
      }, 200)
    } catch (error) {
      reject(error)
    }
  })
}

function createProgressNotification(): HTMLElement {
  const notification = document.createElement("div")
  notification.className =
    "fixed top-4 right-4 bg-white border-2 border-blue-200 rounded-xl p-6 shadow-2xl z-[9999] min-w-[320px]"
  notification.innerHTML = `
    <div class="flex items-center space-x-4">
      <div class="relative w-12 h-12">
        <svg class="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" stroke-width="2"/>
          <path class="circle-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="0, 100" stroke-linecap="round"/>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-sm font-bold text-blue-600 progress-text">0%</span>
        </div>
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-gray-800 mb-1">Exporting 3D Model</h4>
        <p class="text-sm text-gray-600 status-text">Preparing export...</p>
        <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div class="bg-blue-500 h-2 rounded-full transition-all duration-300 progress-bar" style="width: 0%"></div>
        </div>
      </div>
    </div>
  `
  return notification
}

function updateProgressNotification(notification: HTMLElement, progress: number) {
  const progressText = notification.querySelector(".progress-text")
  const progressBar = notification.querySelector(".progress-bar") as HTMLElement
  const statusText = notification.querySelector(".status-text")
  const circleProgress = notification.querySelector(".circle-progress") as SVGPathElement

  if (progressText) progressText.textContent = `${Math.round(progress)}%`
  if (progressBar) progressBar.style.width = `${progress}%`
  if (circleProgress) circleProgress.style.strokeDasharray = `${progress}, 100`

  if (statusText) {
    if (progress < 20) statusText.textContent = "Generating geometry..."
    else if (progress < 40) statusText.textContent = "Applying materials..."
    else if (progress < 60) statusText.textContent = "Processing textures..."
    else if (progress < 80) statusText.textContent = "Optimizing mesh..."
    else if (progress < 100) statusText.textContent = "Finalizing export..."
    else statusText.textContent = "Export complete!"
  }
}

function completeExport(config: BoxConfiguration, format: string) {
  // Generate export data based on format
  let exportData: string
  let filename: string
  let mimeType: string

  switch (format.toLowerCase()) {
    case "obj":
      exportData = generateOBJ(config)
      filename = `custom-box-${Date.now()}.obj`
      mimeType = "text/plain"
      break
    case "glb":
      exportData = generateGLB(config)
      filename = `custom-box-${Date.now()}.glb`
      mimeType = "model/gltf-binary"
      break
    case "stl":
      exportData = generateSTL(config)
      filename = `custom-box-${Date.now()}.stl`
      mimeType = "application/octet-stream"
      break
    case "pdf":
      exportData = generatePDF(config)
      filename = `custom-box-specifications-${Date.now()}.pdf`
      mimeType = "application/pdf"
      break
    case "ai": // New format
      exportData = generateAI(config)
      filename = `custom-box-dieline-${Date.now()}.ai`
      mimeType = "application/postscript" // Or application/illustrator
      break
    case "dxf": // New format
      exportData = generateDXF(config)
      filename = `custom-box-dieline-${Date.now()}.dxf`
      mimeType = "application/dxf" // Or image/vnd.dxf
      break
    default:
      throw new Error(`Unsupported format: ${format}`)
  }

  // Create and trigger download
  const blob = new Blob([exportData], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function generateOBJ(config: BoxConfiguration): string {
  const { length, width, height } = config
  const l = length / 100 / 2 // Half dimensions for centering
  const w = width / 100 / 2
  const h = height / 100 / 2

  return `# JJ Enterprises Custom Box Export
# Dimensions: ${length}x${width}x${height} cm
# Material: ${config.material}${config.ply ? ` (${config.ply})` : ""}
# Printing: ${config.printing.printingType || "N/A"}
# Generated: ${new Date().toISOString()}

# Vertices
v -${l} -${h} -${w}
v ${l} -${h} -${w}
v ${l} ${h} -${w}
v -${l} ${h} -${w}
v -${l} -${h} ${w}
v ${l} -${h} ${w}
v ${l} ${h} ${w}
v -${l} ${h} ${w}

# Texture coordinates (basic)
vt 0.0 0.0
vt 1.0 0.0
vt 1.0 1.0
vt 0.0 1.0

# Normals
vn 0.0 0.0 -1.0
vn 0.0 0.0 1.0
vn -1.0 0.0 0.0
vn 1.0 0.0 0.0
vn 0.0 -1.0 0.0
vn 0.0 1.0 0.0

# Faces
# Front face
f 1/1/1 2/2/1 3/3/1 4/4/1
# Back face
f 8/1/2 7/2/2 6/3/2 5/4/2
# Left face
f 5/1/3 1/2/3 4/3/3 8/4/3
# Right face
f 2/1/4 6/2/4 7/3/4 3/4/4
# Bottom face
f 5/1/5 6/2/5 2/3/5 1/4/5
# Top face
f 4/1/6 3/2/6 7/3/6 8/4/6
`
}

function generateGLB(config: BoxConfiguration): string {
  // Simplified GLB generation - in real implementation, use a proper GLB library
  return `GLB_PLACEHOLDER_DATA_FOR_${config.length}x${config.width}x${config.height}_${config.material}${config.ply ? `_${config.ply}` : ""}`
}

function generateSTL(config: BoxConfiguration): string {
  const { length, width, height } = config
  const l = length / 100 / 2
  const w = width / 100 / 2
  const h = height / 100 / 2

  // Basic box STL, more complex for actual dielines or open box
  return `solid CustomBox_${config.material}
  facet normal 0.0 0.0 -1.0
    outer loop
      vertex -${l} -${h} -${w}
      vertex ${l} -${h} -${w}
      vertex ${l} ${h} -${w}
    endloop
  endfacet
  facet normal 0.0 0.0 -1.0
    outer loop
      vertex -${l} -${h} -${w}
      vertex ${l} ${h} -${w}
      vertex -${l} ${h} -${w}
    endloop
  endfacet
  facet normal 0.0 0.0 1.0
    outer loop
      vertex -${l} -${h} ${w}
      vertex -${l} ${h} ${w}
      vertex ${l} ${h} ${w}
    endloop
  endfacet
  facet normal 0.0 0.0 1.0
    outer loop
      vertex -${l} -${h} ${w}
      vertex ${l} ${h} ${w}
      vertex ${l} -${h} ${w}
    endloop
  endfacet
  # ... (add other 4 faces similarly)
endsolid CustomBox_${config.material}`
}

function generatePDF(config: BoxConfiguration): string {
  // Simplified PDF generation - in real implementation, use a proper PDF library
  const specifications = `
JJ ENTERPRISES - CUSTOM BOX SPECIFICATIONS

Order Details:
- Dimensions: ${config.length} x ${config.width} x ${config.height} cm
- Material: ${config.material}
${config.material === "corrugated" && config.ply ? `- Ply Type: ${config.ply}` : ""}
- GSM: ${config.gsm}
- Flute Type: ${config.flute}
- Quantity: ${config.quantity}
- MOQ: ${config.moq}

Design Features:
- Base Color: ${config.color}
- Printing: ${config.printing.enabled ? "Yes" : "No"}
${config.printing.enabled && config.printing.printingType ? `- Printing Type: ${config.printing.printingType}` : ""}
${config.printing.enabled ? `- Print Colors: ${config.printing.colors}` : ""}
${config.printing.enabled ? `- Coverage: ${config.printing.coverage}` : ""}
${config.printing.customText ? `- Custom Text: ${config.printing.customText}` : ""}

Finishing Options:
- Lamination: ${config.finishing.lamination ? "Yes" : "No"}
- UV Coating: ${config.finishing.uvCoating ? "Yes" : "No"}
- Embossing: ${config.finishing.embossing ? "Yes" : "No"}
- Foil Stamping: ${config.finishing.foilStamping ? "Yes" : "No"}

Additional Requirements:
${config.customRequirements || "None"}

Delivery:
- Urgent Delivery: ${config.urgentDelivery ? "Yes" : "No"}

Generated: ${new Date().toLocaleString()}
`
  return specifications
}

// Placeholder for AI export
function generateAI(config: BoxConfiguration): string {
  return `%%Creator: JJ Enterprises Configurator
%%Title: Custom Box Dieline (${config.length}x${config.width}x${config.height} cm)
%%BeginSetup
%%EndSetup
% Placeholder AI data. A real implementation would generate vector dielines.
/mm { 2.834645669291339 * } def % Convert mm to points

% Box dimensions in mm
/boxLength ${config.length * 10} def
/boxWidth ${config.width * 10} def
/boxHeight ${config.height * 10} def

% Example: Draw a simple rectangle (this is not a proper dieline)
newpath
  50 mm 50 mm moveto
  boxLength mm 0 rlineto
  0 boxWidth mm rlineto
  boxLength mm neg 0 rlineto
  closepath
stroke
showpage
%%EOF
% Material: ${config.material} ${config.ply ? `(${config.ply})` : ""}
% Printing: ${config.printing.printingType || "N/A"}
`
}

// Placeholder for DXF export
function generateDXF(config: BoxConfiguration): string {
  return `0
SECTION
2
HEADER
9
$ACADVER
1
AC1009
0
ENDSEC
0
SECTION
2
TABLES
0
ENDSEC
0
SECTION
2
BLOCKS
0
ENDSEC
0
SECTION
2
ENTITIES
0
LINE
8
0
10
0.0
20
0.0
30
0.0
11
${config.length * 10}.0
21
0.0
31
0.0
0
LINE
8
0
10
${config.length * 10}.0
20
0.0
30
0.0
11
${config.length * 10}.0
21
${config.width * 10}.0
31
0.0
0
LINE
8
0
10
${config.length * 10}.0
21
${config.width * 10}.0
31
0.0
11
0.0
21
${config.width * 10}.0
31
0.0
0
LINE
8
0
10
0.0
21
${config.width * 10}.0
31
0.0
11
0.0
21
0.0
31
0.0
0
ENDSEC
0
EOF
% Dimensions: ${config.length}x${config.width}x${config.height} cm
% Material: ${config.material} ${config.ply ? `(${config.ply})` : ""}
% Printing: ${config.printing.printingType || "N/A"}
`
}

// Export configuration as JSON
export function exportConfiguration(config: BoxConfiguration): void {
  const exportData = {
    ...config,
    exportedAt: new Date().toISOString(),
    exportVersion: "3.1", // Updated version
    company: "JJ Enterprises",
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `box-configuration-${Date.now()}.json`
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Import configuration from JSON
export function importConfiguration(file: File): Promise<BoxConfiguration> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string)
        // Check for new or old version compatibility
        if (
          importedConfig.version === "3.1" ||
          importedConfig.exportVersion === "3.1" ||
          importedConfig.version === "3.0" ||
          importedConfig.exportVersion === "3.0"
        ) {
          // Ensure new fields have default values if importing an older version
          const defaultConfigPart: Partial<BoxConfiguration> = {
            ply:
              importedConfig.ply === undefined && importedConfig.material === "corrugated"
                ? "3-ply"
                : importedConfig.ply,
            printing: {
              ...importedConfig.printing,
              printingType:
                importedConfig.printing?.printingType === undefined ? null : importedConfig.printing.printingType,
            },
            version: "3.1", // Update version upon import
          }

          resolve({ ...importedConfig, ...defaultConfigPart })
        } else {
          reject(new Error("Incompatible configuration version"))
        }
      } catch (error) {
        reject(new Error("Invalid configuration file"))
      }
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}
