"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { categories } from "@/data/categories";
import { useDialog } from "@/hooks/useDialog";
import { getCategoryName, searchProducts } from "@/lib/products";
import { formatRupiah, getFinalPrice } from "@/lib/utils";

const MAX_RESULTS = 6;

/** Search overlay — pencarian client-side berdasarkan nama, kategori, dan warna. */
export default function SearchBar() {
  const { searchOpen, closeSearch } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useDialog(panelRef, searchOpen, closeSearch, { initialFocus: inputRef });

  const trimmed = query.trim();
  const results = useMemo(() => (trimmed ? searchProducts(trimmed) : []), [trimmed]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!trimmed) return;
    closeSearch();
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <AnimatePresence onExitComplete={() => setQuery("")}>
      {searchOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Cari produk"
            initial={{ y: "-8%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-4%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92svh] overflow-y-auto overscroll-contain bg-canvas shadow-2xl"
          >
            <div className="container-page py-5 md:py-8">
              <form onSubmit={submit} role="search" className="flex items-center gap-3 border-b border-ink pb-3">
                <Search className="size-6 shrink-0 text-soft" aria-hidden />
                <label htmlFor="site-search" className="sr-only">
                  Cari produk berdasarkan nama, kategori, atau warna
                </label>
                <input
                  ref={inputRef}
                  id="site-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari produk, kategori, atau warna"
                  autoComplete="off"
                  enterKeyHint="search"
                  className="min-w-0 flex-1 bg-transparent font-heading text-2xl outline-none placeholder:text-muted/70 md:text-4xl [&::-webkit-search-cancel-button]:hidden"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Tutup pencarian"
                  className="grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-line"
                >
                  <X className="size-6" aria-hidden />
                </button>
              </form>

              <div className="min-h-[220px] pb-6 pt-6 md:pt-8" aria-live="polite">
                {!trimmed && (
                  <div>
                    <p className="mb-4 text-sm text-soft">Coba cari kategori</p>
                    <ul className="flex flex-wrap gap-2">
                      {categories.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/kategori/${c.slug}`}
                            onClick={closeSearch}
                            className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 text-sm transition-colors hover:border-ink"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trimmed && results.length === 0 && (
                  <div className="flex flex-col items-start gap-5 py-4">
                    <p className="text-xl">Produk tidak ditemukan.</p>
                    <p className="text-sm text-soft">Coba kata kunci lain, misalnya “cargo”, “hoodie”, atau “hitam”.</p>
                    <Link href="/shop" onClick={closeSearch} className="btn btn-primary">
                      Kembali ke Shop
                    </Link>
                  </div>
                )}

                {results.length > 0 && (
                  <div>
                    <p className="mb-4 text-sm text-soft">
                      {results.length} produk ditemukan
                    </p>
                    <ul className="grid gap-x-8 md:grid-cols-2">
                      {results.slice(0, MAX_RESULTS).map((p) => (
                        <li key={p.id} className="border-b border-line">
                          <Link
                            href={`/produk/${p.slug}`}
                            onClick={closeSearch}
                            className="group flex items-center gap-4 py-3"
                          >
                            <span className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-[3px] bg-line">
                              <Image src={p.images[0]} alt="" fill sizes="56px" className="object-cover" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[15px] font-medium group-hover:underline">{p.name}</span>
                              <span className="block text-sm text-soft">
                                {getCategoryName(p.category)} · {p.colors.join(", ")}
                              </span>
                            </span>
                            <span className="shrink-0 text-sm font-semibold">{formatRupiah(getFinalPrice(p))}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {results.length > MAX_RESULTS && (
                      <Link
                        href={`/shop?q=${encodeURIComponent(trimmed)}`}
                        onClick={closeSearch}
                        className="btn btn-outline mt-6"
                      >
                        Lihat semua {results.length} hasil
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
