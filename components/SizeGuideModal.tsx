"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig, sizeGuide } from "@/data/site";
import { useDialog } from "@/hooks/useDialog";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, open, onClose);
  const hasRows = sizeGuide.rows.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[88svh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-canvas p-6 pb-8 md:rounded-[4px] md:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup panduan ukuran"
              className="absolute right-3 top-3 grid size-10 place-items-center rounded-full hover:bg-line"
            >
              <X className="size-5" aria-hidden />
            </button>
            <h2 id="size-guide-title" className="pr-10 text-3xl">
              Panduan ukuran
            </h2>

            {hasRows ? (
              <>
                {sizeGuide.isDemo && siteConfig.showDemoNotice && (
                  <p className="mt-4 rounded-[3px] border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-soft">
                    Tabel ini hanya contoh (data demo). Ukuran asli akan diperbarui oleh toko.
                  </p>
                )}
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[320px] text-left text-sm">
                    <caption className="sr-only">Panduan ukuran dalam {sizeGuide.unit}</caption>
                    <thead>
                      <tr className="border-b border-ink">
                        {sizeGuide.columns.map((c) => (
                          <th key={c} scope="col" className="py-3 pr-4 font-semibold">
                            {c}
                            {c !== "Ukuran" && <span className="font-normal text-soft"> ({sizeGuide.unit})</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.rows.map((row) => (
                        <tr key={row[0]} className="border-b border-line">
                          {row.map((cell, i) => (
                            <td key={i} className={i === 0 ? "py-3 pr-4 font-medium" : "py-3 pr-4 text-soft"}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="mt-5 text-soft">Panduan ukuran segera diperbarui.</p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
