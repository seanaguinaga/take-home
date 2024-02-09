"use client";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

import { LeaseDurationSelect } from "../book/inputs";
import type { Listing as IListing } from "../data";
import { Dates } from "../dates/dates";
import { Duration } from "../duration/duration";
import { TotalPrice } from "../price/total";
import { UnitPrice } from "../price/unit";

import { LinkWithParams } from "@/ui/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ListingProps {
  listing: IListing;
}

export function Listing({ listing }: ListingProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {listing.images.map((image) => (
                  <Tab
                    key={image.url}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="sr-only">{image.tag}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            src={image.url}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          className={classNames(
                            selected ? "ring-indigo-500" : "ring-transparent",
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {listing.images.map((image) => (
                <Tab.Panel key={image.url}>
                  <img
                    src={image.url}
                    alt={image.tag}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {listing.marketingName}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${listing.pricing.minimumPrice} - $
                {listing.pricing.maximumPrice}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: listing.description }}
              />
            </div>

            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(pathname + "/book");
              }}
            >
              {/* Colors */}
              <div className="sm:px-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Lease Information
                </h2>
                <LeaseDurationSelect listing={listing} />
                <div className="pb-4">
                  <Dates listing={listing} />
                </div>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <Duration />
                  <UnitPrice listing={listing} />
                  <TotalPrice listing={listing} />
                </dl>
              </div>

              <div className="mt-10 flex">
                <LinkWithParams
                  href={`/${listing.id}/book`}
                  className="flex w-full flex-1 items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Book
                </LinkWithParams>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                <Disclosure as="div" key={"neighborhoodDescription"}>
                  {({ open }) => (
                    <>
                      <h3>
                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span
                            className={classNames(
                              open ? "text-gray-700" : "text-gray-900",
                              "text-sm font-medium"
                            )}
                          >
                            Neighborhood
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="block h-6 w-6 text-gray-900 group-hover:text-gray-800"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="block h-6 w-6 text-gray-900 group-hover:text-gray-800"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel
                        as="div"
                        className="prose prose-sm pb-6"
                      >
                        <p>{listing.neighborhoodDescription}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
