"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingBag, Trash2, X } from "lucide-react";
import QuantitySelector from "@/components/QuantitySelector";
import { useStore } from "@/components/providers/StoreProvider";
import { useDialog } from "@/hooks/useDialog";
import { buildWhatsappMessage, buildWhatsappUrl, formatRupiah, hasWhatsapp } from "@/lib/utils";

export default function CartDrawer() {
  const { cartOpen, closeCart, lines, subtotal, itemCount, setQuantity, removeItem, clearCart } = useStore();
  const panelRef = useRef<HTMLElement>(null);
  const [waError, setWaError] = useState("");
  useDialog(panelRef, cartOpen, closeCart);

  function handleCheckout() {
    if (!hasWhatsapp()) {
      setWaError("Nomor WhatsApp belum dikonfigurasi.");
      return;
    }
    setWaError("");
    const url = buildWhatsappUrl(buildWhatsappMessage(lines, subtotal));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        setWaError("");
      }}
    >
      {cartOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Keranjang belanja"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-canvas shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-sans text-lg font-semibold tracking-normal">
                Keranjang{itemCount > 0 && <span className="ml-2 text-sm font-normal text-soft">({itemCount} item)</span>}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Tutup keranjang"
                className="grid size-10 place-items-center rounded-full transition-colors hover:bg-line"
              >
                <X className="size-5" aria-hidden />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-line">
                  <ShoppingBag className="size-7 text-soft" aria-hidden />
                </span>
                <p className="text-lg">Keranjang kamu masih kosong.</p>
                <Link href="/shop" onClick={closeCart} className="btn btn-primary">
                  Mulai Belanja
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-5">
                          <Link
                            href={`/produk/${line.product.slug}`}
                            onClick={closeCart}
                            className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[3px] bg-line"
                          >
                            <Image src={line.product.images[0]} alt={line.product.name} fill sizes="80px" className="object-cover" />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <Link
                                  href={`/produk/${line.product.slug}`}
                                  onClick={closeCart}
                                  className="block text-[15px] font-medium leading-snug"
                                >
                                  {line.product.name}
                                </Link>
                                <p className="mt-1 text-sm text-soft">
                                  {line.color} · {line.size}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(line.key)}
                                aria-label={`Hapus ${line.product.name} dari keranjang`}
                                className="-mr-2 -mt-1 grid size-9 shrink-0 place-items-center rounded-full text-soft transition-colors hover:bg-line hover:text-ink"
                              >
                                <Trash2 className="size-4" aria-hidden />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-3">
                              <QuantitySelector
                                size="sm"
                                value={line.quantity}
                                onChange={(q) => setQuantity(line.key, q)}
                                label={`Jumlah ${line.product.name}`}
                              />
                              <span className="text-[15px] font-semibold">{formatRupiah(line.lineTotal)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="space-y-4 border-t border-line bg-canvas px-5 pb-6 pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[15px]">Subtotal</span>
                    <span className="text-xl font-semibold">{formatRupiah(subtotal)}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-soft">
                    Pesanan dikirim ke toko lewat WhatsApp. Pembayaran online belum tersedia.
                  </p>
                  {waError && (
                    <p role="alert" className="rounded-[3px] border border-[#B3261E]/30 bg-[#B3261E]/5 px-3 py-2 text-sm text-[#B3261E]">
                      {waError}
                    </p>
                  )}
                  <button type="button" onClick={handleCheckout} className="btn btn-primary w-full">
                    Pesan via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="link-underline mx-auto block text-sm text-soft hover:text-ink"
                  >
                    Kosongkan keranjang
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
