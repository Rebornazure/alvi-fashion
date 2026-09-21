import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/shop`, lastModified: now },
    { url: `${base}/tentang`, lastModified: now },
    { url: `${base}/kontak`, lastModified: now },
    ...categories.map((c) => ({ url: `${base}/kategori/${c.slug}`, lastModified: now })),
    ...products.map((p) => ({ url: `${base}/produk/${p.slug}`, lastModified: now })),
  ];
}
