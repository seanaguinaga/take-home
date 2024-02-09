"use client";

import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

import { Listing } from "../data";

import { useQueryParams } from "@/hooks/use-booking-history";

const startOptions = {
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),

  theme: {
    background: "",
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
  inputNameProp: "start",
  inputIdProp: "start",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "short",
    year: "numeric",
  },
} as const;

const endOptions = {
  ...startOptions,
  inputNameProp: "end",
  inputIdProp: "end",
} as const;

interface DatesProps {
  listing: Listing;
}

function makeDate(date: string) {
  // Going down the UTC rabbit hole seems out of scope for a takehome? I'll stop here.
  const [year, month, day] = date.split("-").map((num) => parseInt(num, 10));
  return new Date(year, month - 1, day);
}

export const Dates = ({ listing }: DatesProps) => {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const { queryParams, setQueryParams } = useQueryParams({
    start: undefined,
    end: undefined,
  });

  const minimumStartDate = makeDate(listing.availableDate);

  const minimumEndDate = makeDate(listing.availableDate);
  minimumEndDate.setMonth(
    minimumEndDate.getMonth() + listing.pricing.minimumStay
  );

  const [dateRange, setDateRange] = useState({
    start: queryParams.start ? new Date(queryParams.start) : minimumStartDate,
    end: new Date(queryParams.end || minimumEndDate),
  });

  const handleStartChange = (selectedDate: Date) => {
    setDateRange((prev) => {
      // Calculate the minimum end date based on the new start date and minimum stay
      const minEndDate = new Date(selectedDate);
      minEndDate.setMonth(minEndDate.getMonth() + listing.pricing.minimumStay);

      // Ensure the end date is at least the minimum stay away from the start date
      const newEndDate = prev.end < minEndDate ? minEndDate : prev.end;

      const newDateRange = {
        start: selectedDate,
        end: newEndDate,
      };

      setQueryParams({
        ...queryParams,
        ...newDateRange,
      });

      return newDateRange;
    });
  };

  const handleEndChange = (selectedDate: Date) => {
    setDateRange((prev) => {
      // Ensure the selected end date is not before the start date
      const newEndDate = selectedDate >= prev.start ? selectedDate : prev.end;

      let newStartDate = new Date(selectedDate);
      newStartDate.setMonth(newStartDate.getMonth() - 3);

      if (newStartDate < minimumStartDate) {
        // Just in case html is changed
        newStartDate = minimumStartDate;
      }

      const newDateRange = {
        start: newStartDate,
        end: newEndDate,
      };

      setQueryParams({
        ...queryParams,
        ...newDateRange,
      });

      return newDateRange;
    });
  };

  const handleStartClose = (state: boolean) => setShowStart(state);
  const handleEndClose = (state: boolean) => setShowEnd(state);

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-full">
        <Datepicker
          options={{
            ...startOptions,
            minDate: minimumStartDate,
          }}
          onChange={handleStartChange}
          show={showStart}
          setShow={handleStartClose}
          value={new Date(dateRange.start)}
          selectedDateState={[
            dateRange.start,
            (date) => {
              new Date(date);
            },
          ]}
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      <div className="relative w-full">
        {
          // not sure how to make this not go off the screen in mobile?
        }
        <Datepicker
          options={{
            ...endOptions,
            minDate: minimumEndDate,
          }}
          onChange={handleEndChange}
          show={showEnd}
          setShow={handleEndClose}
          value={new Date(dateRange.end)}
          selectedDateState={[
            dateRange.end,
            (date) => {
              new Date(date);
            },
          ]}
        />
      </div>
    </div>
  );
};
