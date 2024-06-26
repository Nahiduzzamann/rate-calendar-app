import axios from "axios";

export const fetchRates = async (startDate: string, endDate: string) => {
    const response = await axios.get(
      `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
    );
    return response.data;
  };