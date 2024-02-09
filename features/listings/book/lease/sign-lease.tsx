"use client";

import { useState, useTransition } from "react";

import { signLease } from "@/actions/sign-lease";

export function Lease() {
  const [transition, startTransition] = useTransition();

  const [data, setData] = useState<{ id: string }>();

  function formAction(formData: FormData) {
    if (transition) return;
    if (!formData.get("signature")) return;
    startTransition(async () => {
      setData(await signLease(formData));
    });
  }

  return data ? (
    <div className="pb-2">
      <div className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white hover:bg-gray-800">
        <p>Lease signed</p>
        <input type="hidden" name="leaseId" value={data.id} required />
      </div>
    </div>
  ) : (
    <>
      <div>
        <label
          htmlFor="signature"
          className="block text-sm font-medium text-gray-700"
        >
          Signature
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="signature"
            id="signature"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="py-2">
        <button
          aria-disabled={transition}
          formAction={formAction}
          className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          {transition ? "Signing Lease" : "Sign Lease"}
        </button>
      </div>
    </>
  );
}