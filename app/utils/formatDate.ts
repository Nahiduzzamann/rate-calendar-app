import { Dayjs } from "dayjs";
export const formatDate = (date: Dayjs | null) => {
    return date ? date.format("YYYY-MM-DD") : "";
  };