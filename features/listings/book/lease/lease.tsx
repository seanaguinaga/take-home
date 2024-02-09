import { Suspense } from "react";

import { Listing } from "../../data";

import { getLease } from "./data";
import { SignLease } from "./sign-lease";

async function LeaseData({ listing }: { listing: Listing }) {
  const lease = await getLease(`${listing.id}`, "1", listing.availableDate);
  // 50/50 chance a lease already exists
  // My thought process is that maybe a lease can be applied to a stay within a certain range
  // so reduce friction for the user by fetching an existing lease if there is still a valid one?

  if (lease) {
    return (
      <div className="flex justify-center items-center py-2 sm:px-6">
        <div className="w-full flex justify-center items-center rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-white">
          Lease Signed
          <input type="hidden" name="leaseId" value={lease.id} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-2 sm:px-6">
        <SignLease listing={listing} />
      </div>
    </>
  );
}

export function Lease({ listing }: { listing: Listing }) {
  return (
    <Suspense
      fallback={
        <div className="sm:px-6">
          <div className="flex justify-center items-center py-2">
            <div className="w-full flex justify-center items-center rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-white">
              Fetching Lease Status...
            </div>
          </div>
        </div>
      }
    >
      <LeaseData listing={listing} />
    </Suspense>
  );
}
