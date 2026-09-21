export type ProductBadge = "NEW" | "FEATURED" | "BEST SELLER" | "SALE";

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** slug kategori, harus sama dengan salah satu `slug` di data/categories.ts */
  category: string;
  price: number;
  /** Harga setelah diskon. Kosongkan (undefined) jika tidak ada diskon. */
  discountPrice?: number;
  description: string;
  /** Foto produk. Gambar pertama dipakai sebagai foto utama. */
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  badge?: ProductBadge;
  /** null = belum ada data rating asli (tidak akan ditampilkan) */
  rating: number | null;
  /** null = belum ada data penjualan asli (tidak akan ditampilkan) */
  sold: number | null;
  featured: boolean;
  newArrival: boolean;
  /** true = data contoh. Ubah menjadi false (atau hapus) setelah diisi data asli. */
  isDemo?: boolean;
  /** Opsional: detail bahan. Jika kosong, tampil "Segera diperbarui". */
  material?: string;
  /** Opsional: petunjuk perawatan. */
  care?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Gambar kartu kategori */
  image: string;
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface CartLine extends CartItem {
  key: string;
  product: Product;
  unitPrice: number;
  lineTotal: number;
}
