import { categories } from "@/data/categories";
import { colorMap } from "@/data/colors";
import { products } from "@/data/products";
import type { Category, Product } from "@/types/product";
import { getFinalPrice } from "./utils";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeatured(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getNewArrivals(limit = 10): Product[] {
  return products.filter((p) => p.newArrival).slice(0, limit);
}

/**
 * Produk untuk bagian "Yang Paling Dicari".
 * Jika ada data penjualan asli (`sold`), urutkan berdasarkan itu.
 * Jika belum ada, pakai produk `featured` dan beri label "Featured" (bukan "Best Seller").
 */
export function getBestSellers(
  limit = 4,
  excludeIds: string[] = [],
): { items: Product[]; hasRealSalesData: boolean } {
  const withSales = products.filter((p) => typeof p.sold === "number" && !p.isDemo);
  if (withSales.length >= limit) {
    return {
      items: [...withSales].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)).slice(0, limit),
      hasRealSalesData: true,
    };
  }
  const items = products.filter((p) => p.featured && !excludeIds.includes(p.id)).slice(0, limit);
  return { items, hasRealSalesData: false };
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...same, ...others].slice(0, limit);
}

/** Pencarian client-side: nama, kategori, warna (termasuk alias Indonesia). Semua kata harus cocok. */
export function searchProducts(query: string, list: Product[] = products): Product[] {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  if (tokens.length === 0) return [];
  return list.filter((p) => {
    const haystack = [
      p.name,
      getCategoryName(p.category),
      p.category.replace(/-/g, " "),
      ...p.colors,
      ...p.colors.flatMap((c) => colorMap[c]?.aliases ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}

export type SortKey = "featured" | "terbaru" | "termurah" | "termahal";

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "termurah":
      return copy.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    case "termahal":
      return copy.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    case "terbaru":
      return copy.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    case "featured":
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export function getPriceBounds(list: Product[] = products): { min: number; max: number } {
  const prices = list.map(getFinalPrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getAllSizes(list: Product[] = products): string[] {
  const order = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const set = new Set(list.flatMap((p) => p.sizes));
  return [...set].sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return Number(a) - Number(b);
  });
}

export function getAllColors(list: Product[] = products): string[] {
  const set = new Set(list.flatMap((p) => p.colors));
  return [...set];
}
