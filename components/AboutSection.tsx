import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { siteImages } from "@/data/site";

const qualities = [
  { title: "Nyaman", text: "Pilihan pakaian yang enak dipakai seharian." },
  { title: "Fungsional", text: "Model dan detail yang mendukung aktivitasmu." },
  { title: "Mudah dipadukan", text: "Gampang dipasangkan untuk berbagai gaya." },
];

/** Brand story — tanpa sejarah/tahun berdiri karangan. */
export default function AboutSection() {
  return (
    <section aria-labelledby="story-heading" className="section-y">
      <div className="container-page grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <ScrollReveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-line">
            <Image
              src={siteImages.story.src}
              alt={siteImages.story.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <h2 id="story-heading" className="text-[2.4rem] md:text-6xl">
            Fashion untuk keseharian.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.75] text-soft md:text-lg">
            ALVI FASHION hadir untuk menyediakan pilihan pakaian yang nyaman, fungsional, dan mudah dipadukan untuk
            berbagai aktivitas.
          </p>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {qualities.map((q) => (
              <div key={q.title} className="grid grid-cols-[9.5rem_1fr] gap-4 py-4 md:grid-cols-[11rem_1fr]">
                <dt className="font-heading text-lg">{q.title}</dt>
                <dd className="text-[15px] text-soft">{q.text}</dd>
              </div>
            ))}
          </dl>
          <Link href="/tentang" className="btn btn-outline mt-9">
            Tentang ALVI FASHION
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
