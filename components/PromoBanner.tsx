import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { siteImages } from "@/data/site";

/** Banner promo — hanya copy brand, tanpa klaim diskon. */
export default function PromoBanner() {
  return (
    <section aria-labelledby="promo-heading" className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={siteImages.promo.src}
        alt={siteImages.promo.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/45" />
      <div className="container-page flex min-h-[70svh] items-center py-20 md:min-h-[78svh]">
        <ScrollReveal className="max-w-3xl">
          <h2
            id="promo-heading"
            className="text-[clamp(2.6rem,8vw,6.5rem)] font-medium leading-[0.96] tracking-[-0.02em]"
          >
            LOOK GOOD.
            <br />
            FEEL GOOD.
          </h2>
          <p className="mt-6 max-w-md text-base text-white/85 md:text-lg">Temukan koleksi pilihan ALVI FASHION.</p>
          <Link href="/shop" className="btn btn-light mt-9">
            Jelajahi Koleksi
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
