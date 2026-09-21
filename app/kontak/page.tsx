import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getMapsUrl, getWhatsappNumber, hasWhatsapp } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Kontak",
  description: "Lokasi toko ALVI FASHION di Loram Wetan, Kudus, serta cara menghubungi kami.",
  path: "/kontak",
});

const PENDING = "Segera diperbarui";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-line py-8 md:grid-cols-[14rem_1fr] md:gap-10 md:py-10">
      <h2 className="font-sans text-base font-semibold tracking-normal">{title}</h2>
      <div className="text-[15px] leading-relaxed text-soft md:text-base">{children}</div>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-underline inline-flex items-center gap-1 font-medium text-ink"
    >
      {children}
      <ArrowUpRight className="size-4" aria-hidden />
      <span className="sr-only">(buka di tab baru)</span>
    </a>
  );
}

export default function ContactPage() {
  const socials = [
    { label: "Instagram", url: siteConfig.instagram },
    { label: "TikTok", url: siteConfig.tiktok },
    { label: "Shopee", url: siteConfig.shopee },
  ];

  return (
    <div className="pt-header">
      <section className="container-page pb-20 pt-14 md:pb-28 md:pt-24">
        <h1 className="max-w-4xl text-[clamp(2.6rem,7.5vw,6rem)] leading-[0.98]">Kontak &amp; lokasi toko</h1>

        <ScrollReveal className="mt-14 md:mt-20">
          <Block title="Lokasi toko">
            <address className="not-italic">
              <p className="font-heading text-2xl text-ink">{siteConfig.name}</p>
              <p className="mt-3">
                {siteConfig.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
            <a
              href={getMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6 gap-2"
            >
              Lihat di Google Maps
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">(buka di tab baru)</span>
            </a>
          </Block>

          <Block title="WhatsApp">
            {hasWhatsapp() ? (
              <ExternalLink href={`https://wa.me/${getWhatsappNumber()}`}>Chat lewat WhatsApp</ExternalLink>
            ) : (
              PENDING
            )}
          </Block>

          {(siteConfig.phone || siteConfig.email) && (
            <Block title="Telepon &amp; email">
              <ul className="space-y-1">
                {siteConfig.phone && (
                  <li>
                    <a className="link-underline text-ink" href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>
                      {siteConfig.phone}
                    </a>
                  </li>
                )}
                {siteConfig.email && (
                  <li>
                    <a className="link-underline text-ink" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </li>
                )}
              </ul>
            </Block>
          )}

          <Block title="Media sosial">
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className="w-24 text-ink">{s.label}</span>
                  {s.url ? <ExternalLink href={s.url}>Kunjungi</ExternalLink> : <span>{PENDING}</span>}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Jam buka">
            {siteConfig.businessHours.length > 0 ? (
              <ul className="space-y-1">
                {siteConfig.businessHours.map((h) => (
                  <li key={h.day} className="flex gap-4">
                    <span className="w-40 text-ink">{h.day}</span>
                    <span>{h.hours}</span>
                  </li>
                ))}
              </ul>
            ) : (
              PENDING
            )}
          </Block>
          <div className="border-t border-line" />
        </ScrollReveal>
      </section>
    </div>
  );
}
