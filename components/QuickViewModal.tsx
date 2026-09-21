"use client";

import { useRef } from "react";
import { useDialog } from "@/hooks/useDialog";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import ProductPurchase from "@/components/ProductPurchase";
import { useStore } from "@/components/providers/StoreProvider";
import { formatRupiah, getFinalPrice, hasDiscount } from "@/lib/utils";

export default function QuickViewModal() {
  const { quickView, closeQuickView } = useStore();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialog(dialogRef, !!quickView, closeQuickView, { initialFocus: closeRef });

  return (
    <AnimatePresence>
      {quickView && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6" key={quickView.id}>
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            aria-hidden
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view ${quickView.name}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-2xl bg-canvas md:max-h-[88vh] md:grid-cols-2 md:rounded-[4px]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closeQuickView}
              aria-label="Tutup quick view"
              className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 transition-colors hover:bg-white"
            >
              <X className="size-5" aria-hidden />
            </button>

            <div className="relative aspect-[4/3] bg-line md:aspect-auto md:min-h-[520px]">
              <Image
                src={quickView.images[0]}
                alt={quickView.name}
                fill
                sizes="(min-width: 768px) 448px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="p-5 pb-8 md:p-8">
              <h2 className="pr-10 text-3xl md:text-4xl">{quickView.name}</h2>
              <p className="mt-3 flex items-baseline gap-2.5">
                <span className="text-xl font-semibold">{formatRupiah(getFinalPrice(quickView))}</span>
                {hasDiscount(quickView) && (
                  <span className="text-sm text-muted line-through">{formatRupiah(quickView.price)}</span>
                )}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-soft">{quickView.description}</p>
              <div className="mt-6">
                <ProductPurchase product={quickView} compact />
              </div>
              <Link
                href={`/produk/${quickView.slug}`}
                onClick={closeQuickView}
                className="link-underline mt-6 inline-block text-sm font-medium"
              >
                Lihat detail lengkap
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
