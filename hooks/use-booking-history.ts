"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { createQueryString, queryStringToObject } from "./helpers.js";

type QueryParamsOptions<T> = {
  [key in keyof T]: T[key];
};

type QueryObject<T> = {
  [key in keyof T]: T[key];
};

export function useQueryParams<T extends QueryParamsOptions<T>>(options: T) {
  const searchParams = useSearchParams();

  // get query params
  const queryParams = useMemo<T>(
    () =>
      queryStringToObject(searchParams.toString() || undefined, options) as T,
    [options, searchParams]
  );

  // updates the query params
  function setQueryParams<T>(queryObj: QueryObject<T>): void {
    window.history.pushState(
      null,
      "",
      `${createQueryString(queryObj as Record<string, unknown>)}`
    );
  }

  return { queryParams, setQueryParams };
}
