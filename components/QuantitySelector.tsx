"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  label = "Jumlah",
  className,
}: QuantitySelectorProps) {
  const dim = size === "sm" ? "h-9 w-9" : "h-12 w-12";
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex items-center rounded-[3px] border border-line bg-paper", className)}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Kurangi jumlah"
        className={cn("grid place-items-center transition-colors hover:bg-canvas disabled:opacity-35", dim)}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span
        aria-live="polite"
        className={cn("min-w-8 text-center text-sm font-medium tabular-nums", size === "sm" ? "px-1" : "px-2")}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Tambah jumlah"
        className={cn("grid place-items-center transition-colors hover:bg-canvas disabled:opacity-35", dim)}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
