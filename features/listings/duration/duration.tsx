"use client";

import { useQueryParams } from "@/hooks/use-booking-history";

export function Duration() {
  const { queryParams } = useQueryParams<Record<string, string>>();

  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm">Months</dt>
      <dd className="text-sm font-medium text-gray-900">
        {queryParams.leaseDuration || "Choose the length of your stay"}
      </dd>
    </div>
  );
}
