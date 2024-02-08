import { Suspense } from "react";
import { ListingsList } from "./list";

export function Listings() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div className="animate-pulse" key={index}>
                  <div className="relative h-72 w-full overflow-hidden rounded-lg bg-gray-300"></div>
                  <div className="relative mt-4 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>{" "}
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>{" "}
                  </div>
                  <div className="mt-6">
                    <div className="h-10 bg-gray-300 rounded"></div>{" "}
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <ListingsList />
        </Suspense>
      </div>
    </div>
  );
}
