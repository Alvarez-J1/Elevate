"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

import { AddToCartButton } from "./add-to-cart-button";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  compactImageOnMobile = false
}: {
  product: Product;
  compactImageOnMobile?: boolean;
}) {
  return (
    <motion.article
      className="group touch-card touch-card-lift-strong overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-soft"
      data-touch-card
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Link className="block" href={`/product/${product.slug}`}>
        <div
          className={cn(
            "relative overflow-hidden",
            compactImageOnMobile
              ? "h-[360px] bg-carbon min-[480px]:h-[430px] sm:h-[360px] lg:aspect-[4/5] lg:h-auto"
              : "aspect-[4/5] bg-carbon"
          )}
        >
          <Image
            alt={product.name}
            className={cn(
              "touch-card-image-zoom h-full w-full transition duration-700 group-hover:scale-105 group-active:scale-105",
              compactImageOnMobile
                ? "object-cover object-center lg:object-bottom"
                : "object-cover object-bottom"
            )}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={product.images[0]}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-obsidian/70 px-3 py-1 text-xs font-medium text-platinum backdrop-blur-md">
              {product.badge}
            </span>
          ) : null}
          <span className="touch-card-reveal absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-obsidian/60 text-platinum opacity-0 backdrop-blur-md transition group-hover:opacity-100 group-active:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-eyebrow-heading flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.24em] text-eyebrow">
            {product.category}
          </p>
          <div className="flex items-center gap-1 text-xs text-ember">
            <Star size={13} fill="currentColor" />
            <span className="text-silver">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="touch-card-title-bright text-lg font-semibold text-platinum transition group-hover:text-white group-active:text-white">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 min-h-11 text-sm leading-6 text-silver">
          {product.tagline}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-platinum">
              {formatCurrency(product.price)}
            </p>
            {product.originalPrice ? (
              <p className="text-xs text-muted line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            ) : null}
          </div>
          <AddToCartButton label="Add" product={product} size="sm" />
        </div>
      </div>
    </motion.article>
  );
}
