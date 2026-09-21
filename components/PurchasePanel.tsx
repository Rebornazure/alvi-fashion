"use client";

import { useState } from "react";
import ProductPurchase from "@/components/ProductPurchase";
import SizeGuideModal from "@/components/SizeGuideModal";
import type { Product } from "@/types/product";

/** Panel pembelian di halaman produk (pilihan varian + panduan ukuran). */
export default function PurchasePanel({ product }: { product: Product }) {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <>
      <ProductPurchase product={product} onOpenSizeGuide={() => setGuideOpen(true)} />
      <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
