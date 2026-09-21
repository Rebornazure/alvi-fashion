"use client";

import { Check } from "lucide-react";
import { categories } from "@/data/categories";
import { getColorHex } from "@/data/colors";
import { cn } from "@/lib/utils";

export interface Filters {
  categories: string[];
  min: string;
  max: string;
  sizes: string[];
  colors: string[];
}

export const emptyFilters: Filters = { categories: [], min: "", max: "", sizes: [], colors: [] };

export function countActiveFilters(f: Filters): number {
  return f.categories.length + f.sizes.length + f.colors.length + (f.min ? 1 : 0) + (f.max ? 1 : 0);
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  sizes: string[];
  colors: string[];
  priceBounds: { min: number; max: number };
  showCategories?: boolean;
  idPrefix: string;
}

export default function FilterPanel({
  filters,
  onChange,
  sizes,
  colors,
  priceBounds,
  showCategories = true,
  idPrefix,
}: FilterPanelProps) {
  const digitsOnly = (v: string) => v.replace(/\D/g, "").slice(0, 8);

  return (
    <div className="space-y-8 text-sm">
      {showCategories && (
        <fieldset>
          <legend className="mb-3 text-base font-semibold">Kategori</legend>
          <ul className="space-y-1">
            {categories.map((c) => {
              const checked = filters.categories.includes(c.slug);
              const id = `${idPrefix}-cat-${c.slug}`;
              return (
                <li key={c.slug}>
                  <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3">
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={() => onChange({ ...filters, categories: toggle(filters.categories, c.slug) })}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-[3px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                        checked ? "border-ink bg-ink text-white" : "border-muted bg-paper",
                      )}
                    >
                      {checked && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                    {c.name}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 text-base font-semibold">Harga</legend>
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <label htmlFor={`${idPrefix}-min`} className="sr-only">
              Harga minimum
            </label>
            <input
              id={`${idPrefix}-min`}
              inputMode="numeric"
              value={filters.min}
              onChange={(e) => onChange({ ...filters, min: digitsOnly(e.target.value) })}
              placeholder={`Min ${priceBounds.min.toLocaleString("id-ID")}`}
              className="h-11 w-full rounded-[3px] border border-line bg-paper px-3 outline-none placeholder:text-muted focus:border-ink"
            />
          </div>
          <span aria-hidden className="text-muted">
            –
          </span>
          <div className="min-w-0 flex-1">
            <label htmlFor={`${idPrefix}-max`} className="sr-only">
              Harga maksimum
            </label>
            <input
              id={`${idPrefix}-max`}
              inputMode="numeric"
              value={filters.max}
              onChange={(e) => onChange({ ...filters, max: digitsOnly(e.target.value) })}
              placeholder={`Maks ${priceBounds.max.toLocaleString("id-ID")}`}
              className="h-11 w-full rounded-[3px] border border-line bg-paper px-3 outline-none placeholder:text-muted focus:border-ink"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-soft">Dalam Rupiah</p>
      </fieldset>

      {sizes.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-base font-semibold">Ukuran</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const active = filters.sizes.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ ...filters, sizes: toggle(filters.sizes, s) })}
                  className={cn(
                    "h-11 min-w-12 rounded-[3px] border px-3 font-medium transition-colors",
                    active ? "border-ink bg-ink text-white" : "border-line bg-paper hover:border-ink",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {colors.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-base font-semibold">Warna</legend>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => {
              const active = filters.colors.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ ...filters, colors: toggle(filters.colors, c) })}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-full border pl-2.5 pr-3.5 transition-colors",
                    active ? "border-ink bg-ink text-white" : "border-line bg-paper hover:border-ink",
                  )}
                >
                  <span
                    aria-hidden
                    className="size-4 rounded-full border border-white/40 ring-1 ring-black/15"
                    style={{ backgroundColor: getColorHex(c) }}
                  />
                  {c}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );
}
