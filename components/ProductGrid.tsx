import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  badge?: string | null;
  priorityCount?: number;
  className?: string;
}

export default function ProductGrid({ products, columns = 4, badge, priorityCount = 0, className }: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-5 md:gap-y-12",
        columns === 4 ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {products.map((product, i) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} badge={badge} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
