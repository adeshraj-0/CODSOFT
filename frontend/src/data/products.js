const products = [
 {
  id: 1,
  name: "Nike Air Zoom Pegasus 41",
  price: "₹8,999",
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",

  category: "Footwear",
  brand: "Nike",
  rating: 4.8,
  reviews: 2485,
  stock: "In Stock",
  warranty: "6 Months",
  delivery: "Free Delivery in 2 Days",

  description:
    "The Nike Air Zoom Pegasus 41 delivers lightweight comfort, responsive cushioning, and excellent grip. Designed for athletes and everyday runners with premium engineered mesh and Zoom Air technology.",

  features: [
    "Zoom Air Cushioning",
    "Breathable Mesh Upper",
    "Rubber Anti-Slip Sole",
    "30 Days Easy Return",
    "Premium Build Quality"
  ],

  specifications: {
    Brand: "Nike",
    Material: "Engineered Mesh",
    Color: "Black / White",
    Weight: "280 g",
    Country: "Vietnam"
  }
},

{
  id: 2,
  name: "Apple Watch Series 10",
  price: "₹29,999",
  image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",

  category: "Smart Watch",
  brand: "Apple",
  rating: 4.9,
  reviews: 4120,
  stock: "In Stock",
  warranty: "1 Year",
  delivery: "Free Delivery Tomorrow",

  description:
    "Stay healthy and connected with Apple Watch Series 10 featuring fitness tracking, ECG monitoring, GPS, Always-On Retina Display and long battery life.",

  features: [
    "Always-On Retina Display",
    "Heart Rate Monitoring",
    "GPS + Bluetooth",
    "Water Resistant",
    "Fast Charging"
  ],

  specifications: {
    Display: "1.9 inch OLED",
    Battery: "36 Hours",
    Connectivity: "Bluetooth + Wi-Fi",
    Weight: "35 g",
    WaterResistance: "50 m"
  }
},

{
  id: 3,
  name: "Logitech G733 Gaming Headset",
  price: "₹3,499",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",

  category: "Gaming",
  brand: "Logitech",
  rating: 4.7,
  reviews: 1890,
  stock: "In Stock",
  warranty: "2 Years",
  delivery: "Free Delivery",

  description:
    "Premium wireless gaming headset with immersive surround sound, crystal-clear microphone and ultra-lightweight design for long gaming sessions.",

  features: [
    "7.1 Surround Sound",
    "Noise Cancelling Mic",
    "Wireless Connectivity",
    "20 Hours Battery",
    "RGB Lighting"
  ],

  specifications: {
    Driver: "40 mm",
    Battery: "20 Hours",
    Weight: "278 g",
    Connectivity: "Wireless",
    Color: "Black"
  }
},

{
  id: 4,
  name: "Apple MacBook Air M4",
  price: "₹89,999",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",

  category: "Laptop",
  brand: "Apple",
  rating: 4.9,
  reviews: 5230,
  stock: "In Stock",
  warranty: "1 Year",
  delivery: "Free Delivery in 1 Day",

  description:
    "Powered by Apple's latest M4 processor, MacBook Air delivers blazing-fast performance, all-day battery life, stunning Retina display and ultra-lightweight design.",

  features: [
    "Apple M4 Processor",
    "16GB Unified Memory",
    "512GB SSD",
    "18 Hours Battery",
    "Liquid Retina Display"
  ],

  specifications: {
    Processor: "Apple M4",
    RAM: "16 GB",
    Storage: "512 GB SSD",
    Display: "13.6 inch",
    Weight: "1.24 kg"
  }
},
  {
  id: 5,
  name: "JBL Flip 7 Bluetooth Speaker",
  price: "₹6,499",
  image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",

  category: "Audio",
  brand: "JBL",
  rating: 4.8,
  reviews: 3125,
  stock: "In Stock",
  warranty: "1 Year",
  delivery: "Free Delivery Tomorrow",

  description:
    "Enjoy powerful JBL Original Pro Sound with deep bass and crystal-clear audio. Perfect for parties, travel, and outdoor adventures with IP67 waterproof protection.",

  features: [
    "30W Powerful Sound",
    "12 Hours Battery Backup",
    "Bluetooth 5.3",
    "IP67 Waterproof",
    "USB Type-C Charging"
  ],

  specifications: {
    Brand: "JBL",
    Battery: "12 Hours",
    Connectivity: "Bluetooth 5.3",
    Weight: "550 g",
    Color: "Black"
  }
},

{
  id: 6,
  name: "Canon EOS 200D DSLR Camera",
  price: "₹44,999",
  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",

  category: "Camera",
  brand: "Canon",
  rating: 4.9,
  reviews: 2840,
  stock: "In Stock",
  warranty: "2 Years",
  delivery: "Free Delivery in 2 Days",

  description:
    "Capture stunning photos and Full HD videos with the Canon EOS 200D DSLR featuring a 24.1MP APS-C sensor, Dual Pixel Autofocus and Wi-Fi connectivity.",

  features: [
    "24.1 MP Sensor",
    "Dual Pixel Autofocus",
    "Full HD Video Recording",
    "Wi-Fi & Bluetooth",
    "3-inch Touch Display"
  ],

  specifications: {
    Sensor: "24.1 MP APS-C",
    Lens: "18-55 mm",
    Video: "Full HD",
    Display: "3 inch Touchscreen",
    Weight: "453 g"
  }
},

{
  id: 7,
  name: "Samsung Galaxy S25",
  price: "₹74,999",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",

  category: "Smartphone",
  brand: "Samsung",
  rating: 4.8,
  reviews: 4250,
  stock: "In Stock",
  warranty: "1 Year",
  delivery: "Free Delivery Tomorrow",

  description:
    "Experience flagship performance with Galaxy S25 featuring Snapdragon processor, Dynamic AMOLED display, AI camera system and long-lasting battery.",

  features: [
    "Snapdragon Processor",
    "120Hz AMOLED Display",
    "50MP Triple Camera",
    "5000mAh Battery",
    "5G Support"
  ],

  specifications: {
    Display: "6.7 inch AMOLED",
    RAM: "12 GB",
    Storage: "256 GB",
    Battery: "5000 mAh",
    Camera: "50 MP + 12 MP + 10 MP"
  }
},

{
  id: 8,
  name: "American Tourister Backpack",
  price: "₹1,999",
  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",

  category: "Bags",
  brand: "American Tourister",
  rating: 4.7,
  reviews: 3521,
  stock: "In Stock",
  warranty: "1 Year",
  delivery: "Free Delivery",

  description:
    "A stylish and durable backpack designed for college, office and travel. Features multiple compartments, padded shoulder straps and water-resistant fabric.",

  features: [
    "25L Storage Capacity",
    "Water Resistant",
    "Laptop Compartment",
    "Comfortable Shoulder Straps",
    "Premium Fabric"
  ],

  specifications: {
    Capacity: "25 Litres",
    Material: "Polyester",
    Weight: "620 g",
    Compartments: "3",
    Color: "Navy Blue"
  }
},
 {
  id: 9,
  name: "Sony WH-1000XM5 Wireless Headphones",
  price: "₹24,999",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",

  category: "Audio",
  brand: "Sony",
  rating: 4.9,
  reviews: 6842,
  stock: "In Stock",
  warranty: "1 Year",
  delivery: "Free Delivery Tomorrow",
  offer: "15% OFF",
  emi: "EMI starts at ₹2,083/month",

  description:
    "Industry-leading noise cancellation with crystal-clear sound quality. Enjoy premium comfort, 30-hour battery life and intelligent adaptive audio for work, travel and entertainment.",

  features: [
    "Industry Leading ANC",
    "30 Hours Battery",
    "Hi-Res Audio",
    "Multipoint Bluetooth",
    "Fast Charging"
  ],

  specifications: {
    Driver: "30 mm",
    Battery: "30 Hours",
    Connectivity: "Bluetooth 5.3",
    Weight: "250 g",
    Color: "Black"
  }
},

{
  id: 10,
  name: "Apple iPad Air M3",
  price: "₹64,999",
  image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",

  category: "Tablet",
  brand: "Apple",
  rating: 4.9,
  reviews: 3150,
  stock: "In Stock",
  warranty: "1 Year",
  delivery: "Free Delivery in 1 Day",
  offer: "₹3,000 Instant Discount",
  emi: "No Cost EMI Available",

  description:
    "Powered by the Apple M3 chip, iPad Air delivers exceptional performance, vibrant Liquid Retina display and Apple Pencil support, making it perfect for productivity and creativity.",

  features: [
    "Apple M3 Chip",
    "Liquid Retina Display",
    "Apple Pencil Support",
    "USB-C Port",
    "Touch ID"
  ],

  specifications: {
    Display: "11 inch Liquid Retina",
    Processor: "Apple M3",
    Storage: "256 GB",
    Battery: "10 Hours",
    Weight: "462 g"
  }
},

{
  id: 11,
  name: "Keychron K2 Mechanical Keyboard",
  price: "₹6,999",
  image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",

  category: "Accessories",
  brand: "Keychron",
  rating: 4.8,
  reviews: 1924,
  stock: "Limited Stock",
  warranty: "1 Year",
  delivery: "Free Delivery",
  offer: "Best Seller",
  emi: "EMI Available",

  description:
    "Premium wireless mechanical keyboard with RGB backlighting, hot-swappable switches and Mac/Windows compatibility. Ideal for programmers and gamers.",

  features: [
    "Hot Swappable Switches",
    "RGB Backlight",
    "Bluetooth + Wired",
    "Mac & Windows Support",
    "4000mAh Battery"
  ],

  specifications: {
    Layout: "75%",
    Switch: "Gateron Red",
    Battery: "4000mAh",
    Connectivity: "Bluetooth + USB-C",
    Weight: "794 g"
  }
},

{
  id: 12,
  name: "Logitech G502 X Gaming Mouse",
  price: "₹4,499",
  image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",

  category: "Gaming",
  brand: "Logitech",
  rating: 4.8,
  reviews: 2845,
  stock: "In Stock",
  warranty: "2 Years",
  delivery: "Free Delivery Tomorrow",
  offer: "10% OFF",
  emi: "EMI Available",

  description:
    "High-performance gaming mouse featuring HERO sensor, programmable buttons and lightweight ergonomic design for maximum precision and speed.",

  features: [
    "HERO Sensor",
    "25K DPI",
    "13 Programmable Buttons",
    "Ultra Lightweight",
    "RGB Lighting"
  ],

  specifications: {
    DPI: "25,600",
    Buttons: "13",
    Weight: "89 g",
    Connectivity: "USB",
    Color: "Black"
  }
}, 
{
  id: 13,
  name: "Samsung 55-inch Crystal 4K Smart TV",
  price: "₹49,999",
  image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",

  category: "Television",
  brand: "Samsung",
  rating: 4.8,
  reviews: 4321,
  stock: "In Stock",
  warranty: "2 Years",
  delivery: "Free Delivery in 2 Days",
  offer: "Flat ₹5,000 OFF",
  emi: "No Cost EMI Available",

  description:
    "Enjoy a true cinematic experience with Samsung Crystal 4K Smart TV featuring HDR10+, Dolby Digital Plus sound, built-in OTT apps and voice assistant support.",

  features: [
    "55-inch Crystal 4K UHD Display",
    "HDR10+ Support",
    "Smart TV with OTT Apps",
    "Dolby Digital Plus",
    "Voice Assistant Built-in"
  ],

  specifications: {
    Display: "55-inch 4K UHD",
    Resolution: "3840 × 2160",
    Audio: "20W Dolby Digital",
    OS: "Tizen",
    Connectivity: "Wi-Fi, Bluetooth, HDMI, USB"
  }
},

{
  id: 14,
  name: "Apple MacBook Pro M4 Pro",
  price: "₹1,89,999",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",

  category: "Laptop",
  brand: "Apple",
  rating: 5.0,
  reviews: 2187,
  stock: "Limited Stock",
  warranty: "1 Year",
  delivery: "Free Delivery Tomorrow",
  offer: "Student Discount Available",
  emi: "EMI starts at ₹8,999/month",

  description:
    "The MacBook Pro powered by Apple's M4 Pro chip is built for developers, designers and content creators. Experience blazing-fast performance, exceptional battery life and a stunning Liquid Retina XDR display.",

  features: [
    "Apple M4 Pro Chip",
    "18GB Unified Memory",
    "1TB SSD",
    "Liquid Retina XDR Display",
    "22 Hours Battery Life"
  ],

  specifications: {
    Processor: "Apple M4 Pro",
    RAM: "18GB",
    Storage: "1TB SSD",
    Display: "14.2-inch Liquid Retina XDR",
    Weight: "1.6 kg"
  }
},

{
  id: 15,
  name: "Canon EOS R50 Mirrorless Camera",
  price: "₹74,999",
  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",

  category: "Camera",
  brand: "Canon",
  rating: 4.9,
  reviews: 1735,
  stock: "In Stock",
  warranty: "2 Years",
  delivery: "Free Delivery in 2 Days",
  offer: "Free Camera Bag Included",
  emi: "EMI Available",

  description:
    "Canon EOS R50 is a compact mirrorless camera with a 24.2MP APS-C sensor, 4K video recording, Dual Pixel autofocus and advanced subject tracking, making it ideal for creators and photographers.",

  features: [
    "24.2MP APS-C Sensor",
    "4K Video Recording",
    "Dual Pixel Autofocus",
    "Wi-Fi & Bluetooth",
    "Vari-angle Touchscreen"
  ],

  specifications: {
    Sensor: "24.2 MP APS-C",
    Video: "4K UHD",
    Display: "3-inch Touchscreen",
    Connectivity: "Wi-Fi & Bluetooth",
    Weight: "375 g"
  }
},

{
  id: 16,
  name: "Sony PlayStation 5 Slim",
  price: "₹54,990",
  image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",

  category: "Gaming Console",
  brand: "Sony",
  rating: 4.9,
  reviews: 6542,
  stock: "Best Seller",
  warranty: "1 Year",
  delivery: "Free Delivery Tomorrow",
  offer: "Free Game Worth ₹3,999",
  emi: "No Cost EMI Available",

  description:
    "Play the latest AAA titles with lightning-fast load times, stunning 4K graphics, ray tracing support and the immersive DualSense controller. The PS5 Slim delivers next-generation gaming in a compact design.",

  features: [
    "Ultra High-Speed SSD",
    "Ray Tracing Support",
    "4K Gaming",
    "DualSense Wireless Controller",
    "Tempest 3D Audio"
  ],

  specifications: {
    Storage: "1TB SSD",
    Resolution: "Up to 4K",
    FPS: "120 FPS Supported",
    Controller: "DualSense",
    Connectivity: "Wi-Fi 6, Bluetooth 5.1"
  }
}
];

export default products;