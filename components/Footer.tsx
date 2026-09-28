import Link from "next/link";
import { siteConfig } from "@/data/site";
import { getMapsUrl } from "@/lib/utils";
import { GoogleMapsIcon, InstagramIcon, ShopeeIcon, TikTokIcon } from "@/components/SocialIcons";

const socials = [
  { label: "Instagram", url: siteConfig.instagram, Icon: InstagramIcon },
  { label: "TikTok", url: siteConfig.tiktok, Icon: TikTokIcon },
  { label: "Shopee", url: siteConfig.shopee, Icon: ShopeeIcon },
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
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              title="Lihat lokasi di Google Maps"
              className="mt-6 grid size-11 place-items-center rounded-full bg-white transition-transform duration-200 hover:scale-105"
            >
              <GoogleMapsIcon className="size-6" />
              <span className="sr-only">Lihat lokasi toko di Google Maps (buka di tab baru)</span>
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8">
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
              <ul className="mt-4 flex items-center gap-3">
                {socials.map(({ label, url, Icon }) => (
                  <li key={label}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={label}
                        className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:bg-white hover:text-ink"
                      >
                        <Icon className="size-5" />
                        <span className="sr-only">{label} (buka di tab baru)</span>
                      </a>
                    ) : (
                      <span
                        title={`${label} — segera hadir`}
                        className="grid size-11 place-items-center rounded-full border border-white/25 text-white/70"
                      >
                        <Icon className="size-5" />
                        <span className="sr-only">{label} — segera hadir</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ALVI FASHION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}