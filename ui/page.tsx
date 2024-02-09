"use client";

import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface PageProps {
  title?: string;
  previous?: string;
}

export function Page({
  children,
  title,
  previous,
}: PropsWithChildren<PageProps>) {
  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {previous && (
              <Link
                href={previous}
                type="button"
                className="rounded-full bg-white p-2 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
            )}
          </div>
        </header>
      </div>
      <main className="-mt-32">{children}</main>
    </div>
  );
}
