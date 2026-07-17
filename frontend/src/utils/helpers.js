export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function discountPercent(price, mrp) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function classNames(...items) {
  return items.filter(Boolean).join(" ");
}

/**
 * Estimates a delivery date given today's pending order count and a daily
 * stitching capacity. Every `capacity` orders push the delivery date out by
 * one additional day.
 */
export function estimateDeliveryDate(pendingOrdersToday, capacity) {
  const extraDays = Math.floor(pendingOrdersToday / capacity);
  const baseDays = 4 + extraDays;
  const date = new Date();
  date.setDate(date.getDate() + baseDays);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
