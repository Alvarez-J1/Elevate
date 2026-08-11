import type { ReactNode } from "react";

import type { CartItem } from "@/components/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export function calculateOrderTotals(items: CartItem[]): OrderTotals {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 24;
  const tax = subtotal * 0.0825;

  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax
  };
}

export function OrderSummary({
  items,
  action,
  compact = false
}: {
  items: CartItem[];
  action?: ReactNode;
  compact?: boolean;
}) {
  const totals = calculateOrderTotals(items);

  return (
    <aside className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-platinum">Order summary</h2>
      {!compact ? (
        <div className="mt-5 grid gap-4">
          {items.map((item) => (
            <div className="flex items-center gap-3" key={item.key}>
              <div
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.accent }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-platinum">{item.name}</p>
                <p className="text-xs text-muted">Qty {item.quantity}</p>
              </div>
              <p className="text-sm text-silver">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm">
        <div className="flex justify-between text-silver">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between text-silver">
          <span>Shipping</span>
          <span>{totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}</span>
        </div>
        <div className="flex justify-between text-silver">
          <span>Estimated tax</span>
          <span>{formatCurrency(totals.tax)}</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-4 text-base font-semibold text-platinum">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>

      {action ? <div className="mt-6">{action}</div> : null}
    </aside>
  );
}
