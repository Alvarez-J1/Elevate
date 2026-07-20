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
      className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-white/10 bg-carbon shadow-soft min-[650px]:aspect-[3/2] lg:mx-auto lg:max-w-[660px]"
      initial={{ opacity: 0.72, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {image ? (
        <Image
          alt={name}
          className="h-full w-full object-cover object-bottom min-[650px]:object-center"
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          src={image}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/28 via-transparent to-white/[0.03]" />
    </motion.div>
  );
}
