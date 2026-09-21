import type { Product } from "@/types/product";

/**
 * ============================================================
 *  DATA PRODUK — ALVI FASHION
 * ============================================================
 * SEMUA produk di bawah ini adalah DATA DEMO (nama, harga, stok, ukuran, warna, foto).
 * Ganti dengan data asli toko. Cara tambah produk: salin satu blok, ubah isinya,
 * lalu simpan foto di public/images/products/ dan tulis path-nya di `images`.
 *
 * Aturan:
 *  - `slug` harus unik (dipakai di URL /produk/<slug>)
 *  - `category` harus sama dengan `slug` di data/categories.ts
 *  - `discountPrice` hapus baris-nya jika tidak ada diskon
 *  - `rating` dan `sold` isi `null` jika belum punya data asli (tidak akan ditampilkan)
 *  - hapus `isDemo: true` setelah data produk itu asli
 *  - `sizes` dan `colors` dibuat per produk; hanya yang ada di sini yang ditampilkan
 *  - `stock: 0` menandai produk sebagai "Stok habis"
 */

// DEMO DATA - replace with real product data
export const products: Product[] = [
  {
    id: "cargo-001",
    slug: "celana-cargo-tactical",
    name: "Celana Cargo Tactical",
    category: "celana-cargo",
    price: 89000,
    discountPrice: 69000,
    description:
      "Celana cargo dengan model saku samping yang fungsional, nyaman dipakai untuk aktivitas harian maupun bersantai.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/cargo-001-1.jpg", "/images/products/cargo-001-2.jpg"],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Army"],
    stock: 20,
    badge: "FEATURED",
    rating: null,
    sold: null,
    featured: true,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "cargo-002",
    slug: "celana-cargo-utility",
    name: "Celana Cargo Utility",
    category: "celana-cargo",
    price: 95000,
    description:
      "Cargo dengan banyak saku untuk membawa barang harian. Mudah dipadukan dengan kaos, kemeja, atau hoodie.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/cargo-002-1.jpg", "/images/products/cargo-002-2.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Khaki", "Black", "Grey"],
    stock: 20,
    badge: "NEW",
    rating: null,
    sold: null,
    featured: true,
    newArrival: true,
    isDemo: true,
  },
  {
    id: "tactical-001",
    slug: "celana-tactical-outdoor",
    name: "Celana Tactical Outdoor",
    category: "celana-tactical",
    price: 129000,
    discountPrice: 99000,
    description:
      "Celana tactical bergaya outdoor dengan potongan yang memberi ruang gerak untuk berbagai aktivitas.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/tactical-001-1.jpg", "/images/products/tactical-001-2.jpg"],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Army", "Khaki"],
    stock: 20,
    badge: "FEATURED",
    rating: null,
    sold: null,
    featured: true,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "tactical-002",
    slug: "celana-tactical-ripstop",
    name: "Celana Tactical Ripstop",
    category: "celana-tactical",
    price: 139000,
    description:
      "Celana tactical dengan tampilan bersih dan detail saku yang rapi, cocok untuk gaya urban.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/tactical-002-1.jpg", "/images/products/tactical-002-2.jpg"],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Grey", "Navy"],
    stock: 20,
    badge: "NEW",
    rating: null,
    sold: null,
    featured: true,
    newArrival: true,
    isDemo: true,
  },
  {
    id: "pendek-001",
    slug: "celana-cargo-pendek",
    name: "Celana Cargo Pendek",
    category: "celana-pendek",
    price: 75000,
    discountPrice: 59000,
    description:
      "Versi pendek dari celana cargo favorit, praktis untuk cuaca panas dan aktivitas santai.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/pendek-001-1.jpg", "/images/products/pendek-001-2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Khaki", "Army", "Black"],
    stock: 20,
    badge: "NEW",
    rating: null,
    sold: null,
    featured: true,
    newArrival: true,
    isDemo: true,
  },
  {
    id: "pendek-002",
    slug: "celana-pendek-santai",
    name: "Celana Pendek Santai",
    category: "celana-pendek",
    price: 59000,
    description:
      "Celana pendek dengan model simpel untuk dipakai di rumah, jalan-jalan, atau nongkrong.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/pendek-002-1.jpg", "/images/products/pendek-002-2.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Navy", "Black"],
    stock: 20,
    rating: null,
    sold: null,
    featured: false,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "panjang-001",
    slug: "celana-cargo-panjang",
    name: "Celana Cargo Panjang",
    category: "celana-panjang",
    price: 99000,
    discountPrice: 85000,
    description:
      "Celana cargo panjang dengan saku samping, pilihan utama untuk tampilan casual yang santai dan rapi.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/panjang-001-1.jpg", "/images/products/panjang-001-2.jpg"],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Army", "Brown"],
    stock: 20,
    badge: "FEATURED",
    rating: null,
    sold: null,
    featured: true,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "panjang-002",
    slug: "celana-joger",
    name: "Celana Joger",
    category: "celana-panjang",
    price: 79000,
    description:
      "Celana joger dengan model santai yang mudah dipadukan untuk keseharian.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/panjang-002-1.jpg", "/images/products/panjang-002-2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Navy"],
    stock: 20,
    badge: "NEW",
    rating: null,
    sold: null,
    featured: true,
    newArrival: true,
    isDemo: true,
  },
  {
    id: "formal-001",
    slug: "celana-formal-pria",
    name: "Celana Formal Pria",
    category: "celana-formal",
    price: 119000,
    discountPrice: 99000,
    description:
      "Celana formal pria dengan tampilan rapi untuk kerja, kuliah, atau acara resmi.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/formal-001-1.jpg", "/images/products/formal-001-2.jpg"],
    sizes: ["28", "30", "32", "34"],
    colors: ["Black", "Grey", "Navy"],
    stock: 20,
    badge: "FEATURED",
    rating: null,
    sold: null,
    featured: true,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "formal-002",
    slug: "celana-formal-slim",
    name: "Celana Formal Slim",
    category: "celana-formal",
    price: 125000,
    description:
      "Celana formal dengan potongan lebih ramping untuk tampilan yang clean.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/formal-002-1.jpg", "/images/products/formal-002-2.jpg"],
    sizes: ["28", "30", "32", "34"],
    colors: ["Black", "Navy"],
    stock: 20,
    badge: "NEW",
    rating: null,
    sold: null,
    featured: false,
    newArrival: true,
    isDemo: true,
  },
  {
    id: "chino-001",
    slug: "celana-chino-slim",
    name: "Celana Chino Slim",
    category: "celana-chino",
    price: 109000,
    discountPrice: 89000,
    description:
      "Celana chino yang fleksibel: cocok untuk tampilan santai maupun semi-formal.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/chino-001-1.jpg", "/images/products/chino-001-2.jpg"],
    sizes: ["28", "30", "32", "34"],
    colors: ["Khaki", "Brown", "Navy", "Black"],
    stock: 20,
    badge: "FEATURED",
    rating: null,
    sold: null,
    featured: true,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "chino-002",
    slug: "celana-chino-regular",
    name: "Celana Chino Regular",
    category: "celana-chino",
    price: 105000,
    description:
      "Celana chino dengan potongan regular untuk pemakaian seharian.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/chino-002-1.jpg", "/images/products/chino-002-2.jpg"],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Grey", "Black"],
    stock: 20,
    rating: null,
    sold: null,
    featured: false,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "hoodie-001",
    slug: "hoodie-basic",
    name: "Hoodie Basic",
    category: "hoodie-sweater",
    price: 145000,
    discountPrice: 119000,
    description:
      "Hoodie polos dengan model basic yang gampang dipadukan dengan celana cargo, chino, atau joger.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/hoodie-001-1.jpg", "/images/products/hoodie-001-2.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Brown", "Navy"],
    stock: 20,
    badge: "NEW",
    rating: null,
    sold: null,
    featured: true,
    newArrival: true,
    isDemo: true,
  },
  {
    id: "hoodie-002",
    slug: "hoodie-zip",
    name: "Hoodie Zip",
    category: "hoodie-sweater",
    price: 159000,
    description:
      "Hoodie dengan resleting depan, praktis dipakai sebagai lapisan luar.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/hoodie-002-1.jpg", "/images/products/hoodie-002-2.jpg"],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Grey", "Army"],
    stock: 20,
    badge: "FEATURED",
    rating: null,
    sold: null,
    featured: true,
    newArrival: false,
    isDemo: true,
  },
  {
    id: "sweater-001",
    slug: "sweater-crewneck",
    name: "Sweater Crewneck",
    category: "hoodie-sweater",
    price: 119000,
    discountPrice: 99000,
    description:
      "Sweater crewneck dengan model simpel, pas untuk tampilan casual yang bersih.",
    // Replace with actual ALVI FASHION product photo
    images: ["/images/products/sweater-001-1.jpg", "/images/products/sweater-001-2.jpg"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey", "Brown", "Navy", "Black"],
    stock: 20,
    badge: "NEW",
    rating: null,
    sold: null,
    featured: true,
    newArrival: true,
    isDemo: true,
  },
];
