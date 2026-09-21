import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductBrowser from "@/components/ProductBrowser";
import { categories } from "@/data/categories";
import { pageMetadata } from "@/lib/metadata";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Kategori tidak ditemukan" };
  return pageMetadata({
    title: category.name,
    description: `${category.description} Jelajahi koleksi ${category.name} dari ALVI FASHION.`,
    path: `/kategori/${category.slug}`,
    image: category.image,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const items = getProductsByCategory(category.slug);

  return (
    <div className="pt-header">
      <div className="container-page pb-20 pt-8 md:pb-28 md:pt-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: category.name },
          ]}
        />
        <header className="mb-10 md:mb-14">
          <h1 className="text-5xl md:text-7xl">{category.name}</h1>
          <p className="mt-4 max-w-xl text-soft md:text-lg">{category.description}</p>
          <p className="mt-3 text-sm text-soft">{items.length} produk</p>
        </header>
        <Suspense fallback={null}>
          <ProductBrowser products={items} fixedCategory={category.slug} />
        </Suspense>
      </div>
    </div>
  );
}
