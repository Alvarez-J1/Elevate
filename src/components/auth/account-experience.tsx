"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, CalendarDays, PackageCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonClassName } from "@/components/ui/button";
import { type ApiAccountSummary, type ApiOrder, fetchAccountSummary, fetchMyOrders } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/utils";

function formatMemberSince(value?: string): string {
  if (!value) {
    return "Member since --";
  }

  return `Member since ${new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(new Date(value))}`;
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

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-silver">Signed in as</p>
          <p className="text-lg font-semibold text-platinum">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-muted">{user?.email}</p>
          <div className="mt-4 grid gap-2 text-xs text-muted sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <BadgeCheck className="text-glacier/80" size={14} />
              {summary?.verified === false ? "Account Active" : "Verified Account"}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="text-glacier/80" size={14} />
              {formatMemberSince(summary?.memberSince)}
            </span>
            <span className="flex items-center gap-2">
              <PackageCheck className="text-glacier/80" size={14} />
              Orders: {summary?.orderCount ?? orderTotal ?? "--"}
            </span>
            <span className="flex items-center gap-2">
              <Star className="text-glacier/80" size={14} />
              Reviews: {summary?.reviewCount ?? "--"}
            </span>
          </div>
        </div>
        <button
          className={buttonClassName({ variant: "secondary" })}
          onClick={() => {
            logout();
            router.push("/");
          }}
          type="button"
        >
          Sign out
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-platinum">Order history</h2>

        {orders === null ? (
          <div className="mt-4 grid gap-3">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            className="mt-4"
            icon={<PackageCheck size={22} />}
            title="No orders yet"
            description="Orders placed while signed in will show up here."
            action={
              <Link className={buttonClassName()} href="/shop">
                Browse collection
              </Link>
            }
          />
        ) : (
          <div className="mt-4 grid gap-3">
            {orders.map((order) => (
              <div
                className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between"
                key={order.id}
              >
                <div>
                  <p className="font-medium text-platinum">{order.orderNumber}</p>
                  <p className="text-sm text-muted">
                    {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item
                    {order.items.length === 1 ? "" : "s"} · {order.status}
                  </p>
                </div>
                <p className="text-base font-semibold text-platinum">
                  {formatCurrency(order.total)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
