"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { buttonClassName } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[82svh] overflow-hidden">
      <Image
        alt="Flat lay of premium laptop, headphones, smartwatch, and camera gear"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fill
        priority
        sizes="100vw"
        src="https://images.unsplash.com/photo-1560671582-7668ca55fdc8?auto=format&fit=crop&w=2400&q=90"
      />

      <div className="absolute inset-0 -z-10 bg-hero-vignette" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-obsidian via-obsidian/76 to-obsidian/10" />

      <div className="mx-auto flex min-h-[82svh] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="#A7C7E7 text-sm font-semibold uppercase tracking-[0.32em]">
            Premium technology goods
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-platinum sm:text-6xl lg:text-7xl">
            Elevate
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-silver sm:text-xl">
            Explore high-end headphones, watches, cameras, and workspace tech
            designed to elevate your everyday experience.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-white/10 pt-6">
            {[
              ["24h", "shipping"],
              ["4.8", "avg rating"],
              ["30d", "returns"]
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-2xl font-semibold text-platinum">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">
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
