"use client";
// This component runs in the browser because framer-motion uses browser APIs.

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
// cn stands for "class names" and combines className strings.

export function FadeIn({
  children,
  className,
  delay = 0
}: {
  // children is the content that FadeIn wraps and animates.
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* className applies any custom classes passed to FadeIn. */}
      {/* If the user prefers reduced motion, skip the starting animation state. */}
      {/* once: true means the animation only runs the first time it enters view. */}
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {/* This is where the wrapped content appears. */}
      {children}
    </motion.div>
    </>
  );
}
