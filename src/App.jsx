import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  SlidersHorizontal,
  Check,
  Plus,
  Minus,
  Trash2,
  Maximize2,
  Ruler,
  Settings,
  BookOpen,
  Copy,
  MessageCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Download,
  ExternalLink,
  Package,
  MapPin,
  Phone,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';

/**
 * ============================================================================
 * 1. CENTRALIZED BRAND & SITE CONFIGURATION (src/config/siteConfig.js)
 * ============================================================================
 * Edit this object to customize every aspect of the JHAKKAS website without
 * rewriting component logic. You can also test changes live using the built-in
 * "Owner Studio & Guide" drawer in the top navigation bar.
 */
const INITIAL_SITE_CONFIG = {
  brand: {
    name: "JHAKKAS",
    wordmark: "JHAKKAS",
    tagline: "Contemporary Streetwear & Silhouettes — Dhaka, BD",
    logoUrl: "", // Leave empty to use the editorial typographic wordmark, or provide an image URL
    establishedText: "DHAKA // BANGLADESH",
    showDemoAssetBadges: true, // Highlights replaceable placeholder images for the brand owner
  },

  theme: {
    bgPrimary: "#F6F5F0",     // Warm Editorial Stone
    bgSecondary: "#ECEAE2",   // Raw Limestone Surface
    textPrimary: "#0E0E0E",   // Deep Carbon Ink
    textSecondary: "#5A5852", // Muted Charcoal
    accentPrimary: "#D9381E", // International Vermilion / Dhaka Rust Red
    borderHairline: "#D8D5CD",// 1px Exposed Architectural Grid Line
    fontDisplay: "'Syne', sans-serif",
    fontSans: "'Plus Jakarta Sans', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },

  announcementBar: {
    enabled: true,
    text: "DROP 01 / ARCHIVE & ESSENTIALS CATALOGUE — NATIONWIDE DISPATCH ACROSS BANGLADESH",
    linkText: "EXPLORE CATALOGUE",
    linkTarget: "shop",
  },

  hero: {
    eyebrow: "SEASONAL EDITORIAL // REPLACEABLE CAMPAIGN SLOT",
    headlineLine1: "DRESS YOUR",
    headlineLine2: "OWN WAY.",
    subcopy: "Architectural silhouettes, heavyweight jerseys, vintage-wash polos, and wide-leg bootcut trousers engineered for everyday movement.",
    primaryCtaText: "SHOP ALL GARMENTS",
    primaryCtaTarget: "shop",
    secondaryCtaText: "EXPLORE NEW ARRIVALS",
    secondaryCtaTarget: "new-arrivals",
    primaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    primaryImageAlt: "Replaceable Campaign Slot — Streetwear Full Silhouette",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    secondaryImageAlt: "Replaceable Campaign Slot — Editorial Detail",
    captionCode: "LOOK 01 // HEAVYWEIGHT ROTATION",
  },

  homepageSections: [
    { id: "hero", label: "01. Hero Campaign", enabled: true, order: 1 },
    { id: "categories", label: "02. Editorial Category Grid", enabled: true, order: 2 },
    { id: "featured", label: "03. Featured Garments", enabled: true, order: 3 },
    { id: "editorialBanner", label: "04. Visual Campaign Pause", enabled: true, order: 4 },
    { id: "newArrivals", label: "05. New Arrivals Drop", enabled: true, order: 5 },
    { id: "brandIntro", label: "06. About JHAKKAS Statement", enabled: true, order: 6 },
    { id: "socialStrip", label: "07. Community & Social Channels", enabled: true, order: 7 },
  ],

  categoriesConfig: [
    {
      id: "cat-polos",
      title: "RETRO POLOS",
      subtitle: "Knitted collars & vintage rugby stripes",
      categoryFilter: "Retro Polo T-shirts",
      aspectClass: "md:col-span-7 aspect-[16/11]",
      image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "cat-tees",
      title: "OVERSIZED TEES",
      subtitle: "Drop-shoulder boxy silhouettes",
      categoryFilter: "Vintage & Oversized T-shirts",
      aspectClass: "md:col-span-5 aspect-[4/5]",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "cat-bottoms",
      title: "BOOTCUT & BAGGY BOTTOMS",
      subtitle: "Bootcut denim, flared trousers & cargos",
      categoryFilter: "Bootcut Jeans & Trousers",
      aspectClass: "md:col-span-4 aspect-[4/5]",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "cat-outerwear",
      title: "HOODIES & OUTERWEAR",
      subtitle: "Heavyweight fleece & structured jackets",
      categoryFilter: "Jackets & Outerwear",
      aspectClass: "md:col-span-8 aspect-[16/10]",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
    },
  ],

  editorialBanner: {
    eyebrow: "SILHOUETTE STUDY // PROPORTION FIRST",
    headline: "MADE TO STAND OUT WITHOUT SHOUTING.",
    body: "Every JHAKKAS piece starts with proportion: wider shoulders, relaxed drapes, and bootcut breaks designed to stack cleanly over footwear. Replace this campaign block with your latest studio shoot or garment macro photography.",
    ctaText: "VIEW SIZE & FIT ARCHITECTURE",
    ctaTarget: "size-guide",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    detailImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
  },

  brandStatement: {
    heading: "INDEPENDENT STREETWEAR BUILT FOR EVERYDAY ROTATION IN BANGLADESH.",
    paragraph1: "JHAKKAS focuses on distinctive cuts—retro polo shirts, vintage-wash oversized tees, baggy joggers, and bootcut trousers—crafted for young adults who care about how a garment hangs and wears.",
    paragraph2: "[EDITABLE BRAND STORY PLACEHOLDER: Insert your authentic JHAKKAS founding story, studio location, and creative vision inside src/config/siteConfig.js. No fabricated history or unverified manufacturing claims are shown here.]",
  },

  currency: {
    symbol: "৳",
    code: "BDT",
  },

  orderHandoff: {
    primaryChannel: "whatsapp", // 'whatsapp' | 'messenger'
    // IMPORTANT: Set your real Bangladesh WhatsApp number (e.g., "8801700000000") when ready.
    // Leaving it blank or in placeholder mode triggers a helpful setup banner during checkout test.
    whatsappNumber: "8801700000000",
    isWhatsappConfigured: true, // Toggle false in Config Studio to test unconfigured safety state
    messengerUsername: "jhakkas.official.bd",
    deliveryPricingMode: "configured", // 'configured' | 'confirm_later'
    dhakaDeliveryCharge: 70,
    outsideDhakaDeliveryCharge: 130,
    allowCashOnDelivery: true,
    allowMobileBankingCoordination: true,
    mobileBankingNote: "bKash / Nagad payment numbers are shared directly by our team after verifying stock in chat. Never send money to unverified numbers.",
  },

  socialLinks: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
    youtube: "https://youtube.com/",
  },

  contactInfo: {
    email: "hello@jhakkas.com.bd",
    phoneDisplay: "+880 1700-000000 (Configurable Placeholder)",
    location: "Dhaka, Bangladesh (Update Studio / Pickup Address in siteConfig.js)",
    supportHours: "Saturday – Thursday, 11:00 AM – 8:00 PM BST",
  },

  policies: {
    deliveryText: "All orders placed on JHAKKAS are confirmed via WhatsApp or Messenger prior to dispatch. Standard delivery inside Dhaka City and nationwide courier dispatch across Bangladesh are available. Exact dispatch timelines and courier tracking details are shared directly once your order is confirmed.",
    returnsText: "EDITABLE EXCHANGE & RETURN TEMPLATE: Size exchanges or defective garment claims must be requested within [X] days of receiving your parcel. Items must remain unworn, unwashed, and retain original tags. Edit this policy in src/config/siteConfig.js to match your approved store terms.",
    privacyText: "EDITABLE PRIVACY POLICY DRAFT: JHAKKAS collects only the customer name, phone number, and delivery address entered at checkout in order to prepare your order message. Shopping cart contents are stored locally in your browser (localStorage). Review and finalize this text before commercial launch.",
    termsText: "EDITABLE TERMS & CONDITIONS DRAFT: Product prices are listed in Bangladeshi Taka (৳ BDT). Submitting an order message via WhatsApp or Messenger initiates an order request; final confirmation depends on stock verification. Review and customize these terms before launch.",
  }
};

/**
 * ============================================================================
 * 2. CENTRALIZED PRODUCT CATALOGUE (src/data/products.js)
 * ============================================================================
 * Add, edit, or remove products here. All pages, filters, search, and size
 * guides read dynamically from this array.
 */
const INITIAL_PRODUCTS = [
  {
    id: "jhk-001",
    sku: "JHK-PL-01",
    slug: "archive-striped-retro-polo",
    name: "Archive Striped Retro Knit Polo",
    category: "Retro Polo T-shirts",
    collection: "Drop 01: Street Classics",
    price: 1450,
    originalPrice: null,
    isNewArrival: true,
    isFeatured: true,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=1000&q=85",
        alt: "Archive Striped Retro Knit Polo — Front View (Demo Asset)"
      },
      {
        url: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=85",
        alt: "Archive Striped Retro Knit Polo — Alternate Angle (Demo Asset)"
      }
    ],
    colors: [
      { name: "Espresso / Cream", hex: "#2C221E" },
      { name: "Forest / Ecru", hex: "#1E3A2F" }
    ],
    sizes: [
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: false }
    ],
    measurementType: "top",
    measurements: {
      M: { chest: 42, length: 27.5, shoulder: 19.5 },
      L: { chest: 44, length: 28.5, shoulder: 20.5 },
      XL: { chest: 46, length: 29.5, shoulder: 21.5 },
      XXL: { chest: 48, length: 30.5, shoulder: 22.5 }
    },
    description: "Relaxed-fit retro polo featuring contrast collar detailing, open placket construction, and a boxy vintage silhouette designed to sit cleanly at the waist.",
    fit: "Relaxed Boxy Fit — Drop shoulder cut.",
    material: "Editable Material Placeholder (e.g., Heavyweight Pique / Cotton Knit).",
    care: "Machine wash cold inside out. Lay flat to dry. Do not iron directly on collar."
  },
  {
    id: "jhk-002",
    sku: "JHK-TS-02",
    slug: "acid-wash-boxy-heavy-tee",
    name: "Vintage Wash Oversized Heavy Tee",
    category: "Vintage & Oversized T-shirts",
    collection: "Drop 01: Street Classics",
    price: 1190,
    originalPrice: 1350,
    isNewArrival: true,
    isFeatured: true,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85",
        alt: "Vintage Wash Oversized Heavy Tee — Front View (Demo Asset)"
      },
      {
        url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85",
        alt: "Vintage Wash Oversized Heavy Tee — Back View (Demo Asset)"
      }
    ],
    colors: [
      { name: "Washed Charcoal", hex: "#363636" },
      { name: "Raw Bone", hex: "#E6E3DA" },
      { name: "Rust Oxide", hex: "#9E3B24" }
    ],
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true }
    ],
    measurementType: "top",
    measurements: {
      S: { chest: 42, length: 27, shoulder: 20 },
      M: { chest: 44, length: 28, shoulder: 21 },
      L: { chest: 46, length: 29, shoulder: 22 },
      XL: { chest: 48, length: 30, shoulder: 23 }
    },
    description: "Oversized streetwear t-shirt with thick ribbed crewneck collar and faded vintage pigment finish. Built with generous sleeve length for an authentic boxy drape.",
    fit: "Oversized Drop-Shoulder Fit.",
    material: "Editable Material Placeholder (e.g., 100% Combed Cotton Jersey).",
    care: "Wash separately in cold water. Colour fade is characteristic of vintage wash."
  },
  {
    id: "jhk-003",
    sku: "JHK-DN-03",
    slug: "flared-bootcut-denim-trousers",
    name: "Stacked Bootcut Denim Jeans",
    category: "Bootcut Jeans & Trousers",
    collection: "Core Silhouettes",
    price: 2250,
    originalPrice: null,
    isNewArrival: true,
    isFeatured: true,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85",
        alt: "Stacked Bootcut Denim Jeans — Full Cut (Demo Asset)"
      },
      {
        url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=85",
        alt: "Stacked Bootcut Denim Jeans — Detail (Demo Asset)"
      }
    ],
    colors: [
      { name: "Vintage Indigo", hex: "#2B3B4E" },
      { name: "Washed Black", hex: "#1C1C1C" }
    ],
    sizes: [
      { label: "30", inStock: true },
      { label: "32", inStock: true },
      { label: "34", inStock: true },
      { label: "36", inStock: false }
    ],
    measurementType: "bottom",
    measurements: {
      "30": { waist: 30, length: 41.5, thigh: 23, legOpening: 19 },
      "32": { waist: 32, length: 42.0, thigh: 24, legOpening: 19.5 },
      "34": { waist: 34, length: 42.5, thigh: 25, legOpening: 20 },
      "36": { waist: 36, length: 43.0, thigh: 26, legOpening: 20.5 }
    },
    description: "Engineered with a tailored upper block that flares subtly from the knee down into a clean bootcut hem, creating an elongated silhouette over chunky sneakers or boots.",
    fit: "Mid-rise, relaxed knee, flared bootcut leg opening.",
    material: "Editable Material Placeholder (e.g., Non-stretch Structured Denim).",
    care: "Turn inside out before washing cold. Hang dry in shade."
  },
  {
    id: "jhk-004",
    sku: "JHK-JG-04",
    slug: "wide-leg-baggy-fleece-joggers",
    name: "Wide-Leg Baggy Sweat Joggers",
    category: "Baggy Joggers",
    collection: "Core Silhouettes",
    price: 1650,
    originalPrice: null,
    isNewArrival: false,
    isFeatured: true,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=85",
        alt: "Wide-Leg Baggy Sweat Joggers — Front (Demo Asset)"
      },
      {
        url: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1000&q=85",
        alt: "Wide-Leg Baggy Sweat Joggers — Side Angle (Demo Asset)"
      }
    ],
    colors: [
      { name: "Heather Ash", hex: "#B8B8B4" },
      { name: "Carbon Black", hex: "#141414" }
    ],
    sizes: [
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true }
    ],
    measurementType: "bottom",
    measurements: {
      M: { waist: "29-32", length: 40.5, thigh: 25, legOpening: 18 },
      L: { waist: "32-35", length: 41.5, thigh: 26.5, legOpening: 19 },
      XL: { waist: "35-38", length: 42.5, thigh: 28, legOpening: 20 }
    },
    description: "Uncuffed wide-leg baggy joggers with deep side welt pockets, interior drawcord waist, and volume-pleated knees for unrestricted street movement.",
    fit: "Ultra-Baggy Wide Leg.",
    material: "Editable Material Placeholder (e.g., Loopback Cotton Fleece).",
    care: "Machine wash cold with similar colors."
  },
  {
    id: "jhk-005",
    sku: "JHK-HD-05",
    slug: "structured-drop-shoulder-hoodie",
    name: "Boxy Drop-Shoulder Pullover Hoodie",
    category: "Sweatshirts & Hoodies",
    collection: "Winter & Layering",
    price: 2100,
    originalPrice: 2450,
    isNewArrival: false,
    isFeatured: true,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
        alt: "Boxy Drop-Shoulder Pullover Hoodie — Front (Demo Asset)"
      },
      {
        url: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=85",
        alt: "Boxy Drop-Shoulder Pullover Hoodie — Hood Detail (Demo Asset)"
      }
    ],
    colors: [
      { name: "Obsidian", hex: "#121212" },
      { name: "Stone Grey", hex: "#8E8C84" }
    ],
    sizes: [
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: false }
    ],
    measurementType: "top",
    measurements: {
      M: { chest: 46, length: 27, shoulder: 22.5 },
      L: { chest: 48, length: 28, shoulder: 23.5 },
      XL: { chest: 50, length: 29, shoulder: 24.5 }
    },
    description: "Cropped-length, wide-chest pullover hoodie featuring a double-lined drawcord-free structured hood and kangaroo pocket.",
    fit: "Boxy Cropped Street Fit.",
    material: "Editable Material Placeholder (e.g., Heavy Brushed Fleece).",
    care: "Wash cold inside out. Do not tumble dry."
  },
  {
    id: "jhk-006",
    sku: "JHK-JK-06",
    slug: "utility-canvas-work-jacket",
    name: "Structured Utility Workwear Jacket",
    category: "Jackets & Outerwear",
    collection: "Winter & Layering",
    price: 2850,
    originalPrice: null,
    isNewArrival: true,
    isFeatured: true,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85",
        alt: "Structured Utility Workwear Jacket — Front (Demo Asset)"
      },
      {
        url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=85",
        alt: "Structured Utility Workwear Jacket — Alternate (Demo Asset)"
      }
    ],
    colors: [
      { name: "Tarmac Black", hex: "#1B1B1B" },
      { name: "Olive Drab", hex: "#4A5240" }
    ],
    sizes: [
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true }
    ],
    measurementType: "top",
    measurements: {
      M: { chest: 45, length: 27.5, shoulder: 20 },
      L: { chest: 47, length: 28.5, shoulder: 21 },
      XL: { chest: 49, length: 29.5, shoulder: 22 }
    },
    description: "Clean-lined outer layer with concealed zip storm placket, dual chest patch pockets, and adjustable snap cuffs.",
    fit: "Relaxed Layering Fit — Sized to fit over hoodies.",
    material: "Editable Material Placeholder (e.g., Heavy Twill / Canvas).",
    care: "Spot clean or gentle cold wash."
  },
  {
    id: "jhk-007",
    sku: "JHK-SH-07",
    slug: "relaxed-pleated-street-shorts",
    name: "Above-Knee Relaxed Carpenter Shorts",
    category: "Shorts",
    collection: "Core Silhouettes",
    price: 1290,
    originalPrice: null,
    isNewArrival: false,
    isFeatured: false,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=85",
        alt: "Above-Knee Relaxed Carpenter Shorts (Demo Asset)"
      }
    ],
    colors: [
      { name: "Sand Khaki", hex: "#C8B99E" },
      { name: "Pitch Black", hex: "#111111" }
    ],
    sizes: [
      { label: "30", inStock: true },
      { label: "32", inStock: true },
      { label: "34", inStock: true }
    ],
    measurementType: "bottom",
    measurements: {
      "30": { waist: 30, length: 20, thigh: 24, legOpening: 22 },
      "32": { waist: 32, length: 20.5, thigh: 25, legOpening: 23 },
      "34": { waist: 34, length: 21, thigh: 26, legOpening: 24 }
    },
    description: "Wide-cut utility shorts built for warm Bangladesh weather, featuring reinforced belt loops and utility pocket detailing.",
    fit: "Relaxed Wide Cut.",
    material: "Editable Material Placeholder (e.g., Breathable Cotton Twill).",
    care: "Machine wash cold."
  },
  {
    id: "jhk-008",
    sku: "JHK-FT-08",
    slug: "pleated-wide-bootcut-trousers",
    name: "Pleated Wide-Break Tailored Trousers",
    category: "Formal Trousers",
    collection: "Drop 01: Street Classics",
    price: 1950,
    originalPrice: null,
    isNewArrival: true,
    isFeatured: false,
    stockStatus: "in_stock",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85",
        alt: "Pleated Wide-Break Tailored Trousers (Demo Asset)"
      }
    ],
    colors: [
      { name: "Charcoal Slate", hex: "#2E2E30" },
      { name: "Espresso Brown", hex: "#382C26" }
    ],
    sizes: [
      { label: "30", inStock: true },
      { label: "32", inStock: true },
      { label: "34", inStock: true },
      { label: "36", inStock: true }
    ],
    measurementType: "bottom",
    measurements: {
      "30": { waist: 30, length: 41, thigh: 24, legOpening: 18.5 },
      "32": { waist: 32, length: 41.5, thigh: 25, legOpening: 19 },
      "34": { waist: 34, length: 42, thigh: 26, legOpening: 19.5 },
      "36": { waist: 36, length: 42.5, thigh: 27, legOpening: 20 }
    },
    description: "Double-pleated tailored trousers that bridge formal tailoring and streetwear volume. Pairs effortlessly with retro polos or boxy tees.",
    fit: "Relaxed Tailored Straight/Bootcut Drape.",
    material: "Editable Material Placeholder (e.g., Poly-Viscose Suiting Blend).",
    care: "Gentle cold wash or dry clean. Steam press."
  }
];

