"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";
import { useStore } from "@/components/providers/StoreProvider";
import { categories } from "@/data/categories";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, wishlist, hydrated, openCart, openSearch, cartPulse } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const isHome = pathname === "/";
  // Transparan hanya di atas hero halaman utama
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!catOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!catRef.current?.contains(e.target as Node)) setCatOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCatOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [catOpen]);

  const iconBtn = cn(
    "relative grid size-10 place-items-center rounded-full transition-colors min-[360px]:size-11",
    transparent ? "hover:bg-white/15" : "hover:bg-black/5",
  );

  const cartBadge = hydrated && itemCount > 0 && (
    <motion.span
      key={cartPulse}
      initial={{ scale: 1.7 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 14 }}
      className="absolute right-0.5 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-[18px] text-white"
    >
      {itemCount > 99 ? "99+" : itemCount}
      <span className="sr-only"> item di keranjang</span>
    </motion.span>
  );

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,box-shadow] duration-300",
          transparent
            ? "border-transparent bg-transparent text-white"
            : "border-line bg-canvas/85 text-ink shadow-[0_1px_16px_rgba(0,0,0,0.04)] backdrop-blur-xl",
        )}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-2 min-[360px]:gap-4">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — beranda`}
            className="min-w-0 shrink font-heading text-base font-semibold tracking-[0.1em] min-[360px]:text-[1.15rem] min-[360px]:tracking-[0.16em] md:text-[1.3rem]"
          >
            ALVI FASHION
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-sm">
              {navLinks.map((link) => {
                if ("hasDropdown" in link && link.hasDropdown) {
                  return (
                    <li
                      key={link.label}
                      ref={catRef}
                      className="relative"
                      onMouseEnter={() => {
                        window.clearTimeout(closeTimer.current);
                        setCatOpen(true);
                      }}
                      onMouseLeave={() => {
                        closeTimer.current = window.setTimeout(() => setCatOpen(false), 160);
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={catOpen}
                        aria-haspopup="true"
                        onClick={() => setCatOpen((v) => !v)}
                        className={cn("link-underline flex items-center gap-1 py-2", pathname.startsWith("/kategori") && "font-semibold")}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn("size-4 transition-transform duration-300", catOpen && "rotate-180")}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence>
                        {catOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                          >
                            <ul className="rounded-[4px] border border-line bg-canvas p-2 text-ink shadow-xl">
                              {categories.map((c) => (
                                <li key={c.slug}>
                                  <Link
                                    href={`/kategori/${c.slug}`}
                                    className="block rounded-[3px] px-3 py-2.5 transition-colors hover:bg-black/5"
                                  >
                                    {c.name}
                                  </Link>
                                </li>
                              ))}
                              <li className="mt-1 border-t border-line pt-1">
                                <Link href="/shop" className="block rounded-[3px] px-3 py-2.5 font-medium hover:bg-black/5">
                                  Lihat semua produk
                                </Link>
                              </li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }
                const active = isActive(link.href);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("link-underline py-2", active && "font-semibold")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Aksi */}
          <div className="flex items-center gap-0.5">
            <button type="button" onClick={openSearch} aria-label="Cari produk" className={iconBtn}>
              <Search className="size-5" aria-hidden />
            </button>
            <Link
              href="/shop?favorit=1"
              aria-label={`Favorit${hydrated && wishlist.length > 0 ? `, ${wishlist.length} produk` : ""}`}
              className={cn(iconBtn, "hidden lg:grid")}
            >
              <Heart className="size-5" aria-hidden />
              {hydrated && wishlist.length > 0 && (
                <span className="absolute right-1 top-1 size-2 rounded-full bg-accent" aria-hidden />
              )}
            </Link>
            <button type="button" onClick={openCart} aria-label="Buka keranjang" className={iconBtn}>
              <ShoppingBag className="size-5" aria-hidden />
              {cartBadge}
            </button>
            <Link
              href="/shop"
              className={cn("btn btn-sm ml-3 hidden lg:inline-flex", transparent ? "btn-light" : "btn-primary")}
            >
              Belanja Sekarang
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              className={cn(iconBtn, "lg:hidden")}
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
