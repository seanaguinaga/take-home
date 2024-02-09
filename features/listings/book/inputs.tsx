"use client";

import { ChangeEvent, ComponentProps, useState } from "react";
import { useFormStatus } from "react-dom";

import { useQueryParams } from "@/hooks/use-booking-history";

export function Input({
  name,
  label,
  ...props
}: ComponentProps<"input"> & { name: string; label: string }) {
  const { queryParams, setQueryParams } =
    useQueryParams<Record<string, string>>();

  const [value, setValue] = useState(queryParams[name] || "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQueryParams({ ...queryParams, ...{ [name]: value } });
    setValue(value);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={handleInputChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export function Select(
  props: ComponentProps<"select"> & { name: string; label: string }
) {
  const { queryParams, setQueryParams } =
    useQueryParams<Record<string, string>>();

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQueryParams({ ...queryParams, ...{ [name]: value } });
  };

  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1">
        <select
          {...props}
          value={queryParams[props.name]}
          onChange={handleInputChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    </div>
  );
}

export function SubmitButton() {
  const status = useFormStatus();

  //@ts-expect-error is okay
  const isSubmit = status.action?.name === "proxy";
  // Remix makes this kind of stuff a lot easier!

  return (
    <button
      disabled={status.pending && isSubmit}
      aria-disabled={status.pending && isSubmit}
      type="submit"
      className="w-full rounded-md border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 focus:ring-offset-gray-50"
    >
      {status.pending && isSubmit ? "Submitting..." : "Complete order"}
    </button>
  );
}
