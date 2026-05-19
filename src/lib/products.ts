import type { Category, Product } from "@/types/product";

export const categories: Category[] = [
  {
    name: "Audio",
    slug: "audio",
    description: "Premium audio devices built for clear, immersive sound.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Wearables",
    slug: "wearables",
    description: "Smart wearables designed for fitness, travel, and daily use.",
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Workspace",
    slug: "workspace",
    description: "Workspace accessories designed for productivity and comfort.",
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Photography",
    slug: "photography",
    description: "Cameras and accessories built for photography and content creation.",
    image:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Travel essentials designed for convenience and organization.",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"
  }
];

export const products: Product[] = [
  {
    id: "vanta-studio",
    slug: "vanta-studio-headphones",
    name: "Vanta Studio Headphones",
    tagline: "High-quality headphones with clear bass and immersive sound.",
    category: "Audio",
    price: 549,
    originalPrice: 629,
    rating: 4.9,
    reviews: 412,
    description:
      "Vanta Studio blends adaptive noise cancellation, low-distortion carbon drivers, and breathable memory foam into a clean aluminum frame built for long work sessions and late-night listening.",
    features: [
      "40-hour battery with 10-minute quick charge",
      "Adaptive ANC with transparency tuning",
      "Lossless USB-C audio and spatial head tracking"
    ],
    specs: {
      Battery: "40 hours",
      Weight: "278g",
      Driver: "42mm carbon composite",
      Connectivity: "Bluetooth 5.4, USB-C"
    },
    colors: [
      { name: "Graphite", value: "#1d1d22" },
      { name: "Mist", value: "#d7d9dc" },
      { name: "Deep Green", value: "#27342f" }
    ],
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=90"
    ],
    badge: "Best seller",
    stock: 18,
    accent: "#7dd3fc"
  },
  {
    id: "solace-watch",
    slug: "solace-health-watch",
    name: "Solace Health Watch",
    tagline: "A titanium wearable for training, travel, and recovery.",
    category: "Wearables",
    price: 799,
    rating: 4.8,
    reviews: 286,
    description:
      "Solace Health Watch pairs an always-on microLED display with precise location tools, recovery metrics, and a lightweight titanium case made for daily wear.",
    features: [
      "7-day battery in expedition mode",
      "Dual-frequency GPS and emergency beacon",
      "Continuous heart, sleep, oxygen, and recovery insights"
    ],
    specs: {
      Case: "Titanium",
      Display: "MicroLED always-on",
      Water: "100m resistance",
      Sensors: "ECG, SpO2, temperature"
    },
    colors: [
      { name: "Natural Titanium", value: "#c2beb7" },
      { name: "Obsidian", value: "#101014" },
      { name: "Clay", value: "#b88765" }
    ],
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=90"
    ],
    badge: "New",
    stock: 11,
    accent: "#a78bfa"
  },
  {
    id: "nova-lamp",
    slug: "nova-task-lamp",
    name: "Nova Task Lamp",
    tagline: "Modern task lighting designed for work, reading, and late-night projects.",
    category: "Workspace",
    price: 329,
    rating: 4.7,
    reviews: 198,
    description:
      "Nova combines adjustable lighting, touch controls, and a minimal design to create a comfortable workspace setup.",
    features: [
      "Circadian dimming from 2200K to 6500K",
      "Machined aluminum arm with magnetic cable routing",
      "Glare-free ring diffuser with task and ambient modes"
    ],
    specs: {
      Output: "950 lumens",
      Controls: "Touch + app",
      Material: "Aluminum, glass",
      Power: "USB-C PD"
    },
    colors: [
      { name: "Moon", value: "#e9e1d1" },
      { name: "Carbon", value: "#222228" }
    ],
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1400&q=90"
    ],
    stock: 24,
    accent: "#f5c56b"
  },
  {
    id: "prism-camera",
    slug: "prism-one-camera",
    name: "Prism One Camera",
    tagline: "Compact camera with precise optics, optimized for low-light photography.",
    category: "Photography",
    price: 1299,
    rating: 4.9,
    reviews: 144,
    description:
      "Prism One is a compact mirrorless camera with a fast prime lens, 6K open-gate capture, and imaging optimized for low-light photography, travel, and everyday shooting.",
    features: [
      "6K open-gate ProRes capture",
      "Built-in variable ND and 5-axis stabilization",
      "Weather-sealed magnesium body"
    ],
    specs: {
      Sensor: "Super 35",
      Codec: "ProRes, H.265",
      Lens: "32mm f/1.7 equivalent",
      Storage: "CFexpress Type A"
    },
    colors: [
      { name: "Black", value: "#111113" },
      { name: "Silver", value: "#c7c9cc" }
    ],
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1400&q=90"
    ],
    badge: "Limited",
    stock: 7,
    accent: "#f4f0e8"
  },
  {
    id: "transit-folio",
    slug: "transit-tech-folio",
    name: "Transit Tech Folio",
    tagline: "A slim travel organizer for devices, cables, and everyday essentials.",
    category: "Travel",
    price: 189,
    rating: 4.6,
    reviews: 173,
    description:
      "Transit keeps a laptop, tablet, chargers, and travel documents organized in a structured profile with water-resistant woven nylon and a soft microfiber interior.",
    features: [
      "Fits 14-inch laptops and tablets",
      "Hidden magnetic front pocket",
      "Water-resistant recycled nylon shell"
    ],
    specs: {
      Capacity: "5L",
      Laptop: "Up to 14 inches",
      Shell: "Recycled ballistic nylon",
      Lining: "Microfiber"
    },
    colors: [
      { name: "Ink", value: "#171b22" },
      { name: "Stone", value: "#b4afa3" },
      { name: "Sage", value: "#7f8d81" }
    ],
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=90"
    ],
    stock: 31,
    accent: "#b8bdc7"
  },
  {
    id: "cove-speaker",
    slug: "cove-spatial-speaker",
    name: "Cove Spatial Speaker",
    tagline: "Powerful room-filling sound in a compact wireless speaker.",
    category: "Audio",
    price: 429,
    rating: 4.8,
    reviews: 239,
    description:
      "Cove automatically adjusts to your room and delivers balanced, immersive sound from a compact wireless speaker.",
    features: [
      "360-degree acoustic lens",
      "Self-tuning room calibration",
      "Stereo pairing and low-latency TV mode"
    ],
    specs: {
      Output: "120W peak",
      Tweeters: "Dual silk dome",
      Woofer: "4-inch long throw",
      Wireless: "Wi-Fi 6, Bluetooth"
    },
    colors: [
      { name: "Porcelain", value: "#f0ece3" },
      { name: "Basalt", value: "#1f2024" }
    ],
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1400&q=90"
    ],
    stock: 16,
    accent: "#7dd3fc"
  },
  {
    id: "axis-keyboard",
    slug: "axis-low-keyboard",
    name: "Axis Low Keyboard",
    tagline: "Low-profile mechanical keyboard designed for comfort and productivity.",
    category: "Workspace",
    price: 269,
    rating: 4.7,
    reviews: 326,
    description:
      "Axis combines quiet mechanical switches, a durable aluminum body, and customizable controls for everyday work and productivity.",
    features: [
      "Hot-swappable silent tactile switches",
      "Programmable glass command rail",
      "Multi-device wireless with encrypted pairing"
    ],
    specs: {
      Layout: "75%",
      Battery: "2 months",
      Body: "CNC aluminum",
      Switches: "Silent tactile"
    },
    colors: [
      { name: "Graphite", value: "#202026" },
      { name: "Ice", value: "#dadddf" }
    ],
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1595044426077-d36d9236d44a?auto=format&fit=crop&w=1400&q=90"
    ],
    stock: 22,
    accent: "#a78bfa"
  },
  {
    id: "atlas-dock",
    slug: "atlas-desk-dock",
    name: "Atlas Desk Dock",
    tagline: "Minimalist desk hub for charging and organizing cables neatly.",
    category: "Workspace",
    price: 219,
    rating: 4.5,
    reviews: 121,
    description:
      "Minimalist desk hub for charging and organizing cables neatly.",
    features: [
      "Qi2 wireless pad and 100W USB-C pass-through",
      "4K HDMI, SD reader, and dual USB-A",
      "Weighted recycled aluminum base"
    ],
    specs: {
      Charging: "Qi2 + 100W USB-C",
      Ports: "HDMI, SD, USB-A, USB-C",
      Material: "Glass, aluminum",
      Footprint: "8.2 x 3.8 inches"
    },
    colors: [
      { name: "Smoke", value: "#32343a" },
      { name: "Clear", value: "#c7d2dc" }
    ],
    images: [
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=90"
    ],
    badge: "Preorder",
    stock: 15,
    accent: "#f5c56b"
  }
];

export function getProductBySlug(slug: string): Product | undefined {  
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.badge).slice(0, 4);
}


export function getRelatedProducts(product: Product): Product[] {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return [...sameCategory, ...products.filter((item) => item.id !== product.id)]
    .filter(
      (item, index, collection) =>
        collection.findIndex((candidate) => candidate.id === item.id) === index
    )
    .slice(0, 4);
}
