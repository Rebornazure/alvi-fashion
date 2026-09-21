/**
 * ============================================================
 *  KONFIGURASI TOKO — ALVI FASHION
 * ============================================================
 * Cukup edit file ini untuk mengganti informasi toko.
 * Field yang dikosongkan ("") akan tampil sebagai "Segera diperbarui"
 * atau disembunyikan otomatis — tidak akan menampilkan field kosong.
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  address: { lines: string[]; full: string };
  whatsappNumber: string;
  phone: string;
  email: string;
  instagram: string;
  tiktok: string;
  shopee: string;
  mapsUrl: string;
  businessHours: { day: string; hours: string }[];
  shippingInfo: string;
  returnPolicy: string;
  showDemoNotice: boolean;
}

export const siteConfig: SiteConfig = {
  name: "ALVI FASHION",
  tagline: "Fashion untuk Gaya Sehari-hari",
  description:
    "Temukan koleksi fashion ALVI FASHION untuk gaya sehari-hari. Jelajahi berbagai pilihan pakaian dan koleksi fashion.",

  // ---- Lokasi toko (sudah diisi dari data toko) ----
  address: {
    lines: [
      "Jl. Pattimura Gg. Masjid Alfalah",
      "Loram Wetan Krajan",
      "Loram Wetan",
      "Kec. Jati",
      "Kabupaten Kudus",
      "Jawa Tengah 59344",
      "Indonesia",
    ],
    /** Versi satu baris, dipakai untuk pencarian Google Maps */
    full: "Jl. Pattimura Gg. Masjid Alfalah, Loram Wetan Krajan, Loram Wetan, Kec. Jati, Kabupaten Kudus, Jawa Tengah 59344, Indonesia",
  },

  // ---- ISI SENDIRI (kosong = belum tersedia) ----
  /** Format internasional tanpa + atau spasi, contoh: "6281234567890" (08xx otomatis diubah jadi 628xx) */
  whatsappNumber: "6285745820429",
  phone: "6285745820429",
  email: "",
  instagram: "", // contoh: "https://instagram.com/namaakun"
  tiktok: "", // contoh: "https://tiktok.com/@namaakun"
  shopee: "", // contoh: "https://shopee.co.id/namatoko"

  /**
   * Link Google Maps. Jika dikosongkan, website memakai link pencarian Google Maps
   * berdasarkan alamat di atas (valid dan tanpa koordinat karangan).
   * Untuk pin yang tepat: buka toko di Google Maps → Bagikan → Salin link → tempel di sini.
   */
  mapsUrl: "https://maps.app.goo.gl/JCGJTgks9eMQvKxd7",

  /** Jam buka. Kosongkan array jika belum ada. Contoh: [{ day: "Senin – Sabtu", hours: "09.00 – 17.00" }] */
  businessHours: [],

  /** Info pengiriman & retur. Kosongkan jika belum ada; halaman akan menampilkan "Segera diperbarui". */
  shippingInfo: "",
  returnPolicy: "",

  /**
   * Selama produk masih data demo, website menampilkan label "Demo".
   * Setelah semua data produk asli, ubah menjadi false.
   */
  showDemoNotice: true,
};

/** Menu navigasi utama */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Kategori", href: "/shop", hasDropdown: true },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
] as const;

/**
 * Semua gambar non-produk ada di sini supaya gampang diganti.
 * Timpa file di public/images/... dengan foto asli (nama file sama), atau ubah path-nya di sini.
 * Ukuran yang disarankan: hero 2000×1250 px, kartu 1000×1250 px, semuanya di bawah 400 KB.
 * // Replace with actual ALVI FASHION product photo
 */
export const siteImages = {
  hero: {
    src: "/images/banners/hero.jpg",
    alt: "Koleksi fashion ALVI FASHION",
  },
  promo: {
    src: "/images/banners/promo.jpg",
    alt: "Koleksi pilihan ALVI FASHION",
  },
  story: {
    src: "/images/banners/story.jpg",
    alt: "Pakaian ALVI FASHION untuk aktivitas sehari-hari",
  },
  location: {
    src: "/images/banners/location.jpg",
    alt: "Tampilan toko ALVI FASHION",
  },
  og: "/images/brand/og-image.jpg",
} as const;

/**
 * Panduan ukuran (CONTOH). Ganti dengan ukuran asli produk toko.
 * Kosongkan `rows` jika belum ada, halaman akan menampilkan "Segera diperbarui".
 */
export const sizeGuide = {
  isDemo: true,
  unit: "cm",
  columns: ["Ukuran", "Lingkar pinggang", "Panjang"],
  rows: [
    ["S", "72 – 76", "96"],
    ["M", "77 – 81", "98"],
    ["L", "82 – 86", "100"],
    ["XL", "87 – 92", "102"],
    ["XXL", "93 – 98", "104"],
  ],
} as const;
