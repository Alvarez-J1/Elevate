"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[5.5rem_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
        {images.map((image, index) => (
          <button
            aria-label={`View ${name} image ${index + 1}`}
            className={cn(
              "relative h-20 w-20 flex-none overflow-hidden rounded-lg border bg-carbon transition",
              selected === image
                ? "border-glacier"
                : "border-white/10 opacity-70 hover:border-white/25 hover:opacity-100"
            )}
            key={image}
            onClick={() => setSelected(image)}
            type="button"
          >
            <Image
              alt={`${name} thumbnail ${index + 1}`}
              className="object-cover"
              fill
              sizes="80px"
              src={image}
            />
          </button>
        ))}
      </div>

      <motion.div
        className="relative order-1 aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-carbon shadow-soft lg:order-2"
        key={selected}
        initial={{ opacity: 0.72, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          alt={name}
          className="h-full w-full object-cover"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          src={selected}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/28 via-transparent to-white/[0.03]" />
      </motion.div>
    </div>
  );
}
