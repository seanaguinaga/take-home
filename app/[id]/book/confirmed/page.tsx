import Link from "next/link";

import { Page } from "@/ui/page";

export default function Confirmed() {
  return (
    <Page>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Booking Confirmed
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              We are excited to have you stay with us.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
