import { Box } from "@mui/material";
import DateRangePicker from "./components/DateRangePicker";

export default function Home() {
  return (
    <Box my={4} mx={4}>
      <DateRangePicker />
    </Box>
  );
}
