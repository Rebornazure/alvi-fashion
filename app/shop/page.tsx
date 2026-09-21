import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductBrowser from "@/components/ProductBrowser";
import { pageMetadata } from "@/lib/metadata";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = pageMetadata({
  title: "Shop",
  description: "Jelajahi semua koleksi pakaian ALVI FASHION: celana cargo, tactical, chino, formal, hoodie, dan lainnya.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <div className="pt-header">
      <div className="container-page pb-20 pt-8 md:pb-28 md:pt-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
        <header className="mb-10 md:mb-14">
          <h1 className="text-5xl md:text-7xl">Semua koleksi</h1>
          <p className="mt-4 max-w-xl text-soft md:text-lg">
            Cari berdasarkan kategori, harga, ukuran, atau warna.
          </p>
        </header>
        <Suspense fallback={<BrowserFallback />}>
          <ProductBrowser products={getAllProducts()} />
        </Suspense>
      </div>
    </div>
  );
}

function BrowserFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4" aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-[4/5] animate-pulse rounded-[3px] bg-line" />
      ))}
    </div>
  );
}
