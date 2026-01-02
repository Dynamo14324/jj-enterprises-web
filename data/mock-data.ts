import type { LegacyProduct as Product, Service, Resource, FaqItem, TeamMember, PressRelease } from "@/lib/types"
import {
  Package,
  ShoppingCart,
  Cpu,
  Leaf,
  Microscope,
  Users,
  FileText,
  CalculatorIcon,
  BookOpen,
  DownloadCloud,
  ShieldCheck,
  Truck,
  Award,
  Lightbulb,
  Users2,
  MessageSquare,
} from "lucide-react"

export const allProducts: Product[] = [
  // Corrugated
  {
    id: "corr-001",
    name: "Standard Corrugated Shipper",
    category: "Corrugated Shipping Boxes",
    description: "Versatile and reliable for everyday shipping needs.",
    longDescription:
      "Our standard corrugated shipper boxes are made from high-quality, durable cardboard, perfect for a wide range of products. Available in various sizes and strengths.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Std+Shipper",
    slug: "/products/corrugated/standard-shipper",
    features: ["Single/Double Wall Options", "Recyclable Materials", "Easy Assembly"],
    tags: ["best-seller"],
  },
  {
    id: "corr-002",
    name: "Heavy-Duty Corrugated Box",
    category: "Corrugated Shipping Boxes",
    description: "Extra strength for heavy or fragile items.",
    longDescription:
      "Designed for maximum protection, these boxes withstand tough shipping conditions. Ideal for industrial parts, electronics, or bulk items.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Heavy+Duty",
    slug: "/products/corrugated/heavy-duty-box",
    features: ["Triple Wall Available", "High Stacking Strength", "Customizable"],
    tags: ["industrial"],
  },

  // Luxury Gift Boxes
  {
    id: "lux-001",
    name: "Premium Magnetic Closure Box",
    category: "Luxury Gift Boxes",
    description: "Elegant rigid box with a secure magnetic closure.",
    longDescription:
      "Create an unforgettable unboxing experience with our premium magnetic closure boxes. Perfect for high-end retail, corporate gifts, and special occasions.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Magnetic+Box",
    slug: "/products/luxury-rigid/magnetic-box",
    features: ["Rigid Construction", "Variety of Finishes", "Custom Inserts"],
    tags: ["luxury", "best-seller"],
  },
  {
    id: "lux-002",
    name: "Collapsible Rigid Box",
    category: "Luxury Gift Boxes",
    description: "Luxury feel, ships flat for space saving.",
    longDescription:
      "Combines the premium appeal of rigid boxes with the convenience of flat-shipping. Easy to assemble and ideal for e-commerce luxury goods.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Collapsible+Rigid",
    slug: "/products/luxury-rigid/collapsible-box",
    features: ["Ships Flat", "Quick Assembly", "Premium Look"],
    tags: ["luxury", "e-commerce"],
  },

  // Pharmaceutical Packaging
  {
    id: "pharma-001",
    name: "Child-Resistant Pharma Carton",
    category: "Pharmaceutical Packaging",
    description: "Secure and compliant packaging for medications.",
    longDescription:
      "Our child-resistant cartons meet stringent safety standards while providing clear branding and information space. Suitable for pills, vials, and medical devices.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=CR+Carton",
    slug: "/products/pharma/child-resistant-carton",
    features: ["Certified CR Mechanisms", "Tamper-Evident Options", "Braille Embossing"],
    tags: ["safety", "medical"],
  },
  {
    id: "pharma-002",
    name: "Temperature-Controlled Shipper",
    category: "Pharmaceutical Packaging",
    description: "Insulated packaging for temperature-sensitive drugs.",
    longDescription:
      "Maintain the integrity of your temperature-sensitive pharmaceuticals during transit with our validated insulated shippers. Various temperature ranges and durations available.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Cold+Chain",
    slug: "/products/pharma/temp-controlled-shipper",
    features: ["Validated Thermal Performance", "Reusable Options", "Data Logger Integration"],
    tags: ["cold-chain", "medical"],
  },

  // Food-Grade Boxes
  {
    id: "food-001",
    name: "Food-Safe Bakery Box",
    category: "Food-Grade Boxes",
    description: "Attractive and safe packaging for baked goods.",
    longDescription:
      "Showcase your delicious treats with our food-safe bakery boxes. Available with windows, inserts, and custom printing to enhance your brand.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Bakery+Box",
    slug: "/products/food-packaging/bakery-box",
    features: ["FDA-Compliant Materials", "Grease-Resistant Coatings", "Clear Windows"],
    tags: ["food", "bakery"],
  },
  {
    id: "food-002",
    name: "Eco-Friendly Takeout Container",
    category: "Food-Grade Boxes",
    description: "Sustainable containers for food delivery and takeout.",
    longDescription:
      "Our eco-friendly takeout containers are made from compostable or recyclable materials, offering a green alternative without sacrificing performance. Ideal for restaurants and caterers.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Eco+Takeout",
    slug: "/products/food-packaging/eco-takeout",
    features: ["Compostable/Recyclable", "Leak-Resistant", "Microwavable Options"],
    tags: ["food", "eco-friendly", "takeout"],
  },

  // Folding Cartons
  {
    id: "fold-001",
    name: "Custom Printed Folding Carton",
    category: "Folding Cartons",
    description: "Versatile and cost-effective retail packaging.",
    longDescription:
      "Folding cartons are perfect for a wide array of retail products, from cosmetics to consumer goods. We offer full customization in size, shape, printing, and finishes.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Folding+Carton",
    slug: "/products/folding-cartons/custom-carton",
    features: ["High-Quality Printing", "Various Board Types", "Special Finishes (Foil, Emboss)"],
    tags: ["retail", "customizable"],
  },
  {
    id: "fold-002",
    name: "Software Box Style Carton",
    category: "Folding Cartons",
    description: "Classic retail box for software, games, or kits.",
    longDescription:
      "This iconic box style offers ample space for branding and product information. Durable construction protects contents while providing excellent shelf presence.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Software+Box",
    slug: "/products/folding-cartons/software-box",
    features: ["Sturdy Paperboard", "Optional Inserts", "Hanging Tabs"],
    tags: ["retail", "electronics"],
  },

  // E-commerce Mailers
  {
    id: "ecom-001",
    name: "Durable Poly Mailer",
    category: "E-commerce Mailers",
    description: "Lightweight, tear-proof, and water-resistant mailers.",
    longDescription:
      "Ideal for shipping apparel, soft goods, and non-fragile items. Our poly mailers are strong, secure, and can be custom printed with your branding.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Poly+Mailer",
    slug: "/products/ecommerce-packaging/poly-mailer",
    features: ["Self-Sealing Adhesive Strip", "Puncture-Resistant", "Custom Printing"],
    tags: ["e-commerce", "apparel"],
  },
  {
    id: "ecom-002",
    name: "Corrugated E-commerce Mailer Box",
    category: "E-commerce Mailers",
    description: "Protective and brandable boxes for online shipping.",
    longDescription:
      "Our corrugated mailer boxes offer superior protection for a variety of products shipped via e-commerce. Easy to assemble and customize for a great unboxing experience.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Mailer+Box",
    slug: "/products/ecommerce-packaging/mailer-box",
    features: ["Various Styles (Roll End Tuck Top, etc.)", "Internal Printing Options", "Easy-Open Tear Strips"],
    tags: ["e-commerce", "best-seller", "customizable"],
  },

  // Custom Design (Examples)
  {
    id: "cd-001",
    name: "Bespoke Product Launch Kit",
    category: "Custom Design Solutions",
    description: "Unique kit designed for a new product unveiling.",
    longDescription:
      "We collaborated with a tech client to create a multi-component launch kit featuring custom foam, interactive elements, and premium printing, resulting in a memorable brand experience.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Launch+Kit",
    slug: "/products/custom-design/launch-kit-example",
    features: ["Multi-Material Construction", "Interactive Elements", "Brand Storytelling"],
    tags: ["custom", "promotional"],
  },

  // Eco-Friendly Options
  {
    id: "eco-001",
    name: "Plantable Seed Paper Packaging",
    category: "Eco-Friendly Options",
    description: "Packaging that grows into flowers or herbs.",
    longDescription:
      "Make a lasting impression with our innovative seed paper packaging. Embedded with seeds, this paper can be planted after use, promoting sustainability and brand recall.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Seed+Paper",
    slug: "/products/eco-friendly/seed-paper",
    features: ["Biodegradable", "Variety of Seeds", "Printable"],
    tags: ["eco-friendly", "innovative"],
  },
  {
    id: "eco-002",
    name: "Molded Pulp Inserts",
    category: "Eco-Friendly Options",
    description: "Sustainable alternative to foam or plastic inserts.",
    longDescription:
      "Made from recycled paper or plant fibers, molded pulp inserts offer excellent protection and are fully recyclable and biodegradable. Custom molded to fit your products.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Molded+Pulp",
    slug: "/products/eco-friendly/molded-pulp",
    features: ["Recycled/Renewable Materials", "Custom Shapes", "Shock Absorbent"],
    tags: ["eco-friendly", "protective"],
  },
]

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter((product) => product.category === category)
}
export const getProductsByTag = (tag: string): Product[] => {
  return allProducts.filter((product) => product.tags?.includes(tag))
}

