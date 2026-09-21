"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { StoreProvider } from "./StoreProvider";

/** Membungkus seluruh aplikasi: hormati prefers-reduced-motion + state keranjang/wishlist. */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>{children}</StoreProvider>
    </MotionConfig>
  );
}
