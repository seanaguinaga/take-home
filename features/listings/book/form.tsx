import { Listing } from "../data";
import { Duration } from "../duration/duration";
import { Concessions } from "../price/concessions";
import { TotalPrice } from "../price/total";
import { UnitPrice } from "../price/unit";

import { ListingSummary } from "./booking-summary";
import { CountrySelect, Input, SubmitButton } from "./inputs";
import { Lease } from "./lease/lease";

import { submitBooking } from "@/actions/submit-booking";

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

interface BookingFormProps {
  listing: Listing;
}

export function BookingForm({ listing }: BookingFormProps) {
  const submitBookingWithId = submitBooking.bind(null, `${listing.id}`);

  return (
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
            <Input name="email" label="Email address" autoComplete="email" />
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

            <CountrySelect name="country" label="Country" />

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
              <Input name="phone" label="Phone" autoComplete="tel" type="tel" />
            </div>
          </div>
        </div>

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
      </div>

      <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">Booking summary</h2>

        <div>
          <h3 className="sr-only">Items in your cart</h3>
          <ul role="list" className="divide-y divide-gray-200">
            <ListingSummary listing={listing} />

            <Lease listing={listing} />
          </ul>

          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
            <Duration />
            <UnitPrice listing={listing} />
            <Concessions listing={listing} />
            <TotalPrice listing={listing} />
          </dl>

          <div className="border-t border-gray-200 py-6 sm:px-6">
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
}
