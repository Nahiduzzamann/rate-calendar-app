"use client";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useQuery } from "react-query";
import RoomCategorySection from "./RoomCategorySection";
import { Box, Typography, CircularProgress } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchRates } from "../utils/fetchRates";
import { formatDate } from "../utils/formatDate";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  // console.log("startDate",formatDate(startDate));

  const { data, error, isLoading } = useQuery(
    ["rateCalendar", formatDate(startDate), formatDate(endDate)],
    () => fetchRates(formatDate(startDate), formatDate(endDate)),
    {
      enabled: !!startDate && !!endDate,
    }
  );

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
    if (endDate && newValue && newValue.isAfter(endDate)) {
      setDateError(
        "Please enter a valid date range: Start date cannot be after End date."
      );
    } else {
      setDateError(null);
    }
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
    if (startDate && newValue && newValue.isBefore(startDate)) {
      setDateError(
        "Please enter a valid date range: End date cannot be before Start date."
      );
    } else {
      setDateError(null);
    }
  };
  return (
    <Box my={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <Typography mx={2}>to</Typography>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </LocalizationProvider>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        {isLoading && <CircularProgress sx={{ mt: 10 }} />}
        {dateError && (
          <Typography color="error" mb={2}>
            {dateError}
          </Typography>
        )}
        {!error || (
          <Typography color="error" mt={4}>
            Error fetching data
          </Typography>
        )}
      </Box>

      <RoomCategorySection data={data} />
    </Box>
  );
};

export default DateRangePicker;
