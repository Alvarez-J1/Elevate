import type { Category, Product } from "@/types/product";

export const categories: Category[] = [
  {
    "name": "Audio",
    "slug": "audio",
    "description": "Premium audio devices built for clear, immersive sound.",
    "image": "/products/category-audio.jpg"
  },
  {
    "name": "Wearables",
    "slug": "wearables",
    "description": "Smart wearables designed for fitness, travel, and daily use.",
    "image": "/products/category-wearables.jpg"
  },
  {
    "name": "Photography",
    "slug": "photography",
    "description": "Cameras and accessories built for photography and content creation.",
    "image": "/products/category-photography.jpg"
  },
  {
    "name": "Workspace",
    "slug": "workspace",
    "description": "Workspace accessories designed for productivity and comfort.",
    "image": "/products/category-workspace.jpg"
  },
  {
    "name": "Travel",
    "slug": "travel",
    "description": "Travel essentials designed for convenience and organization.",
    "image": "/products/category-travel.jpg"
  }
];

export const products: Product[] = [
  {
    "id": "vanta-studio",
    "slug": "vanta-studio-headphones",
    "name": "Vanta Studio Headphones",
    "tagline": "Studio headphones with adaptive noise cancellation and balanced, detailed sound.",
    "category": "Audio",
    "price": 549,
    "originalPrice": 629,
    "rating": 4.8,
    "reviews": 412,
    "description": "Vanta Studio blends adaptive noise cancellation, low-distortion carbon drivers, and breathable memory foam into a clean aluminum frame built for long work sessions and late-night listening.",
    "features": [
      "40-hour battery with 10-minute quick charge",
      "Adaptive ANC with transparency tuning",
      "Lossless USB-C audio and spatial head tracking"
    ],
    "specs": {
      "Battery": "40 hours",
      "Weight": "278g",
      "Driver": "42mm carbon composite",
      "Connectivity": "Bluetooth 5.4, USB-C"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#1d1d22"
      },
      {
        "name": "Mist",
        "value": "#d7d9dc"
      },
      {
        "name": "Forest",
        "value": "#27342f"
      }
    ],
    "images": [
      "/products/vanta-studio-primary.png"
    ],
    "badge": "Best Seller",
    "stock": 18,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-001"
  },
  {
    "id": "cove-speaker",
    "slug": "cove-spatial-speaker",
    "name": "Cove Spatial Speaker",
    "tagline": "Room-filling sound in a compact speaker that calibrates to your space.",
    "category": "Audio",
    "price": 429,
    "rating": 4.7,
    "reviews": 239,
    "description": "Cove Spatial Speaker uses self-tuning room calibration and a 360-degree acoustic lens to deliver balanced, immersive sound from a compact wireless body.",
    "features": [
      "360-degree acoustic lens",
      "Self-tuning room calibration",
      "Stereo pairing and low-latency TV mode"
    ],
    "specs": {
      "Output": "120W peak",
      "Tweeters": "Dual silk dome",
      "Woofer": "4-inch long throw",
      "Wireless": "Wi-Fi 6, Bluetooth"
    },
    "colors": [
      {
        "name": "Porcelain",
        "value": "#f0ece3"
      },
      {
        "name": "Basalt",
        "value": "#1f2024"
      }
    ],
    "images": [
      "/products/cove-speaker-primary.png"
    ],
    "stock": 16,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-002"
  },
  {
    "id": "echo-earbuds",
    "slug": "echo-anc-earbuds",
    "name": "Echo ANC Earbuds",
    "tagline": "Compact wireless earbuds with adaptive ANC and clear voice pickup.",
    "category": "Audio",
    "price": 299,
    "rating": 4.6,
    "reviews": 318,
    "description": "Echo ANC Earbuds use pressure-relief vents, six beamforming microphones, and adaptive cancellation to keep calls and music clear on commutes and flights.",
    "features": [
      "Adaptive ANC with transparency mode",
      "Six-mic voice isolation for calls",
      "Pocket case with wireless charging"
    ],
    "specs": {
      "Battery": "8 hours + 24 case",
      "Water": "IPX4",
      "Codec": "AAC, LC3",
      "Charging": "USB-C, Qi"
    },
    "colors": [
      {
        "name": "Sand",
        "value": "#c9b8a0"
      },
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      },
      {
        "name": "Midnight",
        "value": "#121621"
      }
    ],
    "images": [
      "/products/echo-earbuds-primary-v2.png"
    ],
    "badge": "New",
    "stock": 34,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-003"
  },
  {
    "id": "pulse-soundbar",
    "slug": "pulse-soundbar",
    "name": "Pulse Soundbar",
    "tagline": "Low-profile home soundbar tuned for dialog, music, and cinema.",
    "category": "Audio",
    "price": 699,
    "rating": 4.6,
    "reviews": 167,
    "description": "Pulse Soundbar combines a center dialog array, side-firing drivers, and automatic room correction in a slim enclosure built for modern living rooms.",
    "features": [
      "Five-driver array with dialog mode",
      "HDMI eARC and optical input",
      "Room tuning with optional rear pairing"
    ],
    "specs": {
      "Output": "280W peak",
      "Channels": "3.1 virtual",
      "Inputs": "HDMI eARC, optical",
      "Wireless": "Wi-Fi, Bluetooth"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/pulse-soundbar-primary.png"
    ],
    "stock": 12,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-004"
  },
  {
    "id": "cove-desktop-speaker",
    "slug": "cove-desktop-speaker",
    "name": "Cove Desktop Speaker",
    "tagline": "Nearfield desktop speaker with balanced sound for focused work.",
    "category": "Audio",
    "price": 249,
    "rating": 4.3,
    "reviews": 94,
    "description": "Cove Desktop Speaker brings a tuned nearfield driver, weighted acoustic base, and simple USB-C audio to compact workstations without crowding the desk.",
    "features": [
      "Nearfield tuning for desk listening",
      "Weighted base with vibration control",
      "USB-C audio and Bluetooth pairing"
    ],
    "specs": {
      "Output": "60W peak",
      "Driver": "3-inch full range",
      "Inputs": "USB-C, Bluetooth",
      "Footprint": "4.2 x 4.2 inches"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/cove-desktop-speaker-primary.png"
    ],
    "stock": 28,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-005"
  },
  {
    "id": "pulse-home-speaker",
    "slug": "pulse-home-speaker",
    "name": "Pulse Home Speaker",
    "tagline": "Wireless home speaker with deep bass and room-aware tuning.",
    "category": "Audio",
    "price": 579,
    "rating": 4.7,
    "reviews": 201,
    "description": "Pulse Home Speaker fills larger rooms with a dual-driver array, adaptive bass control, and multi-room pairing that stays simple to set up.",
    "features": [
      "Room-aware tuning with bass control",
      "Multi-room pairing with low latency",
      "Capacitive controls with privacy mute"
    ],
    "specs": {
      "Output": "180W peak",
      "Drivers": "Dual woofer, dual tweeter",
      "Wireless": "Wi-Fi 6, Bluetooth",
      "Controls": "Touch and app"
    },
    "colors": [
      {
        "name": "Midnight",
        "value": "#121621"
      },
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      }
    ],
    "images": [
      "/products/pulse-home-speaker-primary-v3.png"
    ],
    "badge": "Editor's Pick",
    "stock": 19,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-006"
  },
  {
    "id": "cove-portable-speaker",
    "slug": "cove-portable-speaker",
    "name": "Cove Portable Speaker",
    "tagline": "Compact wireless speaker with weather resistance and all-day battery.",
    "category": "Audio",
    "price": 279,
    "rating": 4.4,
    "reviews": 142,
    "description": "Cove Portable Speaker brings balanced outdoor sound to desks, hotel rooms, and weekend bags with a reinforced shell, passive radiator, and simple USB-C charging.",
    "features": [
      "IP67 dust and water resistance",
      "Passive radiator for fuller low end",
      "Integrated carry loop and USB-C charging"
    ],
    "specs": {
      "Battery": "18 hours",
      "Water": "IP67",
      "Output": "35W peak",
      "Charging": "USB-C"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/cove-portable-speaker-primary.png"
    ],
    "stock": 25,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-007"
  },
  {
    "id": "vanta-max",
    "slug": "vanta-max-headphones",
    "name": "Vanta Max Headphones",
    "tagline": "Over-ear wireless headphones with extended battery and wide staging.",
    "category": "Audio",
    "price": 649,
    "rating": 4.8,
    "reviews": 188,
    "description": "Vanta Max expands the Vanta headphone platform with larger drivers, stronger isolation, and a wider soundstage for travel, mixing, and deep listening.",
    "features": [
      "52-hour battery with rapid USB-C charging",
      "Large chamber carbon composite drivers",
      "Adaptive ANC with pressure balancing"
    ],
    "specs": {
      "Battery": "52 hours",
      "Weight": "302g",
      "Driver": "46mm carbon composite",
      "Connectivity": "Bluetooth 5.4, USB-C"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/vanta-max-primary-v2.png"
    ],
    "badge": "Limited",
    "stock": 9,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-008"
  },
  {
    "id": "vanta-dac-amp",
    "slug": "vanta-dac-amp",
    "name": "Vanta DAC Amp",
    "tagline": "Desktop DAC and headphone amplifier for detailed wired listening.",
    "category": "Audio",
    "price": 349,
    "rating": 4.6,
    "reviews": 128,
    "description": "Vanta DAC Amp brings high-resolution decoding, a low-noise headphone stage, and a machined volume dial to desks where precise wired listening matters.",
    "features": [
      "32-bit decoding up to 768kHz",
      "Balanced and single-ended headphone outputs",
      "Machined volume dial with stepped gain"
    ],
    "specs": {
      "DAC": "Dual 32-bit converters",
      "Outputs": "4.4mm balanced, 3.5mm",
      "Inputs": "USB-C, optical",
      "Material": "Aluminum"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/vanta-dac-amp-primary.png"
    ],
    "stock": 21,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-009"
  },
  {
    "id": "pulse-wireless-turntable",
    "slug": "pulse-wireless-turntable",
    "name": "Pulse Wireless Turntable",
    "tagline": "Belt-drive turntable with wireless streaming and precise tracking.",
    "category": "Audio",
    "price": 499,
    "rating": 4.5,
    "reviews": 87,
    "description": "Pulse Wireless Turntable pairs a damped belt-drive platter and factory-aligned cartridge with lossless wireless streaming to Cove, Pulse, and Vanta audio products.",
    "features": [
      "Damped belt drive with 33 and 45 RPM",
      "Lossless wireless pairing with Elevate audio",
      "Factory-aligned moving magnet cartridge"
    ],
    "specs": {
      "Drive": "Belt drive",
      "Speeds": "33 1/3, 45 RPM",
      "Wireless": "Low-latency audio link",
      "Cartridge": "Moving magnet"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Walnut",
        "value": "#6b4a32"
      }
    ],
    "images": [
      "/products/pulse-wireless-turntable-primary-v3.png"
    ],
    "badge": "New",
    "stock": 13,
    "accent": "#7dd3fc",
    "sku": "ELV-AUD-010"
  },
  {
    "id": "solace-watch",
    "slug": "solace-watch",
    "name": "Solace Watch",
    "tagline": "Titanium smartwatch for training, travel, and recovery.",
    "category": "Wearables",
    "price": 799,
    "rating": 4.7,
    "reviews": 286,
    "description": "Solace Watch pairs an always-on microLED display with dual-frequency GPS, recovery metrics, and a lightweight titanium case built for daily wear.",
    "features": [
      "7-day battery in expedition mode",
      "Dual-frequency GPS and emergency beacon",
      "Continuous heart, sleep, oxygen, and recovery insights"
    ],
    "specs": {
      "Case": "Titanium",
      "Display": "MicroLED always-on",
      "Water": "100m resistance",
      "Sensors": "ECG, SpO2, temperature"
    },
    "colors": [
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      },
      {
        "name": "Midnight",
        "value": "#101014"
      },
      {
        "name": "Forest",
        "value": "#27342f"
      }
    ],
    "images": [
      "/products/solace-watch-primary-v2.png"
    ],
    "badge": "New",
    "stock": 11,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-001"
  },
  {
    "id": "solace-fitness-band",
    "slug": "solace-fitness-band",
    "name": "Solace Fitness Band",
    "tagline": "Lightweight fitness band for training, sleep, and daily recovery.",
    "category": "Wearables",
    "price": 179,
    "rating": 4.4,
    "reviews": 214,
    "description": "Solace Fitness Band tracks heart rate, sleep stages, oxygen trends, and workout strain in a slim band designed for comfortable 24-hour wear.",
    "features": [
      "Continuous heart rate and sleep tracking",
      "Workout strain and recovery score",
      "Seven-day battery in a slim profile"
    ],
    "specs": {
      "Battery": "7 days",
      "Water": "50m resistance",
      "Sensors": "HR, SpO2, temperature",
      "Weight": "22g"
    },
    "colors": [
      {
        "name": "Midnight",
        "value": "#121621"
      },
      {
        "name": "Sand",
        "value": "#c9b8a0"
      },
      {
        "name": "Forest",
        "value": "#27342f"
      }
    ],
    "images": [
      "/products/solace-fitness-band-primary.png"
    ],
    "stock": 38,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-002"
  },
  {
    "id": "orbit-health-ring",
    "slug": "orbit-health-ring",
    "name": "Orbit Health Ring",
    "tagline": "Titanium smart ring for sleep, readiness, and quiet health tracking.",
    "category": "Wearables",
    "price": 329,
    "rating": 4.5,
    "reviews": 156,
    "description": "Orbit Health Ring captures sleep quality, temperature trends, activity, and readiness in a low-profile titanium band with no screen or distractions.",
    "features": [
      "Sleep, temperature, and readiness tracking",
      "Titanium shell with ceramic inner band",
      "Charging case for travel"
    ],
    "specs": {
      "Battery": "6 days",
      "Material": "Titanium, ceramic",
      "Water": "100m resistance",
      "Sizes": "6-13"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/orbit-health-ring-primary.png"
    ],
    "stock": 23,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-003"
  },
  {
    "id": "solace-recovery-band",
    "slug": "solace-recovery-band",
    "name": "Solace Recovery Band",
    "tagline": "Minimal recovery band with ECG readings and guided breathing tools.",
    "category": "Wearables",
    "price": 249,
    "rating": 4.7,
    "reviews": 178,
    "description": "Solace Recovery Band combines ECG readings, oxygen trends, guided breathing, and daily readiness insights in a soft-touch aluminum capsule.",
    "features": [
      "On-demand ECG and oxygen trend checks",
      "Guided breathing and recovery prompts",
      "Soft woven band with quick release"
    ],
    "specs": {
      "Battery": "5 days",
      "Display": "Monochrome OLED",
      "Sensors": "ECG, HR, SpO2",
      "Material": "Aluminum"
    },
    "colors": [
      {
        "name": "Sand",
        "value": "#c9b8a0"
      },
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      },
      {
        "name": "Midnight",
        "value": "#121621"
      }
    ],
    "images": [
      "/products/solace-recovery-band-primary.png"
    ],
    "stock": 30,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-004"
  },
  {
    "id": "solace-sport-watch",
    "slug": "solace-sport-watch",
    "name": "Solace Sport Watch",
    "tagline": "Durable sport watch with mapping, training plans, and recovery data.",
    "category": "Wearables",
    "price": 499,
    "rating": 4.3,
    "reviews": 119,
    "description": "Solace Sport Watch adds route mapping, structured workouts, hill pacing, and recovery guidance in a lighter case for runners and cyclists.",
    "features": [
      "Offline maps with route return",
      "Adaptive training plans",
      "Recovery and readiness guidance"
    ],
    "specs": {
      "Battery": "12 days",
      "GPS": "Dual-frequency",
      "Case": "Fiber composite",
      "Water": "100m resistance"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      },
      {
        "name": "Signal Orange",
        "value": "#d9783d"
      }
    ],
    "images": [
      "/products/solace-sport-watch-primary.png"
    ],
    "stock": 21,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-005"
  },
  {
    "id": "vertex-ultra-watch",
    "slug": "vertex-ultra-watch",
    "name": "Vertex Ultra Watch",
    "tagline": "Rugged titanium watch for long trails, diving, and travel.",
    "category": "Wearables",
    "price": 999,
    "rating": 4.8,
    "reviews": 88,
    "description": "Vertex Ultra Watch extends the Solace platform with a reinforced titanium case, brighter display, dive metrics, and multi-day navigation tools.",
    "features": [
      "Sapphire display with night mode",
      "Dive-rated seals and depth app",
      "Extended battery expedition profile"
    ],
    "specs": {
      "Battery": "21 days",
      "Case": "Titanium",
      "Water": "200m resistance",
      "Display": "MicroLED sapphire"
    },
    "colors": [
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      },
      {
        "name": "Midnight",
        "value": "#101014"
      },
      {
        "name": "Forest",
        "value": "#27342f"
      }
    ],
    "images": [
      "/products/vertex-ultra-watch-primary.png"
    ],
    "badge": "Limited",
    "stock": 8,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-006"
  },
  {
    "id": "solace-sleep-tracker",
    "slug": "solace-sleep-tracker",
    "name": "Solace Sleep Tracker",
    "tagline": "Screen-free sleep tracker with temperature and recovery insights.",
    "category": "Wearables",
    "price": 199,
    "rating": 4.5,
    "reviews": 137,
    "description": "Solace Sleep Tracker sits inside a soft wrist band and captures sleep stages, skin temperature, breathing rate, and recovery trends without lighting up the room.",
    "features": [
      "Screen-free sleep and recovery tracking",
      "Temperature and breathing trends",
      "Soft washable band"
    ],
    "specs": {
      "Battery": "10 nights",
      "Sensors": "Motion, temperature, HR",
      "Water": "Splash resistant",
      "Weight": "18g"
    },
    "colors": [
      {
        "name": "Moon",
        "value": "#e9e1d1"
      },
      {
        "name": "Midnight",
        "value": "#121621"
      }
    ],
    "images": [
      "/products/solace-sleep-tracker-primary.png"
    ],
    "stock": 41,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-007"
  },
  {
    "id": "orbit-smart-ring",
    "slug": "orbit-smart-ring",
    "name": "Orbit Smart Ring",
    "tagline": "Ceramic smart ring for activity, sleep, and discreet notifications.",
    "category": "Wearables",
    "price": 299,
    "rating": 4.7,
    "reviews": 102,
    "description": "Orbit Smart Ring adds activity tracking, sleep insights, and discreet notification taps to a ceramic band designed for all-day wear.",
    "features": [
      "Activity, sleep, and readiness tracking",
      "Subtle haptic reminders",
      "Scratch-resistant ceramic finish"
    ],
    "specs": {
      "Battery": "5 days",
      "Material": "Ceramic",
      "Water": "100m resistance",
      "Haptics": "Silent vibration"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      }
    ],
    "images": [
      "/products/orbit-smart-ring-primary.png"
    ],
    "stock": 27,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-008"
  },
  {
    "id": "vertex-smart-glasses",
    "slug": "vertex-smart-glasses",
    "name": "Vertex Smart Glasses",
    "tagline": "Lightweight smart glasses with open-ear audio and hands-free capture.",
    "category": "Wearables",
    "price": 449,
    "rating": 4.3,
    "reviews": 76,
    "description": "Vertex Smart Glasses combine polarized lenses, open-ear speakers, touch controls, and a quick-capture camera for travel notes, calls, and everyday navigation.",
    "features": [
      "Open-ear directional speakers",
      "Hands-free photo and voice notes",
      "Polarized lenses with touch controls"
    ],
    "specs": {
      "Battery": "8 hours mixed use",
      "Audio": "Open-ear directional",
      "Camera": "12MP quick capture",
      "Weight": "42g"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Tortoise",
        "value": "#6b4a32"
      }
    ],
    "images": [
      "/products/vertex-smart-glasses-primary.png"
    ],
    "badge": "New",
    "stock": 19,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-009"
  },
  {
    "id": "vertex-adventure-watch",
    "slug": "vertex-adventure-watch",
    "name": "Vertex Adventure Watch",
    "tagline": "GPS adventure watch with offline maps and long-range battery modes.",
    "category": "Wearables",
    "price": 599,
    "rating": 4.6,
    "reviews": 94,
    "description": "Vertex Adventure Watch is built for long routes with offline terrain maps, waypoint navigation, storm alerts, and battery modes that stretch across multi-day trips.",
    "features": [
      "Offline maps and waypoint navigation",
      "Storm alerts with barometer trends",
      "Multi-day battery profiles"
    ],
    "specs": {
      "Battery": "21 days smartwatch",
      "GPS": "Dual-frequency",
      "Case": "Titanium reinforced",
      "Water": "100m resistance"
    },
    "colors": [
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      },
      {
        "name": "Midnight",
        "value": "#101014"
      },
      {
        "name": "Forest",
        "value": "#27342f"
      }
    ],
    "images": [
      "/products/vertex-adventure-watch-primary.png"
    ],
    "stock": 16,
    "accent": "#a78bfa",
    "sku": "ELV-WEA-010"
  },
  {
    "id": "prism-camera",
    "slug": "prism-one-camera",
    "name": "Prism One Camera",
    "tagline": "Compact mirrorless camera with 6K capture and low-light performance.",
    "category": "Photography",
    "price": 1299,
    "rating": 4.8,
    "reviews": 144,
    "description": "Prism One Camera combines a stabilized full-frame sensor, 6K capture, and direct mobile transfer in a compact body made for stills and video.",
    "features": [
      "6K open-gate recording",
      "Built-in variable ND and 5-axis stabilization",
      "Weather-sealed magnesium body"
    ],
    "specs": {
      "Sensor": "Super 35",
      "Codec": "RAW, H.265",
      "Lens": "32mm f/1.7 equivalent",
      "Storage": "CFexpress Type A"
    },
    "colors": [
      {
        "name": "Black",
        "value": "#111113"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      }
    ],
    "images": [
      "/products/prism-camera-primary.png"
    ],
    "badge": "Limited",
    "stock": 7,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-001"
  },
  {
    "id": "prism-compact-camera",
    "slug": "prism-compact-camera",
    "name": "Prism Compact Camera",
    "tagline": "Pocket camera with fast autofocus and everyday 4K capture.",
    "category": "Photography",
    "price": 899,
    "rating": 4.4,
    "reviews": 96,
    "description": "Prism Compact Camera keeps fast autofocus, 4K capture, and tactile controls in a pocketable body for daily documentation and travel.",
    "features": [
      "One-inch stabilized sensor",
      "Hybrid autofocus with eye detection",
      "4K60 video with USB-C transfer"
    ],
    "specs": {
      "Sensor": "1-inch stacked",
      "Lens": "28mm f/1.8 equivalent",
      "Video": "4K60",
      "Storage": "UHS-II SD"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/prism-compact-camera-primary.png"
    ],
    "stock": 18,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-002"
  },
  {
    "id": "prism-cinema-camera",
    "slug": "prism-cinema-camera",
    "name": "Prism Cinema Camera",
    "tagline": "Cinema-focused Prism camera with open-gate capture and active cooling.",
    "category": "Photography",
    "price": 1699,
    "rating": 4.6,
    "reviews": 73,
    "description": "Prism Cinema Camera adds open-gate recording, active cooling, timecode sync, and flexible mounting points for small crews and solo creators.",
    "features": [
      "Open-gate 6K recording",
      "Active cooling for longer takes",
      "Timecode sync and modular mounting"
    ],
    "specs": {
      "Sensor": "Super 35 stacked CMOS",
      "Video": "6K open-gate",
      "Cooling": "Active silent fan",
      "Mount": "Prism L"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/prism-cinema-camera-primary.png"
    ],
    "badge": "Editor's Pick",
    "stock": 10,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-003"
  },
  {
    "id": "prism-prime-lens-kit",
    "slug": "prism-prime-lens-kit",
    "name": "Prism Prime Lens Kit",
    "tagline": "Compact prime lens kit for travel, portraits, and product shots.",
    "category": "Photography",
    "price": 999,
    "rating": 4.5,
    "reviews": 85,
    "description": "Prism Prime Lens Kit includes three compact glass lenses with matched color rendering, quiet autofocus, and weather sealing for Prism camera bodies.",
    "features": [
      "24mm, 50mm, and 85mm primes",
      "Matched color rendering",
      "Weather-sealed aluminum barrels"
    ],
    "specs": {
      "Lenses": "24mm, 50mm, 85mm",
      "Aperture": "f/1.8",
      "Mount": "Prism L",
      "Sealing": "Weather resistant"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/prism-prime-lens-kit-primary.png"
    ],
    "stock": 14,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-004"
  },
  {
    "id": "prism-travel-camera",
    "slug": "prism-travel-camera",
    "name": "Prism Travel Camera",
    "tagline": "Lightweight camera with stabilized zoom and fast mobile transfer.",
    "category": "Photography",
    "price": 1099,
    "rating": 4.4,
    "reviews": 61,
    "description": "Prism Travel Camera pairs a stabilized zoom module, fast autofocus, and one-tap mobile backup in a compact body for trips where space matters.",
    "features": [
      "Stabilized 24-120mm equivalent zoom",
      "Fast subject autofocus",
      "One-tap mobile backup"
    ],
    "specs": {
      "Sensor": "1-inch stacked CMOS",
      "Lens": "24-120mm equivalent",
      "Video": "4K60",
      "Weight": "412g"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/prism-travel-camera-primary.png"
    ],
    "stock": 22,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-005"
  },
  {
    "id": "prism-aerial-drone-camera",
    "slug": "prism-aerial-drone-camera",
    "name": "Prism Aerial Drone Camera",
    "tagline": "Foldable aerial camera with obstacle sensing and 5.4K video.",
    "category": "Photography",
    "price": 1399,
    "rating": 4.7,
    "reviews": 113,
    "description": "Prism Aerial Drone Camera folds into a compact frame while carrying a stabilized 5.4K camera, obstacle sensing, and automated tracking paths.",
    "features": [
      "5.4K stabilized aerial video",
      "Four-way obstacle sensing",
      "Foldable carbon composite frame"
    ],
    "specs": {
      "Video": "5.4K30",
      "Flight": "38 minutes",
      "Range": "12km",
      "Sensor": "1-inch CMOS"
    },
    "colors": [
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/prism-aerial-drone-camera-primary.png"
    ],
    "badge": "Preorder",
    "stock": 6,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-006"
  },
  {
    "id": "prism-zoom-lens",
    "slug": "prism-zoom-lens",
    "name": "Prism Zoom Lens",
    "tagline": "Weather-sealed zoom lens with quiet autofocus and close-focus detail.",
    "category": "Photography",
    "price": 849,
    "rating": 4.5,
    "reviews": 72,
    "description": "Prism Zoom Lens covers everyday focal lengths with constant aperture control, quiet linear autofocus, and close-focus detail for stills and video.",
    "features": [
      "24-70mm equivalent range",
      "Quiet linear autofocus motors",
      "Close-focus macro mode"
    ],
    "specs": {
      "Range": "24-70mm equivalent",
      "Aperture": "f/2.8 constant",
      "Mount": "Prism L",
      "Sealing": "Weather resistant"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/prism-zoom-lens-primary.png"
    ],
    "stock": 20,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-007"
  },
  {
    "id": "prism-carbon-tripod",
    "slug": "prism-carbon-tripod",
    "name": "Prism Carbon Tripod",
    "tagline": "Lightweight tripod with carbon legs and a compact travel ball head.",
    "category": "Photography",
    "price": 399,
    "rating": 4.4,
    "reviews": 58,
    "description": "Prism Carbon Tripod supports Prism cameras with rigid carbon legs, quick-lock sections, and a low-profile ball head that packs flat for travel.",
    "features": [
      "Carbon fiber legs with quick locks",
      "Compact ball head with quick-release plate",
      "Reverse-folding travel profile"
    ],
    "specs": {
      "Load": "9kg",
      "Height": "158cm max",
      "Folded": "42cm",
      "Weight": "1.2kg"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/prism-carbon-tripod-primary.png"
    ],
    "stock": 26,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-008"
  },
  {
    "id": "prism-camera-flash",
    "slug": "prism-camera-flash",
    "name": "Prism Camera Flash",
    "tagline": "Compact on-camera flash with wireless triggering and fast recycling.",
    "category": "Photography",
    "price": 299,
    "rating": 4.4,
    "reviews": 64,
    "description": "Prism Camera Flash delivers consistent color and fast recycling from a compact head with wireless group triggering, tilt-swivel bounce, and USB-C charging.",
    "features": [
      "1.4-second full-power recycling",
      "Wireless triggering across three groups",
      "Tilt and swivel head for bounce light"
    ],
    "specs": {
      "Guide": "GN 42 at ISO 100",
      "Recycle": "1.4 seconds",
      "Power": "USB-C lithium pack",
      "Mount": "Universal hot shoe"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/prism-camera-flash-primary.png"
    ],
    "stock": 24,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-009"
  },
  {
    "id": "prism-camera-gimbal",
    "slug": "prism-camera-gimbal",
    "name": "Prism Camera Gimbal",
    "tagline": "Three-axis gimbal with smart follow modes for cameras and phones.",
    "category": "Photography",
    "price": 449,
    "rating": 4.5,
    "reviews": 71,
    "description": "Prism Camera Gimbal stabilizes Prism cameras across three axes with quiet motors, smart follow modes, and a fold-flat frame sized for travel bags.",
    "features": [
      "2.5kg payload with quiet motors",
      "Follow, lock, and POV shooting modes",
      "Fold-flat frame with quick balance plate"
    ],
    "specs": {
      "Payload": "2.5kg",
      "Battery": "14 hours",
      "Modes": "Follow, lock, POV",
      "Weight": "1.1kg"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/prism-camera-gimbal-primary.png"
    ],
    "stock": 12,
    "accent": "#f4f0e8",
    "sku": "ELV-PHO-010"
  },
  {
    "id": "nova-lamp",
    "slug": "nova-task-lamp",
    "name": "Nova Task Lamp",
    "tagline": "Adjustable task lighting with circadian dimming and glare-free output.",
    "category": "Workspace",
    "price": 329,
    "rating": 4.6,
    "reviews": 198,
    "description": "Nova Task Lamp combines a machined aluminum arm, circadian dimming, and a glare-free ring diffuser for focused work and ambient light.",
    "features": [
      "Circadian dimming from 2200K to 6500K",
      "Machined aluminum arm with magnetic cable routing",
      "Glare-free ring diffuser with task and ambient modes"
    ],
    "specs": {
      "Output": "950 lumens",
      "Controls": "Touch + app",
      "Material": "Aluminum, glass",
      "Power": "USB-C PD"
    },
    "colors": [
      {
        "name": "Moon",
        "value": "#e9e1d1"
      },
      {
        "name": "Carbon",
        "value": "#222228"
      }
    ],
    "images": [
      "/products/nova-lamp-primary.png"
    ],
    "stock": 24,
    "accent": "#f5c56b",
    "sku": "ELV-WOR-001"
  },
  {
    "id": "atlas-laptop-stand",
    "slug": "atlas-laptop-stand",
    "name": "Atlas Laptop Stand",
    "tagline": "Minimal aluminum laptop stand for cleaner posture and airflow.",
    "category": "Workspace",
    "price": 169,
    "rating": 4.4,
    "reviews": 121,
    "description": "Atlas Laptop Stand lifts notebooks to a more comfortable height with a rigid aluminum frame, wide cable pass-through, and a stable footprint for daily workstations.",
    "features": [
      "Rigid aluminum support frame",
      "Open airflow channel under the laptop",
      "Wide rear cable pass-through"
    ],
    "specs": {
      "Laptop": "11-16 inches",
      "Height": "6.4 inches",
      "Material": "Recycled aluminum",
      "Footprint": "9.8 x 8.9 inches"
    },
    "colors": [
      {
        "name": "Smoke",
        "value": "#32343a"
      },
      {
        "name": "Clear",
        "value": "#c7d2dc"
      }
    ],
    "images": [
      "/products/atlas-laptop-stand-primary.png"
    ],
    "badge": "Preorder",
    "stock": 15,
    "accent": "#f5c56b",
    "sku": "ELV-WOR-002"
  },
  {
    "id": "axis-keyboard",
    "slug": "axis-keyboard",
    "name": "Axis Keyboard",
    "tagline": "Low-profile mechanical keyboard with silent switches and multi-device wireless.",
    "category": "Workspace",
    "price": 269,
    "rating": 4.7,
    "reviews": 326,
    "description": "Axis Keyboard pairs hot-swappable silent tactile switches, a CNC aluminum body, and a programmable glass command rail for focused daily work.",
    "features": [
      "Hot-swappable silent tactile switches",
      "Programmable glass command rail",
      "Multi-device wireless with encrypted pairing"
    ],
    "specs": {
      "Layout": "75%",
      "Battery": "2 months",
      "Body": "CNC aluminum",
      "Switches": "Silent tactile"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Ice",
        "value": "#dadddf"
      }
    ],
    "images": [
      "/products/axis-keyboard-primary.png"
    ],
    "stock": 22,
    "accent": "#a78bfa",
    "sku": "ELV-WOR-003"
  },
  {
    "id": "axis-precision-mouse",
    "slug": "axis-precision-mouse",
    "name": "Axis Precision Mouse",
    "tagline": "Precision wireless mouse with quiet clicks and magnetic charging.",
    "category": "Workspace",
    "price": 149,
    "rating": 4.5,
    "reviews": 203,
    "description": "Axis Precision Mouse uses a sculpted low-profile shell, glass-tracking sensor, quiet switches, and magnetic USB-C charging for focused desk work.",
    "features": [
      "Glass-compatible precision sensor",
      "Quiet tactile switches",
      "Magnetic USB-C charging dock"
    ],
    "specs": {
      "DPI": "8000",
      "Battery": "70 days",
      "Buttons": "7 programmable",
      "Wireless": "Bluetooth, 2.4GHz"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/axis-precision-mouse-primary.png"
    ],
    "stock": 33,
    "accent": "#a78bfa",
    "sku": "ELV-WOR-004"
  },
  {
    "id": "axis-wireless-keyboard",
    "slug": "axis-wireless-keyboard",
    "name": "Axis Wireless Keyboard",
    "tagline": "Slim wireless keyboard with quiet keys and multi-device switching.",
    "category": "Workspace",
    "price": 179,
    "rating": 4.3,
    "reviews": 174,
    "description": "Axis Wireless Keyboard brings a low-profile layout, quiet scissor switches, and quick device switching to compact desks and travel work setups.",
    "features": [
      "Quiet low-profile scissor keys",
      "Three-device Bluetooth switching",
      "USB-C fast charging"
    ],
    "specs": {
      "Layout": "Compact full-size",
      "Battery": "4 months",
      "Wireless": "Bluetooth",
      "Body": "Aluminum top plate"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/axis-wireless-keyboard-primary.png"
    ],
    "stock": 42,
    "accent": "#f5c56b",
    "sku": "ELV-WOR-005"
  },
  {
    "id": "atlas-4k-webcam",
    "slug": "atlas-4k-webcam",
    "name": "Atlas 4K Webcam",
    "tagline": "4K webcam with low-light processing and privacy hardware.",
    "category": "Workspace",
    "price": 249,
    "rating": 4.5,
    "reviews": 132,
    "description": "Atlas 4K Webcam pairs a large image sensor, low-light processing, beamforming microphones, and a physical privacy shutter for daily calls and recorded demos.",
    "features": [
      "4K sensor with low-light tuning",
      "Physical privacy shutter",
      "Beamforming stereo microphones"
    ],
    "specs": {
      "Resolution": "4K30, 1080p60",
      "Lens": "82-degree field",
      "Mount": "Monitor, tripod",
      "Connection": "USB-C"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/atlas-4k-webcam-primary.png"
    ],
    "stock": 17,
    "accent": "#a78bfa",
    "sku": "ELV-WOR-006"
  },
  {
    "id": "atlas-usb-c-hub",
    "slug": "atlas-usb-c-hub",
    "name": "Atlas USB-C Hub",
    "tagline": "Compact USB-C hub with 4K HDMI, Ethernet, and fast card reads.",
    "category": "Workspace",
    "price": 159,
    "rating": 4.4,
    "reviews": 211,
    "description": "Atlas USB-C Hub adds essential workstation ports in a compact aluminum body with fast card reads, wired networking, and 4K display output.",
    "features": [
      "4K HDMI and Gigabit Ethernet",
      "SD and microSD readers",
      "85W USB-C pass-through charging"
    ],
    "specs": {
      "Ports": "8",
      "Video": "4K60 HDMI",
      "Charging": "85W pass-through",
      "Material": "Aluminum"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Silver",
        "value": "#c7c9cc"
      },
      {
        "name": "Titanium",
        "value": "#b9b4aa"
      }
    ],
    "images": [
      "/products/atlas-usb-c-hub-primary.png"
    ],
    "stock": 46,
    "accent": "#f5c56b",
    "sku": "ELV-WOR-007"
  },
  {
    "id": "atlas-desk-dock",
    "slug": "atlas-desk-dock",
    "name": "Atlas Desk Dock",
    "tagline": "Compact GaN desk dock for laptops, phones, and wearables.",
    "category": "Workspace",
    "price": 189,
    "rating": 4.6,
    "reviews": 154,
    "description": "Atlas Desk Dock uses high-efficiency GaN power to run a laptop, phone, tablet, and watch from a compact weighted body with clean cable routing.",
    "features": [
      "140W total GaN charging output",
      "Two USB-C and two USB-A ports",
      "Weighted base with angled cable routing"
    ],
    "specs": {
      "Output": "140W total",
      "Ports": "2 USB-C, 2 USB-A",
      "Cable": "6ft braided",
      "Material": "Aluminum, silicone"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Sand",
        "value": "#c9b8a0"
      }
    ],
    "images": [
      "/products/atlas-desk-dock-primary.png"
    ],
    "badge": "New",
    "stock": 29,
    "accent": "#f5c56b",
    "sku": "ELV-WOR-008"
  },
  {
    "id": "axis-numpad",
    "slug": "axis-numpad",
    "name": "Axis Numpad",
    "tagline": "Mechanical numpad with silent switches and programmable layers.",
    "category": "Workspace",
    "price": 129,
    "rating": 4.5,
    "reviews": 89,
    "description": "Axis Numpad extends the Axis keyboard family with hot-swappable switches, programmable layers, and a compact aluminum case for spreadsheets and shortcuts.",
    "features": [
      "Hot-swappable silent tactile switches",
      "Programmable layers for shortcuts",
      "Multi-device wireless with encrypted pairing"
    ],
    "specs": {
      "Layout": "21-key",
      "Battery": "3 months",
      "Body": "CNC aluminum",
      "Switches": "Silent tactile"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Ice",
        "value": "#dadddf"
      }
    ],
    "images": [
      "/products/axis-numpad-primary.png"
    ],
    "stock": 27,
    "accent": "#a78bfa",
    "sku": "ELV-WOR-009"
  },
  {
    "id": "atlas-desk-mat",
    "slug": "atlas-desk-mat",
    "name": "Atlas Desk Mat",
    "tagline": "Premium desk mat with a smooth work surface and hidden cable channel.",
    "category": "Workspace",
    "price": 89,
    "rating": 4.4,
    "reviews": 116,
    "description": "Atlas Desk Mat anchors a workstation with a low-friction writing surface, stitched edges, and a concealed rear channel for charging cables.",
    "features": [
      "Low-friction vegan leather surface",
      "Concealed rear cable channel",
      "Stitched edges with non-slip base"
    ],
    "specs": {
      "Size": "34 x 16 inches",
      "Surface": "Vegan leather",
      "Base": "Natural rubber",
      "Thickness": "4mm"
    },
    "colors": [
      {
        "name": "Slate",
        "value": "#3a3f46"
      },
      {
        "name": "Sand",
        "value": "#c9b8a0"
      }
    ],
    "images": [
      "/products/atlas-desk-mat-primary.png"
    ],
    "stock": 44,
    "accent": "#f5c56b",
    "sku": "ELV-WOR-010"
  },
  {
    "id": "transit-passport-folio",
    "slug": "transit-passport-folio",
    "name": "Transit Passport Folio",
    "tagline": "Leather travel folio for passport, cards, tickets, and receipts.",
    "category": "Travel",
    "price": 119,
    "rating": 4.4,
    "reviews": 173,
    "description": "Transit Passport Folio keeps passports, cards, tickets, and receipts organized in a slim weather-resistant folio with quiet magnetic closure.",
    "features": [
      "Passport sleeve and ticket pocket",
      "Four card slots with receipt storage",
      "Slim magnetic closure"
    ],
    "specs": {
      "Capacity": "Passport + 4 cards",
      "Shell": "Full-grain leather",
      "Closure": "Magnetic flap",
      "Lining": "Microfiber"
    },
    "colors": [
      {
        "name": "Ink",
        "value": "#171b22"
      },
      {
        "name": "Stone",
        "value": "#b4afa3"
      },
      {
        "name": "Sage",
        "value": "#7f8d81"
      }
    ],
    "images": [
      "/products/transit-passport-folio-primary.png"
    ],
    "stock": 31,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-001"
  },
  {
    "id": "transit-tech-pouch",
    "slug": "transit-tech-pouch",
    "name": "Transit Tech Pouch",
    "tagline": "Structured pouch for chargers, earbuds, adapters, and cables.",
    "category": "Travel",
    "price": 99,
    "rating": 4.6,
    "reviews": 248,
    "description": "Transit Tech Pouch opens flat with elastic zones, mesh pockets, and a padded center divider to keep small devices and charging gear easy to find.",
    "features": [
      "Flat-open clamshell layout",
      "Elastic zones for chargers and cables",
      "Padded divider for small devices"
    ],
    "specs": {
      "Capacity": "2.4L",
      "Shell": "Recycled nylon",
      "Pockets": "12 internal zones",
      "Weight": "210g"
    },
    "colors": [
      {
        "name": "Ink",
        "value": "#171b22"
      },
      {
        "name": "Stone",
        "value": "#b4afa3"
      },
      {
        "name": "Sage",
        "value": "#7f8d81"
      }
    ],
    "images": [
      "/products/transit-tech-pouch-primary.png"
    ],
    "badge": "Best Seller",
    "stock": 52,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-002"
  },
  {
    "id": "transit-laptop-sleeve",
    "slug": "transit-laptop-sleeve",
    "name": "Transit Laptop Sleeve",
    "tagline": "Padded laptop sleeve with accessory pocket and magnetic closure.",
    "category": "Travel",
    "price": 129,
    "rating": 4.4,
    "reviews": 117,
    "description": "Transit Laptop Sleeve protects notebooks with dense foam padding, a soft microfiber lining, and a slim accessory pocket for chargers and cables.",
    "features": [
      "Dense foam laptop protection",
      "Soft microfiber lining",
      "Slim magnetic accessory pocket"
    ],
    "specs": {
      "Laptop": "13-14 inches",
      "Shell": "Recycled woven fabric",
      "Lining": "Microfiber",
      "Closure": "Magnetic flap"
    },
    "colors": [
      {
        "name": "Ink",
        "value": "#171b22"
      },
      {
        "name": "Stone",
        "value": "#b4afa3"
      },
      {
        "name": "Sage",
        "value": "#7f8d81"
      }
    ],
    "images": [
      "/products/transit-laptop-sleeve-primary.png"
    ],
    "stock": 37,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-003"
  },
  {
    "id": "transit-backpack",
    "slug": "transit-backpack",
    "name": "Transit Backpack",
    "tagline": "Weather-resistant backpack built around cameras, laptops, and tech.",
    "category": "Travel",
    "price": 299,
    "rating": 4.7,
    "reviews": 192,
    "description": "Transit Backpack uses a structured tech compartment, side camera access, suspended laptop storage, and weather-resistant fabric for daily carry and short trips.",
    "features": [
      "Suspended laptop compartment",
      "Side-access camera cube",
      "Weather-resistant recycled shell"
    ],
    "specs": {
      "Capacity": "24L",
      "Laptop": "16 inches",
      "Shell": "Recycled nylon",
      "Weight": "1.25kg"
    },
    "colors": [
      {
        "name": "Ink",
        "value": "#171b22"
      },
      {
        "name": "Forest",
        "value": "#27342f"
      }
    ],
    "images": [
      "/products/transit-backpack-primary.png"
    ],
    "badge": "Editor's Pick",
    "stock": 18,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-004"
  },
  {
    "id": "transit-carry-on",
    "slug": "transit-carry-on",
    "name": "Transit Carry-On",
    "tagline": "Hard-shell carry-on with quiet wheels and protected tech storage.",
    "category": "Travel",
    "price": 289,
    "rating": 4.5,
    "reviews": 84,
    "description": "Transit Carry-On pairs a rigid shell, smooth spinner wheels, and a padded tech divider to keep clothing, chargers, and devices organized for short trips.",
    "features": [
      "Quiet 360-degree spinner wheels",
      "Padded removable tech divider",
      "Compression panel with cable pocket"
    ],
    "specs": {
      "Volume": "39L",
      "Shell": "Polycarbonate blend",
      "Wheels": "Silent spinner",
      "Weight": "3.4kg"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Stone",
        "value": "#b4afa3"
      }
    ],
    "images": [
      "/products/transit-carry-on-primary.png"
    ],
    "stock": 29,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-005"
  },
  {
    "id": "transit-power-bank",
    "slug": "transit-power-bank",
    "name": "Transit Power Bank",
    "tagline": "High-capacity travel battery with fast USB-C laptop charging.",
    "category": "Travel",
    "price": 179,
    "rating": 4.6,
    "reviews": 221,
    "description": "Transit Power Bank carries enough capacity for phones, tablets, and compact laptops with a clear status display and fast USB-C delivery.",
    "features": [
      "100W USB-C laptop charging",
      "Two-way fast recharge",
      "Low-current mode for earbuds"
    ],
    "specs": {
      "Capacity": "24000mAh",
      "Output": "100W USB-C",
      "Ports": "2 USB-C, 1 USB-A",
      "Display": "OLED status"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/transit-power-bank-primary.png"
    ],
    "stock": 43,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-006"
  },
  {
    "id": "transit-gan-charger",
    "slug": "transit-gan-charger",
    "name": "Transit GaN Charger",
    "tagline": "Compact GaN travel charger with folding prongs and global adapters.",
    "category": "Travel",
    "price": 129,
    "rating": 4.4,
    "reviews": 165,
    "description": "Transit GaN Charger uses a compact GaN design, folding prongs, and swappable adapters to charge laptops and devices across travel days.",
    "features": [
      "100W GaN power delivery",
      "Snap-on global adapter kit",
      "Folding prongs and travel pouch"
    ],
    "specs": {
      "Output": "100W total",
      "Ports": "2 USB-C, 1 USB-A",
      "Adapters": "US, EU, UK, AU",
      "Weight": "172g"
    },
    "colors": [
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      },
      {
        "name": "Graphite",
        "value": "#202026"
      }
    ],
    "images": [
      "/products/transit-gan-charger-primary.png"
    ],
    "stock": 35,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-007"
  },
  {
    "id": "transit-cable-organizer",
    "slug": "transit-cable-organizer",
    "name": "Transit Cable Organizer",
    "tagline": "Flat cable organizer with labeled channels and magnetic closure.",
    "category": "Travel",
    "price": 79,
    "rating": 4.3,
    "reviews": 136,
    "description": "Transit Cable Organizer keeps charging cables, adapters, pens, and cards separated in a slim roll-up format with labeled elastic channels.",
    "features": [
      "Flat roll-up format",
      "Labeled elastic cable channels",
      "Magnetic closure strap"
    ],
    "specs": {
      "Capacity": "8 cable zones",
      "Shell": "Recycled nylon",
      "Closure": "Magnetic strap",
      "Weight": "96g"
    },
    "colors": [
      {
        "name": "Ink",
        "value": "#171b22"
      },
      {
        "name": "Stone",
        "value": "#b4afa3"
      },
      {
        "name": "Sage",
        "value": "#7f8d81"
      }
    ],
    "images": [
      "/products/transit-cable-organizer-primary.png"
    ],
    "stock": 58,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-008"
  },
  {
    "id": "transit-luggage-tracker",
    "slug": "transit-luggage-tracker",
    "name": "Transit Luggage Tracker",
    "tagline": "Slim luggage tracker with precision finding and a year of battery.",
    "category": "Travel",
    "price": 49,
    "rating": 4.5,
    "reviews": 143,
    "description": "Transit Luggage Tracker slips into a suitcase pocket and reports its location through a secure finding network, with close-range guidance for the last few feet.",
    "features": [
      "Secure finding network coverage",
      "Close-range precision locating",
      "Replaceable battery lasting a year"
    ],
    "specs": {
      "Battery": "12 months, replaceable",
      "Network": "Secure finding network",
      "Water": "IP68",
      "Weight": "11g"
    },
    "colors": [
      {
        "name": "Matte Black",
        "value": "#111113"
      },
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      }
    ],
    "images": [
      "/products/transit-luggage-tracker-primary.png"
    ],
    "badge": "New",
    "stock": 64,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-009"
  },
  {
    "id": "transit-travel-adapter",
    "slug": "transit-travel-adapter",
    "name": "Transit Travel Adapter",
    "tagline": "Universal travel adapter with fast USB-C and surge protection.",
    "category": "Travel",
    "price": 69,
    "rating": 4.3,
    "reviews": 98,
    "description": "Transit Travel Adapter covers outlets in more than 150 countries with a sliding prong system, fast USB-C output, and built-in fuse and surge protection.",
    "features": [
      "Sliding prongs for 150+ countries",
      "35W USB-C fast charging",
      "Replaceable fuse with surge protection"
    ],
    "specs": {
      "Coverage": "150+ countries",
      "Ports": "2 USB-C, 2 USB-A",
      "Output": "35W USB-C",
      "Safety": "Fuse, surge protection"
    },
    "colors": [
      {
        "name": "Graphite",
        "value": "#202026"
      },
      {
        "name": "Arctic White",
        "value": "#edf0f2"
      }
    ],
    "images": [
      "/products/transit-travel-adapter-primary.png"
    ],
    "stock": 51,
    "accent": "#b8bdc7",
    "sku": "ELV-TRA-010"
  }
];

