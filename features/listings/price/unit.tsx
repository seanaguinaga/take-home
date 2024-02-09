"use client";

import { Listing } from "../data";

import { formatCurrency } from "./utils";

import { useQueryParams } from "@/hooks/use-booking-history";

function getUnitPrice(listing: Listing, leaseDuration: number): number {
  const amount = listing.pricing.monthlyPricing.find(
    (price) => price.months === leaseDuration
  )?.amount;
  return amount ?? 0;
}

export function UnitPrice({ listing }: { listing: Listing }) {
  const { queryParams } = useQueryParams<Record<string, string>>();

  const leaseDuration = Number(queryParams.leaseDuration);

  const unitPrice = getUnitPrice(listing, leaseDuration);

  const formattedUnitPrice = formatCurrency(unitPrice);

  const isValidDuration = !isNaN(leaseDuration) && leaseDuration > 0;

  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm">Price per month</dt>
      <dd className="text-sm font-medium text-gray-900">
        {isValidDuration
          ? formattedUnitPrice
          : "Choose the length of your stay"}
      </dd>
    </div>
  );
}
