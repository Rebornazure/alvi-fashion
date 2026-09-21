import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import BestSellers from "@/components/BestSellers";
import CategorySection from "@/components/CategorySection";
import CTASection from "@/components/CTASection";
import FeaturedProduct from "@/components/FeaturedProduct";
import Hero from "@/components/Hero";
import LocationSection from "@/components/LocationSection";
import NewArrivals from "@/components/NewArrivals";
import ProductShowcase from "@/components/ProductShowcase";
import PromoBanner from "@/components/PromoBanner";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProduct />
      <NewArrivals />
      <BestSellers />
      <PromoBanner />
      <AboutSection />
      <ProductShowcase />
      <LocationSection />
      <CTASection />
    </>
  );
}