export const popularProducts = {
  "Corrugated Shipping Boxes": allProducts
    .filter((p) => p.category === "Corrugated Shipping Boxes" && p.tags?.includes("best-seller"))
    .slice(0, 4),
  "Luxury Gift Boxes": allProducts
    .filter((p) => p.category === "Luxury Gift Boxes" && p.tags?.includes("luxury"))
    .slice(0, 4),
  "E-commerce Mailers": allProducts
    .filter((p) => p.category === "E-commerce Mailers" && p.tags?.includes("e-commerce"))
    .slice(0, 4),
}

export const services: Service[] = [
  {
    id: "serv-design",
    name: "Custom Design & Prototyping",
    slug: "/services/design",
    icon: Package,
    description: "Transform your vision into tangible packaging with our expert design and rapid prototyping services.",
    longDescription:
      "Our award-winning design team works closely with you to understand your brand, product, and market. We utilize the latest software for 3D modeling and visualization, followed by physical prototypes to ensure perfect form, fit, and function before full production.",
    benefits: ["Unique Brand Identity", "Optimized Product Protection", "Faster Time-to-Market"],
    processSteps: [
      { title: "Consultation & Briefing", description: "Understanding your needs and goals.", icon: MessageSquare },
      { title: "Concept Development", description: "Creating initial design ideas and sketches.", icon: Lightbulb },
      { title: "3D Rendering & Virtual Mockups", description: "Visualizing the design digitally.", icon: Cpu },
      { title: "Prototyping & Testing", description: "Creating physical samples for approval.", icon: Package },
    ],
    imageUrl: "/placeholder.svg?width=500&height=350&text=Custom+Design+Process",
  },
  {
    id: "serv-bulk",
    name: "Bulk & Contract Manufacturing",
    slug: "/services/bulk-orders",
    icon: ShoppingCart,
    description: "Reliable, high-volume packaging production with stringent quality control and efficient logistics.",
    longDescription:
      "Leverage our state-of-the-art manufacturing facilities for your large-scale packaging needs. We offer competitive pricing, consistent quality, and on-time delivery for contract manufacturing, ensuring your supply chain runs smoothly.",
    benefits: ["Cost-Effective at Scale", "Consistent Quality Assurance", "Reliable Supply Chain"],
    processSteps: [
      { title: "Requirement Analysis", description: "Defining volume, specifications, and timelines.", icon: FileText },
      { title: "Production Planning", description: "Optimizing workflow for efficiency.", icon: Cpu },
      { title: "Manufacturing & QC", description: "High-speed production with quality checks.", icon: ShieldCheck },
      { title: "Logistics & Delivery", description: "Ensuring timely and safe delivery.", icon: Truck },
    ],
    imageUrl: "/placeholder.svg?width=500&height=350&text=Bulk+Manufacturing",
  },
  {
    id: "serv-testing",
    name: "Quality & Compliance Testing",
    slug: "/services/testing",
    icon: Microscope,
    description:
      "Comprehensive testing services to ensure your packaging meets performance, safety, and regulatory standards.",
    longDescription:
      "We provide a suite of testing services, including ISTA transit testing, material strength analysis, and compliance checks for various industry regulations (e.g., food-grade, pharmaceutical). Ensure your packaging is fit-for-purpose and meets all necessary requirements.",
    benefits: ["Reduced Product Damage", "Regulatory Compliance", "Enhanced Customer Trust"],
    processSteps: [
      {
        title: "Test Protocol Design",
        description: "Defining the appropriate tests for your product.",
        icon: FileText,
      },
      { title: "Material & Structural Analysis", description: "Testing strength and durability.", icon: Microscope },
      { title: "Transit Simulation (ISTA)", description: "Simulating real-world shipping conditions.", icon: Truck },
      {
        title: "Reporting & Certification",
        description: "Providing detailed results and compliance documents.",
        icon: Award,
      },
    ],
    imageUrl: "/placeholder.svg?width=500&height=350&text=Quality+Testing",
  },
  {
    id: "serv-sourcing",
    name: "Sustainable Sourcing & Materials",
    slug: "/services/sustainability",
    icon: Leaf,
    description:
      "Expert guidance on eco-friendly materials and sustainable packaging practices to meet your green goals.",
    longDescription:
      "Navigate the complex world of sustainable packaging with our help. We offer a wide range of eco-friendly materials, including recycled content, compostable options, and responsibly sourced paper. Our team can help you design packaging that minimizes environmental impact without compromising performance.",
    benefits: [
      "Reduced Environmental Footprint",
      "Enhanced Brand Reputation",
      "Meet Consumer Demand for Sustainability",
    ],
    processSteps: [
      { title: "Sustainability Audit", description: "Assessing your current packaging impact.", icon: BookOpen },
      { title: "Material Recommendation", description: "Suggesting suitable eco-friendly alternatives.", icon: Leaf },
      {
        title: "Life Cycle Assessment (LCA) Insights",
        description: "Understanding the full environmental impact.",
        icon: Cpu,
      },
      {
        title: "Implementation Support",
        description: "Helping you transition to sustainable solutions.",
        icon: Users2,
      },
    ],
    imageUrl: "/placeholder.svg?width=500&height=350&text=Sustainable+Sourcing",
  },
  {
    id: "serv-consultation",
    name: "Packaging Consultation & Optimization",
    slug: "/services/consultation",
    icon: Users,
    description: "Strategic advice from packaging experts to improve efficiency, reduce costs, and enhance your brand.",
    longDescription:
      "Our experienced consultants provide in-depth analysis of your current packaging operations. We identify areas for improvement, from material selection and design optimization to supply chain efficiency and cost reduction, helping you achieve your business objectives through smarter packaging.",
    benefits: ["Cost Savings", "Improved Operational Efficiency", "Strategic Packaging Roadmap"],
    processSteps: [
      { title: "Discovery Session", description: "Understanding your challenges and objectives.", icon: MessageSquare },
      { title: "Packaging Audit & Analysis", description: "Evaluating your current solutions.", icon: FileText },
      { title: "Strategy Development", description: "Creating a tailored optimization plan.", icon: Lightbulb },
      { title: "Implementation & Review", description: "Supporting changes and measuring success.", icon: Users2 },
    ],
    imageUrl: "/placeholder.svg?width=500&height=350&text=Packaging+Consultation",
  },
]

