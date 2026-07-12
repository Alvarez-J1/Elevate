"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ProductGallery({
  images,
  name
}: {
  images: string[];
  name: string;
}) {
  const image = images[0];

  return (
    <motion.div
      className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-carbon shadow-soft"
      initial={{ opacity: 0.72, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {image ? (
        <Image
          alt={name}
          className="h-full w-full object-cover object-bottom"
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          src={image}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/28 via-transparent to-white/[0.03]" />
    </motion.div>
  );
}
