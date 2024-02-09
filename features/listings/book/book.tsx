import { Listing } from "../data";

import { BookingForm } from "./form";

interface BookProps {
  listing: Listing;
}

export async function Book({ listing }: BookProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
        <h1 className="sr-only">Checkout</h1>
        <BookingForm listing={listing} />
      </div>
    </div>
  );
}
