"use client";

import { Listing } from "../data";

import { useQueryParams } from "@/hooks/use-query-params";

function getConcessions(listing: Listing, leaseDuration: number) {
  const concessions = listing.pricing.monthlyPricing.find(
    (price) => price.months === leaseDuration
  )?.concessionsApplied;
  return concessions;
}

export function Concessions({ listing }: { listing: Listing }) {
  const { queryParams } = useQueryParams<Record<string, string>>();

  const leaseDuration = Number(queryParams.leaseDuration);

  const concessions = getConcessions(listing, leaseDuration);

  if (!concessions?.length) return null;

  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm">Discount</dt>
      <dd className="text-sm font-medium text-gray-900">
        {concessions.map((concession) => (
          <span key={concession} className="block">
            {concession}
          </span>
        ))}
      </dd>
    </div>
  );
}

// ASK - is concession already applied?

// function calculateConcessionValue(
//   monthlyRent: number,
//   concessionDescription: string
// ): number {
//   const monthsRegex = /(\d+) Month/;
//   const weeksRegex = /(\d+) Week/;

//   let concessionValue = 0;

//   const monthsMatch = concessionDescription.match(monthsRegex);
//   const weeksMatch = concessionDescription.match(weeksRegex);

//   if (monthsMatch) {
//     const monthsOff = parseInt(monthsMatch[1], 10);
//     concessionValue = monthlyRent * monthsOff;
//   } else if (weeksMatch) {
//     const weeksOff = parseInt(weeksMatch[1], 10);
//     const monthsOff = weeksOff / 4; // Assuming 4 weeks per month
//     concessionValue = monthlyRent * monthsOff;
//   }

//   return concessionValue;
// }

// // Example usage
// const monthlyRent = 216792; // Monthly rent for a 12-month lease from the JSON data
// const concessionDescription = "1 Month off 12 Months"; // Concession description from the JSON data
// const concessionValue = calculateConcessionValue(
//   monthlyRent,
//   concessionDescription
// );

// console.log(`Concession Value: ${concessionValue}`);
