import type { Metadata } from "next";
import { siteConfig, siteImages } from "@/data/site";

interface PageMetadataInput {
  title: string;
  description: string;
  /** path canonical, contoh "/shop" */
  path: string;
  /** gambar Open Graph (path lokal). Default: og-image brand. */
  image?: string;
}

/** Metadata lengkap (title, description, canonical, Open Graph, Twitter) untuk satu halaman. */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const img = image ?? siteImages.og;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: img }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img],
    },
  };
}
