import { siteConfig } from "@/data/site";
import type { CartLine, Product } from "@/types/product";

/** Gabungkan class name secara aman */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** 89000 → "Rp 89.000" */
export function formatRupiah(value: number): string {
  return rupiah.format(value).replace(/\u00a0/g, " ");
}

/** Harga yang benar-benar dibayar (harga diskon jika ada) */
export function getFinalPrice(product: Pick<Product, "price" | "discountPrice">): number {
  return typeof product.discountPrice === "number" && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
}

export function hasDiscount(product: Pick<Product, "price" | "discountPrice">): boolean {
  return getFinalPrice(product) < product.price;
}

export function cartKey(productId: string, size: string, color: string): string {
  return `${productId}|${size}|${color}`;
}

/** Link Google Maps: pakai mapsUrl jika diisi, kalau tidak pakai link pencarian dari alamat. */
export function getMapsUrl(): string {
  if (siteConfig.mapsUrl) return siteConfig.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`;
}

/** Bersihkan nomor WhatsApp: hanya angka, 08xx → 628xx. Kosong jika belum dikonfigurasi. */
export function getWhatsappNumber(): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function hasWhatsapp(): boolean {
  return getWhatsappNumber() !== "";
}

/** Susun pesan pesanan untuk WhatsApp */
export function buildWhatsappMessage(lines: CartLine[], subtotal: number): string {
  const items = lines
    .map(
      (l) =>
        `- ${l.product.name}\n  Warna: ${l.color} | Ukuran: ${l.size} | Qty: ${l.quantity} | ${formatRupiah(l.lineTotal)}`,
    )
    .join("\n");
  return `Halo ${siteConfig.name},\nsaya ingin memesan:\n\n${items}\n\nTotal: ${formatRupiah(subtotal)}`;
}

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${getWhatsappNumber()}?text=${encodeURIComponent(message)}`;
}

/** URL dasar website (untuk metadata, sitemap). Tanpa konfigurasi khusus di Vercel. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && !explicit.includes("your-domain.com")) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
