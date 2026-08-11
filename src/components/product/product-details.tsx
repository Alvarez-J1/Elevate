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

const productBenefits = [
  {
    icon: Truck,
    title: "Free express shipping",
    description:
      "Enjoy fast, insured delivery with real-time tracking on every qualifying order."
  },
  {
    icon: ShieldCheck,
    title: "30-day premium returns",
    description:
      "Return eligible products within 30 days through a simple, hassle-free process."
  },
  {
    icon: Zap,
    title: "Ships in 24 hours",
    description:
      "Orders placed before the daily cutoff are packed and shipped within one business day."
  }
];

function RelatedProducts({
  related,
  gridClassName
}: {
  related: Product[];
  gridClassName?: string;
}) {
  return (
    <>
      <SectionHeader
        eyebrow="Related"
        title="Designed to complement your workspace setup."
        description="Complete your workspace with matching pieces."
      />
      <div className={cn("mt-10 grid w-full gap-5", gridClassName)}>
        {related.map((item) => (
          <ProductCard
            compactImageOnMobile
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </>
  );
}

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
        <div className="lg:mx-auto lg:max-w-[660px]">
          <div className="mb-8 text-sm text-silver">
            <Link className="transition hover:text-platinum" href="/shop">
              Shop
            </Link>
            <span aria-hidden="true" className="px-2 text-muted">/</span>
            <span className="text-platinum">{product.name}</span>
          </div>

          <div className="grid gap-10">
            <ProductGallery images={product.images} name={product.name} />

            <section>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-eyebrow">
              {product.category}
            </p>
            <h1 className="mt-eyebrow-heading text-4xl font-semibold leading-tight text-platinum sm:text-5xl">
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
                      aria-hidden="true"
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-stretch gap-2 min-[336px]:gap-3">
              <QuantitySelector
                buttonClassName="max-[335px]:w-9"
                compact
                value={quantity}
                valueClassName="max-[335px]:w-8"
                onChange={setQuantity}
              />
              <AddToCartButton
                className="min-h-[52px] min-w-36 flex-1 basis-36 whitespace-nowrap max-[505px]:min-w-0 max-[505px]:basis-0 max-[335px]:gap-2 max-[335px]:px-4 sm:min-h-0 sm:basis-0"
                color={selectedColor}
                label="Add to cart"
                product={product}
                quantity={quantity}
                size="lg"
              />
              <Link
                className={buttonClassName({
                  variant: "secondary",
                  size: "lg",
                  className:
                    "min-h-[52px] min-w-36 flex-1 basis-36 max-[505px]:basis-full sm:basis-0"
                })}
                href="/checkout"
              >
                Checkout
              </Link>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {productBenefits.map((item) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
                  key={item.title}
                >
                  <item.icon aria-hidden="true" className="text-glacier" size={18} />
                  <p className="mt-3 text-sm font-medium leading-5 text-platinum">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-silver">
                    {item.description}
                  </p>
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
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-glacier" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
        </div>
      </Container>

      <section className="mt-16 lg:mt-20">
        <Container>
          <RelatedProducts
            gridClassName="min-[480px]:grid-cols-2 xl:grid-cols-4"
            related={related}
          />
        </Container>
      </section>
    </div>
  );
}
