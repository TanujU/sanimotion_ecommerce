import clsx from "clsx";
import React from "react";

type PriceProps = {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">;

export default function Price({
  amount,
  className,
  currencyCode = "EUR",
  currencyCodeClassName,
}: PriceProps) {
  const numeric = parseFloat(String(amount ?? "0").replace(",", "."));
  const safeNumber = Number.isFinite(numeric) ? numeric : 0;
  // Format number with German grouping/decimal but force € before value
  const numberOnly = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeNumber);
  const formatted = `€${numberOnly}`;

  return (
    <p suppressHydrationWarning={true} className={className}>
      {formatted}
    </p>
  );
}
