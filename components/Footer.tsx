import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { siteConfig } from "@/data/site";
import { getMapsUrl } from "@/lib/utils";

const socials = [
  { label: "Instagram", url: siteConfig.instagram },
  { label: "TikTok", url: siteConfig.tiktok },
  { label: "Shopee", url: siteConfig.shopee },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-heading text-3xl font-semibold tracking-[0.14em]">ALVI FASHION</p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/70">
              Fashion sederhana untuk gaya sehari-hari.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4 md:col-start-5">
            <div>
              <h2 className="font-sans text-sm font-semibold tracking-normal text-white">Jelajahi</h2>
              <ul className="mt-4 space-y-1 text-[15px] text-white/75">
                {[
                  { label: "Shop", href: "/shop" },
                  { label: "Kategori", href: "/shop" },
                  { label: "Tentang", href: "/tentang" },
                  { label: "Kontak", href: "/kontak" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold tracking-normal text-white">Sosial</h2>
              <ul className="mt-4 space-y-1 text-[15px] text-white/75">
                {socials.map((s) => (
                  <li key={s.label}>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-9 items-center gap-1 hover:text-white"
                      >
                        {s.label}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                        <span className="sr-only">(buka di tab baru)</span>
                      </a>
                    ) : (
                      <span className="inline-flex min-h-9 items-center gap-2 text-white/55">
                        {s.label}
                        <span className="text-xs">segera hadir</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <h2 className="font-sans text-sm font-semibold tracking-normal text-white">Lokasi toko</h2>
            <address className="mt-4 text-[15px] not-italic leading-relaxed text-white/75">
              {siteConfig.address.lines.slice(0, 5).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-flex items-center gap-1 text-sm font-medium"
            >
              Lihat di Google Maps
              <ArrowUpRight className="size-3.5" aria-hidden />
              <span className="sr-only">(buka di tab baru)</span>
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ALVI FASHION. All rights reserved.</p>
          {siteConfig.showDemoNotice && (
            <p>Produk, harga, dan foto di website ini masih data demo.</p>
          )}
        </div>
      </div>
    </footer>
  );
}
