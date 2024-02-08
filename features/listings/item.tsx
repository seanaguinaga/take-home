"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Listing } from "./data";

interface ListingItemProps {
  listing: Listing;
}

export function ListingItem({ listing }: ListingItemProps) {
  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the link from triggering
    router.push(`/${listing.id}`);
  };

  const handleBook = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the link from triggering
    router.push(`/${listing.id}/book`);
  };

  const firstImage = listing.images[0];

  return (
    <div
      key={listing.id}
      onClick={handleNavigate}
      className="hover:cursor-pointer"
    >
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            src={firstImage.url}
            alt={firstImage.tag}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            {listing.marketingName}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {dayjs(listing.availableDate).format("MMMM D, YYYY")}
          </p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            ${listing.pricing.minimumPrice} - ${listing.pricing.maximumPrice}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleBook}
          className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Book<span className="sr-only">, {listing.marketingName}</span>
        </button>
      </div>
    </div>
  );
}
