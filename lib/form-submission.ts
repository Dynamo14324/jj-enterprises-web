
export interface FormSubmissionData {
  // Customer Information
  name: string
  email: string
  phone: string
  company?: string
  industry?: string

  // Request Details
  products: Array<{
    id: string
    name: string
    category: string
    quantity: number
    specifications?: Record<string, any>
    customizations?: Record<string, any>
  }>

  // Additional Information
  requirements?: string
  timeline?: string
  budget?: string
  urgentDelivery?: boolean
  preferredContact?: "email" | "phone" | "whatsapp"

  // Metadata
  submittedAt: Date
  quoteId: string
  source: string
  estimatedTotal: number
}

export const submitQuoteRequest = async (
  data: FormSubmissionData
): Promise<{ success: boolean; message: string; quoteId: string }> => {
  try {
    // Format data for Excel/CSV export
    const excelData = formatForExcel(data)

    // Format data for email
    const emailData = formatForEmail(data)

    // Simulate API call - In real implementation, this would call your backend
    // For now we'll just log it
    console.log("Submitting quote request:", { excelData, emailData })

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Quote request submitted successfully! We'll contact you within 2 hours.",
      quoteId: data.quoteId,
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: "Failed to submit quote request. Please try again or contact us directly.",
      quoteId: data.quoteId,
    }
  }
}

const formatForExcel = (data: FormSubmissionData): Record<string, any> => {
  return {
    "Quote ID": data.quoteId,
    "Submission Date": data.submittedAt.toLocaleDateString("en-IN"),
    "Submission Time": data.submittedAt.toLocaleTimeString("en-IN"),
    "Customer Name": data.name,
    Email: data.email,
    Phone: data.phone,
    Company: data.company || "N/A",
    Industry: data.industry || "N/A",
    "Products Count": data.products.length,
    "Product Names": data.products.map((p) => p.name).join("; "),
    "Product Categories": [...new Set(data.products.map((p) => p.category))].join("; "),
    "Total Quantity": data.products.reduce((sum, p) => sum + p.quantity, 0),
    "Estimated Total": `₹${data.estimatedTotal.toFixed(2)}`,
    Requirements: data.requirements || "N/A",
    Timeline: data.timeline || "N/A",
    Budget: data.budget || "N/A",
    "Urgent Delivery": data.urgentDelivery ? "Yes" : "No",
    "Preferred Contact": data.preferredContact || "Email",
    Source: data.source,
    Status: "New",
  }
}

const formatForEmail = (data: FormSubmissionData): string => {
  return `
🎯 NEW QUOTE REQUEST - JJ ENTERPRISES

📋 QUOTE DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quote ID: ${data.quoteId}
Date: ${data.submittedAt.toLocaleString("en-IN")}
Source: ${data.source}

👤 CUSTOMER INFORMATION:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || "N/A"}
Industry: ${data.industry || "N/A"}
Preferred Contact: ${data.preferredContact || "Any"}

📦 PRODUCTS REQUESTED (${data.products.length} items):
${data.products
      .map(
        (p, i) => `
  ${i + 1}. ${p.name} (${p.category})
     Quantity: ${p.quantity}
     Specs: ${p.specifications ? JSON.stringify(p.specifications) : "Standard"}
     Customizations: ${p.customizations ? JSON.stringify(p.customizations) : "None"}
`
      )
      .join("")}

💰 ESTIMATED TOTAL: ₹${data.estimatedTotal.toFixed(2)}

📝 ADDITIONAL REQUIREMENTS:
Requirements: ${data.requirements || "None"}
Timeline: ${data.timeline || "Standard"}
Budget: ${data.budget || "Not specified"}
Urgent Delivery: ${data.urgentDelivery ? "Yes" : "No"}
`
}
