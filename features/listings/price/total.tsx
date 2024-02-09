"use client";

import { useMemo } from "react";

import { Listing } from "../data";

import { formatCurrency } from "./utils";

import { useQueryParams } from "@/hooks/use-booking-history";

function calculateTotal(listing: Listing, leaseDuration: number): number {
  const amount = listing.pricing.monthlyPricing.find(
    (price) => price.months === leaseDuration
  )?.amount;
  return (amount ?? 0) * leaseDuration;
}

export function TotalPrice({ listing }: { listing: Listing }) {
  const { queryParams } = useQueryParams<Record<string, string>>();
  const leaseDuration = Number(queryParams.leaseDuration);

  const total = useMemo(
    () => calculateTotal(listing, leaseDuration),
    [listing, leaseDuration]
  );
  const formattedTotal = useMemo(() => formatCurrency(total), [total]);

  const isValidDuration = !isNaN(leaseDuration) && leaseDuration > 0;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
      <dt className="text-base font-medium">Total</dt>
      <dd className="text-base font-medium text-gray-900">
        {isValidDuration ? formattedTotal : "Choose the length of your stay"}
      </dd>
    </div>
  );
}
