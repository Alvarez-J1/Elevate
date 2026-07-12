import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/layout/brand-logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Audio", href: "/shop" },
      { label: "Wearables", href: "/shop" },
      { label: "Workspace", href: "/shop" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-obsidian/80 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <BrandLogo variant="footer" />
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-silver">
              Premium technology designed for focus, creativity, and daily use.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-2xl font-semibold text-platinum">{column.title}</h2>
              <div className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <Link
                    className="group inline-flex items-center gap-2 text-lg font-medium text-silver transition hover:text-platinum"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                    <ArrowUpRight
                      className="opacity-0 transition group-hover:opacity-100"
                      size={14}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-base text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Elevate. All rights reserved.</p>
          <p>Sandbox checkout. No real payments are processed.</p>
        </div>
      </Container>
    </footer>
  );
}
