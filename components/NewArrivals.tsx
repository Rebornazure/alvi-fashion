import ProductCarousel from "@/components/ProductCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getNewArrivals } from "@/lib/products";

/** "Baru Datang" — produk dengan newArrival: true di data/products.ts */
export default function NewArrivals() {
  const items = getNewArrivals(10);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="new-heading" className="section-y bg-paper">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading id="new-heading" title="Baru Datang" href="/shop?sort=terbaru" linkLabel="Lihat semua" />
        </ScrollReveal>
        <ProductCarousel products={items} label="Produk baru datang" badge="NEW" />
      </div>
    </section>
  );
}
