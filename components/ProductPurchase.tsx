"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import QuantitySelector from "@/components/QuantitySelector";
import WishlistButton from "@/components/WishlistButton";
import { useStore } from "@/components/providers/StoreProvider";
import { getColorHex } from "@/data/colors";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductPurchaseProps {
  product: Product;
  /** Tampilan ringkas untuk Quick View */
  compact?: boolean;
  onOpenSizeGuide?: () => void;
}

/** Pilih warna, ukuran, jumlah, lalu tambah ke keranjang / beli sekarang. Dipakai di halaman produk & Quick View. */
export default function ProductPurchase({ product, compact = false, onOpenSizeGuide }: ProductPurchaseProps) {
  const { addItem, openCart } = useStore();
  const [color, setColor] = useState<string>(product.colors[0] ?? "");
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const soldOut = product.stock <= 0;

  function validate(): boolean {
    if (!size) {
      setError("Pilih ukuran dulu.");
      return false;
    }
    if (!color) {
      setError("Pilih warna dulu.");
      return false;
    }
    setError("");
    return true;
  }

  function add(): boolean {
    if (!validate() || !size) return false;
    addItem({ productId: product.id, size, color, quantity });
    return true;
  }

  function handleAdd() {
    if (!add()) return;
    setJustAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setJustAdded(false), 1800);
  }

  function handleBuyNow() {
    if (!add()) return;
    openCart();
  }

  return (
    <div className="space-y-6">
      {product.colors.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-sm">
            Warna: <span className="font-medium">{color}</span>
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((c) => {
              const active = c === color;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setColor(c);
                    setError("");
                  }}
                  aria-pressed={active}
                  aria-label={c}
                  title={c}
                  className={cn(
                    "grid size-11 place-items-center rounded-full border transition-all",
                    active ? "border-ink ring-1 ring-ink" : "border-line hover:border-muted",
                  )}
                >
                  <span
                    className="size-7 rounded-full border border-black/15"
                    style={{ backgroundColor: getColorHex(c) }}
                  />
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {product.sizes.length > 0 && (
        <fieldset>
          <legend className="mb-3 flex w-full items-center justify-between text-sm">
            <span>
              Ukuran: <span className="font-medium">{size ?? "belum dipilih"}</span>
            </span>
            {onOpenSizeGuide && (
              <button type="button" onClick={onOpenSizeGuide} className="link-underline text-sm font-medium">
                Panduan ukuran
              </button>
            )}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const active = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setError("");
                  }}
                  aria-pressed={active}
                  className={cn(
                    "h-11 min-w-12 rounded-[3px] border px-3.5 text-sm font-medium transition-colors",
                    active ? "border-ink bg-ink text-white" : "border-line bg-paper hover:border-ink",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {error && (
        <p role="alert" className="text-sm font-medium text-[#B3261E]">
          {error}
        </p>
      )}

      <div className={cn("flex flex-col gap-3", !compact && "sm:flex-row sm:items-center")}>
        <div className="flex items-center gap-4">
          <span className="text-sm">Jumlah</span>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>
      </div>

      {soldOut ? (
        <button type="button" disabled className="btn btn-primary w-full">
          Stok habis
        </button>
      ) : (
        <div className="grid gap-3">
          <button type="button" onClick={handleAdd} className="btn btn-outline w-full gap-2">
            {justAdded ? (
              <>
                <Check className="size-4" aria-hidden />
                Ditambahkan
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" aria-hidden />
                Tambah ke Keranjang
              </>
            )}
          </button>
          <button type="button" onClick={handleBuyNow} className="btn btn-primary w-full">
            Beli Sekarang
          </button>
          {!compact && <WishlistButton productId={product.id} productName={product.name} variant="full" />}
        </div>
      )}
    </div>
  );
}
