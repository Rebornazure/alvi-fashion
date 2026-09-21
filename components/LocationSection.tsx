import Image from "next/image";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig, siteImages } from "@/data/site";
import { getMapsUrl } from "@/lib/utils";

/** Lokasi toko. Link Maps diambil dari siteConfig.mapsUrl (atau pencarian berdasarkan alamat). */
export default function LocationSection() {
  const [street, village, district, regency, province] = siteConfig.address.lines;
  return (
    <section aria-labelledby="location-heading" className="section-y bg-paper">
      <div className="container-page grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <ScrollReveal className="md:col-span-5">
          <h2 id="location-heading" className="text-[2.4rem] md:text-6xl">
            Kunjungi toko kami
          </h2>
          <address className="mt-8 not-italic">
            <p className="font-heading text-2xl">{siteConfig.name}</p>
            <p className="mt-3 flex gap-3 text-[15px] leading-relaxed text-soft md:text-base">
              <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
              <span>
                {street}
                <br />
                {village}
                <br />
                {district}
                <br />
                {regency}
                <br />
                {province}
              </span>
            </p>
          </address>
          <p className="mt-5 flex items-center gap-3 text-[15px] text-soft">
            <Clock className="size-5 shrink-0 text-accent" aria-hidden />
            {siteConfig.businessHours.length > 0
              ? siteConfig.businessHours.map((h) => `${h.day}: ${h.hours}`).join(" · ")
              : "Jam buka segera diperbarui"}
          </p>
          <a
            href={getMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-9 gap-2"
          >
            Lihat di Google Maps
            <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(buka di tab baru)</span>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="md:col-span-7">
          {/* Replace with actual ALVI FASHION store photo (public/images/banners/location.jpg) */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-line">
            <Image
              src={siteImages.location.src}
              alt={siteImages.location.alt}
              fill
              sizes="(min-width: 768px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
