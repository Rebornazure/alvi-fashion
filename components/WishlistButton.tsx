"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useStore } from "@/components/providers/StoreProvider";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  variant?: "icon" | "full";
  className?: string;
}

export default function WishlistButton({ productId, productName, variant = "icon", className }: WishlistButtonProps) {
  const { isWished, toggleWishlist } = useStore();
  const wished = isWished(productId);

  const heart = (
    <motion.span
      key={String(wished)}
      initial={{ scale: wished ? 0.6 : 1 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 12 }}
      className="grid place-items-center"
    >
      <Heart className={cn("size-[18px] transition-colors", wished && "fill-accent text-accent")} aria-hidden />
    </motion.span>
  );

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggleWishlist(productId)}
        aria-pressed={wished}
        className={cn(
          "btn btn-outline w-full gap-2 border-line text-ink hover:border-ink hover:bg-transparent hover:text-ink",
          className,
        )}
      >
        {heart}
        {wished ? "Tersimpan di favorit" : "Simpan ke favorit"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(productId)}
      aria-pressed={wished}
      aria-label={wished ? `Hapus ${productName} dari favorit` : `Simpan ${productName} ke favorit`}
      className={cn(
        "grid size-10 place-items-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white",
        className,
      )}
    >
      {heart}
    </button>
  );
}
