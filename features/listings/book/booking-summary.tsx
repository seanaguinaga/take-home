"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";

import { getListing } from "../data";

export function ListingSummary() {
  const params = useParams<{ id: string }>();
  return (
    <Suspense
      fallback={
        <div className="flex px-4 py-6 sm:px-6 animate-pulse">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
          </div>
          <div className="ml-6 flex flex-1 flex-col">
            <div className="flex">
              <div className="min-w-0 flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 text-sm"></div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-5/6 text-sm"></div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-1/2 text-sm"></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* @ts-ignore - this works fine */}
      <ListingSummaryData id={params.id} />
    </Suspense>
  );
}

async function ListingSummaryData({ id }: { id: string }) {
  const listing = await getListing(Number(id));

  if (!listing) return null;

  const firstImage = listing.images[0];

  return (
    <li className="flex px-4 py-6 sm:px-6">
      <div className="flex-shrink-0">
        <img
          src={firstImage.url}
          alt={firstImage.tag}
          className="w-20 rounded-md"
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">{listing.marketingName}</h4>
            <p className="mt-1 text-sm text-gray-500">{listing.propertyName}</p>
            <p className="mt-1 text-sm text-gray-500">
              {listing.unitSqft} sq. ft
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
