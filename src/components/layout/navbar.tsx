"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Menu,
  Search,
  ShoppingBag,
  Store,
  User,
  X,
  type LucideIcon
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getCartItemCount, useCartStore } from "@/components/store/cart-store";
import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const { isAuthenticated, isReady, user } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const count = useMemo(() => getCartItemCount(items), [items]);
  const accountHref = isReady && isAuthenticated ? "/account" : "/login";
  const accountLabel = isReady && isAuthenticated ? "Account" : "Sign in";
  const accountAriaLabel =
    isReady && isAuthenticated
      ? user?.firstName
        ? `${user.firstName}'s account`
        : "Account"
      : "Sign in";
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
  const menuItems: Array<{
    label: string;
    href: string;
    matchPath?: string;
    icon: LucideIcon;
  }> = [
    { label: "Home", href: "/", matchPath: "/", icon: House },
    { label: "Shop", href: "/shop", matchPath: "/shop", icon: Store },
    { label: "Cart", href: cartHref, matchPath: "/cart", icon: ShoppingBag },
    { label: "Search", href: "/shop", icon: Search },
    {
      label: accountLabel,
      href: accountHref,
      matchPath: isReady && isAuthenticated ? "/account" : "/login",
      icon: User
    }
  ];
  const menuId = "mobile-tablet-navigation";

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        (previouslyFocusedElement.current ?? menuButtonRef.current)?.focus();
      });
    }
  }, []);

  const openMenu = () => {
    previouslyFocusedElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : menuButtonRef.current;
    setIsMenuOpen(true);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const focusTimer = window.setTimeout(() => {
      firstMenuItemRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        closeMenu();
        return;
      }

      if (
        drawerRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }

      closeMenu();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-obsidian/76 backdrop-blur-2xl">
      <nav
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 min-[1600px]:max-w-[min(90vw,1760px)] min-[1600px]:px-12 min-[1920px]:max-w-[min(92vw,2400px)] min-[1920px]:px-16"
        aria-label="Main navigation"
      >
        <BrandLogo className="ml-2 sm:ml-3" priority />
        <div className="hidden items-center gap-1 lg:flex">
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
              className: "max-lg:!hidden lg:!inline-flex"
            })}
            href="/shop"
          >
            <Search size={20} />
          </Link>
          <Link
            aria-label={accountAriaLabel}
            className={buttonClassName({
              variant: "ghost",
              size: "icon",
              className: "max-lg:!hidden lg:!inline-flex"
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
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className={buttonClassName({
              variant: "ghost",
              size: "icon",
              className: "lg:hidden"
            })}
            onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
            ref={menuButtonRef}
            type="button"
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-x-0 bottom-0 top-16 z-40 bg-obsidian/70 backdrop-blur-sm lg:hidden"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            />
            <motion.div
              className="fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-xl border border-white/10 bg-obsidian/96 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:left-auto sm:w-[360px] lg:hidden"
              id={menuId}
              ref={drawerRef}
              initial={
                shouldReduceMotion ? false : { opacity: 0, x: 14, y: -8 }
              }
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 14, y: -8 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-eyebrow">
                  Menu
                </p>
                <button
                  aria-label="Close navigation menu"
                  className={buttonClassName({
                    variant: "ghost",
                    size: "icon",
                    className: "h-9 w-9"
                  })}
                  onClick={() => closeMenu(true)}
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="grid gap-1 p-3" aria-label="Mobile navigation">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = item.matchPath
                    ? item.matchPath === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.matchPath)
                    : false;
                  const isCart = item.matchPath === "/cart";

                  return (
                    <Link
                      className={cn(
                        "group flex min-h-12 items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-silver transition hover:bg-white/[0.06] hover:text-platinum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glacier",
                        isActive && "bg-white/[0.07] text-platinum"
                      )}
                      href={item.href}
                      key={item.label}
                      onClick={() => closeMenu()}
                      ref={index === 0 ? firstMenuItemRef : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          aria-hidden="true"
                          className="text-glacier transition group-hover:text-platinum"
                          size={18}
                        />
                        {item.label}
                      </span>
                      {isCart && showCartCount ? (
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-glacier px-2 text-xs font-semibold text-obsidian">
                          {count}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
