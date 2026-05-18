"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types/product";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price low to high", value: "price-asc" },
  { label: "Price high to low", value: "price-desc" },
  { label: "Top rated", value: "rating" }
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

export function ShopExperience({
  products,
  categories
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [product.name, product.tagline, product.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(Boolean(b.badge)) - Number(Boolean(a.badge));
    });
  }, [category, products, query, sort]);

  return (
    <div>
      <div className="glass rounded-lg p-3">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              className="input-shell h-12 pl-11 pr-4"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search headphones, cameras, workspace..."
              type="search"
              value={query}
            />
          </label>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {(["All", ...categories] as Array<ProductCategory | "All">).map(
              (item) => (
                <button
                  className={cn(
                    "h-10 flex-none rounded-lg px-4 text-sm transition",
                    category === item
                      ? "bg-platinum text-obsidian"
                      : "bg-white/[0.06] text-silver hover:bg-white/[0.1] hover:text-platinum"
                  )}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              )
            )}
          </div>

          <label className="relative block">
            <span className="sr-only">Sort products</span>
            <SlidersHorizontal
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <select
              className="input-shell h-12 min-w-52 appearance-none pl-11 pr-9"
              onChange={(event) => setSort(event.target.value as SortOption)}
              value={sort}
            >
              {sortOptions.map((option) => (
                <option className="bg-obsidian" key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-silver">
        <p>{filteredProducts.length} products</p>
        <p className="hidden sm:block">Premium Catalog</p>
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          layout
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <EmptyState
          className="mt-8"
          icon={<Search size={22} />}
          title="No products found"
          description="Try a different keyword, clear the category filter, or sort from the full collection."
        />
      )}
    </div>
  );
}
