import CategoryCard from "@/components/CategoryCard";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { categories } from "@/data/categories";
import { siteImages } from "@/data/site";

/** Kartu kategori: 4 kolom di desktop, scroll horizontal di mobile. */
export default function CategorySection() {
  return (
    <section id="koleksi" aria-labelledby="kategori-heading" className="section-y">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            id="kategori-heading"
            title="Temukan Gaya Kamu"
            description="Pilih kategori yang cocok dengan aktivitas dan gayamu."
            href="/shop"
            linkLabel="Semua produk"
          />
        </ScrollReveal>
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
          {categories.map((c) => (
            <li key={c.slug} className="w-[58%] shrink-0 snap-start sm:w-[38%] md:w-auto">
              <CategoryCard category={c} href={`/kategori/${c.slug}`} />
            </li>
          ))}
          <li className="w-[58%] shrink-0 snap-start sm:w-[38%] md:w-auto">
            <CategoryCard
              category={{ name: "Semua Produk", image: siteImages.promo.src }}
              href="/shop"
              subtitle="Lihat seluruh koleksi"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
