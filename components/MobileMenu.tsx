"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Heart, X } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { categories } from "@/data/categories";
import { siteConfig } from "@/data/site";
import { useDialog } from "@/hooks/useDialog";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { wishlist, hydrated } = useStore();
  useDialog(ref, open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-canvas lg:hidden"
        >
          <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="font-heading text-[1.15rem] font-semibold tracking-[0.16em]"
              aria-label={`${siteConfig.name} — beranda`}
            >
              ALVI FASHION
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup menu"
              className="grid size-11 place-items-center rounded-full hover:bg-black/5"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          <nav aria-label="Menu utama" className="container-page flex flex-1 flex-col pb-8 pt-6">
            <ul>
              {mainLinks.map((link, i) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-16 items-center font-heading text-[2.25rem] leading-none",
                        active ? "text-accent" : "text-ink",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8"
            >
              <p className="mb-3 text-sm text-soft">Kategori</p>
              <ul className="grid grid-cols-2 gap-x-4">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/kategori/${c.slug}`} onClick={onClose} className="flex min-h-11 items-center text-[15px]">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-auto space-y-3 pt-10"
            >
              <Link href="/shop?favorit=1" onClick={onClose} className="btn btn-outline w-full gap-2">
                <Heart className="size-4" aria-hidden />
                Favorit{hydrated && wishlist.length > 0 ? ` (${wishlist.length})` : ""}
              </Link>
              <Link href="/shop" onClick={onClose} className="btn btn-primary w-full">
                Belanja Sekarang
              </Link>
              <p className="pt-2 text-center text-xs text-soft">
                {siteConfig.address.lines[1]}, {siteConfig.address.lines[3]}
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
