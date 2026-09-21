import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, Star } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import PurchasePanel from "@/components/PurchasePanel";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getCategoryName, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatRupiah, getFinalPrice, getSiteUrl, hasDiscount } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan" };
  return pageMetadata({
    title: product.name,
    description: `${product.description} Tersedia di ${siteConfig.name}.`,
    path: `/produk/${product.slug}`,
    image: product.images[0],
  });
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-line">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden />
      </summary>
      <div className="pb-6 text-[15px] leading-relaxed text-soft">{children}</div>
    </details>
  );
}

const PENDING = "Segera diperbarui";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const categoryName = getCategoryName(product.category);
  const finalPrice = getFinalPrice(product);

  // Structured data hanya untuk produk dengan data asli (bukan demo)
  const jsonLd = product.isDemo
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images.map((src) => `${getSiteUrl()}${src}`),
        category: categoryName,
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: finalPrice,
          availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `${getSiteUrl()}/produk/${product.slug}`,
        },
      };

  return (
    <div className="pt-header">
      <div className="container-page pb-16 pt-8 md:pt-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: categoryName, href: `/kategori/${product.category}` },
            { label: product.name },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="lg:col-span-5">
            <Link href={`/kategori/${product.category}`} className="text-sm text-soft hover:text-ink hover:underline">
              {categoryName}
            </Link>
            <h1 className="mt-2 text-4xl md:text-5xl">{product.name}</h1>

            {(typeof product.rating === "number" || typeof product.sold === "number") && (
              <p className="mt-4 flex items-center gap-3 text-sm text-soft">
                {typeof product.rating === "number" && (
                  <span className="flex items-center gap-1">
                    <Star className="size-4 fill-accent text-accent" aria-hidden />
                    <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
                    <span className="sr-only">dari 5</span>
                  </span>
                )}
                {typeof product.sold === "number" && <span>{product.sold.toLocaleString("id-ID")} terjual</span>}
              </p>
            )}

            <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
              <span className="text-3xl font-semibold">{formatRupiah(finalPrice)}</span>
              {hasDiscount(product) && (
                <>
                  <span className="sr-only">Harga sebelum diskon</span>
                  <span className="text-lg text-muted line-through">{formatRupiah(product.price)}</span>
                </>
              )}
            </p>

            {siteConfig.showDemoNotice && product.isDemo && (
              <p className="mt-4 rounded-[3px] border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-soft">
                Data demo: harga, ukuran, warna, dan foto produk ini masih contoh.
              </p>
            )}

            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-soft md:text-base">{product.description}</p>

            <div className="mt-8">
              <PurchasePanel product={product} />
            </div>

            <div className="mt-10 border-t border-line">
              <Accordion title="Informasi produk" defaultOpen>
                <dl className="grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-3">
                  <dt className="text-ink">Kategori</dt>
                  <dd>{categoryName}</dd>
                  <dt className="text-ink">Warna</dt>
                  <dd>{product.colors.join(", ")}</dd>
                  <dt className="text-ink">Ukuran</dt>
                  <dd>{product.sizes.join(", ")}</dd>
                  <dt className="text-ink">Bahan</dt>
                  <dd>{product.material ?? PENDING}</dd>
                  <dt className="text-ink">Perawatan</dt>
                  <dd>{product.care ?? PENDING}</dd>
                </dl>
              </Accordion>
              <Accordion title="Pengiriman">
                <p>
                  {siteConfig.shippingInfo ||
                    "Informasi pengiriman segera diperbarui. Untuk menanyakan ongkir dan estimasi, hubungi toko lewat WhatsApp."}
                </p>
              </Accordion>
              <Accordion title="Pengembalian">
                <p>{siteConfig.returnPolicy || "Kebijakan pengembalian segera diperbarui."}</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="container-page pb-20 pt-10 md:pb-28">
          <h2 id="related-heading" className="mb-8 text-3xl md:mb-10 md:text-5xl">
            Mungkin kamu suka
          </h2>
          <ProductGrid products={related} />
        </section>
      )}

      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON-LD dibuat dari data produk milik sendiri
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </div>
  );
}
