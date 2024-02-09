import { Suspense } from "react";

import { Listing } from "../data";
import { Dates } from "../dates/dates";

import { ListingSummary } from "./booking-summary";
import { Input, Select, SubmitButton } from "./inputs";
import { getLease } from "./lease/data";
import { SignLease } from "./lease/sign-lease";

import { submitBooking } from "@/actions/submit-booking";

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

interface BookProps {
  listing: Listing;
}

export async function Book({ listing }: BookProps) {
  const submitBookingWithId = submitBooking.bind(null, `${listing.id}`);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
        <h1 className="sr-only">Checkout</h1>
        <form
          action={submitBookingWithId}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <div className="mt-4">
                <Input
                  name="email"
                  label="Email address"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <Input
                  name="firstName"
                  label="First name"
                  autoComplete="given-name"
                />

                <Input
                  name="lastName"
                  label="Last name"
                  autoComplete="family-name"
                />

                <div className="sm:col-span-2">
                  <Input
                    name="company"
                    label="Company"
                    autoComplete="organization"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    name="lineOne"
                    label="Address"
                    autoComplete="street-address"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Input
                    name="lineTwo"
                    label="Apartment, suite, etc."
                    autoComplete="address-line2"
                  />
                </div>

                <Input name="city" label="City" autoComplete="address-level2" />

                <Select name="country" label="Country" />

                <Input
                  name="region"
                  label="State / Province"
                  autoComplete="address-level1"
                />

                <Input
                  name="postalCode"
                  label="Postal code"
                  autoComplete="postal-code"
                />

                <div className="sm:col-span-2">
                  <Input
                    name="phone"
                    label="Phone"
                    autoComplete="tel"
                    type="tel"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                <div className="col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center py-2">
                    <div className="w-full flex justify-center items-center rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-white">
                      Fetching Lease Status...
                    </div>
                  </div>
                }
              >
                <LeaseData listing={listing} />
              </Suspense>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">
              Booking summary
            </h2>

            <div>
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                <ListingSummary listing={listing} />
                <div className="py-2 px-4">
                  <Dates listing={listing} />
                </div>
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">$64.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    $75.52
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 sm:px-6">
                <SubmitButton />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

async function LeaseData({ listing }: { listing: Listing }) {
  const lease = await getLease(`${listing.id}`, "1", listing.availableDate);
  // 50/50 chance a lease already exists

  if (lease) {
    return (
      <div className="flex justify-center items-center py-2">
        <div className="w-full flex justify-center items-center rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-white">
          Lease Signed
        </div>
        <input type="hidden" name="leaseId" value={lease.id} />
      </div>
    );
  }

  return <SignLease />;
}
