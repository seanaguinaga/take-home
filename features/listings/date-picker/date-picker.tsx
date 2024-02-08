"use client";

import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const startOptions = {
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date(),
  theme: {
    background: "bg-gray-100 ",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "line-through",
    input: "",
    inputIcon: "",
    selected: "",
  },
  language: "en",
  inputNameProp: "start-date",
  inputIdProp: "start-date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
} as const;

const endOptions = {
  ...startOptions,
  minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  inputNameProp: "end-date",
  inputIdProp: "end-date",
} as const;

export const Dates = () => {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const [searchParams, setSearchParams] = useSyncSearchParams({
    booking: {
      ...dateRange,
    },
  });

  useEffect(() => {
    setSearchParams({
      booking: {
        ...dateRange,
      },
    });
  }, [dateRange]);

  console.log(searchParams);

  const handleStartChange = (selectedDate: Date) => {
    setDateRange((prev) => ({
      ...prev,
      end:
        selectedDate > prev.end
          ? new Date(new Date().setDate(selectedDate.getDate() + 1))
          : prev.end,
      start: selectedDate,
    }));
  };
  const handleEndChange = (selectedDate: Date) => {
    setDateRange((prev) => {
      const isValidEndDate = selectedDate >= startOptions.minDate;
      const endDate = isValidEndDate ? selectedDate : prev.end;
      const startDate =
        endDate < prev.start
          ? new Date(new Date().setDate(endDate.getDate() - 1))
          : prev.start;
      return { start: startDate, end: endDate };
    });
  };

  const handleStartClose = (state: boolean) => setShowStart(state);
  const handleEndClose = (state: boolean) => setShowEnd(state);

  return (
    <div className="flex items-center" date-rangepicker>
      <div className="relative">
        <Datepicker
          options={startOptions}
          onChange={handleStartChange}
          show={showStart}
          setShow={handleStartClose}
          value={dateRange.start}
          selectedDateState={[dateRange.start, () => {}]}
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      <div className="relative">
        <Datepicker
          options={endOptions}
          onChange={handleEndChange}
          show={showEnd}
          setShow={handleEndClose}
          value={dateRange.end}
          selectedDateState={[dateRange.end, () => {}]}
        />
      </div>
    </div>
  );
};

// hooks/useSyncSearchParams.ts
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * A hook that synchronizes an object with URL search parameters.
 * @param initialParams The initial object to synchronize with the URL search parameters.
 */
export function useSyncSearchParams<T extends Record<string, any>>(
  initialParams: T
): [T, (newParams: Partial<T>) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [params, setParams] = useState<T>(() => {
    // Initialize state from URL search parameters or use initialParams
    const initialFromUrl: Partial<T> = {};
    Object.keys(initialParams).forEach((key) => {
      const value = searchParams.get(key);
      initialFromUrl[key as keyof T] = value
        ? decodeURIComponent(value)
        : initialParams[key];
    });
    return { ...initialParams, ...initialFromUrl } as T;
  });

  // Update URL search parameters when params state changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newSearchParams.set(key, encodeURIComponent(value.toString()));
      }
    });
    router.push(pathname + "?" + newSearchParams.toString());
  }, [params, pathname, router]);

  // Function to update params state
  const updateParams = (newParams: Partial<T>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  return [params, updateParams];
}
