"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useMemo, useState } from "react";

import { getCartItemCount, useCartStore } from "@/components/store/cart-store";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const { isAuthenticated, isReady, user } = useAuth();
  const isOpen = openPathname === pathname;

  const count = useMemo(() => getCartItemCount(items), [items]);
  const accountHref = isReady && isAuthenticated ? "/account" : "/login";
  const accountLabel = isReady && isAuthenticated ? user?.firstName ?? "Account" : "Sign in";
  // Signed-out visitors can still see the cart icon/nav link, but clicking
  // it sends them to sign in first — the cart page itself is never
  // functional for a guest (see CartExperience's own guard).
  const cartHref = isReady && isAuthenticated ? "/cart" : "/login?returnTo=/cart";
  const showCartCount = isReady && isAuthenticated && hasHydrated && count > 0;

  const navItems = [
    { label: "Home", href: "/", matchPath: "/" },
    { label: "Shop", href: "/shop", matchPath: "/shop" },
    { label: "Cart", href: cartHref, matchPath: "/cart" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-obsidian/76 backdrop-blur-2xl">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16"
        aria-label="Main navigation"
      >
        <BrandLogo className="ml-2 sm:ml-3" priority />
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.matchPath === "/"
                ? pathname === "/"
                : pathname.startsWith(item.matchPath);

            return (
              <Link
                className={cn(
                  "rounded-lg px-4 py-2 text-base text-silver transition hover:bg-white/[0.06] hover:text-platinum",
                  isActive && "bg-white/[0.07] text-platinum"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            aria-label="Search products"
            className={buttonClassName({
              variant: "ghost",
              size: "icon",
              className: "hidden md:inline-flex"
            })}
            href="/shop"
          >
            <Search size={20} />
          </Link>
          <Link
            aria-label={accountLabel}
            className={buttonClassName({
              variant: "ghost",
              size: "icon",
              className: "hidden md:inline-flex"
            })}
            href={accountHref}
          >
            <User size={20} />
          </Link>
          <Link
            aria-label={`Cart with ${showCartCount ? count : 0} items`}
            className={buttonClassName({
              variant: "secondary",
              size: "icon",
              className: "relative"
            })}
            href={cartHref}
          >
            <ShoppingBag size={20} />
            {showCartCount ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-glacier px-1 text-[11px] font-semibold text-obsidian">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className={buttonClassName({
              variant: "ghost",
              size: "icon",
              className: "md:hidden"
            })}
            onClick={() =>
              setOpenPathname((value) => (value === pathname ? null : pathname))
            }
            type="button"
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-obsidian/96 px-4 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-lg px-4 py-3 text-base text-silver transition hover:bg-white/[0.06] hover:text-platinum"
                href={item.href}
                key={item.href}
                onClick={() => setOpenPathname(null)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="rounded-lg px-4 py-3 text-base text-silver transition hover:bg-white/[0.06] hover:text-platinum"
              href={accountHref}
              onClick={() => setOpenPathname(null)}
            >
              {accountLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
