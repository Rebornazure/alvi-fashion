"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import FilterPanel, { countActiveFilters, emptyFilters, type Filters } from "@/components/FilterPanel";
import ProductGrid from "@/components/ProductGrid";
import { useStore } from "@/components/providers/StoreProvider";
import { useDialog } from "@/hooks/useDialog";
import { getAllColors, getAllSizes, getCategoryName, getPriceBounds, searchProducts, sortProducts, type SortKey } from "@/lib/products";
import { formatRupiah, getFinalPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

const PAGE_SIZE = 8;

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "terbaru", label: "Terbaru" },
  { value: "termurah", label: "Harga Terendah" },
  { value: "termahal", label: "Harga Tertinggi" },
];

interface ProductBrowserProps {
  products: Product[];
  /** Jika diisi (halaman kategori), filter kategori disembunyikan. */
  fixedCategory?: string;
}

/** Grid produk + filter (kategori, harga, ukuran, warna) + sort + load more. */
export default function ProductBrowser({ products, fixedCategory }: ProductBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { wishlist, hydrated } = useStore();

  const q = (searchParams.get("q") ?? "").trim();
  const onlyFavorites = searchParams.get("favorit") === "1";
  const initialSort = searchParams.get("sort");
  const initialCategory = searchParams.get("kategori");

  const [filters, setFilters] = useState<Filters>(() => ({
    ...emptyFilters,
    categories: !fixedCategory && initialCategory ? [initialCategory] : [],
  }));
  const [sort, setSort] = useState<SortKey>(
    sortOptions.some((o) => o.value === initialSort) ? (initialSort as SortKey) : "featured",
  );
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  useDialog(sheetRef, sheetOpen, () => setSheetOpen(false));

  const sizes = useMemo(() => getAllSizes(products), [products]);
  const colors = useMemo(() => getAllColors(products), [products]);
  const priceBounds = useMemo(() => getPriceBounds(products), [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (q) list = searchProducts(q, list);
    if (onlyFavorites) list = list.filter((p) => wishlist.includes(p.id));
    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
    const min = filters.min ? Number(filters.min) : null;
    const max = filters.max ? Number(filters.max) : null;
    if (min !== null) list = list.filter((p) => getFinalPrice(p) >= min);
    if (max !== null) list = list.filter((p) => getFinalPrice(p) <= max);
    if (filters.sizes.length) list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    if (filters.colors.length) list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
    return sortProducts(list, sort);
  }, [products, q, onlyFavorites, wishlist, filters, sort]);

  // Reset "load more" ketika hasil berubah
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filters, sort, q, onlyFavorites]);

  const activeCount = countActiveFilters(filters);
  const shown = filtered.slice(0, visible);
  const waitingFavorites = onlyFavorites && !hydrated;

  function setUrlParam(name: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value);
    else params.delete(name);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function resetAll() {
    setFilters(emptyFilters);
    setSort("featured");
  }

  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  if (q) chips.push({ key: "q", label: `Pencarian: “${q}”`, onRemove: () => setUrlParam("q", null) });
  if (onlyFavorites) chips.push({ key: "fav", label: "Favorit saya", onRemove: () => setUrlParam("favorit", null) });
  filters.categories.forEach((c) =>
    chips.push({
      key: `c-${c}`,
      label: getCategoryName(c),
      onRemove: () => setFilters((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })),
    }),
  );
  if (filters.min || filters.max) {
    chips.push({
      key: "price",
      label: `Harga ${filters.min ? formatRupiah(Number(filters.min)) : "0"} – ${filters.max ? formatRupiah(Number(filters.max)) : "∞"}`,
      onRemove: () => setFilters((f) => ({ ...f, min: "", max: "" })),
    });
  }
  filters.sizes.forEach((s) =>
    chips.push({
      key: `s-${s}`,
      label: `Ukuran ${s}`,
      onRemove: () => setFilters((f) => ({ ...f, sizes: f.sizes.filter((x) => x !== s) })),
    }),
  );
  filters.colors.forEach((c) =>
    chips.push({
      key: `col-${c}`,
      label: c,
      onRemove: () => setFilters((f) => ({ ...f, colors: f.colors.filter((x) => x !== c) })),
    }),
  );

  const panel = (idPrefix: string) => (
    <FilterPanel
      idPrefix={idPrefix}
      filters={filters}
      onChange={setFilters}
      sizes={sizes}
      colors={colors}
      priceBounds={priceBounds}
      showCategories={!fixedCategory}
    />
  );

  return (
    <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14">
      {/* Filter desktop */}
      <aside aria-label="Filter produk" className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+24px)] max-h-[calc(100svh-var(--header-h)-48px)] overflow-y-auto pr-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-sans text-lg font-semibold tracking-normal">Filter</h2>
            {activeCount > 0 && (
              <button type="button" onClick={() => setFilters(emptyFilters)} className="link-underline text-sm">
                Reset
              </button>
            )}
          </div>
          {panel("d")}
        </div>
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-3 border-b border-line pb-4">
          <p className="text-sm text-soft" aria-live="polite">
            {waitingFavorites ? "Memuat favorit…" : `${filtered.length} produk`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="btn btn-outline btn-sm gap-2 lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filter{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
            <div className="relative">
              <label htmlFor="sort" className="sr-only">
                Urutkan produk
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 appearance-none rounded-[3px] border border-line bg-paper pl-3 pr-9 text-sm outline-none focus:border-ink"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" aria-hidden />
            </div>
          </div>
        </div>

        {chips.length > 0 && (
          <ul className="mb-6 flex flex-wrap gap-2" aria-label="Filter aktif">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  aria-label={`Hapus filter ${chip.label}`}
                  className="flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-paper py-1 pl-3.5 pr-2.5 text-sm transition-colors hover:border-ink"
                >
                  {chip.label}
                  <X className="size-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}

        {waitingFavorites ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5" aria-hidden>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-[3px] bg-line" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-start gap-5 py-16 md:items-center md:py-24 md:text-center">
            <h2 className="text-3xl md:text-4xl">Produk tidak ditemukan.</h2>
            <p className="max-w-md text-soft">
              {onlyFavorites && !q && activeCount === 0
                ? "Kamu belum menyimpan produk favorit. Tekan ikon hati pada produk untuk menyimpannya."
                : "Coba ubah kata kunci atau kurangi filter yang aktif."}
            </p>
            <Link href="/shop" onClick={resetAll} className="btn btn-primary">
              Kembali ke Shop
            </Link>
          </div>
        ) : (
          <>
            <ProductGrid products={shown} columns={3} priorityCount={4} />
            <div className="mt-14 flex flex-col items-center gap-3">
              <p className="text-sm text-soft">
                Menampilkan {shown.length} dari {filtered.length} produk
              </p>
              {shown.length < filtered.length && (
                <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn btn-outline">
                  Muat lebih banyak
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Filter mobile: bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              aria-hidden
            />
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label="Filter produk"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-2xl bg-canvas"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="font-sans text-lg font-semibold tracking-normal">Filter</h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Tutup filter"
                  className="grid size-10 place-items-center rounded-full hover:bg-line"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">{panel("m")}</div>
              <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-line px-5 pb-6 pt-4">
                <button
                  type="button"
                  onClick={() => setFilters(emptyFilters)}
                  disabled={activeCount === 0}
                  className="btn btn-outline"
                >
                  Reset
                </button>
                <button type="button" onClick={() => setSheetOpen(false)} className="btn btn-primary">
                  Tampilkan {filtered.length} produk
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
