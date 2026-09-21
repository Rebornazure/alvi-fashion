"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface ProductCarouselProps {
  products: Product[];
  label: string;
  badge?: string | null;
}

/** Carousel horizontal: swipe di mobile (scroll-snap), tombol panah di desktop. */
export default function ProductCarousel({ products, label, badge }: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  function scrollByPage(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        onScroll={update}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-5 pb-2 md:-mx-8 md:gap-5 md:px-8 lg:-mx-12 lg:px-12"
        style={{ scrollPaddingInline: "1.25rem" }}
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="w-[64%] shrink-0 snap-start sm:w-[42%] md:w-[calc((100%-2*1.25rem)/3)] lg:w-[calc((100%-3*1.25rem)/4)]"
          >
            <ProductCard product={product} badge={badge} sizes="(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 62vw" />
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={!canPrev}
          aria-label="Produk sebelumnya"
          className="grid size-11 place-items-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={!canNext}
          aria-label="Produk berikutnya"
          className="grid size-11 place-items-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
