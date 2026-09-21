"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

/**
 * Galeri produk:
 *  - swipe horizontal di mobile (scroll-snap)
 *  - hover zoom sederhana di desktop
 *  - thumbnail + tombol panah
 *  - rasio 4:5 tetap → tidak ada layout shift
 */
export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setActive(clamped);
  }

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active) setActive(index);
  }

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--zx", `${x}%`);
    target.style.setProperty("--zy", `${y}%`);
  }

  return (
    <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
      <div className="flex flex-col gap-3 md:flex-row-reverse md:gap-4">
        <div className="relative min-w-0 flex-1">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-[3px]"
            role="group"
            aria-roledescription="carousel"
            aria-label={`Foto ${name}`}
          >
            {images.map((src, i) => (
              <div
                key={src}
                onMouseMove={onMove}
                className="group/zoom relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-line md:cursor-zoom-in"
                aria-label={`Foto ${i + 1} dari ${images.length}`}
              >
                <Image
                  src={src}
                  alt={`${name} — foto ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-300 ease-out md:group-hover/zoom:scale-[1.8]"
                  style={{ transformOrigin: "var(--zx, 50%) var(--zy, 50%)" }}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 transition-colors hover:bg-white disabled:opacity-0 md:grid"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={active === images.length - 1}
                aria-label="Foto berikutnya"
                className="absolute right-3 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 transition-colors hover:bg-white disabled:opacity-0 md:grid"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
              {/* indikator mobile */}
              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5 md:hidden" aria-hidden>
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={cn("h-1 rounded-full bg-white/90 transition-all", i === active ? "w-6" : "w-1.5 opacity-60")}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {images.length > 1 && (
          <ul className="hidden gap-3 md:flex md:w-20 md:flex-col" aria-label="Thumbnail foto">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Lihat foto ${i + 1}`}
                  aria-current={i === active}
                  className={cn(
                    "relative block aspect-[4/5] w-full overflow-hidden rounded-[3px] border-2 bg-line transition-colors",
                    i === active ? "border-ink" : "border-transparent hover:border-muted",
                  )}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
