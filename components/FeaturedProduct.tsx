import ProductGrid from "@/components/ProductGrid";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getFeatured } from "@/lib/products";

/** "Pilihan Kami" — produk dengan featured: true di data/products.ts */
export default function FeaturedProduct() {
  const items = getFeatured(8);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="featured-heading" className="pb-20 md:pb-28">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            id="featured-heading"
            title="Pilihan Kami"
            href="/shop"
            linkLabel="Lihat semua"
          />
        </ScrollReveal>
        <ProductGrid products={items} badge={null} priorityCount={0} />
      </div>
    </section>
  );
}
