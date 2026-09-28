"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { siteImages } from "@/data/site";

const headline = ["STYLE", "UNTUK", "SETIAP", "LANGKAH"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink text-white md:min-h-[92svh]"
    >
      {/* Foto hero — Replace with actual ALVI FASHION photo (public/images/banners/hero.jpg) */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-x-0 bottom-0 -top-[16%]"
          initial={reduce ? false : { scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Overlay: gelap di atas (navbar transparan terbaca) dan di bawah (teks terbaca) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,17,17,0.55)_0%,rgba(17,17,17,0.08)_32%,rgba(17,17,17,0.35)_60%,rgba(17,17,17,0.82)_100%)]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.5)_0%,rgba(17,17,17,0.12)_50%,rgba(255,255,255,0.14)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_65%_at_84%_38%,rgba(255,255,255,0.26),transparent_70%)]"
      />

      <motion.div style={{ y: textY }} className="container-page relative z-10 pb-12 pt-40 md:pb-20">
        <h1
          id="hero-title"
          className="max-w-[16ch] text-[clamp(2.3rem,7.2vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.02em] md:max-w-[15ch]"
        >
          {headline.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease }}
              >
                {word}
              </motion.span>
              {i < headline.length - 1 && "\u00a0"}
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease }}
          className="mt-8 flex flex-col gap-7 md:mt-12 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Temukan koleksi fashion pilihan ALVI FASHION untuk gaya sehari-hari yang nyaman dan percaya diri.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/shop" className="btn btn-light">
              Belanja Sekarang
            </Link>
            <a href="#koleksi" className="btn btn-outline-light">
              Lihat Koleksi
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
