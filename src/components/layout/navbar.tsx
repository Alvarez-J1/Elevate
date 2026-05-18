"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; //usePathname is a hook that returns the current pathname.
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getCartItemCount, useCartStore } from "@/components/store/cart-store";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" }
];


// isOpen tracks whether the mobile menu is open. It starts as false, so the menu is closed by default. When the hamburger button is clicked, setIsOpen(...) toggles it open or closed.
export function Navbar() {
  const pathname = usePathname(); //
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);

  // USeMemo is a hook that memoizes the cart item count.
  const count = useMemo(() => getCartItemCount(items), [items]); 

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    //top-0 means the navbar is at the top of the page.
    //z-50 means the navbar is on top of other elements.
    <header className="sticky top-0 z-50 border-b border-white/10 bg-obsidian/76 backdrop-blur-2xl">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link className="group flex items-center gap-3" href="/">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-platinum">
            Elevate
          </span>
        </Link>
{/* //hidden means the div is not visible on small screens. */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={cn(
                  "rounded-lg px-4 py-2 text-sm text-silver transition hover:bg-white/[0.06] hover:text-platinum",
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
            <Search size={18} />
          </Link>
          <Link
            aria-label={`Cart with ${mounted ? count : 0} items`}
            className={buttonClassName({
              variant: "secondary",
              size: "icon",
              className: "relative"
            })}
            href="/cart"
          >
            <ShoppingBag size={18} />
            {/* //mouned and count > 0 means the cart item count is displayed if the cart is not empty. */}
            {mounted && count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-glacier px-1 text-[11px] font-semibold text-obsidian">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            aria-expanded={isOpen} //aria-expanded is a boolean attribute that indicates whether the navigation menu is expanded.
            aria-label="Toggle navigation menu"
            className={buttonClassName({
              variant: "ghost",
              size: "icon",
              className: "md:hidden"
            })}
            onClick={() => setIsOpen((value) => !value)} //setIsOpen is a function that toggles the mobile menu open or closed. value is the current state of the mobile menu. !value is the new state of the mobile menu.
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
                className="rounded-lg px-4 py-3 text-sm text-silver transition hover:bg-white/[0.06] hover:text-platinum"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