/**
 * ============================================================================
 * 3. UTILITY FUNCTIONS (Currency, Phone Validation, Order Message Builder)
 * ============================================================================
 */
const formatBDT = (amount, symbol = "৳") => {
  if (typeof amount !== "number" || isNaN(amount)) return `${symbol}0`;
  return `${symbol}${amount.toLocaleString("en-BD")}`;
};

const validateBangladeshPhone = (phone) => {
  const cleaned = (phone || "").replace(/[\s\-()]/g, "");
  // Matches 013-019 followed by 8 digits, with optional +88 or 88 prefix
  return /^(\+?88)?01[3-9]\d{8}$/.test(cleaned);
};

const buildOrderMessage = ({ customer, cartItems, subtotal, deliveryFee, total, config }) => {
  const sym = config.currency.symbol;
  const itemLines = cartItems
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.sku})\n   • Color: ${item.selectedColor} | Size: ${item.selectedSize}\n   • Qty: ${item.quantity} × ${formatBDT(item.price, sym)} = ${formatBDT(item.price * item.quantity, sym)}`
    )
    .join("\n\n");

  const deliveryLine =
    config.orderHandoff.deliveryPricingMode === "configured"
      ? `${formatBDT(deliveryFee, sym)} (${customer.deliveryZone === "dhaka" ? "Inside Dhaka" : "Outside Dhaka"})`
      : "To be confirmed based on location";

  const message = [
    `*NEW ORDER REQUEST — ${config.brand.name}*`,
    `----------------------------------`,
    `*Customer Details:*`,
    `Name: ${customer.fullName.trim()}`,
    `Phone: ${customer.phone.trim()}`,
    `Zone: ${customer.deliveryZone === "dhaka" ? "Inside Dhaka City" : "Outside Dhaka"}`,
    `Address: ${customer.address.trim()}, ${customer.area.trim()}`,
    customer.notes?.trim() ? `Notes: ${customer.notes.trim()}` : null,
    ``,
    `*Ordered Garments:*`,
    itemLines,
    ``,
    `----------------------------------`,
    `Subtotal: ${formatBDT(subtotal, sym)}`,
    `Delivery Charge: ${deliveryLine}`,
    `*TOTAL PAYABLE: ${formatBDT(total, sym)}*`,
    `Payment Preference: ${customer.paymentPreference === "cod" ? "Cash on Delivery (COD)" : "bKash / Nagad Coordination"}`,
    `----------------------------------`,
    `Please confirm stock availability and dispatch timeline.`
  ]
    .filter(Boolean)
    .join("\n");

  return message;
};

/**
 * ============================================================================
 * 4. MAIN APPLICATION COMPONENT
 * ============================================================================
 */
export default function App() {
  // --- Persistent Config & Catalogue State (For Live Owner Customization) ---
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("jhakkas_site_config_v1");
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONFIG;
    } catch {
      return INITIAL_SITE_CONFIG;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("jhakkas_products_v1");
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // --- Persistent Shopping Cart State ---
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("jhakkas_cart_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // --- Navigation & View State ---
  // Views: 'home' | 'shop' | 'product' | 'checkout' | 'about' | 'size-guide' | 'delivery' | 'returns' | 'contact' | 'privacy' | 'terms'
  const [currentView, setCurrentView] = useState("home");
  const [activeProductSlug, setActiveProductSlug] = useState(null);

  // --- Shop Filter & Search State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCollection, setSelectedCollection] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const [selectedColor, setSelectedColor] = useState("ALL");
  const [onlyNewArrivals, setOnlyNewArrivals] = useState(false);
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'newest' | 'price-asc' | 'price-desc'

  // --- UI Drawers & Modals ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isOwnerStudioOpen, setIsOwnerStudioOpen] = useState(false);
  const [ownerStudioTab, setOwnerStudioTab] = useState("customize"); // 'customize' | 'products' | 'guide' | 'export'
  const [toastMessage, setToastMessage] = useState(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("jhakkas_cart_v1", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // Save config & products to localStorage when edited in Studio
  useEffect(() => {
    try {
      localStorage.setItem("jhakkas_site_config_v1", JSON.stringify(siteConfig));
    } catch (e) {
      console.error("Failed to save config", e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem("jhakkas_products_v1", JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products", e);
    }
  }, [products]);

  // Update document title dynamically for SEO
  useEffect(() => {
    const brandName = siteConfig.brand.name;
    if (currentView === "home") {
      document.title = `${brandName} — ${siteConfig.brand.tagline}`;
    } else if (currentView === "shop") {
      document.title = `Shop All Garments — ${brandName}`;
    } else if (currentView === "product" && activeProductSlug) {
      const p = products.find((item) => item.slug === activeProductSlug);
      document.title = p ? `${p.name} — ${brandName}` : brandName;
    } else {
      document.title = `${currentView.toUpperCase()} — ${brandName}`;
    }
  }, [currentView, activeProductSlug, siteConfig.brand, products]);

  // Helper to show non-intrusive toast notifications
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // --- Navigation Helper ---
  const navigateTo = (view, options = {}) => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    if (options.category !== undefined) setSelectedCategory(options.category);
    if (options.collection !== undefined) setSelectedCollection(options.collection);
    if (options.onlyNew !== undefined) setOnlyNewArrivals(options.onlyNew);
    if (options.resetFilters) {
      setSelectedCategory("ALL");
      setSelectedCollection("ALL");
      setSelectedSize("ALL");
      setSelectedColor("ALL");
      setOnlyNewArrivals(false);
      setSearchQuery("");
    }
    if (options.productSlug) {
      setActiveProductSlug(options.productSlug);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Derived Catalogue Attributes ---
  const allCategories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["ALL", ...Array.from(set)];
  }, [products]);

  const allCollections = useMemo(() => {
    const set = new Set(products.map((p) => p.collection).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [products]);

  const allSizes = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s.label)));
    return ["ALL", ...Array.from(set)];
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return ["ALL", ...Array.from(set)];
  }, [products]);

  // --- Filtered & Sorted Products ---
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory !== "ALL" && product.category !== selectedCategory) return false;
        if (selectedCollection !== "ALL" && product.collection !== selectedCollection) return false;
        if (onlyNewArrivals && !product.isNewArrival) return false;
        if (selectedSize !== "ALL") {
          const sizeObj = product.sizes.find((s) => s.label === selectedSize);
          if (!sizeObj || !sizeObj.inStock) return false;
        }
        if (selectedColor !== "ALL") {
          const hasColor = product.colors.some((c) => c.name === selectedColor);
          if (!hasColor) return false;
        }
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchSku = product.sku.toLowerCase().includes(q);
          if (!matchName && !matchCategory && !matchSku) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // default 'featured'
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedCollection, onlyNewArrivals, selectedSize, selectedColor, searchQuery, sortBy]);

  // --- Cart Operations ---
  const addToCart = (product, sizeLabel, colorName, qty = 1) => {
    if (!sizeLabel) {
      triggerToast("Please select an available size first.");
      return false;
    }
    const sizeEntry = product.sizes.find((s) => s.label === sizeLabel);
    if (!sizeEntry || !sizeEntry.inStock) {
      triggerToast(`Size ${sizeLabel} is currently out of stock.`);
      return false;
    }

    const chosenColor = colorName || product.colors?.[0]?.name || "Standard";
    const lineId = `${product.id}__${sizeLabel}__${chosenColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.lineId === lineId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(10, updated[existingIndex].quantity + qty)
        };
        return updated;
      }
      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          slug: product.slug,
          sku: product.sku,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url || "",
          selectedSize: sizeLabel,
          selectedColor: chosenColor,
          quantity: Math.min(10, Math.max(1, qty))
        }
      ];
    });

    triggerToast(`Added ${product.name} (${sizeLabel}) to bag.`);
    return true;
  };

  const updateCartQuantity = (lineId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.lineId !== lineId) return item;
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: Math.min(10, nextQty) } : null;
        })
        .filter(Boolean)
    );
  };

  const removeCartItem = (lineId) => {
    setCart((prev) => prev.filter((item) => item.lineId !== lineId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  // Active product for PDP
  const activeProduct = useMemo(
    () => products.find((p) => p.slug === activeProductSlug) || products[0],
    [products, activeProductSlug]
  );

  return (
    <div
      style={{
        "--bg-primary": siteConfig.theme.bgPrimary,
        "--bg-secondary": siteConfig.theme.bgSecondary,
        "--text-primary": siteConfig.theme.textPrimary,
        "--text-secondary": siteConfig.theme.textSecondary,
        "--accent-primary": siteConfig.theme.accentPrimary,
        "--border-hairline": siteConfig.theme.borderHairline,
        "--font-display": siteConfig.theme.fontDisplay,
        "--font-sans": siteConfig.theme.fontSans,
        "--font-mono": siteConfig.theme.fontMono,
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-sans)",
      }}
      className="min-h-screen flex flex-col selection:bg-black selection:text-white antialiased"
    >
      {/* Load Google Fonts: Syne, Plus Jakarta Sans, JetBrains Mono */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        .font-display { font-family: var(--font-display); }
        .font-sans-ui { font-family: var(--font-sans); }
        .font-mono-spec { font-family: var(--font-mono); }

        .hairline-b { border-bottom: 1px solid var(--border-hairline); }
        .hairline-t { border-top: 1px solid var(--border-hairline); }
        .hairline-r { border-right: 1px solid var(--border-hairline); }
        .hairline-l { border-left: 1px solid var(--border-hairline); }
        .hairline-border { border: 1px solid var(--border-hairline); }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ====================================================================
          A. SLIM ANNOUNCEMENT BAR
      ==================================================================== */}
      {siteConfig.announcementBar.enabled && (
        <div
          style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
          className="w-full px-4 py-2 text-[11px] font-mono-spec tracking-widest uppercase flex items-center justify-between border-b border-neutral-800"
        >
          <span className="hidden sm:inline-block opacity-70">
            {siteConfig.brand.establishedText}
          </span>
          <div className="mx-auto sm:mx-0 text-center truncate">
            <span>{siteConfig.announcementBar.text}</span>
            {siteConfig.announcementBar.linkText && (
              <button
                onClick={() => {
                  if (siteConfig.announcementBar.linkTarget === "new-arrivals") {
                    navigateTo("shop", { resetFilters: true, onlyNew: true });
                  } else {
                    navigateTo("shop", { resetFilters: true });
                  }
                }}
                style={{ color: "var(--accent-primary)" }}
                className="ml-3 underline underline-offset-4 font-semibold hover:opacity-80 transition-opacity"
              >
                {siteConfig.announcementBar.linkText} →
              </button>
            )}
          </div>
          <button
            onClick={() => setIsOwnerStudioOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-[10px] px-2 py-0.5 border border-neutral-700 hover:border-white transition-colors"
            title="Open Owner Config Studio & Guide"
          >
            <Settings className="w-3 h-3" />
            <span>EDIT SITE / GUIDE</span>
          </button>
        </div>
      )}

      {/* ====================================================================
          B. STICKY ARCHITECTURAL HEADER & MEGA-MENU
      ==================================================================== */}
      <header
        style={{ backgroundColor: "var(--bg-primary)" }}
        className="sticky top-0 z-40 hairline-b transition-colors"
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger + Wordmark */}
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:opacity-70 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateTo("home", { resetFilters: true })}
              className="text-left focus:outline-none group"
            >
              {siteConfig.brand.logoUrl ? (
                <img
                  src={siteConfig.brand.logoUrl}
                  alt={siteConfig.brand.name}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              ) : (
                <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter uppercase block leading-none">
                  {siteConfig.brand.wordmark}
                </span>
              )}
            </button>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-[0.14em] uppercase">
            <button
              onClick={() => navigateTo("shop", { resetFilters: true, onlyNew: true })}
              className={`py-2 transition-colors hover:opacity-60 ${
                currentView === "shop" && onlyNewArrivals ? "underline underline-offset-8 decoration-2" : ""
              }`}
            >
              New Arrivals
            </button>

            <div
              className="relative py-6"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => navigateTo("shop", { resetFilters: true })}
                className={`flex items-center gap-1.5 uppercase tracking-[0.14em] hover:opacity-60 ${
                  currentView === "shop" && !onlyNewArrivals ? "underline underline-offset-8 decoration-2" : ""
                }`}
              >
                <span>Clothing</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => {
                navigateTo("shop", { resetFilters: true, collection: "Drop 01: Street Classics" });
              }}
              className="py-2 hover:opacity-60 transition-opacity"
            >
              Collections
            </button>

            <button
              onClick={() => navigateTo("size-guide")}
              className={`py-2 hover:opacity-60 transition-opacity ${
                currentView === "size-guide" ? "underline underline-offset-8 decoration-2" : ""
              }`}
            >
              Size Guide
            </button>

            <button
              onClick={() => navigateTo("about")}
              className={`py-2 hover:opacity-60 transition-opacity ${
                currentView === "about" ? "underline underline-offset-8 decoration-2" : ""
              }`}
            >
              About
            </button>
          </nav>

          {/* Right: Search, Owner Studio, Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsSearchBarOpen((prev) => !prev)}
              className="p-2 hover:opacity-60 transition-opacity flex items-center gap-1.5 text-xs font-mono-spec uppercase"
              aria-label="Search Catalogue"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xl:inline">Search</span>
            </button>

            <button
              onClick={() => setIsOwnerStudioOpen(true)}
              style={{ borderColor: "var(--border-hairline)" }}
              className="px-2.5 py-1.5 border text-[11px] font-mono-spec uppercase tracking-wider flex items-center gap-1.5 hover:bg-black hover:text-white transition-colors"
              title="Customize site settings, add products, or read Owner Guide"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Owner Studio</span>
            </button>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              style={{
                backgroundColor: totalCartItems > 0 ? "var(--text-primary)" : "transparent",
                color: totalCartItems > 0 ? "var(--bg-primary)" : "var(--text-primary)",
                borderColor: "var(--text-primary)"
              }}
              className="px-3 sm:px-4 py-2 border text-xs font-mono-spec uppercase tracking-wider flex items-center gap-2 transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="font-bold">({totalCartItems})</span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchBarOpen && (
          <div
            style={{ backgroundColor: "var(--bg-secondary)" }}
            className="hairline-t px-4 sm:px-8 py-4"
          >
            <div className="max-w-[1440px] mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 opacity-60 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== "shop") setCurrentView("shop");
                }}
                placeholder="Search by garment name, category (e.g. Bootcut, Polo, Hoodie), or SKU..."
                className="w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder:opacity-50 font-sans-ui"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-mono-spec uppercase underline opacity-70 hover:opacity-100"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchBarOpen(false)}
                className="p-1 opacity-70 hover:opacity-100"
                aria-label="Close Search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Editorial Desktop Mega-Menu */}
        {isMegaMenuOpen && (
          <div
            style={{ backgroundColor: "var(--bg-primary)" }}
            className="hidden lg:block absolute left-0 right-0 top-full hairline-b shadow-2xl z-50"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="max-w-[1440px] mx-auto grid grid-cols-12">
              {/* Column 1: Categories */}
              <div className="col-span-4 p-8 hairline-r">
                <p className="font-mono-spec text-[11px] uppercase tracking-widest opacity-60 mb-4">
                  01 / GARMENT CATEGORIES
                </p>
                <ul className="space-y-2.5">
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          navigateTo("shop", {
                            resetFilters: true,
                            category: cat
                          });
                        }}
                        className="text-sm font-medium hover:translate-x-1 transition-transform flex items-center justify-between w-full text-left py-0.5"
                      >
                        <span>{cat === "ALL" ? "All Clothing Catalogue" : cat}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Collections & Curations */}
              <div className="col-span-4 p-8 hairline-r flex flex-col justify-between">
                <div>
                  <p className="font-mono-spec text-[11px] uppercase tracking-widest opacity-60 mb-4">
                    02 / CURATED ROTATIONS
                  </p>
                  <ul className="space-y-2.5">
                    <li>
                      <button
                        onClick={() => navigateTo("shop", { resetFilters: true, onlyNew: true })}
                        style={{ color: "var(--accent-primary)" }}
                        className="text-sm font-semibold flex items-center gap-2 hover:underline"
                      >
                        <span>New Arrivals Drop</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </li>
                    {allCollections
                      .filter((c) => c !== "ALL")
                      .map((col) => (
                        <li key={col}>
                          <button
                            onClick={() =>
                              navigateTo("shop", { resetFilters: true, collection: col })
                            }
                            className="text-sm font-medium hover:underline text-left"
                          >
                            {col}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-6 hairline-t">
                  <p className="font-mono-spec text-[11px] opacity-60 uppercase mb-1">
                    FIT & SIZING ASSISTANCE
                  </p>
                  <button
                    onClick={() => navigateTo("size-guide")}
                    className="text-xs font-mono-spec uppercase underline underline-offset-4"
                  >
                    Inspect Garment Measurement Charts →
                  </button>
                </div>
              </div>

              {/* Column 3: Editorial Look Card */}
              <div className="col-span-4 p-8 bg-black/5 flex items-center gap-6">
                <div className="w-36 aspect-[3/4] overflow-hidden bg-neutral-200 shrink-0 relative">
                  <img
                    src={siteConfig.hero.secondaryImage}
                    alt="Featured Look"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-mono-spec text-[10px] uppercase tracking-widest px-2 py-0.5 bg-black text-white inline-block mb-2">
                    FEATURED SILHOUETTE
                  </span>
                  <h4 className="font-display font-bold text-lg uppercase leading-tight mb-2">
                    Bootcut & Boxy Proportions
                  </h4>
                  <p className="text-xs opacity-75 mb-4 leading-relaxed">
                    Explore wide-leg denim and vintage-wash knit polos built for Bangladesh street styling.
                  </p>
                  <button
                    onClick={() =>
                      navigateTo("shop", {
                        resetFilters: true,
                        category: "Bootcut Jeans & Trousers"
                      })
                    }
                    className="text-xs font-mono-spec uppercase underline underline-offset-4 font-semibold"
                  >
                    Shop Bottoms →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          C. MOBILE NAVIGATION DRAWER
      ==================================================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            style={{ backgroundColor: "var(--bg-primary)" }}
            className="relative w-[88%] max-w-sm h-full z-10 flex flex-col justify-between overflow-y-auto hairline-r"
          >
            <div>
              <div className="p-5 hairline-b flex items-center justify-between">
                <span className="font-display font-extrabold text-xl tracking-tighter uppercase">
                  {siteConfig.brand.wordmark}
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                <div>
                  <p className="font-mono-spec text-[10px] uppercase tracking-widest opacity-50 mb-3">
                    DIRECT NAVIGATION
                  </p>
                  <ul className="space-y-3 text-base font-display font-bold uppercase">
                    <li>
                      <button
                        onClick={() => navigateTo("home", { resetFilters: true })}
                        className="w-full text-left py-1"
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigateTo("shop", { resetFilters: true, onlyNew: true })}
                        style={{ color: "var(--accent-primary)" }}
                        className="w-full text-left py-1"
                      >
                        New Arrivals Drop
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigateTo("shop", { resetFilters: true })}
                        className="w-full text-left py-1"
                      >
                        Shop All Clothing ({products.length})
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 hairline-t">
                  <p className="font-mono-spec text-[10px] uppercase tracking-widest opacity-50 mb-3">
                    BY CATEGORY
                  </p>
                  <ul className="space-y-2.5 text-sm font-medium">
                    {allCategories
                      .filter((c) => c !== "ALL")
                      .map((cat) => (
                        <li key={cat}>
                          <button
                            onClick={() =>
                              navigateTo("shop", { resetFilters: true, category: cat })
                            }
                            className="w-full text-left py-1 flex items-center justify-between"
                          >
                            <span>{cat}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-4 hairline-t">
                  <p className="font-mono-spec text-[10px] uppercase tracking-widest opacity-50 mb-3">
                    INFORMATION & FIT
                  </p>
                  <ul className="space-y-2.5 text-xs font-mono-spec uppercase">
                    <li>
                      <button onClick={() => navigateTo("size-guide")} className="py-1">
                        Size & Fit Guide
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo("about")} className="py-1">
                        About {siteConfig.brand.name}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo("delivery")} className="py-1">
                        Delivery Information
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo("returns")} className="py-1">
                        Returns & Exchanges
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo("contact")} className="py-1">
                        Contact & Channels
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 hairline-t bg-black/5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsOwnerStudioOpen(true);
                }}
                className="w-full py-3 bg-black text-white text-xs font-mono-spec uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                <span>Open Owner Studio & Guide</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          D. MAIN VIEW ROUTER
      ==================================================================== */}
      <main className="flex-1">
        {currentView === "home" && (
          <HomeView
            siteConfig={siteConfig}
            products={products}
            navigateTo={navigateTo}
            addToCart={addToCart}
          />
        )}

        {currentView === "shop" && (
          <ShopView
            siteConfig={siteConfig}
            products={filteredProducts}
            totalCatalogueCount={products.length}
            allCategories={allCategories}
            allCollections={allCollections}
            allSizes={allSizes}
            allColors={allColors}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            onlyNewArrivals={onlyNewArrivals}
            setOnlyNewArrivals={setOnlyNewArrivals}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
            navigateTo={navigateTo}
            addToCart={addToCart}
          />
        )}

        {currentView === "product" && activeProduct && (
          <ProductDetailView
            siteConfig={siteConfig}
            product={activeProduct}
            allProducts={products}
            navigateTo={navigateTo}
            addToCart={addToCart}
            openCartDrawer={() => setIsCartDrawerOpen(true)}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutView
            siteConfig={siteConfig}
            cart={cart}
            cartSubtotal={cartSubtotal}
            updateCartQuantity={updateCartQuantity}
            removeCartItem={removeCartItem}
            clearCart={clearCart}
            navigateTo={navigateTo}
            openOwnerStudio={() => setIsOwnerStudioOpen(true)}
            triggerToast={triggerToast}
          />
        )}

        {(currentView === "about" ||
          currentView === "size-guide" ||
          currentView === "delivery" ||
          currentView === "returns" ||
          currentView === "contact" ||
          currentView === "privacy" ||
          currentView === "terms") && (
          <SecondaryPageView
            view={currentView}
            siteConfig={siteConfig}
            products={products}
            navigateTo={navigateTo}
          />
        )}
      </main>

      {/* ====================================================================
          E. EDITORIAL FOOTER
      ==================================================================== */}
      <footer
        style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
        className="mt-20 border-t border-neutral-800"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="md:col-span-5 p-8 sm:p-12 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="font-mono-spec text-[11px] uppercase tracking-widest opacity-50 block mb-3">
                {siteConfig.brand.establishedText}
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter uppercase mb-4">
                {siteConfig.brand.wordmark}
              </h2>
              <p className="text-sm opacity-75 max-w-md leading-relaxed">
                {siteConfig.brand.tagline}. Built with deliberate silhouettes, clear garment measurements, and direct customer order dispatch across Bangladesh.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-4 text-xs font-mono-spec uppercase">
              {siteConfig.socialLinks.instagram && (
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Instagram <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {siteConfig.socialLinks.facebook && (
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  Facebook <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {siteConfig.socialLinks.tiktok && (
                <a
                  href={siteConfig.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  TikTok <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {siteConfig.socialLinks.youtube && (
                <a
                  href={siteConfig.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  YouTube <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Shop Navigation */}
          <div className="md:col-span-3 p-8 sm:p-12 border-b md:border-b-0 md:border-r border-neutral-800">
            <h3 className="font-mono-spec text-xs uppercase tracking-widest opacity-50 mb-5">
              CATALOGUE
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo("shop", { resetFilters: true, onlyNew: true })}
                  className="hover:underline text-left"
                >
                  New Arrivals
                </button>
              </li>
              {allCategories
                .filter((c) => c !== "ALL")
                .map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => navigateTo("shop", { resetFilters: true, category: cat })}
                      className="hover:underline text-left opacity-85 hover:opacity-100"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="md:col-span-4 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <h3 className="font-mono-spec text-xs uppercase tracking-widest opacity-50 mb-5">
                ASSISTANCE & POLICIES
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                <li>
                  <button onClick={() => navigateTo("size-guide")} className="hover:underline">
                    Size & Fit Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("delivery")} className="hover:underline">
                    Delivery Information
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("returns")} className="hover:underline">
                    Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("about")} className="hover:underline">
                    About {siteConfig.brand.name}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("contact")} className="hover:underline">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("privacy")} className="hover:underline">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo("terms")} className="hover:underline">
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 text-xs font-mono-spec opacity-75 space-y-1">
              <p>DIRECT CONTACT: {siteConfig.contactInfo.phoneDisplay}</p>
              <p>LOCATION: {siteConfig.contactInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Owner Config Trigger */}
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-spec opacity-60">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved. Prices in Bangladeshi Taka ({siteConfig.currency.symbol} {siteConfig.currency.code}).
          </p>
          <button
            onClick={() => setIsOwnerStudioOpen(true)}
            className="underline hover:opacity-100"
          >
            Open Owner Configuration & Deployment Manual
          </button>
        </div>
      </footer>

      {/* ====================================================================
          F. SLIDE-OVER SHOPPING BAG DRAWER
      ==================================================================== */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsCartDrawerOpen(false)}
          />
          <div
            style={{ backgroundColor: "var(--bg-primary)" }}
            className="relative w-full max-w-md h-full z-10 flex flex-col justify-between hairline-l"
          >
            {/* Header */}
            <div className="p-6 hairline-b flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5" />
                <h3 className="font-display font-bold text-lg uppercase tracking-tight">
                  Shopping Bag ({totalCartItems})
                </h3>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 hover:opacity-60"
                aria-label="Close Shopping Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Line Items */}
            {cart.length === 0 ? (
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                <p className="font-mono-spec text-xs uppercase tracking-widest opacity-50 mb-2">
                  YOUR BAG IS CURRENTLY EMPTY
                </p>
                <p className="text-sm opacity-75 max-w-xs mb-6">
                  Explore our retro polos, oversized tees, and bootcut trousers to build your rotation.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo("shop", { resetFilters: true });
                  }}
                  style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                  className="px-6 py-3.5 text-xs font-mono-spec uppercase tracking-widest"
                >
                  Explore Catalogue →
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto divide-y divide-neutral-300">
                  {cart.map((item) => (
                    <div key={item.lineId} className="p-5 flex gap-4">
                      <button
                        onClick={() => {
                          setIsCartDrawerOpen(false);
                          navigateTo("product", { productSlug: item.slug });
                        }}
                        className="w-20 aspect-[3/4] bg-neutral-200 shrink-0 overflow-hidden hairline-border"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </button>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <button
                              onClick={() => {
                                setIsCartDrawerOpen(false);
                                navigateTo("product", { productSlug: item.slug });
                              }}
                              className="text-sm font-semibold text-left hover:underline leading-snug"
                            >
                              {item.name}
                            </button>
                            <button
                              onClick={() => removeCartItem(item.lineId)}
                              className="opacity-50 hover:opacity-100 p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-mono-spec text-xs opacity-65 mt-1">
                            Size: <strong className="font-semibold">{item.selectedSize}</strong> | Color: {item.selectedColor}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center hairline-border">
                            <button
                              onClick={() => updateCartQuantity(item.lineId, -1)}
                              className="px-2.5 py-1 hover:bg-black/5"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 font-mono-spec text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.lineId, 1)}
                              className="px-2.5 py-1 hover:bg-black/5"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono-spec text-sm font-semibold">
                            {formatBDT(item.price * item.quantity, siteConfig.currency.symbol)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer / Checkout Trigger */}
                <div
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                  className="p-6 hairline-t space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono-spec">
                    <span className="uppercase opacity-70">Bag Subtotal</span>
                    <span className="text-base font-bold">
                      {formatBDT(cartSubtotal, siteConfig.currency.symbol)}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed">
                    Delivery charge ({siteConfig.orderHandoff.deliveryPricingMode === "configured"
                      ? `Inside Dhaka ${formatBDT(siteConfig.orderHandoff.dhakaDeliveryCharge, siteConfig.currency.symbol)} / Outside Dhaka ${formatBDT(siteConfig.orderHandoff.outsideDhakaDeliveryCharge, siteConfig.currency.symbol)}`
                      : "Confirmed upon dispatch"}) is calculated on the next screen.
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        navigateTo("checkout");
                      }}
                      style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                      className="w-full py-4 text-xs font-mono-spec uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                    >
                      <span>Proceed to Order Handoff</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-[11px] font-mono-spec uppercase opacity-60 hover:opacity-100 underline"
                    >
                      Clear Shopping Bag
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          G. OWNER CONFIG STUDIO & INTERACTIVE OWNER_GUIDE.md DRAWER
      ==================================================================== */}
      {isOwnerStudioOpen && (
        <OwnerStudioModal
          siteConfig={siteConfig}
          setSiteConfig={setSiteConfig}
          products={products}
          setProducts={setProducts}
          activeTab={ownerStudioTab}
          setActiveTab={setOwnerStudioTab}
          onClose={() => setIsOwnerStudioOpen(false)}
          triggerToast={triggerToast}
        />
      )}

      {/* Non-intrusive Toast Notification */}
      {toastMessage && (
        <div
          style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
          className="fixed bottom-6 right-6 z-50 px-5 py-3.5 shadow-2xl border border-neutral-700 flex items-center gap-3 max-w-sm"
        >
          <Check className="w-4 h-4 shrink-0" style={{ color: "var(--accent-primary)" }} />
          <span className="text-xs font-mono-spec">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

/**
 * ============================================================================
 * 5. REUSABLE PRODUCT CARD COMPONENT
 * ============================================================================
 */
function ProductCard({ product, siteConfig, navigateTo, addToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasSecondaryImage = product.images && product.images.length > 1;
  const displayedImage =
    isHovered && hasSecondaryImage ? product.images[1] : product.images[0];

  return (
    <div
      className="group flex flex-col justify-between hairline-b hairline-r bg-transparent relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container (3:4 Portrait) */}
      <div className="relative w-full aspect-[3/4] bg-neutral-200 overflow-hidden">
        <button
          onClick={() => navigateTo("product", { productSlug: product.slug })}
          className="w-full h-full block text-left focus:outline-none"
        >
          <img
            src={displayedImage?.url}
            alt={displayedImage?.alt || product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1">
            {product.isNewArrival && (
              <span
                style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                className="px-2 py-0.5 text-[10px] font-mono-spec uppercase tracking-wider inline-block"
              >
                NEW DROP
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span
                style={{ backgroundColor: "var(--accent-primary)", color: "#FFFFFF" }}
                className="px-2 py-0.5 text-[10px] font-mono-spec uppercase tracking-wider inline-block"
              >
                ARCHIVAL PRICE
              </span>
            )}
          </div>

          {siteConfig.brand.showDemoAssetBadges && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono-spec uppercase bg-white/90 text-black border border-black/20">
              DEMO PHOTO SLOT
            </span>
          )}
        </div>

        {/* Desktop Quick-Add Size Bar on Hover */}
        <div className="hidden lg:block absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 bg-black/90 text-white p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono-spec text-[10px] uppercase tracking-widest opacity-75">
              QUICK ADD SIZE
            </span>
            <span className="font-mono-spec text-[10px] opacity-60">{product.sku}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                disabled={!s.inStock}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, s.label, product.colors?.[0]?.name, 1);
                }}
                className={`py-1.5 text-xs font-mono-spec uppercase border ${
                  s.inStock
                    ? "border-neutral-600 hover:bg-white hover:text-black transition-colors"
                    : "border-neutral-800 opacity-35 line-through cursor-not-allowed"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono-spec opacity-60 uppercase mb-1">
            <span className="truncate">{product.category}</span>
            <span>{product.sku}</span>
          </div>
          <button
            onClick={() => navigateTo("product", { productSlug: product.slug })}
            className="text-left font-medium text-sm sm:text-base hover:underline leading-snug block mb-3"
          >
            {product.name}
          </button>
        </div>

        <div className="flex items-end justify-between pt-2 hairline-t">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5" title="Available Colors">
            {product.colors.map((c) => (
              <span
                key={c.name}
                style={{ backgroundColor: c.hex }}
                className="w-3 h-3 rounded-none border border-black/30 inline-block"
                title={c.name}
              />
            ))}
            <span className="text-[11px] font-mono-spec opacity-60 ml-1">
              {product.colors.length} {product.colors.length === 1 ? "CLR" : "CLRS"}
            </span>
          </div>

          {/* Price in BDT */}
          <div className="text-right font-mono-spec">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs line-through opacity-50 mr-2">
                {formatBDT(product.originalPrice, siteConfig.currency.symbol)}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold">
              {formatBDT(product.price, siteConfig.currency.symbol)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 6. HOMEPAGE VIEW (Configurable & Reorderable Editorial Sections)
 * ============================================================================
 */
function HomeView({ siteConfig, products, navigateTo, addToCart }) {
  const orderedSections = useMemo(() => {
    return [...siteConfig.homepageSections]
      .filter((sec) => sec.enabled)
      .sort((a, b) => a.order - b.order);
  }, [siteConfig.homepageSections]);

  const featuredProducts = useMemo(
    () => products.filter((p) => p.isFeatured).slice(0, 4),
    [products]
  );

  const newArrivalProducts = useMemo(
    () => products.filter((p) => p.isNewArrival).slice(0, 4),
    [products]
  );

  const renderSection = (secId) => {
    switch (secId) {
      case "hero":
        return (
          <section key="hero" className="max-w-[1440px] mx-auto hairline-b">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 7 Cols: Primary Editorial Campaign Image */}
              <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[600px] lg:min-h-[720px] bg-neutral-300 overflow-hidden hairline-b lg:hairline-b-0 lg:hairline-r">
                <img
                  src={siteConfig.hero.primaryImage}
                  alt={siteConfig.hero.primaryImageAlt}
                  className="w-full h-full object-cover object-center"
                />
                {siteConfig.brand.showDemoAssetBadges && (
                  <div className="absolute top-4 left-4 bg-black/85 text-white px-3 py-1 text-[10px] font-mono-spec uppercase tracking-widest">
                    REPLACEABLE HERO CAMPAIGN SLOT (edit in siteConfig.js)
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono-spec bg-black/70 px-3.5 py-2">
                  <span>{siteConfig.hero.captionCode}</span>
                  <span>{siteConfig.brand.name} STUDIO</span>
                </div>
              </div>

              {/* Right 5 Cols: Asymmetric Typography & Secondary Crop */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
                <div>
                  <span
                    style={{ color: "var(--accent-primary)" }}
                    className="font-mono-spec text-xs uppercase tracking-widest font-semibold block mb-4"
                  >
                    {siteConfig.hero.eyebrow}
                  </span>

                  <h1 className="font-display font-extrabold text-5xl sm:text-6xl xl:text-7xl tracking-tighter uppercase leading-[0.92] mb-6">
                    <span className="block">{siteConfig.hero.headlineLine1}</span>
                    <span className="block">{siteConfig.hero.headlineLine2}</span>
                  </h1>

                  <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-8 max-w-md">
                    {siteConfig.hero.subcopy}
                  </p>

                  <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                    <button
                      onClick={() => navigateTo("shop", { resetFilters: true })}
                      style={{
                        backgroundColor: "var(--text-primary)",
                        color: "var(--bg-primary)"
                      }}
                      className="px-7 py-4 text-xs font-mono-spec uppercase tracking-widest font-semibold flex items-center justify-between gap-4 hover:opacity-90 transition-opacity"
                    >
                      <span>{siteConfig.hero.primaryCtaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        navigateTo("shop", { resetFilters: true, onlyNew: true })
                      }
                      className="px-6 py-4 text-xs font-mono-spec uppercase tracking-widest font-semibold hairline-border hover:bg-black hover:text-white transition-colors text-left flex items-center justify-between gap-3"
                    >
                      <span>{siteConfig.hero.secondaryCtaText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Secondary Detail Crop */}
                <div className="mt-10 pt-8 hairline-t grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-5 aspect-[4/5] bg-neutral-200 overflow-hidden hairline-border">
                    <img
                      src={siteConfig.hero.secondaryImage}
                      alt={siteConfig.hero.secondaryImageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-7 font-mono-spec text-[11px] space-y-1.5 opacity-75">
                    <p className="uppercase font-semibold text-black">
                      SILHOUETTE INDEX:
                    </p>
                    <p>• RETRO KNIT POLOS</p>
                    <p>• BOXY DROP-SHOULDER TEES</p>
                    <p>• STACKED BOOTCUT DENIM</p>
                    <p>• WIDE-LEG FLEECE JOGGERS</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "categories":
        return (
          <section key="categories" className="max-w-[1440px] mx-auto hairline-b">
            <div className="px-6 sm:px-10 py-8 hairline-b flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-1">
                  01 // DEPARTMENT ARCHITECTURE
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight">
                  Shop By Silhouette
                </h2>
              </div>
              <button
                onClick={() => navigateTo("shop", { resetFilters: true })}
                className="text-xs font-mono-spec uppercase tracking-widest underline underline-offset-4 self-start sm:self-auto"
              >
                View Full Catalogue ({products.length}) →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {siteConfig.categoriesConfig.map((cat, idx) => (
                <div
                  key={cat.id}
                  className={`${cat.aspectClass} relative group overflow-hidden bg-neutral-300 hairline-b ${
                    idx % 2 === 0 ? "md:hairline-r" : ""
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <span className="font-mono-spec text-xs uppercase tracking-widest px-2.5 py-1 bg-black/75">
                        0{idx + 1} / CATEGORY
                      </span>
                      {siteConfig.brand.showDemoAssetBadges && (
                        <span className="font-mono-spec text-[10px] uppercase px-2 py-0.5 bg-white/90 text-black">
                          REPLACEABLE SLOT
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="font-mono-spec text-xs opacity-80 mb-1">
                        {cat.subtitle}
                      </p>
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight">
                          {cat.title}
                        </h3>
                        <button
                          onClick={() =>
                            navigateTo("shop", {
                              resetFilters: true,
                              category: cat.categoryFilter
                            })
                          }
                          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
                          className="px-4 py-2.5 text-xs font-mono-spec uppercase tracking-wider font-semibold shrink-0 flex items-center gap-1.5 group-hover:bg-black group-hover:text-white transition-colors"
                        >
                          <span>Explore</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "featured":
        return (
          <section key="featured" className="max-w-[1440px] mx-auto hairline-b">
            <div className="px-6 sm:px-10 py-8 hairline-b flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-1">
                  02 // CURATED MERCHANDISING
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight">
                  Featured Rotation
                </h2>
              </div>
              <button
                onClick={() => navigateTo("shop", { resetFilters: true })}
                className="text-xs font-mono-spec uppercase tracking-widest underline underline-offset-4"
              >
                Explore All Garments →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 hairline-l">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  siteConfig={siteConfig}
                  navigateTo={navigateTo}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </section>
        );

      case "editorialBanner":
        return (
          <section
            key="editorialBanner"
            style={{ backgroundColor: "var(--bg-secondary)" }}
            className="max-w-[1440px] mx-auto hairline-b"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 p-8 sm:p-14 lg:p-16 flex flex-col justify-between hairline-b lg:hairline-b-0 lg:hairline-r">
                <div>
                  <span
                    style={{ color: "var(--accent-primary)" }}
                    className="font-mono-spec text-xs uppercase tracking-widest block mb-3"
                  >
                    {siteConfig.editorialBanner.eyebrow}
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight leading-[0.98] mb-6">
                    {siteConfig.editorialBanner.headline}
                  </h2>
                  <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-lg mb-8">
                    {siteConfig.editorialBanner.body}
                  </p>
                </div>

                <div className="space-y-6">
                  <button
                    onClick={() => navigateTo(siteConfig.editorialBanner.ctaTarget)}
                    style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                    className="px-6 py-4 text-xs font-mono-spec uppercase tracking-widest inline-flex items-center gap-3"
                  >
                    <Ruler className="w-4 h-4" />
                    <span>{siteConfig.editorialBanner.ctaText}</span>
                  </button>

                  <div className="pt-6 hairline-t grid grid-cols-3 gap-4 font-mono-spec text-xs">
                    <div>
                      <span className="opacity-50 block text-[10px]">CUT PHILOSOPHY</span>
                      <span className="font-semibold">BOXY & WIDE</span>
                    </div>
                    <div>
                      <span className="opacity-50 block text-[10px]">PRICING</span>
                      <span className="font-semibold">BDT (৳) NATIVE</span>
                    </div>
                    <div>
                      <span className="opacity-50 block text-[10px]">DISPATCH</span>
                      <span className="font-semibold">ALL BANGLADESH</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-12">
                <div className="col-span-7 aspect-[3/4] bg-neutral-300 overflow-hidden hairline-r relative">
                  <img
                    src={siteConfig.editorialBanner.image}
                    alt="Editorial Campaign Look"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-5 flex flex-col justify-between p-4 sm:p-6">
                  <div className="aspect-square bg-neutral-300 overflow-hidden hairline-border">
                    <img
                      src={siteConfig.editorialBanner.detailImage}
                      alt="Garment Fabric Macro"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-mono-spec text-[11px] opacity-75 space-y-2 mt-4">
                    <p className="uppercase font-bold text-black">
                      CAMPAIGN PAUSE SLOT
                    </p>
                    <p>
                      Use this split composition for macro fabric shots, collar ribbing closeups, or lookbook styling notes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "newArrivals":
        return (
          <section key="newArrivals" className="max-w-[1440px] mx-auto hairline-b">
            <div className="px-6 sm:px-10 py-8 hairline-b flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span
                  style={{ color: "var(--accent-primary)" }}
                  className="font-mono-spec text-xs uppercase tracking-widest font-semibold block mb-1"
                >
                  03 // LATEST RELEASE
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight">
                  New Arrivals — Drop 01
                </h2>
              </div>
              <button
                onClick={() => navigateTo("shop", { resetFilters: true, onlyNew: true })}
                className="text-xs font-mono-spec uppercase tracking-widest underline underline-offset-4"
              >
                View All New Arrivals →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 hairline-l">
              {newArrivalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  siteConfig={siteConfig}
                  navigateTo={navigateTo}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </section>
        );

      case "brandIntro":
        return (
          <section key="brandIntro" className="max-w-[1440px] mx-auto hairline-b">
            <div className="grid grid-cols-1 lg:grid-cols-12 p-8 sm:p-14 lg:p-20 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-2">
                  04 // LABEL ETHOS
                </span>
                <div className="font-display font-extrabold text-3xl uppercase tracking-tight">
                  {siteConfig.brand.name}
                </div>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <h3 className="font-display font-bold text-2xl sm:text-4xl uppercase leading-tight">
                  {siteConfig.brandStatement.heading}
                </h3>
                <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                  {siteConfig.brandStatement.paragraph1}
                </p>
                <p className="text-xs sm:text-sm font-mono-spec opacity-70 p-4 hairline-border bg-black/5">
                  {siteConfig.brandStatement.paragraph2}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo("about")}
                    className="text-xs font-mono-spec uppercase tracking-widest underline underline-offset-4 font-semibold"
                  >
                    Read Full Brand Profile →
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      case "socialStrip":
        return (
          <section key="socialStrip" className="max-w-[1440px] mx-auto">
            <div className="px-6 sm:px-10 py-8 hairline-b flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-1">
                  05 // COMMUNITY & STYLING ARCHIVE
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                  Connect With {siteConfig.brand.name}
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono-spec uppercase">
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Instagram ↗
                </a>
                <a
                  href={siteConfig.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Facebook ↗
                </a>
                <a
                  href={siteConfig.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  TikTok ↗
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 hairline-b">
              {[
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80"
              ].map((imgUrl, index) => (
                <div
                  key={index}
                  className="aspect-square bg-neutral-200 relative overflow-hidden hairline-r group"
                >
                  <img
                    src={imgUrl}
                    alt={`Replaceable Social Look Slot ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 text-white px-2.5 py-1 text-[10px] font-mono-spec uppercase flex justify-between">
                    <span>LOOK SLOT 0{index + 1}</span>
                    <span>REPLACEABLE</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return <div>{orderedSections.map((sec) => renderSection(sec.id))}</div>;
}

/**
 * ============================================================================
 * 7. SHOP & PRODUCT DISCOVERY VIEW
 * ============================================================================
 */
function ShopView({
  siteConfig,
  products,
  totalCatalogueCount,
  allCategories,
  allCollections,
  allSizes,
  allColors,
  selectedCategory,
  setSelectedCategory,
  selectedCollection,
  setSelectedCollection,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  onlyNewArrivals,
  setOnlyNewArrivals,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  navigateTo,
  addToCart
}) {
  const hasActiveFilters =
    selectedCategory !== "ALL" ||
    selectedCollection !== "ALL" ||
    selectedSize !== "ALL" ||
    selectedColor !== "ALL" ||
    onlyNewArrivals ||
    searchQuery.trim() !== "";

  const clearAllFilters = () => {
    setSelectedCategory("ALL");
    setSelectedCollection("ALL");
    setSelectedSize("ALL");
    setSelectedColor("ALL");
    setOnlyNewArrivals(false);
    setSearchQuery("");
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Shop Editorial Header */}
      <div className="px-6 sm:px-10 py-10 hairline-b flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-2">
            {siteConfig.brand.name} // ARCHIVE & CATALOGUE
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight">
            {onlyNewArrivals
              ? "New Arrivals Drop"
              : selectedCategory !== "ALL"
              ? selectedCategory
              : "All Garments"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input inside Shop */}
          <div className="relative hairline-border bg-white/50 flex items-center px-3 py-2 w-full sm:w-64">
            <Search className="w-4 h-4 opacity-50 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or SKU..."
              className="bg-transparent text-xs font-mono-spec w-full focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} aria-label="Clear search">
                <X className="w-3.5 h-3.5 opacity-60" />
              </button>
            )}
          </div>

          {/* Mobile Filter Drawer Trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 hairline-border text-xs font-mono-spec uppercase flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center hairline-border px-3 py-2 bg-white/50">
            <span className="font-mono-spec text-[11px] uppercase opacity-60 mr-2">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-mono-spec uppercase font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Bar */}
      {hasActiveFilters && (
        <div
          style={{ backgroundColor: "var(--bg-secondary)" }}
          className="px-6 sm:px-10 py-3 hairline-b flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-spec">
            <span className="opacity-60 uppercase">Active Filters:</span>
            {onlyNewArrivals && (
              <button
                onClick={() => setOnlyNewArrivals(false)}
                className="px-2.5 py-1 bg-black text-white flex items-center gap-1.5"
              >
                <span>New Arrivals</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedCategory !== "ALL" && (
              <button
                onClick={() => setSelectedCategory("ALL")}
                className="px-2.5 py-1 bg-black text-white flex items-center gap-1.5"
              >
                <span>{selectedCategory}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedCollection !== "ALL" && (
              <button
                onClick={() => setSelectedCollection("ALL")}
                className="px-2.5 py-1 bg-black text-white flex items-center gap-1.5"
              >
                <span>{selectedCollection}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedSize !== "ALL" && (
              <button
                onClick={() => setSelectedSize("ALL")}
                className="px-2.5 py-1 bg-black text-white flex items-center gap-1.5"
              >
                <span>Size: {selectedSize}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedColor !== "ALL" && (
              <button
                onClick={() => setSelectedColor("ALL")}
                className="px-2.5 py-1 bg-black text-white flex items-center gap-1.5"
              >
                <span>Color: {selectedColor}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-2.5 py-1 bg-black text-white flex items-center gap-1.5"
              >
                <span>"{searchQuery}"</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={clearAllFilters}
            className="text-xs font-mono-spec uppercase underline underline-offset-4 font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 p-8 hairline-r space-y-8">
          <div className="font-mono-spec text-xs uppercase flex items-center justify-between pb-3 hairline-b">
            <span>Showing {products.length} of {totalCatalogueCount}</span>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="underline">
                Clear
              </button>
            )}
          </div>

          {/* Release Status */}
          <div>
            <h3 className="font-mono-spec text-xs uppercase tracking-widest opacity-60 mb-3">
              RELEASE STATUS
            </h3>
            <label className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={onlyNewArrivals}
                onChange={(e) => setOnlyNewArrivals(e.target.checked)}
                className="w-4 h-4 accent-black"
              />
              <span>New Arrivals Only</span>
            </label>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="font-mono-spec text-xs uppercase tracking-widest opacity-60 mb-3">
              GARMENT CATEGORY
            </h3>
            <ul className="space-y-2 text-sm">
              {allCategories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1 flex items-center justify-between ${
                      selectedCategory === cat ? "font-bold underline" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <span>{cat === "ALL" ? "All Categories" : cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="font-mono-spec text-xs uppercase tracking-widest opacity-60 mb-3">
              IN-STOCK SIZE
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-mono-spec uppercase hairline-border ${
                    selectedSize === size
                      ? "bg-black text-white font-bold"
                      : "hover:bg-black/5"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <h3 className="font-mono-spec text-xs uppercase tracking-widest opacity-60 mb-3">
              COLORWAY
            </h3>
            <ul className="space-y-1.5 text-xs font-mono-spec">
              {allColors.map((clr) => (
                <li key={clr}>
                  <button
                    onClick={() => setSelectedColor(clr)}
                    className={`w-full text-left py-1 ${
                      selectedColor === clr ? "font-bold underline" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {clr === "ALL" ? "All Colorways" : clr}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collection Filter */}
          <div>
            <h3 className="font-mono-spec text-xs uppercase tracking-widest opacity-60 mb-3">
              COLLECTION
            </h3>
            <ul className="space-y-1.5 text-xs font-mono-spec">
              {allCollections.map((col) => (
                <li key={col}>
                  <button
                    onClick={() => setSelectedCollection(col)}
                    className={`w-full text-left py-1 ${
                      selectedCollection === col ? "font-bold underline" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {col === "ALL" ? "All Collections" : col}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          {products.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <p className="font-mono-spec text-xs uppercase tracking-widest opacity-50">
                NO GARMENTS MATCH YOUR CURRENT FILTERS
              </p>
              <p className="text-sm opacity-75 max-w-md mx-auto">
                Try clearing one of your size, color, or category filters to view all available pieces in the JHAKKAS catalogue.
              </p>
              <button
                onClick={clearAllFilters}
                style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                className="px-6 py-3 text-xs font-mono-spec uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  siteConfig={siteConfig}
                  navigateTo={navigateTo}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div
            style={{ backgroundColor: "var(--bg-primary)" }}
            className="relative w-full max-w-xs h-full z-10 flex flex-col justify-between overflow-y-auto p-6"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 hairline-b">
                <h3 className="font-display font-bold text-lg uppercase">
                  Filter Catalogue
                </h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={onlyNewArrivals}
                    onChange={(e) => setOnlyNewArrivals(e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                  <span>New Arrivals Only</span>
                </label>
              </div>

              <div>
                <p className="font-mono-spec text-xs uppercase opacity-60 mb-2">Category</p>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 hairline-border bg-transparent text-sm"
                >
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="font-mono-spec text-xs uppercase opacity-60 mb-2">Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-mono-spec hairline-border ${
                        selectedSize === s ? "bg-black text-white" : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono-spec text-xs uppercase opacity-60 mb-2">Color</p>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-2.5 hairline-border bg-transparent text-sm"
                >
                  {allColors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-6 hairline-t space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                className="w-full py-3.5 text-xs font-mono-spec uppercase tracking-widest"
              >
                Apply ({products.length} Results)
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2 text-xs font-mono-spec uppercase underline"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ============================================================================
 * 8. INDIVIDUAL PRODUCT DETAIL PAGE (PDP)
 * ============================================================================
 */
function ProductDetailView({
  siteConfig,
  product,
  allProducts,
  navigateTo,
  addToCart,
  openCartDrawer
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [unit, setUnit] = useState("in"); // 'in' | 'cm'
  const [openAccordion, setOpenAccordion] = useState("description");

  // Reset local selections when switching products
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedColor(product.colors?.[0]?.name || "");
    setSelectedSize("");
    setQuantity(1);
    setValidationError("");
  }, [product.id]);

  const relatedProducts = useMemo(() => {
    return allProducts
      .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
      .slice(0, 4);
  }, [allProducts, product]);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setValidationError("Please select your size before adding to bag.");
      return;
    }
    setValidationError("");
    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success) {
      openCartDrawer();
    }
  };

  const formatMeasureVal = (val) => {
    if (typeof val === "number") {
      return unit === "in" ? `${val}"` : `${Math.round(val * 2.54)} cm`;
    }
    return val;
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Breadcrumb Bar */}
      <div className="px-6 sm:px-10 py-3.5 hairline-b flex items-center justify-between text-xs font-mono-spec uppercase">
        <div className="flex items-center gap-2 opacity-70 truncate">
          <button onClick={() => navigateTo("home")} className="hover:underline">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo("shop", { category: product.category })}
            className="hover:underline"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="font-semibold opacity-100 truncate">{product.name}</span>
        </div>

        <button
          onClick={() => navigateTo("shop")}
          className="underline shrink-0 ml-4"
        >
          ← Back to Shop
        </button>
      </div>

      {/* Main PDP Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 hairline-b">
        {/* Left 7 Cols: Product Image Gallery */}
        <div className="lg:col-span-7 hairline-b lg:hairline-b-0 lg:hairline-r p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Thumbnails */}
            <div className="sm:col-span-2 flex sm:flex-col gap-3 order-2 sm:order-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 sm:w-full aspect-[3/4] overflow-hidden hairline-border ${
                    activeImageIdx === idx ? "ring-2 ring-black" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Portrait Image */}
            <div className="sm:col-span-10 order-1 sm:order-2 relative aspect-[3/4] bg-neutral-200 hairline-border overflow-hidden group">
              <img
                src={product.images[activeImageIdx]?.url}
                alt={product.images[activeImageIdx]?.alt || product.name}
                className="w-full h-full object-cover"
              />
              {siteConfig.brand.showDemoAssetBadges && (
                <span className="absolute top-4 left-4 bg-white/90 text-black px-2.5 py-1 text-[10px] font-mono-spec uppercase border border-black/20">
                  REPLACEABLE PRODUCT PHOTO ({product.sku})
                </span>
              )}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 bg-black/85 text-white px-3 py-2 text-xs font-mono-spec uppercase flex items-center gap-1.5 hover:bg-black"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect Zoom</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Garment Specification & Buy Box */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header & Price */}
            <div className="pb-6 hairline-b">
              <div className="flex items-center justify-between text-xs font-mono-spec uppercase opacity-60 mb-2">
                <span>{product.collection || product.category}</span>
                <span>SKU: {product.sku}</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 font-mono-spec">
                <span className="text-2xl sm:text-3xl font-bold">
                  {formatBDT(product.price, siteConfig.currency.symbol)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm line-through opacity-50">
                    {formatBDT(product.originalPrice, siteConfig.currency.symbol)}
                  </span>
                )}
                <span className="text-xs uppercase opacity-60 ml-auto">
                  {product.stockStatus === "in_stock" ? "● IN STOCK" : "OUT OF STOCK"}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono-spec uppercase mb-2.5">
                <span className="opacity-70">Selected Colorway:</span>
                <span className="font-semibold">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-3.5 py-2 hairline-border flex items-center gap-2 text-xs font-mono-spec ${
                      selectedColor === c.name
                        ? "bg-black text-white font-semibold"
                        : "hover:bg-black/5"
                    }`}
                  >
                    <span
                      style={{ backgroundColor: c.hex }}
                      className="w-3.5 h-3.5 border border-white/40 inline-block"
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection + Garment-Specific Size Guide Trigger */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono-spec uppercase mb-2.5">
                <span className="opacity-70">
                  Select Size: {selectedSize && <strong>({selectedSize})</strong>}
                </span>
                <button
                  onClick={() => setIsSizeModalOpen(true)}
                  style={{ color: "var(--accent-primary)" }}
                  className="underline underline-offset-4 font-semibold flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Garment Measurement Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    disabled={!s.inStock}
                    onClick={() => {
                      setSelectedSize(s.label);
                      setValidationError("");
                    }}
                    className={`py-3.5 text-xs font-mono-spec uppercase hairline-border transition-colors ${
                      !s.inStock
                        ? "opacity-35 line-through cursor-not-allowed bg-black/5"
                        : selectedSize === s.label
                        ? "bg-black text-white font-bold"
                        : "hover:bg-black/5"
                    }`}
                  >
                    {s.label}
                    {!s.inStock && <span className="block text-[9px]">SOLD</span>}
                  </button>
                ))}
              </div>

              {/* Quick Inline Measurement Preview for Selected Size */}
              {selectedSize && product.measurements?.[selectedSize] && (
                <div className="mt-3 p-3 bg-black/5 hairline-border text-xs font-mono-spec">
                  <span className="uppercase opacity-60 block mb-1">
                    Size {selectedSize} Exact Garment Specs:
                  </span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {Object.entries(product.measurements[selectedSize]).map(([k, v]) => (
                      <span key={k} className="capitalize">
                        {k}: <strong>{v}"</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {validationError && (
                <p
                  style={{ color: "var(--accent-primary)" }}
                  className="mt-2 text-xs font-mono-spec flex items-center gap-1.5 font-semibold"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationError}</span>
                </p>
              )}
            </div>

            {/* Quantity & Add to Bag CTA */}
            <div className="pt-2 flex gap-3">
              <div className="flex items-center hairline-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-4 hover:bg-black/5"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-mono-spec text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3.5 py-4 hover:bg-black/5"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToBag}
                style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                className="flex-1 py-4 px-6 text-xs font-mono-spec uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add to Bag — {formatBDT(product.price * quantity, siteConfig.currency.symbol)}
                </span>
              </button>
            </div>

            {/* Accordions: Description, Material & Care, Delivery & Exchange */}
            <div className="pt-6 hairline-t divide-y divide-neutral-300">
              {/* Description & Silhouette */}
              <div className="py-3.5">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "description" ? "" : "description")
                  }
                  className="w-full flex items-center justify-between text-xs font-mono-spec uppercase tracking-wider font-semibold"
                >
                  <span>01 / Silhouette & Description</span>
                  {openAccordion === "description" ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openAccordion === "description" && (
                  <div className="mt-3 text-sm opacity-85 space-y-2 leading-relaxed">
                    <p>{product.description}</p>
                    <p className="font-mono-spec text-xs pt-1">
                      <strong>FIT PROFILE:</strong> {product.fit}
                    </p>
                  </div>
                )}
              </div>

              {/* Material & Care */}
              <div className="py-3.5">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "care" ? "" : "care")}
                  className="w-full flex items-center justify-between text-xs font-mono-spec uppercase tracking-wider font-semibold"
                >
                  <span>02 / Material & Garment Care</span>
                  {openAccordion === "care" ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openAccordion === "care" && (
                  <div className="mt-3 text-xs font-mono-spec opacity-80 space-y-2 leading-relaxed">
                    <p>
                      <strong>MATERIAL:</strong> {product.material}
                    </p>
                    <p>
                      <strong>CARE:</strong> {product.care}
                    </p>
                  </div>
                )}
              </div>

              {/* Bangladesh Delivery & Exchanges */}
              <div className="py-3.5">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "delivery" ? "" : "delivery")
                  }
                  className="w-full flex items-center justify-between text-xs font-mono-spec uppercase tracking-wider font-semibold"
                >
                  <span>03 / Bangladesh Dispatch & Exchange Policy</span>
                  {openAccordion === "delivery" ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openAccordion === "delivery" && (
                  <div className="mt-3 text-xs opacity-80 space-y-2 leading-relaxed">
                    <p>{siteConfig.policies.deliveryText}</p>
                    <p>{siteConfig.policies.returnsText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="px-6 sm:px-10 py-8 hairline-b">
        <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-1">
          COMPLETE THE ROTATION
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl uppercase">
          Related Garments
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 hairline-l">
        {relatedProducts.map((rel) => (
          <ProductCard
            key={rel.id}
            product={rel}
            siteConfig={siteConfig}
            navigateTo={navigateTo}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Lightbox Image Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 bg-white text-black p-2 z-10"
              aria-label="Close Zoom"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={product.images[activeImageIdx]?.url}
              alt={product.name}
              className="w-full h-full max-h-[88vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* Garment-Specific Size Guide Modal */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4">
          <div
            style={{ backgroundColor: "var(--bg-primary)" }}
            className="max-w-xl w-full p-6 sm:p-8 hairline-border space-y-6"
          >
            <div className="flex items-start justify-between pb-4 hairline-b">
              <div>
                <span className="font-mono-spec text-[10px] uppercase tracking-widest opacity-60">
                  GARMENT SPECIFICATION CHART
                </span>
                <h3 className="font-display font-bold text-xl uppercase">
                  {product.name}
                </h3>
              </div>
              <button onClick={() => setIsSizeModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-spec">
              <span>FIT: {product.fit}</span>
              <div className="flex hairline-border">
                <button
                  onClick={() => setUnit("in")}
                  className={`px-3 py-1 ${unit === "in" ? "bg-black text-white" : ""}`}
                >
                  INCHES
                </button>
                <button
                  onClick={() => setUnit("cm")}
                  className={`px-3 py-1 ${unit === "cm" ? "bg-black text-white" : ""}`}
                >
                  CM
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono-spec text-xs hairline-border">
                <thead className="bg-black text-white uppercase">
                  <tr>
                    <th className="p-3">Size</th>
                    {product.measurementType === "top" ? (
                      <>
                        <th className="p-3">Chest</th>
                        <th className="p-3">Length</th>
                        <th className="p-3">Shoulder</th>
                      </>
                    ) : (
                      <>
                        <th className="p-3">Waist</th>
                        <th className="p-3">Outseam Length</th>
                        <th className="p-3">Thigh</th>
                        <th className="p-3">Leg Opening</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-300">
                  {Object.entries(product.measurements || {}).map(([sz, spec]) => (
                    <tr key={sz}>
                      <td className="p-3 font-bold">{sz}</td>
                      {product.measurementType === "top" ? (
                        <>
                          <td className="p-3">{formatMeasureVal(spec.chest)}</td>
                          <td className="p-3">{formatMeasureVal(spec.length)}</td>
                          <td className="p-3">{formatMeasureVal(spec.shoulder)}</td>
                        </>
                      ) : (
                        <>
                          <td className="p-3">{formatMeasureVal(spec.waist)}</td>
                          <td className="p-3">{formatMeasureVal(spec.length)}</td>
                          <td className="p-3">{formatMeasureVal(spec.thigh)}</td>
                          <td className="p-3">{formatMeasureVal(spec.legOpening)}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs opacity-70">
              Measurements are taken flat across the garment. Allow ±0.5 inch tolerance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ============================================================================
 * 9. BANGLADESH CHECKOUT & HONEST WHATSAPP / MESSENGER HANDOFF VIEW
 * ============================================================================
 */
function CheckoutView({
  siteConfig,
  cart,
  cartSubtotal,
  updateCartQuantity,
  removeCartItem,
  clearCart,
  navigateTo,
  openOwnerStudio,
  triggerToast
}) {
  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    deliveryZone: "dhaka", // 'dhaka' | 'outside'
    area: "",
    address: "",
    notes: "",
    paymentPreference: siteConfig.orderHandoff.allowCashOnDelivery ? "cod" : "mobile_banking"
  });

  const [errors, setErrors] = useState({});
  const [handoffPrepared, setHandoffPrepared] = useState(false);

  const deliveryFee = useMemo(() => {
    if (siteConfig.orderHandoff.deliveryPricingMode !== "configured") return 0;
    return customer.deliveryZone === "dhaka"
      ? Number(siteConfig.orderHandoff.dhakaDeliveryCharge || 0)
      : Number(siteConfig.orderHandoff.outsideDhakaDeliveryCharge || 0);
  }, [siteConfig.orderHandoff, customer.deliveryZone]);

  const grandTotal = cartSubtotal + deliveryFee;

  const formattedMessage = useMemo(
    () =>
      buildOrderMessage({
        customer,
        cartItems: cart,
        subtotal: cartSubtotal,
        deliveryFee,
        total: grandTotal,
        config: siteConfig
      }),
    [customer, cart, cartSubtotal, deliveryFee, grandTotal, siteConfig]
  );

  const validateForm = () => {
    const nextErrors = {};
    if (!customer.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }
    if (!validateBangladeshPhone(customer.phone)) {
      nextErrors.phone = "Enter a valid 11-digit Bangladesh mobile number (e.g. 017XXXXXXXX).";
    }
    if (!customer.area.trim()) {
      nextErrors.area = "Please enter your Thana / Area / District (e.g. Dhanmondi, Uttara, Sylhet).";
    }
    if (!customer.address.trim() || customer.address.trim().length < 6) {
      nextErrors.address = "Please enter your house, road, and street details for courier delivery.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLaunchOrderChannel = (channel) => {
    if (!validateForm()) {
      triggerToast("Please complete all required delivery fields.");
      return;
    }

    setHandoffPrepared(true);

    if (channel === "whatsapp") {
      const cleanNumber = (siteConfig.orderHandoff.whatsappNumber || "").replace(/\D/g, "");
      if (!siteConfig.orderHandoff.isWhatsappConfigured || !cleanNumber) {
        triggerToast("WhatsApp number is in setup mode. Copy the order message or configure your number in Owner Studio.");
        return;
      }
      const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else if (channel === "messenger") {
      // Copy message to clipboard first so user can paste directly into Messenger
      if (navigator.clipboard) {
        navigator.clipboard.writeText(formattedMessage);
      }
      const username = siteConfig.orderHandoff.messengerUsername || "";
      if (username) {
        window.open(`https://m.me/${username}`, "_blank", "noopener,noreferrer");
      }
      triggerToast("Order text copied! Paste and send it in the Messenger window.");
    }
  };

  const copyOrderToClipboard = () => {
    if (!validateForm()) {
      triggerToast("Complete your name, BD phone number, and address first.");
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedMessage);
      setHandoffPrepared(true);
      triggerToast("Formatted order text copied to clipboard.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-5">
        <span className="font-mono-spec text-xs uppercase opacity-50">
          ORDER HANDOFF // EMPTY BAG
        </span>
        <h1 className="font-display font-extrabold text-3xl uppercase">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm opacity-75">
          Add garments to your shopping bag before proceeding to Bangladesh delivery and WhatsApp order dispatch.
        </p>
        <button
          onClick={() => navigateTo("shop")}
          style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
          className="px-6 py-3.5 text-xs font-mono-spec uppercase tracking-widest"
        >
          Return to Catalogue →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="px-6 sm:px-10 py-8 hairline-b flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-1">
            DIRECT ORDER DISPATCH // BANGLADESH
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
            Checkout & Order Handoff
          </h1>
        </div>
        <button
          onClick={() => navigateTo("shop")}
          className="text-xs font-mono-spec uppercase underline"
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 7 Cols: Customer & Bangladesh Delivery Details */}
        <div className="lg:col-span-7 p-6 sm:p-10 hairline-b lg:hairline-b-0 lg:hairline-r space-y-8">
          {/* Honest Static Storefront Notice */}
          <div className="p-4 hairline-border bg-black/5 flex items-start gap-3">
            <MessageCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 leading-relaxed">
              <p className="font-mono-spec uppercase font-bold">
                HOW JHAKKAS DIRECT ORDERING WORKS:
              </p>
              <p className="opacity-80">
                Complete your delivery details below to generate a structured order sheet. Clicking the dispatch button opens WhatsApp (or Messenger) with your exact items, sizes, and BDT total pre-filled so our team can verify stock and dispatch your parcel immediately. No online card details are collected here.
              </p>
            </div>
          </div>

          {/* Step 1: Recipient Info */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg uppercase pb-2 hairline-b">
              01 / Recipient Contact (Bangladesh)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono-spec text-xs uppercase mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customer.fullName}
                  onChange={(e) =>
                    setCustomer({ ...customer, fullName: e.target.value })
                  }
                  placeholder="e.g. Rafiq Ahmed"
                  className="w-full p-3 hairline-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                {errors.fullName && (
                  <p style={{ color: "var(--accent-primary)" }} className="text-xs font-mono-spec mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-mono-spec text-xs uppercase mb-1.5">
                  Bangladesh Mobile Number *
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  placeholder="017XXXXXXXX"
                  className="w-full p-3 hairline-border bg-white text-sm font-mono-spec focus:outline-none focus:ring-1 focus:ring-black"
                />
                {errors.phone && (
                  <p style={{ color: "var(--accent-primary)" }} className="text-xs font-mono-spec mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Zone & Address */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg uppercase pb-2 hairline-b">
              02 / Delivery Zone & Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCustomer({ ...customer, deliveryZone: "dhaka" })}
                className={`p-4 text-left hairline-border transition-colors ${
                  customer.deliveryZone === "dhaka"
                    ? "bg-black text-white"
                    : "bg-white hover:bg-black/5"
                }`}
              >
                <div className="flex items-center justify-between font-mono-spec text-xs uppercase mb-1">
                  <span>Inside Dhaka City</span>
                  <span className="font-bold">
                    {siteConfig.orderHandoff.deliveryPricingMode === "configured"
                      ? formatBDT(siteConfig.orderHandoff.dhakaDeliveryCharge, siteConfig.currency.symbol)
                      : "TBD"}
                  </span>
                </div>
                <p className="text-xs opacity-75">
                  Dhaka Metro areas (Dhanmondi, Gulshan, Mirpur, Uttara, etc.)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setCustomer({ ...customer, deliveryZone: "outside" })}
                className={`p-4 text-left hairline-border transition-colors ${
                  customer.deliveryZone === "outside"
                    ? "bg-black text-white"
                    : "bg-white hover:bg-black/5"
                }`}
              >
                <div className="flex items-center justify-between font-mono-spec text-xs uppercase mb-1">
                  <span>Outside Dhaka (Nationwide)</span>
                  <span className="font-bold">
                    {siteConfig.orderHandoff.deliveryPricingMode === "configured"
                      ? formatBDT(siteConfig.orderHandoff.outsideDhakaDeliveryCharge, siteConfig.currency.symbol)
                      : "TBD"}
                  </span>
                </div>
                <p className="text-xs opacity-75">
                  Chattogram, Sylhet, Rajshahi, Khulna & all 64 districts
                </p>
              </button>
            </div>

            <div>
              <label className="block font-mono-spec text-xs uppercase mb-1.5">
                Area / Thana / District *
              </label>
              <input
                type="text"
                value={customer.area}
                onChange={(e) => setCustomer({ ...customer, area: e.target.value })}
                placeholder="e.g. Banani, Road 11 / Sylhet Sadar"
                className="w-full p-3 hairline-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
              {errors.area && (
                <p style={{ color: "var(--accent-primary)" }} className="text-xs font-mono-spec mt-1">
                  {errors.area}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono-spec text-xs uppercase mb-1.5">
                Full Street Address (House, Road, Flat, Landmark) *
              </label>
              <textarea
                rows={2}
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="House #, Road #, Block/Sector, nearby landmark..."
                className="w-full p-3 hairline-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
              {errors.address && (
                <p style={{ color: "var(--accent-primary)" }} className="text-xs font-mono-spec mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono-spec text-xs uppercase mb-1.5">
                Optional Delivery Instructions / Rider Notes
              </label>
              <input
                type="text"
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                placeholder="e.g. Call before arriving, leave with building security..."
                className="w-full p-3 hairline-border bg-white text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Step 3: Order & Payment Preference */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg uppercase pb-2 hairline-b">
              03 / Payment Coordination Preference
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siteConfig.orderHandoff.allowCashOnDelivery && (
                <button
                  type="button"
                  onClick={() =>
                    setCustomer({ ...customer, paymentPreference: "cod" })
                  }
                  className={`p-4 text-left hairline-border ${
                    customer.paymentPreference === "cod"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="font-mono-spec text-xs uppercase font-bold mb-1">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-xs opacity-75">
                    Pay in BDT cash upon receiving your parcel.
                  </p>
                </button>
              )}

              {siteConfig.orderHandoff.allowMobileBankingCoordination && (
                <button
                  type="button"
                  onClick={() =>
                    setCustomer({ ...customer, paymentPreference: "mobile_banking" })
                  }
                  className={`p-4 text-left hairline-border ${
                    customer.paymentPreference === "mobile_banking"
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="font-mono-spec text-xs uppercase font-bold mb-1">
                    bKash / Nagad Coordination
                  </p>
                  <p className="text-xs opacity-75">
                    Coordinate mobile banking transfer directly in chat after stock confirmation.
                  </p>
                </button>
              )}
            </div>
            <p className="text-[11px] font-mono-spec opacity-70">
              NOTE: {siteConfig.orderHandoff.mobileBankingNote}
            </p>
          </div>
        </div>

        {/* Right 5 Cols: Order Summary, Live Message Preview & Dispatch Actions */}
        <div
          style={{ backgroundColor: "var(--bg-secondary)" }}
          className="lg:col-span-5 p-6 sm:p-10 space-y-6"
        >
          <h2 className="font-display font-bold text-lg uppercase pb-3 hairline-b">
            Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
          </h2>

          {/* Compact Item List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-neutral-300">
            {cart.map((item) => (
              <div key={item.lineId} className="pt-3 first:pt-0 flex justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="font-mono-spec opacity-65">
                    Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                  </p>
                </div>
                <div className="font-mono-spec font-semibold shrink-0">
                  {formatBDT(item.price * item.quantity, siteConfig.currency.symbol)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Breakdown */}
          <div className="pt-4 hairline-t space-y-2 text-xs font-mono-spec">
            <div className="flex justify-between">
              <span className="opacity-70">SUBTOTAL</span>
              <span>{formatBDT(cartSubtotal, siteConfig.currency.symbol)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">
                DELIVERY ({customer.deliveryZone === "dhaka" ? "INSIDE DHAKA" : "OUTSIDE DHAKA"})
              </span>
              <span>
                {siteConfig.orderHandoff.deliveryPricingMode === "configured"
                  ? formatBDT(deliveryFee, siteConfig.currency.symbol)
                  : "CONFIRMED IN CHAT"}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 hairline-t">
              <span>TOTAL PAYABLE</span>
              <span>{formatBDT(grandTotal, siteConfig.currency.symbol)}</span>
            </div>
          </div>

          {/* Unconfigured WhatsApp Safety Alert (if owner tests unconfigured mode) */}
          {!siteConfig.orderHandoff.isWhatsappConfigured && (
            <div
              style={{ borderColor: "var(--accent-primary)" }}
              className="p-4 border-2 bg-white space-y-2"
            >
              <div
                style={{ color: "var(--accent-primary)" }}
                className="flex items-center gap-2 font-mono-spec text-xs font-bold uppercase"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>WhatsApp Number Not Configured Yet</span>
              </div>
              <p className="text-xs opacity-80">
                As requested in the brief, the site will never open a broken URL when a contact number is unconfigured. Open the Owner Studio to enter your live Bangladesh WhatsApp number.
              </p>
              <button
                onClick={openOwnerStudio}
                className="text-xs font-mono-spec uppercase underline font-semibold"
              >
                Configure WhatsApp Number in Owner Studio →
              </button>
            </div>
          )}

          {/* Live WhatsApp Message Preview */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono-spec uppercase opacity-60 mb-1.5">
              <span>Live Order Message Preview</span>
              <button
                onClick={copyOrderToClipboard}
                className="underline flex items-center gap-1 hover:opacity-100"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Text</span>
              </button>
            </div>
            <pre className="p-3 bg-white hairline-border text-[11px] font-mono-spec whitespace-pre-wrap max-h-44 overflow-y-auto leading-relaxed">
              {formattedMessage}
            </pre>
          </div>

          {/* Dispatch Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleLaunchOrderChannel("whatsapp")}
              style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
              className="w-full py-4 px-5 text-xs font-mono-spec uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 hover:opacity-90"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleLaunchOrderChannel("messenger")}
                className="py-3 px-3 hairline-border bg-white text-[11px] font-mono-spec uppercase tracking-wider font-semibold hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Order via Messenger</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={copyOrderToClipboard}
                className="py-3 px-3 hairline-border bg-white text-[11px] font-mono-spec uppercase tracking-wider font-semibold hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Order Sheet</span>
              </button>
            </div>
          </div>

          {/* Honest Handoff Status Box */}
          {handoffPrepared && (
            <div className="p-4 bg-white hairline-border space-y-2">
              <p className="font-mono-spec text-xs uppercase font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-green-700" />
                <span>Order Message Prepared for Dispatch</span>
              </p>
              <p className="text-xs opacity-80 leading-relaxed">
                <strong>Important:</strong> Generating this message does not automatically store your order in a database. Please make sure you press <strong>"Send"</strong> inside WhatsApp or Messenger so the {siteConfig.brand.name} team receives your order request.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 10. SECONDARY INFORMATIONAL PAGES (About, Size Guide, Delivery, Returns, etc.)
 * ============================================================================
 */
function SecondaryPageView({ view, siteConfig, products, navigateTo }) {
  const [unit, setUnit] = useState("in");

  if (view === "size-guide") {
    const topProducts = products.filter((p) => p.measurementType === "top");
    const bottomProducts = products.filter((p) => p.measurementType === "bottom");

    return (
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-12 space-y-12">
        <div className="pb-8 hairline-b flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-2">
              GARMENT ARCHITECTURE & FIT SPECIFICATIONS
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight">
              Size & Measurement Guide
            </h1>
          </div>

          <div className="flex hairline-border self-start">
            <button
              onClick={() => setUnit("in")}
              className={`px-4 py-2 text-xs font-mono-spec uppercase ${
                unit === "in" ? "bg-black text-white font-bold" : ""
              }`}
            >
              Inches (")
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-4 py-2 text-xs font-mono-spec uppercase ${
                unit === "cm" ? "bg-black text-white font-bold" : ""
              }`}
            >
              Centimeters (CM)
            </button>
          </div>
        </div>

        {/* Tops Measurement Section */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl uppercase">
            01 / Tops (Polos, Oversized Tees, Hoodies & Outerwear)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topProducts.map((item) => (
              <div key={item.id} className="p-6 hairline-border bg-white/40 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono-spec text-[10px] opacity-60 uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-base">{item.name}</h3>
                    <p className="text-xs opacity-75">{item.fit}</p>
                  </div>
                  <button
                    onClick={() => navigateTo("product", { productSlug: item.slug })}
                    className="text-xs font-mono-spec uppercase underline"
                  >
                    View Piece →
                  </button>
                </div>

                <table className="w-full text-left font-mono-spec text-xs hairline-border">
                  <thead className="bg-black text-white uppercase">
                    <tr>
                      <th className="p-2.5">Size</th>
                      <th className="p-2.5">Chest</th>
                      <th className="p-2.5">Length</th>
                      <th className="p-2.5">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-300">
                    {Object.entries(item.measurements || {}).map(([sz, m]) => (
                      <tr key={sz}>
                        <td className="p-2.5 font-bold">{sz}</td>
                        <td className="p-2.5">
                          {unit === "in" ? `${m.chest}"` : `${Math.round(m.chest * 2.54)} cm`}
                        </td>
                        <td className="p-2.5">
                          {unit === "in" ? `${m.length}"` : `${Math.round(m.length * 2.54)} cm`}
                        </td>
                        <td className="p-2.5">
                          {unit === "in" ? `${m.shoulder}"` : `${Math.round(m.shoulder * 2.54)} cm`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* Bottoms Measurement Section */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl uppercase">
            02 / Bottoms (Bootcut Jeans, Baggy Joggers, Shorts & Trousers)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bottomProducts.map((item) => (
              <div key={item.id} className="p-6 hairline-border bg-white/40 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono-spec text-[10px] opacity-60 uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-base">{item.name}</h3>
                    <p className="text-xs opacity-75">{item.fit}</p>
                  </div>
                  <button
                    onClick={() => navigateTo("product", { productSlug: item.slug })}
                    className="text-xs font-mono-spec uppercase underline"
                  >
                    View Piece →
                  </button>
                </div>

                <table className="w-full text-left font-mono-spec text-xs hairline-border">
                  <thead className="bg-black text-white uppercase">
                    <tr>
                      <th className="p-2.5">Size</th>
                      <th className="p-2.5">Waist</th>
                      <th className="p-2.5">Length</th>
                      <th className="p-2.5">Leg Opening</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-300">
                    {Object.entries(item.measurements || {}).map(([sz, m]) => (
                      <tr key={sz}>
                        <td className="p-2.5 font-bold">{sz}</td>
                        <td className="p-2.5">
                          {typeof m.waist === "number"
                            ? unit === "in"
                              ? `${m.waist}"`
                              : `${Math.round(m.waist * 2.54)} cm`
                            : m.waist}
                        </td>
                        <td className="p-2.5">
                          {unit === "in" ? `${m.length}"` : `${Math.round(m.length * 2.54)} cm`}
                        </td>
                        <td className="p-2.5">
                          {unit === "in"
                            ? `${m.legOpening}"`
                            : `${Math.round(m.legOpening * 2.54)} cm`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pageConfig = {
    about: {
      eyebrow: "BRAND DIRECTION // DHAKA, BANGLADESH",
      title: `About ${siteConfig.brand.name}`,
      content: (
        <div className="space-y-6 text-base leading-relaxed">
          <p className="font-display font-bold text-2xl uppercase">
            {siteConfig.brandStatement.heading}
          </p>
          <p>{siteConfig.brandStatement.paragraph1}</p>
          <div className="p-6 hairline-border bg-black/5 font-mono-spec text-xs">
            {siteConfig.brandStatement.paragraph2}
          </div>
        </div>
      )
    },
    delivery: {
      eyebrow: "LOGISTICS & DISPATCH",
      title: "Delivery Information",
      content: (
        <div className="space-y-6 text-sm leading-relaxed">
          <p>{siteConfig.policies.deliveryText}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-spec text-xs">
            <div className="p-5 hairline-border">
              <p className="uppercase opacity-60 mb-1">INSIDE DHAKA METRO</p>
              <p className="text-lg font-bold">
                {siteConfig.orderHandoff.deliveryPricingMode === "configured"
                  ? formatBDT(siteConfig.orderHandoff.dhakaDeliveryCharge, siteConfig.currency.symbol)
                  : "Confirmed on Order"}
              </p>
            </div>
            <div className="p-5 hairline-border">
              <p className="uppercase opacity-60 mb-1">OUTSIDE DHAKA (NATIONWIDE)</p>
              <p className="text-lg font-bold">
                {siteConfig.orderHandoff.deliveryPricingMode === "configured"
                  ? formatBDT(siteConfig.orderHandoff.outsideDhakaDeliveryCharge, siteConfig.currency.symbol)
                  : "Confirmed on Order"}
              </p>
            </div>
          </div>
        </div>
      )
    },
    returns: {
      eyebrow: "CUSTOMER CARE POLICY",
      title: "Returns & Exchanges",
      content: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p>{siteConfig.policies.returnsText}</p>
        </div>
      )
    },
    contact: {
      eyebrow: "DIRECT CHANNELS",
      title: `Contact ${siteConfig.brand.name}`,
      content: (
        <div className="space-y-6 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-spec text-xs">
            <div className="p-5 hairline-border space-y-1">
              <span className="opacity-60 uppercase">WHATSAPP / PHONE</span>
              <p className="font-bold text-sm">{siteConfig.contactInfo.phoneDisplay}</p>
            </div>
            <div className="p-5 hairline-border space-y-1">
              <span className="opacity-60 uppercase">EMAIL</span>
              <p className="font-bold text-sm">{siteConfig.contactInfo.email}</p>
            </div>
            <div className="p-5 hairline-border space-y-1">
              <span className="opacity-60 uppercase">LOCATION</span>
              <p className="font-bold">{siteConfig.contactInfo.location}</p>
            </div>
            <div className="p-5 hairline-border space-y-1">
              <span className="opacity-60 uppercase">HOURS</span>
              <p className="font-bold">{siteConfig.contactInfo.supportHours}</p>
            </div>
          </div>
        </div>
      )
    },
    privacy: {
      eyebrow: "LEGAL TEMPLATE (REVIEW BEFORE LAUNCH)",
      title: "Privacy Policy",
      content: <p className="text-sm leading-relaxed">{siteConfig.policies.privacyText}</p>
    },
    terms: {
      eyebrow: "LEGAL TEMPLATE (REVIEW BEFORE LAUNCH)",
      title: "Terms & Conditions",
      content: <p className="text-sm leading-relaxed">{siteConfig.policies.termsText}</p>
    }
  }[view];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      <div className="pb-6 hairline-b">
        <span className="font-mono-spec text-xs uppercase tracking-widest opacity-60 block mb-2">
          {pageConfig.eyebrow}
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight">
          {pageConfig.title}
        </h1>
      </div>
      {pageConfig.content}
      <div className="pt-8 hairline-t">
        <button
          onClick={() => navigateTo("shop")}
          style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
          className="px-6 py-3.5 text-xs font-mono-spec uppercase tracking-widest"
        >
          Explore Garment Catalogue →
        </button>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * 11. OWNER STUDIO & BUILT-IN OWNER_GUIDE.md MODAL
 * ============================================================================
 * Enables the brand owner to test all 12 Editability Acceptance Criteria live
 * in the browser, manage products, and export updated configuration files.
 */
function OwnerStudioModal({
  siteConfig,
  setSiteConfig,
  products,
  setProducts,
  activeTab,
  setActiveTab,
  onClose,
  triggerToast
}) {
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    sku: "JHK-NEW-09",
    category: "Retro Polo T-shirts",
    price: 1550,
    imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80",
    colorName: "Midnight Black",
    colorHex: "#111111"
  });

  // Reorder Homepage Section
  const moveSection = (index, direction) => {
    const sorted = [...siteConfig.homepageSections].sort((a, b) => a.order - b.order);
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;
    const tempOrder = sorted[index].order;
    sorted[index].order = sorted[targetIdx].order;
    sorted[targetIdx].order = tempOrder;
    setSiteConfig({ ...siteConfig, homepageSections: sorted });
    triggerToast("Homepage section order updated live.");
  };

  // Toggle Homepage Section
  const toggleSection = (id) => {
    const updated = siteConfig.homepageSections.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    setSiteConfig({ ...siteConfig, homepageSections: updated });
  };

  // Add New Product (Acceptance Test #3)
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name.trim()) return;
    const slug = newProductForm.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const created = {
      id: `jhk-${Date.now()}`,
      sku: newProductForm.sku,
      slug: `${slug}-${Date.now().toString().slice(-3)}`,
      name: newProductForm.name,
      category: newProductForm.category,
      collection: "Drop 01: Street Classics",
      price: Number(newProductForm.price) || 1500,
      originalPrice: null,
      isNewArrival: true,
      isFeatured: true,
      stockStatus: "in_stock",
      images: [
        { url: newProductForm.imageUrl, alt: newProductForm.name },
        {
          url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80",
          alt: `${newProductForm.name} Alternate`
        }
      ],
      colors: [{ name: newProductForm.colorName, hex: newProductForm.colorHex }],
      sizes: [
        { label: "M", inStock: true },
        { label: "L", inStock: true },
        { label: "XL", inStock: true }
      ],
      measurementType: "top",
      measurements: {
        M: { chest: 43, length: 28, shoulder: 20 },
        L: { chest: 45, length: 29, shoulder: 21 },
        XL: { chest: 47, length: 30, shoulder: 22 }
      },
      description: "Custom garment added via JHAKKAS Owner Studio.",
      fit: "Relaxed Street Fit.",
      material: "Editable Material Placeholder.",
      care: "Machine wash cold."
    };

    setProducts([created, ...products]);
    setNewProductForm({ ...newProductForm, name: "" });
    triggerToast(`Added "${created.name}" to catalogue!`);
  };

  const resetToFactoryDefaults = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem("jhakkas_site_config_v1");
    localStorage.removeItem("jhakkas_products_v1");
    triggerToast("Reset config and catalogue to initial defaults.");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-6">
      <div
        style={{ backgroundColor: "var(--bg-primary)" }}
        className="w-full max-w-5xl h-[90vh] hairline-border flex flex-col justify-between overflow-hidden shadow-2xl"
      >
        {/* Top Header */}
        <div className="p-5 hairline-b bg-black text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5" style={{ color: "var(--accent-primary)" }} />
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg uppercase tracking-tight">
                JHAKKAS Owner Studio & Maintenance Guide (Local Sandbox)
              </h2>
              <p className="font-mono-spec text-[11px] opacity-70">
                Test all 12 Editability Acceptance Criteria live or export updated config code for GitHub.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:opacity-70">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 hairline-b flex flex-wrap gap-2 bg-black/5 font-mono-spec text-xs uppercase">
          {[
            { id: "customize", label: "01. Brand, Colors & Homepage" },
            { id: "products", label: `02. Product Catalogue (${products.length})` },
            { id: "guide", label: "03. OWNER_GUIDE.md & Cloudflare Deploy" },
            { id: "export", label: "04. Export Config JSON/JS" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 border-t border-l border-r ${
                activeTab === tab.id
                  ? "bg-white font-bold border-neutral-400"
                  : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {activeTab === "customize" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Brand, Accent Color, Campaign Headline */}
              <div className="space-y-5">
                <h3 className="font-display font-bold text-lg uppercase pb-2 hairline-b">
                  Brand, Colors & Hero Campaign
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Wordmark Text
                    </label>
                    <input
                      type="text"
                      value={siteConfig.brand.wordmark}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          brand: { ...siteConfig.brand, wordmark: e.target.value }
                        })
                      }
                      className="w-full p-2.5 hairline-border bg-white text-sm font-mono-spec"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Accent Color (Hex)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={siteConfig.theme.accentPrimary}
                        onChange={(e) =>
                          setSiteConfig({
                            ...siteConfig,
                            theme: { ...siteConfig.theme, accentPrimary: e.target.value }
                          })
                        }
                        className="h-10 w-12 cursor-pointer border"
                      />
                      <input
                        type="text"
                        value={siteConfig.theme.accentPrimary}
                        onChange={(e) =>
                          setSiteConfig({
                            ...siteConfig,
                            theme: { ...siteConfig.theme, accentPrimary: e.target.value }
                          })
                        }
                        className="w-full p-2.5 hairline-border bg-white text-xs font-mono-spec"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-spec text-xs uppercase mb-1">
                    Optional Logo Image URL (Leave blank for typographic wordmark)
                  </label>
                  <input
                    type="text"
                    value={siteConfig.brand.logoUrl}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        brand: { ...siteConfig.brand, logoUrl: e.target.value }
                      })
                    }
                    placeholder="https://.../logo.svg"
                    className="w-full p-2.5 hairline-border bg-white text-xs font-mono-spec"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Hero Headline Line 1
                    </label>
                    <input
                      type="text"
                      value={siteConfig.hero.headlineLine1}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          hero: { ...siteConfig.hero, headlineLine1: e.target.value }
                        })
                      }
                      className="w-full p-2.5 hairline-border bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Hero Headline Line 2
                    </label>
                    <input
                      type="text"
                      value={siteConfig.hero.headlineLine2}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          hero: { ...siteConfig.hero, headlineLine2: e.target.value }
                        })
                      }
                      className="w-full p-2.5 hairline-border bg-white text-sm"
                    />
                  </div>
                </div>

                {/* WhatsApp & Delivery Config */}
                <h3 className="font-display font-bold text-lg uppercase pt-4 pb-2 hairline-b">
                  Bangladesh Order & Delivery Config
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      WhatsApp Number (With 880)
                    </label>
                    <input
                      type="text"
                      value={siteConfig.orderHandoff.whatsappNumber}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          orderHandoff: {
                            ...siteConfig.orderHandoff,
                            whatsappNumber: e.target.value
                          }
                        })
                      }
                      className="w-full p-2.5 hairline-border bg-white text-xs font-mono-spec"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 text-xs font-mono-spec cursor-pointer p-2.5 hairline-border bg-white">
                      <input
                        type="checkbox"
                        checked={siteConfig.orderHandoff.isWhatsappConfigured}
                        onChange={(e) =>
                          setSiteConfig({
                            ...siteConfig,
                            orderHandoff: {
                              ...siteConfig.orderHandoff,
                              isWhatsappConfigured: e.target.checked
                            }
                          })
                        }
                      />
                      <span>WhatsApp Active</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Inside Dhaka Fee (৳)
                    </label>
                    <input
                      type="number"
                      value={siteConfig.orderHandoff.dhakaDeliveryCharge}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          orderHandoff: {
                            ...siteConfig.orderHandoff,
                            dhakaDeliveryCharge: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full p-2.5 hairline-border bg-white text-xs font-mono-spec"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Outside Dhaka Fee (৳)
                    </label>
                    <input
                      type="number"
                      value={siteConfig.orderHandoff.outsideDhakaDeliveryCharge}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          orderHandoff: {
                            ...siteConfig.orderHandoff,
                            outsideDhakaDeliveryCharge: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full p-2.5 hairline-border bg-white text-xs font-mono-spec"
                    />
                  </div>
                </div>
              </div>

              {/* Homepage Section Ordering & Visibility */}
              <div className="space-y-5">
                <h3 className="font-display font-bold text-lg uppercase pb-2 hairline-b">
                  Homepage Section Order & Visibility
                </h3>
                <p className="text-xs opacity-75">
                  Toggle sections on/off or reorder them using the arrows. Changes update the homepage immediately.
                </p>

                <div className="space-y-2">
                  {[...siteConfig.homepageSections]
                    .sort((a, b) => a.order - b.order)
                    .map((sec, idx, arr) => (
                      <div
                        key={sec.id}
                        className="p-3 hairline-border bg-white flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleSection(sec.id)}
                            className={`p-1.5 hairline-border ${
                              sec.enabled ? "bg-black text-white" : "opacity-40"
                            }`}
                            title="Toggle section visibility"
                          >
                            {sec.enabled ? (
                              <Eye className="w-3.5 h-3.5" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span
                            className={`font-mono-spec text-xs ${
                              !sec.enabled ? "line-through opacity-50" : "font-semibold"
                            }`}
                          >
                            {sec.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => moveSection(idx, -1)}
                            className="p-1 hairline-border disabled:opacity-30 hover:bg-black/5"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === arr.length - 1}
                            onClick={() => moveSection(idx, 1)}
                            className="p-1 hairline-border disabled:opacity-30 hover:bg-black/5"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 text-xs font-mono-spec cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteConfig.brand.showDemoAssetBadges}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          brand: {
                            ...siteConfig.brand,
                            showDemoAssetBadges: e.target.checked
                          }
                        })
                      }
                    />
                    <span>Show "Replaceable Demo Photo Slot" Badges on Images</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Add Product Form */}
              <form
                onSubmit={handleAddProduct}
                className="lg:col-span-5 space-y-4 p-5 hairline-border bg-white"
              >
                <h3 className="font-display font-bold text-base uppercase pb-2 hairline-b">
                  Add New Garment to Catalogue
                </h3>

                <div>
                  <label className="block font-mono-spec text-xs uppercase mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, name: e.target.value })
                    }
                    placeholder="e.g. Heavyweight Boxy Rugby Polo"
                    className="w-full p-2.5 hairline-border text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newProductForm.category}
                      onChange={(e) =>
                        setNewProductForm({ ...newProductForm, category: e.target.value })
                      }
                      className="w-full p-2.5 hairline-border text-xs font-mono-spec"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-spec text-xs uppercase mb-1">
                      Price in BDT (৳)
                    </label>
                    <input
                      type="number"
                      value={newProductForm.price}
                      onChange={(e) =>
                        setNewProductForm({ ...newProductForm, price: e.target.value })
                      }
                      className="w-full p-2.5 hairline-border text-xs font-mono-spec"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono-spec text-xs uppercase mb-1">
                    Primary Image URL
                  </label>
                  <input
                    type="url"
                    value={newProductForm.imageUrl}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, imageUrl: e.target.value })
                    }
                    className="w-full p-2.5 hairline-border text-xs font-mono-spec"
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                  className="w-full py-3 text-xs font-mono-spec uppercase tracking-widest font-semibold"
                >
                  + Add Product to Live Catalogue
                </button>
              </form>

              {/* Edit Existing Product Prices / Remove */}
              <div className="lg:col-span-7 space-y-3">
                <h3 className="font-display font-bold text-base uppercase pb-2 hairline-b">
                  Edit Existing Catalogue Prices (৳ BDT)
                </h3>
                <div className="divide-y divide-neutral-300 hairline-border bg-white">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="truncate">
                        <span className="font-mono-spec opacity-50 mr-2">{p.sku}</span>
                        <span className="font-semibold">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono-spec">৳</span>
                        <input
                          type="number"
                          value={p.price}
                          onChange={(e) => {
                            const nextPrice = Number(e.target.value) || 0;
                            setProducts(
                              products.map((item) =>
                                item.id === p.id ? { ...item, price: nextPrice } : item
                              )
                            );
                          }}
                          className="w-24 p-1.5 hairline-border font-mono-spec text-xs"
                        />
                        <button
                          onClick={() =>
                            setProducts(products.filter((item) => item.id !== p.id))
                          }
                          className="p-1.5 text-red-700 hover:bg-red-50"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed max-w-4xl">
              <div className="p-5 hairline-border bg-white space-y-3">
                <h3 className="font-display font-bold text-lg uppercase">
                  OWNER_GUIDE.md — Complete Maintenance & Free Cloudflare Deployment Manual
                </h3>
                <p className="opacity-80">
                  This website is architected for zero-cost hosting on <strong>Cloudflare Pages</strong> with full source ownership on <strong>GitHub</strong>. Below is the quick-reference manual for every common owner task:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 hairline-border bg-white space-y-2">
                  <p className="font-mono-spec font-bold uppercase">
                    1. How to Edit Brand Settings, Colors, WhatsApp & Delivery Fees
                  </p>
                  <p className="opacity-80">
                    Open <code>INITIAL_SITE_CONFIG</code> at the top of <code>App.jsx</code> (or <code>src/config/siteConfig.js</code>). Update <code>theme.accentPrimary</code>, <code>orderHandoff.whatsappNumber</code>, or <code>dhakaDeliveryCharge</code>. Or adjust them in Tab 01 of this Studio and copy the exported JSON from Tab 04.
                  </p>
                </div>

                <div className="p-4 hairline-border bg-white space-y-2">
                  <p className="font-mono-spec font-bold uppercase">
                    2. How to Add, Edit, or Remove Products & Measurement Charts
                  </p>
                  <p className="opacity-80">
                    Locate <code>INITIAL_PRODUCTS</code> in the source file. Each product supports multiple images, color hex swatches, per-size stock booleans (<code>inStock: true/false</code>), and garment-specific <code>measurements</code> in inches.
                  </p>
                </div>

                <div className="p-4 hairline-border bg-white space-y-2">
                  <p className="font-mono-spec font-bold uppercase">
                    3. Zero-Cost Deployment to Cloudflare Pages + Custom Domain
                  </p>
                  <ol className="list-decimal list-inside space-y-1 opacity-80">
                    <li>Push this repository to a free GitHub account.</li>
                    <li>Log in to Cloudflare Dashboard → <strong>Workers & Pages</strong> → <strong>Create Application</strong> → <strong>Pages</strong> → <strong>Connect to Git</strong>.</li>
                    <li>Select your repository. Set Build Command to <code>npm run build</code> and Build Output Directory to <code>dist</code>.</li>
                    <li>Once deployed, open <strong>Custom Domains</strong> in Cloudflare Pages and enter your purchased domain name. Cloudflare automatically provisions free SSL/HTTPS certificates.</li>
                  </ol>
                </div>

                <div className="p-4 hairline-border bg-white space-y-2">
                  <p className="font-mono-spec font-bold uppercase">
                    4. Static Hosting vs Backend Boundaries (Honest Architecture)
                  </p>
                  <p className="opacity-80">
                    Changes made inside this browser's Owner Studio are saved in your browser's <code>localStorage</code> for instant previewing. To publish changes permanently for all visitors worldwide without a paid database, copy the exported code in Tab 04 and commit it to your GitHub repository.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "export" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-80">
                  Copy this updated configuration & product catalogue to paste directly into your source code for permanent deployment:
                </p>
                <button
                  onClick={() => {
                    const payload = `const INITIAL_SITE_CONFIG = ${JSON.stringify(
                      siteConfig,
                      null,
                      2
                    )};\n\nconst INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};`;
                    navigator.clipboard?.writeText(payload);
                    triggerToast("Copied full siteConfig & products code to clipboard!");
                  }}
                  style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
                  className="px-4 py-2 text-xs font-mono-spec uppercase flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code for GitHub</span>
                </button>
              </div>
              <pre className="p-4 bg-white hairline-border text-[11px] font-mono-spec overflow-x-auto max-h-96">
                {`const INITIAL_SITE_CONFIG = ${JSON.stringify(
                  siteConfig,
                  null,
                  2
                )};\n\nconst INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 hairline-t bg-black/5 flex items-center justify-between">
          <button
            onClick={resetToFactoryDefaults}
            className="px-4 py-2 text-xs font-mono-spec uppercase hairline-border bg-white flex items-center gap-1.5 hover:bg-black hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Defaults</span>
          </button>

          <button
            onClick={onClose}
            style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
            className="px-6 py-2.5 text-xs font-mono-spec uppercase tracking-widest font-semibold"
          >
            Done & View Live Storefront
          </button>
        </div>
      </div>
    </div>
  );
}
