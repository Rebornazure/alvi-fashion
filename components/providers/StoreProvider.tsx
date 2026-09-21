"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { getProductById } from "@/lib/products";
import { cartKey, getFinalPrice } from "@/lib/utils";
import type { CartItem, CartLine, Product } from "@/types/product";

const CART_STORAGE_KEY = "alvi-fashion:cart:v1";
const WISHLIST_STORAGE_KEY = "alvi-fashion:wishlist:v1";
const MAX_QTY = 99;

interface StoreContextValue {
  // cart
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  cartPulse: number;
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  // wishlist
  wishlist: string[];
  isWished: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  // ui
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  quickView: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage bisa diblokir (mode privat) — abaikan, keranjang tetap jalan di memori.
  }
}

function sanitizeCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const result: CartItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const { productId, size, color, quantity } = entry as Partial<CartItem>;
    if (typeof productId !== "string" || typeof size !== "string" || typeof color !== "string") continue;
    const product = getProductById(productId);
    if (!product) continue;
    if (!product.sizes.includes(size) || !product.colors.includes(color)) continue;
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(quantity) || 1)));
    result.push({ productId, size, color, quantity: qty });
  }
  return result;
}

function sanitizeWishlist(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((id): id is string => typeof id === "string" && !!getProductById(id));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartPulse, setCartPulse] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  // Muat dari localStorage setelah mount (menghindari hydration mismatch)
  useEffect(() => {
    setItems(sanitizeCart(readStorage<unknown>(CART_STORAGE_KEY, [])));
    setWishlist(sanitizeWishlist(readStorage<unknown>(WISHLIST_STORAGE_KEY, [])));
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) setItems(sanitizeCart(readStorage<unknown>(CART_STORAGE_KEY, [])));
      if (e.key === WISHLIST_STORAGE_KEY)
        setWishlist(sanitizeWishlist(readStorage<unknown>(WISHLIST_STORAGE_KEY, [])));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(CART_STORAGE_KEY, items);
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(WISHLIST_STORAGE_KEY, wishlist);
  }, [wishlist, hydrated]);

  const lines = useMemo<CartLine[]>(() => {
    const out: CartLine[] = [];
    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) continue;
      const unitPrice = getFinalPrice(product);
      out.push({
        ...item,
        key: cartKey(item.productId, item.size, item.color),
        product,
        unitPrice,
        lineTotal: unitPrice * item.quantity,
      });
    }
    return out;
  }, [items]);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.lineTotal, 0), [lines]);

  const showToast = useCallback((text: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text });
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      const product = getProductById(item.productId);
      if (!product || product.stock <= 0) return;
      const key = cartKey(item.productId, item.size, item.color);
      setItems((prev) => {
        const existing = prev.find((i) => cartKey(i.productId, i.size, i.color) === key);
        if (existing) {
          return prev.map((i) =>
            cartKey(i.productId, i.size, i.color) === key
              ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + item.quantity) }
              : i,
          );
        }
        return [...prev, { ...item, quantity: Math.min(MAX_QTY, Math.max(1, item.quantity)) }];
      });
      setCartPulse((n) => n + 1);
      showToast(`${product.name} masuk ke keranjang`);
    },
    [showToast],
  );

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => cartKey(i.productId, i.size, i.color) !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          cartKey(i.productId, i.size, i.color) === key
            ? { ...i, quantity: Math.min(MAX_QTY, Math.floor(quantity)) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  }, []);

  const isWished = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const openCart = useCallback(() => {
    setQuickView(null);
    setSearchOpen(false);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openSearch = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openQuickView = useCallback((product: Product) => setQuickView(product), []);
  const closeQuickView = useCallback(() => setQuickView(null), []);

  const value = useMemo<StoreContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      hydrated,
      cartPulse,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      wishlist,
      isWished,
      toggleWishlist,
      cartOpen,
      openCart,
      closeCart,
      searchOpen,
      openSearch,
      closeSearch,
      quickView,
      openQuickView,
      closeQuickView,
    }),
    [
      lines,
      itemCount,
      subtotal,
      hydrated,
      cartPulse,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      wishlist,
      isWished,
      toggleWishlist,
      cartOpen,
      openCart,
      closeCart,
      searchOpen,
      openSearch,
      closeSearch,
      quickView,
      openQuickView,
      closeQuickView,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[90] flex justify-center px-4"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink py-2.5 pl-3 pr-4 text-sm text-white shadow-lg"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white text-ink">
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
              <span className="max-w-[55vw] truncate">{toast.text}</span>
              <button
                type="button"
                onClick={() => {
                  setToast(null);
                  openCart();
                }}
                className="shrink-0 font-medium underline underline-offset-4 hover:text-white/80"
              >
                Lihat
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore harus dipakai di dalam <StoreProvider>");
  return ctx;
}
