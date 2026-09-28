import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getFeatured } from "@/lib/products";
import { formatRupiah, getFinalPrice, hasDiscount } from "@/lib/utils";

/** Sorotan satu produk (produk featured pertama di data/products.ts). */
export default function ProductShowcase() {
  const product = getFeatured(1)[0];
  if (!product) return null;
  const second = product.images[1] ?? product.images[0];

  return (
    <section aria-labelledby="showcase-heading" className="section-y bg-ink text-white">
      <div className="container-page grid items-end gap-10 md:grid-cols-12 md:gap-8">
        <ScrollReveal className="relative md:col-span-7">
          <Link href={`/produk/${product.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-white/10 md:aspect-[5/6]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 56vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          </Link>
        </ScrollReveal>

        <div className="md:col-span-5 md:pb-2">
          <ScrollReveal>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3.5 py-1.5 text-sm font-medium text-white">
                <span aria-hidden className="size-1.5 rounded-full bg-[#D9B98A]" />
                Product Launch
              </span>
              <span className="text-sm text-white/65">Produk baru keluar</span>
            </p>
            <h2 id="showcase-heading" className="mt-3 text-[2.4rem] md:text-6xl">
              {product.name}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">{product.description}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl font-semibold">{formatRupiah(getFinalPrice(product))}</span>
              {hasDiscount(product) && <span className="text-white/60 line-through">{formatRupiah(product.price)}</span>}
            </p>
            <Link href={`/produk/${product.slug}`} className="btn btn-light mt-8">
              Lihat Produk
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-10 hidden md:block">
            <div className="relative ml-auto aspect-[4/5] w-2/3 overflow-hidden rounded-[3px] bg-white/10">
              <Image src={second} alt={`${product.name} — tampilan lain`} fill sizes="20vw" className="object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