export const resources: Resource[] = [
  {
    id: "res-guides",
    title: "Ultimate Packaging Design Guide",
    type: "guide",
    slug: "/resources/guides",
    icon: BookOpen,
    description: "A comprehensive guide to creating impactful and effective packaging designs.",
    longDescription:
      "Learn about design principles, material choices, printing techniques, and sustainability considerations to make your packaging stand out. Includes checklists and expert tips.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Design+Guide",
    downloadUrl: "/downloads/packaging-design-guide.pdf",
    datePublished: "2024-05-15",
    author: "JJ Enterprises Team",
  },
  {
    id: "res-calculator",
    title: "Interactive Box Size Calculator",
    type: "calculator",
    slug: "/resources/calculator",
    icon: CalculatorIcon,
    description: "Easily determine the optimal dimensions for your custom boxes based on product size.",
    longDescription:
      "Our interactive tool helps you find the perfect internal and external dimensions for your boxes, minimizing waste and ensuring a snug fit. (Note: This is a conceptual resource, actual calculator functionality would need implementation).",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Box+Calculator",
  },
  {
    id: "res-catalog",
    title: "JJ Enterprises Product Catalog 2025",
    type: "catalog",
    slug: "/resources/catalog",
    icon: DownloadCloud,
    description: "Download our latest catalog featuring our full range of packaging solutions and services.",
    longDescription:
      "Browse detailed information on all our standard products, custom capabilities, and innovative solutions. Available in PDF format for your convenience.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Product+Catalog",
    downloadUrl: "/downloads/jj-enterprises-catalog-2025.pdf",
  },
  {
    id: "res-casestudies",
    title: "Case Study: Eco-Friendly Retail Transformation",
    type: "case-study",
    slug: "/resources/case-studies/eco-retail",
    icon: FileText,
    description: "How we helped a major retailer transition to sustainable packaging, reducing waste by 30%.",
    longDescription:
      "This case study details the challenges, solutions, and impressive results of a partnership focused on implementing eco-friendly packaging across a diverse product line. Learn about material choices, supply chain adjustments, and consumer reception.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Case+Study+Eco",
    datePublished: "2024-03-20",
  },
]

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    category: "Ordering",
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQs vary depending on the product type and customization. For standard items, it can be as low as 100 units. For highly custom projects, it might be higher. Please contact us for a specific quote.",
  },
  {
    id: "faq-2",
    category: "Ordering",
    question: "How long does it take to receive my order?",
    answer:
      "Lead times depend on the complexity and quantity. Standard orders typically ship within 7-10 business days. Custom orders may take 3-6 weeks after design approval. We will provide an estimated delivery date with your quote.",
  },
  {
    id: "faq-3",
    category: "Customization",
    question: "Can I get a sample before placing a bulk order?",
    answer:
      "Yes, we offer prototyping and sample services. For custom designs, a prototype is usually part of the process. There might be a nominal fee for samples, which is often credited upon placing a bulk order.",
  },
  {
    id: "faq-4",
    category: "Customization",
    question: "What artwork file formats do you accept?",
    answer:
      "We prefer vector files such as .AI, .EPS, or .PDF. High-resolution .PSD or .TIFF files may also be acceptable. Our design team can assist if you have questions about your artwork.",
  },
  {
    id: "faq-5",
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and times will vary based on the destination. Please contact us for international shipping inquiries.",
  },
  {
    id: "faq-6",
    category: "Sustainability",
    question: "What eco-friendly packaging options do you offer?",
    answer:
      "We offer a wide range of sustainable options, including recycled materials (PCR content), FSC-certified paper, compostable plastics, biodegradable materials, and innovative solutions like seed paper or mushroom packaging. Visit our Eco-Friendly Options page or contact us to learn more.",
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "Jane Doe",
    role: "CEO & Founder",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Jane+Doe",
    bio: "Jane founded JJ Enterprises with a vision to revolutionize the packaging industry through innovation and sustainability. With over 20 years of experience, she leads the company with passion and strategic insight.",
  },
  {
    id: "tm-2",
    name: "John Smith",
    role: "Head of Design",
    imageUrl: "/placeholder.svg?width=300&height=300&text=John+Smith",
    bio: "John is an award-winning designer who heads our creative team. He believes that packaging is a critical brand touchpoint and strives to create solutions that are both beautiful and functional.",
  },
  {
    id: "tm-3",
    name: "Alice Brown",
    role: "VP of Operations",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Alice+Brown",
    bio: "Alice oversees all manufacturing and logistical operations, ensuring quality and efficiency. Her expertise in supply chain management is key to our reliable service.",
  },
  {
    id: "tm-4",
    name: "Bob Green",
    role: "Director of Sustainability",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Bob+Green",
    bio: "Bob is dedicated to advancing our environmental initiatives. He works on sourcing sustainable materials and implementing eco-friendly practices throughout our operations.",
  },
]

export const pressReleases: PressRelease[] = [
  {
    id: "pr-1",
    title: "JJ Enterprises Launches New Line of Compostable Mailers",
    date: "2024-06-15",
    summary:
      "Responding to growing demand for sustainable e-commerce solutions, JJ Enterprises today announced a new range of certified compostable mailers.",
    slug: "/press/compostable-mailers-launch",
  },
  {
    id: "pr-2",
    title: 'JJ Enterprises Wins "Packaging Innovator of the Year" Award',
    date: "2024-04-22",
    summary:
      "JJ Enterprises was recognized for its groundbreaking work in smart packaging technology at the Annual Packaging Excellence Awards.",
    slug: "/press/innovator-award-2024",
  },
  {
    id: "pr-3",
    title: "New Partnership to Expand JJ Enterprises' Reach in Europe",
    date: "2024-02-10",
    summary:
      "JJ Enterprises has partnered with EuroPack Solutions to distribute its innovative packaging products across the European market.",
    slug: "/press/european-partnership",
  },
]

// ... add more mock data for other sections as needed
