"use client";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import RoomCategorySection from "./RoomCategorySection";
import { Box, Typography, CircularProgress } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const fetchRates = async (startDate: string, endDate: string) => {
  const response = await axios.get(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
  );
  return response.data;
};

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const { data, error, isLoading } = useQuery(
    ["rateCalendar", startDate, endDate],
    () =>
      fetchRates(
        startDate!.toISOString().split("T")[0],
        endDate!.toISOString().split("T")[0]
      ),
    {
      enabled: !!startDate && !!endDate,
    }
  );

  return (
    <Box my={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <Typography mx={2}>to</Typography>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {isLoading && <CircularProgress sx={{ mt: 10 }} />}
       
      </Box>
      {error && (
          <Typography color="error" mt={4}>
            Error fetching data
          </Typography>
        )}
      {data && <RoomCategorySection data={data} />}
    </Box>
  );
};

export default DateRangePicker;
