// PDF generation utilities for cart and configurations

import type { CartState } from "./cart-utils"

export interface QuoteRequest {
  customerInfo: {
    name: string
    email: string
    phone: string
    company?: string
    industry?: string
  }
  cart: CartState
  requirements?: string
  urgentDelivery?: boolean
  preferredContact?: "email" | "phone" | "whatsapp"
  submittedAt: Date
}

export const generateCartPDF = (cart: CartState, customerInfo?: any): string => {
  // Generate PDF content as HTML string that can be converted to PDF
  const currentDate = new Date().toLocaleDateString("en-IN")
  const quoteId = `JJ-${Date.now()}`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>JJ Enterprises - Product Quote Request</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
        .header { background: linear-gradient(135deg, #f97316, #f59e0b); color: white; padding: 30px; text-align: center; margin-bottom: 30px; }
        .company-logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .quote-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .quote-info h2 { margin-top: 0; color: #f97316; }
        .customer-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .info-section { background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
        .products-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .products-table th, .products-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .products-table th { background: #f97316; color: white; font-weight: bold; }
        .product-image { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
        .total-section { background: #f97316; color: white; padding: 20px; border-radius: 8px; text-align: right; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #f97316; text-align: center; }
        .contact-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px; }
        .contact-item { text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .specifications { font-size: 12px; color: #666; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-logo">JJ ENTERPRISES</div>
        <div>Premium Paper Packaging Solutions</div>
        <div style="font-size: 14px; margin-top: 10px;">Mumbai, Maharashtra | ISO 9001:2015 Certified</div>
    </div>

    <div class="quote-info">
        <h2>Product Quote Request</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            <div><strong>Quote ID:</strong> ${quoteId}</div>
            <div><strong>Date:</strong> ${currentDate}</div>
            <div><strong>Total Items:</strong> ${cart.totalItems}</div>
        </div>
    </div>

    ${
      customerInfo
        ? `
    <div class="customer-info">
        <div class="info-section">
            <h3 style="margin-top: 0; color: #f97316;">Customer Information</h3>
            <p><strong>Name:</strong> ${customerInfo.name || "N/A"}</p>
            <p><strong>Email:</strong> ${customerInfo.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${customerInfo.phone || "N/A"}</p>
            <p><strong>Company:</strong> ${customerInfo.company || "N/A"}</p>
        </div>
        <div class="info-section">
            <h3 style="margin-top: 0; color: #f97316;">Request Details</h3>
            <p><strong>Industry:</strong> ${customerInfo.industry || "N/A"}</p>
            <p><strong>Preferred Contact:</strong> ${customerInfo.preferredContact || "Email"}</p>
            <p><strong>Urgent Delivery:</strong> ${customerInfo.urgentDelivery ? "Yes" : "No"}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString("en-IN")}</p>
        </div>
    </div>
    `
        : ""
    }

    <h3 style="color: #f97316; margin-bottom: 20px;">Selected Products</h3>
    <table class="products-table">
        <thead>
            <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Specifications</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${cart.items
              .map(
                (item) => `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div>
                                <strong>${item.name}</strong>
                                <div style="font-size: 12px; color: #666; margin-top: 4px;">Added: ${new Date(item.addedAt).toLocaleDateString("en-IN")}</div>
                            </div>
                        </div>
                    </td>
                    <td>${item.sku}</td>
                    <td>${item.category}</td>
                    <td class="specifications">
                        ${
                          item.specifications
                            ? Object.entries(item.specifications)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join("<br>")
                            : "Standard"
                        }
                        ${
                          item.customizations
                            ? "<br><strong>Customizations:</strong><br>" +
                              Object.entries(item.customizations)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join("<br>")
                            : ""
                        }
                    </td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>₹${(Number.parseFloat(item.price.replace("₹", "")) * item.quantity).toFixed(2)}</td>
                </tr>
            `,
              )
              .join("")}
        </tbody>
    </table>

    <div class="total-section">
        <h3 style="margin: 0;">Estimated Total: ₹${cart.estimatedTotal.toFixed(2)}</h3>
        <p style="margin: 10px 0 0 0; font-size: 14px;">*Final pricing subject to specifications and quantity confirmation</p>
    </div>

    <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h4 style="margin-top: 0; color: #856404;">Next Steps:</h4>
        <ol style="margin: 0; color: #856404;">
            <li>Our packaging experts will review your requirements</li>
            <li>We'll contact you within 2 hours with a detailed quote</li>
            <li>Free samples available for bulk orders</li>
            <li>Custom design and prototyping services available</li>
        </ol>
    </div>

    <div class="footer">
        <h3 style="color: #f97316;">Contact Information</h3>
        <div class="contact-info">
            <div class="contact-item">
                <strong>📞 Phone</strong><br>
                +91-98192-56432<br>
                <small>24/7 Available</small>
            </div>
            <div class="contact-item">
                <strong>📧 Email</strong><br>
                info@jjenterprises.com<br>
                <small>Response within 2 hours</small>
            </div>
            <div class="contact-item">
                <strong>💬 WhatsApp</strong><br>
                +91-98192-56432<br>
                <small>Instant messaging</small>
            </div>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666;">
            <p>JJ Enterprises - Premium Paper Packaging Solutions | Mumbai, Maharashtra</p>
            <p>ISO 9001:2015 Certified | 15+ Years Experience | 500+ Happy Clients</p>
            <p>This quote is valid for 30 days from the date of generation.</p>
        </div>
    </div>
</body>
</html>
  `

  return htmlContent
}

export const downloadPDF = (htmlContent: string, filename = "jj-enterprises-quote.pdf"): void => {
  // Create a blob with the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)

  // Create download link
  const link = document.createElement("a")
  link.href = url
  link.download = filename.replace(".pdf", ".html") // Download as HTML for now
  link.style.display = "none"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
