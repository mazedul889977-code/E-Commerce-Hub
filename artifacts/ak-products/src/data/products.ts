export interface Product {
  id: string;
  name: string;
  price: number;
  category: "kitchen" | "household" | "electronic";
  image: string;
  description: string;
  badge?: string;
  stock?: number;
  visible?: boolean;
}

export const products: Product[] = [
  // Best Sellers
  {
    id: "p1",
    name: "Pet Hair Remover Roller - Dog & Cat Fur Remover",
    price: 3.46,
    category: "household",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Pet+Hair+Remover",
    description: "Easily clean pet hair from your furniture with this self-cleaning roller base.",
    badge: "Best Seller"
  },
  {
    id: "p2",
    name: "9 in 1 Electric Spin Scrubber Cordless Cleaning Brush",
    price: 24.06,
    category: "household",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Spin+Scrubber",
    description: "Powerful cordless spin scrubber with 9 interchangeable heads for versatile cleaning.",
    badge: "Best Seller"
  },
  {
    id: "p3",
    name: "Lint Remover for Clothing LED Digital Electric",
    price: 1.98,
    category: "household",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Lint+Remover",
    description: "Rechargeable electric lint remover quickly removes fluff and pellets from clothing.",
    badge: "Best Seller"
  },
  {
    id: "p4",
    name: "Narrow Shape Press Ring Trash Can with Lid",
    price: 17.90,
    category: "household",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Trash+Can",
    description: "Space-saving narrow trash can designed to fit into tight bathroom or kitchen spaces.",
    badge: "Best Seller"
  },
  {
    id: "p5",
    name: "2025 New 2-Tier Stainless Steel Kitchen Dish Drainer",
    price: 27.44,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Dish+Drainer",
    description: "Modern 2-tier stainless steel dish drying rack for spacious and organized countertops.",
    badge: "Best Seller"
  },
  {
    id: "p6",
    name: "16oz Oil Dispenser Bottle for Kitchen",
    price: 10.14,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Oil+Dispenser",
    description: "2 in 1 olive oil dispenser and oil sprayer for controlled and healthy cooking.",
    badge: "Best Seller"
  },
  {
    id: "p7",
    name: "Electric Garlic Chopper Mini Portable Veggie Chopper",
    price: 1.98,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Garlic+Chopper",
    description: "Mini electric food chopper for garlic, ginger, peppers, and small veggies.",
    badge: "Best Seller"
  },
  
  // Smart Kitchen
  {
    id: "k1",
    name: "Yallo Mart Folding Wall Mounted Trash Can",
    price: 19.99,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Folding+Trash+Can",
    description: "Convenient collapsible trash can that mounts easily to kitchen cabinet doors.",
  },
  {
    id: "k2",
    name: "Yallo Mart 7PCS Stainless Steel Mixing Bowls Set",
    price: 33.99,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Mixing+Bowls",
    description: "Nesting mixing bowls with lids for prepping, storing, and serving.",
  },
  {
    id: "k3",
    name: "Yallo Mart Manual Can Opener Heavy Duty",
    price: 21.99,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Can+Opener",
    description: "Durable stainless steel manual can opener with ergonomic grips.",
  },
  {
    id: "k4",
    name: "Yallo Mart Magnetic Metal Spice Rack Organizer",
    price: 33.99,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Spice+Rack",
    description: "Space-saving magnetic spice rack that attaches to your fridge side.",
  },
  {
    id: "k5",
    name: "Yallo Mart 16-in-1 Vegetable Slicer Cutter Machine",
    price: 24.99,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Veggie+Slicer",
    description: "Multifunctional vegetable chopper with various blades for dicing and slicing.",
  },
  {
    id: "h1",
    name: "Yallo Mart Ultrasonic Pest Repeller 6 Pack",
    price: 27.99,
    category: "household",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Pest+Repeller",
    description: "Electronic indoor plug-in repeller for keeping pests away safely.",
  },
  {
    id: "k6",
    name: "Yallo Mart 12-Inch Pre-Seasoned Cast Iron Skillet",
    price: 35.99,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Cast+Iron+Skillet",
    description: "Heavy duty pre-seasoned cast iron skillet for perfect searing and frying.",
  },
  {
    id: "k7",
    name: "5 in 1 Rotary Cheese Grater",
    price: 24.99,
    category: "kitchen",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Cheese+Grater",
    description: "Handheld rotary cheese grater with multiple drums for nuts and veggies.",
  },

  // Smart Home
  {
    id: "e1",
    name: "Smart WiFi Plugs Mini Outlet 4-Pack",
    price: 22.50,
    category: "electronic",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Smart+Plugs",
    description: "Control your appliances from anywhere with these mini smart plugs.",
    badge: "New"
  },
  {
    id: "e2",
    name: "LED Smart Light Bulbs Color Changing 2-Pack",
    price: 15.99,
    category: "electronic",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Smart+Bulbs",
    description: "Voice-controlled RGB light bulbs compatible with Alexa and Google Home.",
    badge: "New"
  },
  {
    id: "e3",
    name: "Keyless Entry Smart Door Lock",
    price: 75.00,
    category: "electronic",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Smart+Lock",
    description: "Secure digital keypad door lock with app control and auto-lock features.",
  },
  {
    id: "e4",
    name: "Wireless Video Doorbell Camera",
    price: 55.00,
    category: "electronic",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Video+Doorbell",
    description: "HD video doorbell with 2-way audio and motion detection alerts.",
  },
  {
    id: "e5",
    name: "Robot Vacuum Cleaner with Mop Combo",
    price: 149.99,
    category: "electronic",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Robot+Vacuum",
    description: "Smart robotic vacuum and mop with strong suction and app navigation.",
  },
  {
    id: "e6",
    name: "Smart Indoor Security Camera 1080p",
    price: 29.99,
    category: "electronic",
    image: "https://placehold.co/400x400/f5f5f5/888888?text=Security+Camera",
    description: "Indoor WiFi camera for home monitoring, baby monitor, and pet viewing.",
  }
];
