import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { siteImages } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Tentang",
  description:
    "ALVI FASHION menyediakan pilihan pakaian yang nyaman, fungsional, dan mudah dipadukan untuk gaya sehari-hari.",
  path: "/tentang",
  image: siteImages.story.src,
});

const pillars = [
  {
    title: "Produk",
    text: "Pilihan celana cargo, tactical, chino, formal, sampai hoodie dan sweater untuk kebutuhan sehari-hari.",
  },
  {
    title: "Kualitas",
    text: "Detail produk seperti bahan dan ukuran ditampilkan di halaman produk, supaya kamu bisa memilih dengan yakin.",
  },
  {
    title: "Kenyamanan",
    text: "Kami memilih pakaian yang nyaman dipakai untuk berbagai aktivitas.",
  },
  {
    title: "Style",
    text: "Model yang mudah dipadukan, dari tampilan santai sampai lebih rapi.",
  },
  {
    title: "Pelayanan",
    text: "Kamu bisa memesan lewat WhatsApp atau datang langsung ke toko kami di Kudus.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-header">
      <section className="container-page pb-16 pt-14 md:pb-24 md:pt-24">
        <p className="text-sm text-soft">Tentang ALVI FASHION</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[0.98]">
          Fashion sederhana untuk gaya sehari-hari.
        </h1>
      </section>

      <section className="container-page grid gap-10 pb-20 md:grid-cols-12 md:gap-14 md:pb-28">
        <ScrollReveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-line">
            <Image
              src={siteImages.story.src}
              alt={siteImages.story.alt}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <p className="max-w-xl text-lg leading-[1.75] text-soft md:text-xl">
            ALVI FASHION hadir untuk menyediakan pilihan pakaian yang nyaman, fungsional, dan mudah dipadukan untuk
            berbagai aktivitas.
          </p>
          <dl className="mt-12 divide-y divide-line border-y border-line">
            {pillars.map((p) => (
              <div key={p.title} className="grid gap-1 py-5 md:grid-cols-[10rem_1fr] md:gap-6">
                <dt className="font-heading text-2xl">{p.title}</dt>
                <dd className="text-[15px] leading-relaxed text-soft">{p.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/shop" className="btn btn-primary">
              Belanja Sekarang
            </Link>
            <Link href="/kontak" className="btn btn-outline">
              Lokasi &amp; Kontak
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
