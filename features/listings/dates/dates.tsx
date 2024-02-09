"use client";

import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

import { useQueryParams } from "@/hooks/use-booking-history";

const startOptions = {
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date(),
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
  minDate: new Date(new Date().setDate(new Date().getDate() + 1)),
} as const;

export const Dates = () => {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const { queryParams, setQueryParams } = useQueryParams({
    start: endOptions.minDate,
    end: endOptions.minDate,
  });

  const [dateRange, setDateRange] = useState({
    start: new Date(queryParams.start || startOptions.minDate),
    end: new Date(queryParams.end || endOptions.minDate),
  });

  const handleStartChange = (selectedDate: Date) => {
    setDateRange((prev) => {
      const newDateRange = {
        ...prev,
        end:
          selectedDate > prev.end
            ? new Date(new Date().setDate(selectedDate.getDate() + 1))
            : prev.end,
        start: selectedDate,
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
      const isValidEndDate = selectedDate >= startOptions.minDate;
      const endDate = isValidEndDate ? selectedDate : prev.end;
      const startDate =
        endDate < prev.start
          ? new Date(new Date().setDate(endDate.getDate() - 1))
          : prev.start;

      const newDateRange = { start: startDate, end: endDate };

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
          options={startOptions}
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
          options={endOptions}
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
