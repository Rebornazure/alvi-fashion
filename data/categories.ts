import type { Category } from "@/types/product";

/**
 * Daftar kategori. Tambah/ubah/hapus kategori di sini.
 * `slug` dipakai di URL: /kategori/<slug> dan di field `category` pada data/products.ts.
 * Gambar: // Replace with actual ALVI FASHION product photo
 */
export const categories: Category[] = [
  {
    slug: "celana-cargo",
    name: "Celana Cargo",
    description: "Celana cargo dengan saku samping untuk aktivitas sehari-hari.",
    image: "/images/categories/celana-cargo.jpg",
  },
  {
    slug: "celana-tactical",
    name: "Celana Tactical",
    description: "Celana tactical dengan potongan fungsional untuk gaya outdoor.",
    image: "/images/categories/celana-tactical.jpg",
  },
  {
    slug: "celana-pendek",
    name: "Celana Pendek",
    description: "Celana pendek santai untuk hari-hari yang panas.",
    image: "/images/categories/celana-pendek.jpg",
  },
  {
    slug: "celana-panjang",
    name: "Celana Panjang",
    description: "Celana panjang casual, dari cargo panjang sampai joger.",
    image: "/images/categories/celana-panjang.jpg",
  },
  {
    slug: "celana-formal",
    name: "Celana Formal",
    description: "Celana formal pria untuk kerja, kuliah, dan acara resmi.",
    image: "/images/categories/celana-formal.jpg",
  },
  {
    slug: "hoodie-sweater",
    name: "Hoodie & Sweater",
    description: "Hoodie dan sweater untuk dipadukan dengan gaya casual.",
    image: "/images/categories/hoodie-sweater.jpg",
  },
  {
    slug: "celana-chino",
    name: "Celana Chino",
    description: "Celana chino yang mudah dipadukan dari santai sampai rapi.",
    image: "/images/categories/celana-chino.jpg",
  },
];
