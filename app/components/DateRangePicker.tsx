"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RoomCategorySection from "./RoomCategorySection";

const fetchRates = async (startDate: string, endDate: string) => {
  const response = await axios.get(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
  );
  return response.data;
};

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data, error, isLoading } = useQuery(
    ["rateCalendar", startDate, endDate],
    () =>
      fetchRates(
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      ),
    {
      enabled: !!startDate && !!endDate,
    }
  );

  console.log(data);
  
  return (
    <div className="my-4">
      <div className="flex items-center">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          className="p-2 border rounded"
          placeholderText="Start Date"
        />
        <span className="mx-2">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date: any) => setEndDate(date)}
          selectsEnd
          className="p-2 border rounded"
          placeholderText="End Date"
        />
      </div>
      {isLoading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error fetching data</p>}
      {data && <RoomCategorySection data={data} />}
    </div>
  );
};

export default DateRangePicker;
