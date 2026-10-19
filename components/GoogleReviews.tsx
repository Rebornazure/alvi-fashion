import { ArrowUpRight, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/data/site";
import { getMapsUrl } from "@/lib/utils";

/**
 * Menampilkan rating & ulasan toko dari Google Maps (data asli, lihat
 * `siteConfig.googleRating` di data/site.ts — bukan data demo).
 */
export default function GoogleReviews() {
  const { rating, reviewCount, reviews } = siteConfig.googleRating;

  return (
    <section aria-labelledby="google-reviews-heading" className="section-y bg-paper">
      <div className="container-page">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.08em] text-accent">Rating Google Maps</p>
          <h2 id="google-reviews-heading" className="mt-2 text-[2rem] md:text-5xl">
            Dipercaya pelanggan kami
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(rating) ? "size-5 fill-accent text-accent" : "size-5 text-line"
                  }
                />
              ))}
            </span>
            <span className="text-lg font-medium text-ink">{rating.toFixed(1)}</span>
            <span className="text-soft">
              ({reviewCount} ulasan di Google)
            </span>
          </div>

          {reviews.length > 0 && (
            <ul className="mt-10 grid gap-5 text-left sm:grid-cols-2">
              {reviews.map((review, i) => (
                <li key={i} className="rounded-[3px] border border-line bg-canvas p-6">
                  <span className="flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-3.5 fill-accent text-accent" />
                    ))}
                  </span>
                  <p className="mt-3 text-[15px] italic leading-relaxed text-soft">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  {review.author && <p className="mt-3 text-sm text-ink">{review.author}</p>}
                </li>
              ))}
            </ul>
          )}

          <a
            href={getMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-9 gap-2"
          >
            Lihat semua ulasan di Google Maps
            <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(buka di tab baru)</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}