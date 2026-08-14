import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "header" | "footer";
};

const logoClassNames = {
  header: "h-[34px] sm:h-9",
  footer: "h-8 sm:h-9"
};

export function BrandLogo({
  className,
  priority = false,
  variant = "header"
}: BrandLogoProps) {
  return (
    <Link
      aria-label="Elevate home"
      className={cn("inline-flex items-center", className)}
      href="/"
    >
      <Image
        alt=""
        className={cn("w-auto object-contain", logoClassNames[variant])}
        height={160}
        priority={priority}
        sizes={variant === "header" ? "180px" : "158px"}
        src="/brand/elevate-logo.png"
        width={740}
      />
    </Link>
  );
}
