import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  id?: string;
  className?: string;
}

export default function SectionHeading({ title, description, href, linkLabel, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 flex items-end justify-between gap-6 md:mb-12", className)}>
      <div className="max-w-2xl">
        <h2 id={id} className="text-[2rem] leading-[1.05] md:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-soft md:text-base">{description}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="link-underline hidden shrink-0 items-center gap-1.5 pb-1 text-sm font-medium md:inline-flex"
        >
          {linkLabel}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
