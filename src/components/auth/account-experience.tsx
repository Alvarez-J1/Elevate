"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, CalendarDays, CheckCircle, PackageCheck, Star } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { buttonClassName } from "@/components/ui/button";
import { type ApiAccountSummary, type ApiOrder, fetchAccountSummary, fetchMyOrders } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/utils";

function formatMemberSince(value?: string, { prefix = true }: { prefix?: boolean } = {}): string {
  const label = prefix ? "Member since " : "";

  if (!value) {
    return `${label}--`;
  }

  return `${label}${new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(new Date(value))}`;
}

function formatActivityDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function formatCount(count: number | null | undefined, singular: string, plural: string): string {
  if (count === null || count === undefined) {
    return `-- ${plural}`;
  }

  return `${count} ${count === 1 ? singular : plural}`;
}

function formatOrderStatus(status: string): string {
  return status
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

type ActivityItem = {
  id: string;
  date: string;
  label: string;
};

function buildRecentActivity(
  orders: ApiOrder[] | null,
  summary: ApiAccountSummary | null
): ActivityItem[] {
  const activity: ActivityItem[] = [];

  const latestOrder = orders?.[0];
  if (latestOrder) {
    activity.push({
      id: `order-${latestOrder.id}`,
      date: latestOrder.createdAt,
      label: `Order ${latestOrder.orderNumber} placed`
    });
  }

  if (summary?.memberSince) {
    activity.push({
      id: "account-created",
      date: summary.memberSince,
      label: "Account created"
    });
  }

  return activity
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

function AnimatedEmptyState({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`account-empty-state-enter${isVisible ? " is-visible" : ""}`}
      ref={ref}
    >
      {children}
    </div>
  );
}

export function AccountExperience() {
  const router = useRouter();
  const { user, token, isAuthenticated, isReady, logout } = useAuth();
  const [orders, setOrders] = useState<ApiOrder[] | null>(null);
  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const [summary, setSummary] = useState<ApiAccountSummary | null>(null);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isReady, isAuthenticated, router]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetchMyOrders(token)
      .then((page) => {
        setOrders(page.content);
        setOrderTotal(page.totalElements);
      })
      .catch(() => {
        setOrders([]);
        setOrderTotal(0);
      });

    fetchAccountSummary(token)
      .then(setSummary)
      .catch(() => setSummary(null));
  }, [token]);

  if (!isReady || !isAuthenticated) {
    return <Skeleton className="h-64" />;
  }

  const recentActivity = buildRecentActivity(orders, summary);
  const orderCount = summary?.orderCount ?? orderTotal;
  const reviewCount = summary?.reviewCount;
  const initials = [
    user?.firstName?.charAt(0),
    user?.lastName?.charAt(0)
  ].filter(Boolean).join("").toUpperCase() || "E";
  const accountMetadata = [
    {
      icon: BadgeCheck,
      label: summary?.verified === false ? "Account active" : "Verified account"
    },
    {
      icon: CalendarDays,
      label: formatMemberSince(summary?.memberSince)
    },
    {
      icon: PackageCheck,
      label: formatCount(orderCount, "order", "orders")
    },
    {
      icon: Star,
      label: formatCount(reviewCount, "review", "reviews")
    }
  ];

  return (
    <div className="grid gap-12 sm:gap-14">
      <div
        className="touch-card touch-card-lift touch-card-border-25 touch-card-surface-7 w-full rounded-lg border border-white/10 bg-white/[0.055] px-5 py-5 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] active:-translate-y-1 active:border-white/25 active:bg-white/[0.07] sm:p-6 xl:max-w-[42rem]"
        data-touch-card
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-glacier/12 text-sm font-semibold text-[#a7e3ff]"
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-silver">Signed in as</p>
              <p className="mt-1 text-lg font-semibold text-platinum">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="mt-1 truncate text-sm text-muted">{user?.email}</p>
            </div>
          </div>
          <button
            className={buttonClassName({
              variant: "secondary",
              size: "sm",
              className: "shrink-0 cursor-pointer self-start"
            })}
            onClick={() => {
              logout();
              router.push("/");
            }}
            type="button"
          >
            Sign out
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-sm text-silver">
          {accountMetadata.map(({ icon: Icon, label }) => (
            <span
              className="inline-flex items-center gap-2"
              key={label}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[#a7e3ff]" strokeWidth={1.8} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <section aria-labelledby="account-order-history-heading">
        <h2 className="text-lg font-semibold text-platinum" id="account-order-history-heading">
          Order history
        </h2>

        {orders === null ? (
          <div className="mt-5 grid w-full gap-3 xl:max-w-[42rem]">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        ) : orders.length === 0 ? (
          <AnimatedEmptyState>
            <div
              className="touch-card touch-card-lift touch-card-border-25 touch-card-surface-7 mt-5 flex min-h-[12rem] w-full flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] px-5 py-6 text-center shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] active:-translate-y-1 active:border-white/25 active:bg-white/[0.07] sm:min-h-[13rem] sm:px-6 xl:max-w-[42rem]"
              data-touch-card
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-glacier/12 text-[#a7e3ff]">
                <PackageCheck aria-hidden="true" size={18} />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-platinum">No orders yet.</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-silver">
                Your purchases will appear here after your first order.
              </p>
              <Link
                className={buttonClassName({
                  variant: "secondary",
                  size: "sm",
                  className: "mt-4"
                })}
                href="/shop"
              >
                Start Shopping
              </Link>
            </div>
          </AnimatedEmptyState>
        ) : (
          <div className="mt-5 grid w-full gap-3 xl:max-w-[42rem]">
            {orders.map((order) => (
              <article
                className="touch-card touch-card-lift touch-card-border-25 touch-card-surface-7 grid min-h-24 grid-cols-[4rem_1fr] gap-4 rounded-lg border border-white/10 bg-white/[0.045] px-5 py-4 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] active:-translate-y-1 active:border-white/25 active:bg-white/[0.07] sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-center sm:px-6 sm:py-4"
                data-touch-card
                key={order.id}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10 bg-carbon">
                  {order.items[0]?.productImage ? (
                    <Image
                      alt={order.items[0].productName}
                      className="h-full w-full object-cover"
                      height={128}
                      quality={92}
                      sizes="64px"
                      src={order.items[0].productImage}
                      width={128}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#a7e3ff]">
                      <PackageCheck aria-hidden="true" size={20} />
                    </div>
                  )}
                  {order.items.length > 1 ? (
                    <span className="absolute bottom-1 right-1 rounded-md border border-white/10 bg-obsidian/80 px-1.5 py-0.5 text-[10px] font-medium text-platinum backdrop-blur-md">
                      +{order.items.length - 1}
                    </span>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-platinum">
                    Order {order.orderNumber}
                  </p>
                  <p className="text-sm text-muted">
                    {formatActivityDate(order.createdAt)}{" \u00b7 "}{order.items.length} item
                    {order.items.length === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="col-span-2 flex items-end justify-between gap-4 border-t border-white/10 pt-4 sm:col-span-1 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
                  <div className="sm:text-right">
                    <p className="text-base font-semibold text-platinum">
                      {formatCurrency(order.total)}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-silver sm:justify-end">
                      <CheckCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#a7e3ff]" strokeWidth={1.8} />
                      {formatOrderStatus(order.status)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {recentActivity.length > 0 ? (
        <section className="w-full xl:max-w-[42rem]">
          <h2 className="text-lg font-semibold text-platinum">Recent activity</h2>
          <div className="mt-5 divide-y divide-white/10 border-b border-white/10">
            {recentActivity.map((item) => (
              <div
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                key={item.id}
              >
                <p className="text-sm font-medium text-platinum">{item.label}</p>
                <p className="text-sm text-muted sm:text-right">{formatActivityDate(item.date)}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
