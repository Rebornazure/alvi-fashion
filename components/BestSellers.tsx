import ProductGrid from "@/components/ProductGrid";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { getBestSellers, getFeatured } from "@/lib/products";

/**
 * "Yang Paling Dicari"
 * Judul dan label "BEST SELLER" hanya dipakai jika ada data penjualan asli (`sold`, bukan demo).
 * Selain itu section tampil sebagai "Pilihan Lainnya" dengan label "FEATURED" agar tidak membuat klaim palsu.
 */
export default function BestSellers() {
  const shownAbove = getFeatured(8).map((p) => p.id);
  const { items, hasRealSalesData } = getBestSellers(4, shownAbove);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="best-heading" className="section-y">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading id="best-heading" title={hasRealSalesData ? "Yang Paling Dicari" : "Pilihan Lainnya"} href="/shop" linkLabel="Lihat semua" />
        </ScrollReveal>
        <ProductGrid products={items} badge={hasRealSalesData ? "BEST SELLER" : "FEATURED"} />
      </div>
    </section>
  );
}
