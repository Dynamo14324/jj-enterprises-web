import type React from "react"
import { Settings, Truck } from "lucide-react"

/**
 * Returns a Tailwind CSS color class based on the order status.
 * @param status - The order status string.
 * @returns A string containing Tailwind CSS classes.
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "manufacturing":
      return "text-blue-500"
    case "shipped":
      return "text-green-500"
    default:
      return "text-gray-500"
  }
}

/**
 * Returns an icon component based on the order status.
 * @param status - The order status string.
 * @returns A JSX element representing the status icon or null.
 */
export const getStatusIcon = (status: string): React.ReactNode => {
  const className = "h-4 w-4"
  switch (status.toLowerCase()) {
    case "manufacturing":
      return <Settings className={className} />
    case "shipped":
      return <Truck className={className} />
    default:
      return null
  }
}
