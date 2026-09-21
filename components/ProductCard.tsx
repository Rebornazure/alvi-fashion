"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Plus, Star } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import WishlistButton from "@/components/WishlistButton";
import { siteConfig } from "@/data/site";
import { getColorHex } from "@/data/colors";
import { cn, formatRupiah, getFinalPrice, hasDiscount } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  /** Ganti label badge (mis. "FEATURED"). Kirim null untuk menyembunyikan badge. */
  badge?: string | null;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

const badgeStyle: Record<string, string> = {
  NEW: "bg-ink text-white",
  FEATURED: "bg-white text-ink",
  "BEST SELLER": "bg-accent text-white",
  SALE: "bg-accent text-white",
};

export default function ProductCard({
  product,
  badge,
  priority = false,
  sizes = "(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw",
  className,
}: ProductCardProps) {
  const { addItem, openQuickView } = useStore();
  const label = badge === undefined ? product.badge : badge;
  const soldOut = product.stock <= 0;
  const finalPrice = getFinalPrice(product);
  const discounted = hasDiscount(product);
  const href = `/produk/${product.slug}`;
  const hasSingleVariant = product.sizes.length === 1 && product.colors.length === 1;
  const shownColors = product.colors.slice(0, 4);
  const extraColors = product.colors.length - shownColors.length;

  function handleAdd() {
    if (soldOut) return;
    if (hasSingleVariant) {
      addItem({ productId: product.id, size: product.sizes[0], color: product.colors[0], quantity: 1 });
    } else {
      openQuickView(product);
    }
  }

  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-line">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04]",
              product.images[1] && "group-hover:opacity-0",
            )}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
            />
          )}
        </Link>

        {label && (
          <span
            className={cn(
              "pointer-events-none absolute left-2.5 top-2.5 rounded-[2px] px-2 py-1 text-[10px] font-semibold leading-none tracking-[0.08em]",
              badgeStyle[label] ?? "bg-white text-ink",
            )}
          >
            {label}
          </span>
        )}

        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2.5 top-2.5" />

        {siteConfig.showDemoNotice && product.isDemo && (
          <span className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-[2px] bg-white/85 px-1.5 py-0.5 text-[10px] font-medium text-soft backdrop-blur group-hover:opacity-0 touch:group-hover:opacity-100">
            Data demo
          </span>
        )}

        {/* Aksi cepat — desktop (hover / fokus keyboard) */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 touch:hidden">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="btn btn-light btn-sm flex-1 gap-1.5 px-3"
          >
            <Eye className="size-4" aria-hidden />
            Quick View
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={soldOut}
            aria-label={`Tambah ${product.name} ke keranjang`}
            className="btn btn-primary btn-sm gap-1.5 px-3"
          >
            <Plus className="size-4" aria-hidden />
            Keranjang
          </button>
        </div>

        {/* Aksi cepat — perangkat sentuh */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          aria-label={`Tambah ${product.name} ke keranjang`}
          className="absolute bottom-2.5 right-2.5 hidden size-11 place-items-center rounded-full bg-white text-ink transition-transform active:scale-90 disabled:opacity-40 touch:grid"
        >
          <Plus className="size-5" aria-hidden />
        </button>

        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-white/60 text-sm font-medium">Stok habis</div>
        )}
      </div>

      <div className="mt-3.5 space-y-1.5">
        <h3 className="font-sans text-[15px] font-medium leading-snug tracking-normal">
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>

        <p className="flex flex-wrap items-baseline gap-x-2 text-[15px]">
          <span className="font-semibold">{formatRupiah(finalPrice)}</span>
          {discounted && (
            <>
              <span className="sr-only">Harga sebelum diskon</span>
              <span className="text-sm text-muted line-through">{formatRupiah(product.price)}</span>
            </>
          )}
        </p>

        <div className="flex items-center gap-3 text-xs text-soft">
          <span className="flex items-center gap-1" role="img" aria-label={`Warna: ${product.colors.join(", ")}`}>
            {shownColors.map((c) => (
              <span
                key={c}
                title={c}
                className="size-3.5 rounded-full border border-black/15"
                style={{ backgroundColor: getColorHex(c) }}
              />
            ))}
            {extraColors > 0 && <span className="ml-0.5">+{extraColors}</span>}
          </span>
          {typeof product.rating === "number" && (
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-accent text-accent" aria-hidden />
              <span>
                {product.rating.toFixed(1)}
                <span className="sr-only"> dari 5</span>
              </span>
            </span>
          )}
          {typeof product.sold === "number" && <span>{product.sold.toLocaleString("id-ID")} terjual</span>}
        </div>
      </div>
    </article>
  );
}
