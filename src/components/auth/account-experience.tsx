"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonClassName } from "@/components/ui/button";
import { type ApiOrder, fetchMyOrders } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/utils";

export function AccountExperience() {
  const router = useRouter();
  const { user, token, isAuthenticated, isReady, logout } = useAuth();
  const [orders, setOrders] = useState<ApiOrder[] | null>(null);

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
      .then((page) => setOrders(page.content))
      .catch(() => setOrders([]));
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
