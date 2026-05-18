"use client";

import Link from "next/link";
import { ShieldCheck, Truck, Zap } from "lucide-react";
import { useState } from "react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductCard } from "@/components/product/product-card";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { buttonClassName } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductDetails({
  product,
  related
}: {
  product: Product;
  related: Product[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);

  return (
    <div className="pb-24 pt-10">
      <Container>
        <div className="mb-8 #A7C7E7 text-sm">
          <Link className="transition hover:text-platinum" href="/shop">
            Shop
          </Link>
          <span className="px-2 text-muted">/</span>
          <span className="text-platinum">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <ProductGallery images={product.images} name={product.name} />

          <section className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-glacier">
              {product.category}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-8 text-silver">{product.tagline}</p>

            <div className="mt-6 flex flex-wrap items-end gap-4">
              <p className="text-3xl font-semibold text-platinum">
                {formatCurrency(product.price)}
              </p>
              {product.originalPrice ? (
                <p className="pb-1 text-base text-muted line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
              ) : null}
              <p className="pb-1 text-sm text-silver">
                {product.rating} rating · {product.reviews} reviews
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-sm font-semibold text-platinum">Finish</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    aria-label={`Select ${color.name}`}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                      selectedColor === color.name
                        ? "border-glacier bg-glacier/10 text-platinum"
                        : "border-white/10 bg-white/[0.045] text-silver hover:border-white/25 hover:text-platinum"
                    )}
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    type="button"
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <AddToCartButton
                className="flex-1"
                color={selectedColor}
                label="Add to cart"
                product={product}
                quantity={quantity}
              />
              <Link
                className={buttonClassName({
                  variant: "secondary",
                  size: "lg",
                  className: "flex-1"
                })}
                href="/checkout"
              >
                Checkout
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Truck, label: "Free express shipping" },
                { icon: ShieldCheck, label: "30-day premium returns" },
                { icon: Zap, label: "Ships in 24 hours" }
              ].map((item) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
                  key={item.label}
                >
                  <item.icon className="text-glacier" size={18} />
                  <p className="mt-3 text-sm leading-5 text-silver">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <h2 className="text-lg font-semibold text-platinum">Details</h2>
              <p className="mt-3 text-sm leading-7 text-silver">
                {product.description}
              </p>
              <ul className="mt-5 grid gap-3 text-sm text-silver">
                {product.features.map((feature) => (
                  <li className="flex gap-3" key={feature}>
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-glacier" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([label, value]) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
                  key={label}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {label}
                  </p>
                  <p className="mt-2 text-sm text-platinum">{value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>

      <section className="mt-24">
        <Container>
          <SectionHeader
            eyebrow="Related"
            title="Pairs beautifully with the same ritual."
            description="A few adjacent pieces from the same premium catalog language."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
