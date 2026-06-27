"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { buttonClassName } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[82svh] overflow-hidden lg:min-h-[76svh] min-[1600px]:min-h-[80svh] min-[1920px]:min-h-[82svh]">
      <Image
        alt="Flat lay of premium laptop, headphones, smartwatch, and camera gear"
        className="absolute inset-0 -z-20 h-full w-full object-cover min-[1600px]:scale-[1.03] min-[1920px]:scale-105"
        fill
        priority
        sizes="100vw"
        src="https://images.unsplash.com/photo-1560671582-7668ca55fdc8?auto=format&fit=crop&w=3200&q=90"
      />

      <div className="absolute inset-0 -z-10 bg-hero-vignette" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-obsidian via-obsidian/76 to-obsidian/10" />

      <div className="mx-auto grid min-h-[82svh] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-[76svh] lg:px-8 lg:pb-14 lg:pt-20 min-[1600px]:min-h-[80svh] min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:grid-cols-[minmax(560px,0.78fr)_minmax(0,1fr)] min-[1600px]:gap-20 min-[1600px]:px-12 min-[1600px]:pb-16 min-[1600px]:pt-24 min-[1920px]:min-h-[82svh] min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:grid-cols-[minmax(620px,0.78fr)_minmax(0,1fr)] min-[1920px]:gap-24 min-[1920px]:px-16 min-[1920px]:pb-20 min-[1920px]:pt-28">
        <motion.div
          className="max-w-3xl min-[1600px]:max-w-[760px] min-[1920px]:max-w-[820px]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-eyebrow min-[1600px]:text-[0.95rem] min-[1920px]:text-base">
            Premium technology goods
          </p>
          <h1 className="mt-eyebrow-heading text-5xl font-semibold leading-[1.02] text-platinum sm:text-6xl lg:text-7xl min-[1600px]:text-[5.75rem] min-[1920px]:text-[6.5rem]">
            Elevate
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-silver sm:text-xl min-[1600px]:max-w-[42rem] min-[1600px]:text-[1.375rem] min-[1600px]:leading-9 min-[1920px]:max-w-[44rem] min-[1920px]:text-2xl">
            Explore high-end headphones, watches, cameras, and workspace tech
            designed to elevate your everyday experience.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row min-[1600px]:mt-10 min-[1600px]:gap-4">
            <Link className={buttonClassName({ size: "lg" })} href="/shop">
              Shop collection
              <ArrowRight size={18} />
            </Link>

            <Link
              className={buttonClassName({ variant: "secondary", size: "lg" })}
              href="/product/vanta-studio-headphones"
            >
              <Play size={18} />
              Featured drop
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-white/10 pt-6 min-[1600px]:mt-14 min-[1600px]:max-w-[42rem] min-[1600px]:gap-7 min-[1600px]:pt-7 min-[1920px]:max-w-[44rem] min-[1920px]:gap-8 min-[1920px]:pt-8">
            {[
              ["24h", "shipping"],
              ["4.8", "avg rating"],
              ["30d", "returns"]
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-2xl font-semibold text-platinum min-[1600px]:text-[1.7rem] min-[1920px]:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted min-[1600px]:text-[0.75rem] min-[1920px]:text-[0.8rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