const relatedProductIds: Record<string, string[]> = {
  "vanta-studio": [
    "vanta-max",
    "vanta-dac-amp",
    "echo-earbuds",
    "cove-speaker"
  ],
  "cove-speaker": [
    "pulse-home-speaker",
    "cove-desktop-speaker",
    "pulse-soundbar",
    "vanta-studio"
  ],
  "echo-earbuds": [
    "cove-portable-speaker",
    "vanta-studio",
    "transit-power-bank",
    "transit-gan-charger"
  ],
  "pulse-soundbar": [
    "pulse-home-speaker",
    "cove-speaker",
    "pulse-wireless-turntable",
    "vanta-max"
  ],
  "cove-desktop-speaker": [
    "cove-speaker",
    "axis-keyboard",
    "nova-lamp",
    "atlas-desk-dock"
  ],
  "pulse-home-speaker": [
    "cove-speaker",
    "pulse-soundbar",
    "pulse-wireless-turntable",
    "cove-desktop-speaker"
  ],
  "cove-portable-speaker": [
    "echo-earbuds",
    "transit-tech-pouch",
    "transit-power-bank",
    "transit-gan-charger"
  ],
  "vanta-max": [
    "vanta-studio",
    "vanta-dac-amp",
    "pulse-soundbar",
    "transit-carry-on"
  ],
  "vanta-dac-amp": [
    "vanta-studio",
    "vanta-max",
    "cove-desktop-speaker",
    "pulse-wireless-turntable"
  ],
  "pulse-wireless-turntable": [
    "vanta-dac-amp",
    "pulse-home-speaker",
    "cove-speaker",
    "pulse-soundbar"
  ],
  "solace-watch": [
    "vertex-ultra-watch",
    "solace-fitness-band",
    "orbit-smart-ring",
    "transit-passport-folio"
  ],
  "solace-fitness-band": [
    "solace-recovery-band",
    "solace-sport-watch",
    "solace-sleep-tracker",
    "solace-watch"
  ],
  "orbit-health-ring": [
    "orbit-smart-ring",
    "solace-sleep-tracker",
    "solace-watch",
    "solace-fitness-band"
  ],
  "solace-recovery-band": [
    "solace-fitness-band",
    "solace-sleep-tracker",
    "solace-watch",
    "orbit-smart-ring"
  ],
  "solace-sport-watch": [
    "vertex-adventure-watch",
    "vertex-ultra-watch",
    "solace-fitness-band",
    "transit-power-bank"
  ],
  "vertex-ultra-watch": [
    "vertex-adventure-watch",
    "solace-watch",
    "solace-sport-watch",
    "transit-backpack"
  ],
  "solace-sleep-tracker": [
    "orbit-health-ring",
    "orbit-smart-ring",
    "solace-recovery-band",
    "solace-watch"
  ],
  "orbit-smart-ring": [
    "orbit-health-ring",
    "solace-sleep-tracker",
    "solace-watch",
    "solace-fitness-band"
  ],
  "vertex-smart-glasses": [
    "vertex-adventure-watch",
    "solace-watch",
    "orbit-smart-ring",
    "echo-earbuds"
  ],
  "vertex-adventure-watch": [
    "solace-sport-watch",
    "vertex-ultra-watch",
    "solace-watch",
    "vertex-smart-glasses"
  ],
  "prism-camera": [
    "prism-prime-lens-kit",
    "prism-zoom-lens",
    "prism-carbon-tripod",
    "transit-backpack"
  ],
  "prism-compact-camera": [
    "prism-travel-camera",
    "transit-passport-folio",
    "transit-power-bank",
    "prism-zoom-lens"
  ],
  "prism-cinema-camera": [
    "prism-zoom-lens",
    "prism-camera-gimbal",
    "prism-prime-lens-kit",
    "atlas-4k-webcam"
  ],
  "prism-prime-lens-kit": [
    "prism-camera",
    "prism-cinema-camera",
    "prism-zoom-lens",
    "prism-carbon-tripod"
  ],
  "prism-travel-camera": [
    "prism-compact-camera",
    "prism-aerial-drone-camera",
    "transit-passport-folio",
    "transit-laptop-sleeve"
  ],
  "prism-aerial-drone-camera": [
    "prism-travel-camera",
    "transit-backpack",
    "transit-power-bank",
    "prism-camera"
  ],
  "prism-zoom-lens": [
    "prism-cinema-camera",
    "prism-camera",
    "prism-prime-lens-kit",
    "prism-carbon-tripod"
  ],
  "prism-carbon-tripod": [
    "prism-camera",
    "prism-cinema-camera",
    "prism-prime-lens-kit",
    "transit-backpack"
  ],
  "prism-camera-flash": [
    "prism-camera",
    "prism-camera-gimbal",
    "prism-zoom-lens",
    "prism-carbon-tripod"
  ],
  "prism-camera-gimbal": [
    "prism-cinema-camera",
    "prism-camera-flash",
    "prism-camera",
    "prism-carbon-tripod"
  ],
  "nova-lamp": [
    "axis-keyboard",
    "atlas-laptop-stand",
    "axis-precision-mouse",
    "axis-wireless-keyboard"
  ],
  "atlas-laptop-stand": [
    "atlas-desk-dock",
    "atlas-usb-c-hub",
    "axis-keyboard",
    "nova-lamp"
  ],
  "axis-keyboard": [
    "axis-precision-mouse",
    "atlas-laptop-stand",
    "axis-numpad",
    "atlas-desk-mat"
  ],
  "axis-precision-mouse": [
    "axis-keyboard",
    "atlas-laptop-stand",
    "atlas-desk-dock",
    "axis-wireless-keyboard"
  ],
  "axis-wireless-keyboard": [
    "nova-lamp",
    "axis-keyboard",
    "axis-precision-mouse",
    "atlas-4k-webcam"
  ],
  "atlas-4k-webcam": [
    "axis-wireless-keyboard",
    "atlas-usb-c-hub",
    "prism-cinema-camera",
    "atlas-laptop-stand"
  ],
  "atlas-usb-c-hub": [
    "atlas-laptop-stand",
    "atlas-desk-dock",
    "atlas-4k-webcam",
    "transit-power-bank"
  ],
  "atlas-desk-dock": [
    "atlas-laptop-stand",
    "atlas-usb-c-hub",
    "transit-power-bank",
    "transit-gan-charger"
  ],
  "axis-numpad": [
    "axis-keyboard",
    "axis-precision-mouse",
    "atlas-desk-mat",
    "nova-lamp"
  ],
  "atlas-desk-mat": [
    "axis-numpad",
    "axis-keyboard",
    "axis-precision-mouse",
    "nova-lamp"
  ],
  "transit-passport-folio": [
    "transit-tech-pouch",
    "transit-laptop-sleeve",
    "transit-gan-charger",
    "solace-watch"
  ],
  "transit-tech-pouch": [
    "transit-cable-organizer",
    "transit-passport-folio",
    "transit-power-bank",
    "transit-gan-charger"
  ],
  "transit-laptop-sleeve": [
    "transit-passport-folio",
    "transit-tech-pouch",
    "prism-compact-camera",
    "transit-gan-charger"
  ],
  "transit-backpack": [
    "transit-passport-folio",
    "prism-aerial-drone-camera",
    "prism-camera",
    "transit-tech-pouch"
  ],
  "transit-carry-on": [
    "vanta-max",
    "transit-passport-folio",
    "transit-tech-pouch",
    "cove-portable-speaker"
  ],
  "transit-power-bank": [
    "transit-gan-charger",
    "atlas-usb-c-hub",
    "echo-earbuds",
    "transit-tech-pouch"
  ],
  "transit-gan-charger": [
    "transit-power-bank",
    "transit-passport-folio",
    "transit-tech-pouch",
    "atlas-usb-c-hub"
  ],
  "transit-cable-organizer": [
    "transit-tech-pouch",
    "transit-passport-folio",
    "transit-laptop-sleeve",
    "transit-gan-charger"
  ],
  "transit-luggage-tracker": [
    "transit-carry-on",
    "transit-backpack",
    "transit-travel-adapter",
    "transit-tech-pouch"
  ],
  "transit-travel-adapter": [
    "transit-gan-charger",
    "transit-power-bank",
    "transit-luggage-tracker",
    "transit-cable-organizer"
  ]
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.badge).slice(0, 4);
}

export function getRelatedProducts(product: Product): Product[] {
  const explicitRelated = (relatedProductIds[product.id] ?? [])
    .map((id) => products.find((item) => item.id === id))
    .filter((item): item is Product => Boolean(item));

  if (explicitRelated.length >= 3) {
    return explicitRelated.slice(0, 4);
  }

  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return [
    ...explicitRelated,
    ...sameCategory,
    ...products.filter((item) => item.id !== product.id)
  ]
    .filter(
      (item, index, collection) =>
        collection.findIndex((candidate) => candidate.id === item.id) === index
    )
    .slice(0, 4);
}
