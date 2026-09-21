import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/product";

interface CategoryCardProps {
  category: Pick<Category, "name" | "image"> & { slug?: string };
  href: string;
  subtitle?: string;
}

export default function CategoryCard({ category, href, subtitle }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[3/4] overflow-hidden rounded-[3px] bg-ink text-white"
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 23vw, (min-width: 768px) 24vw, 58vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,17,0.72)_0%,rgba(17,17,17,0.05)_55%)] transition-colors duration-500 group-hover:bg-[linear-gradient(to_top,rgba(17,17,17,0.85)_0%,rgba(17,17,17,0.25)_65%)]"
      />
      <span className="absolute right-3 top-3 grid size-10 place-items-center overflow-hidden rounded-full bg-white/90 text-ink">
        <ArrowUpRight
          className="size-[18px] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
      <span className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
        <span className="block font-heading text-[1.6rem] font-medium leading-[1.05] md:text-[1.75rem]">
          {category.name}
        </span>
        {subtitle && <span className="mt-1.5 block text-sm text-white/80">{subtitle}</span>}
      </span>
    </Link>
  );
}
