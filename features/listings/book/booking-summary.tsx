"use client";

import { Listing } from "../data";

export function ListingSummary({ listing }: { listing: Listing }) {
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
