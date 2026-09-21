import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getMapsUrl, getWhatsappNumber, hasWhatsapp } from "@/lib/utils";

export default function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="section-y">
      <ScrollReveal className="container-page text-center">
        <h2 id="cta-heading" className="mx-auto max-w-4xl text-[2.6rem] leading-[1.02] md:text-[5.5rem]">
          Siap tampil percaya diri?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-soft md:text-lg">
          Pilih koleksi favoritmu, lalu pesan lewat WhatsApp atau datang langsung ke toko.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="btn btn-primary">
            Belanja Sekarang
          </Link>
          {hasWhatsapp() ? (
            <a
              href={`https://wa.me/${getWhatsappNumber()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Chat WhatsApp
              <span className="sr-only">(buka di tab baru)</span>
            </a>
          ) : (
            <a href={getMapsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Lihat Lokasi Toko
              <span className="sr-only">(buka di tab baru)</span>
            </a>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
