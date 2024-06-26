"use client";
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const RoomCategorySection: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Box>
      {data ? (
        data?.data.map((roomCategory: any) => (
          <Box key={roomCategory.id} my={4}>
            <Typography variant="h6">{roomCategory.name}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Available Rooms</TableCell>
                    <TableCell>Booked Rooms</TableCell>
                    <TableCell>Occupancy</TableCell>
                    <TableCell>Rate Plan</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Min Length of Stay</TableCell>
                    <TableCell>Reservation Deadline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomCategory.inventory_calendar.map((inventory: any) => (
                    <React.Fragment key={inventory.id}>
                      {roomCategory.rate_plans.map(
                        (ratePlan: any, index: number) => {
                          const rate = ratePlan.calendar.find(
                            (rate: any) => rate.date === inventory.date
                          );
                          return (
                            <TableRow key={`${inventory.id}-${ratePlan.id}`}>
                              {index === 0 && (
                                <>
                                  <TableCell
                                    rowSpan={roomCategory.rate_plans.length}
                                  >
                                    {new Date(
                                      inventory.date
                                    ).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell
                                    rowSpan={roomCategory.rate_plans.length}
                                  >
                                    {inventory.status
                                      ? "Sellable"
                                      : "Not Sellable"}
                                  </TableCell>
                                  <TableCell
                                    rowSpan={roomCategory.rate_plans.length}
                                  >
                                    {inventory.available}
                                  </TableCell>
                                  <TableCell
                                    rowSpan={roomCategory.rate_plans.length}
                                  >
                                    {inventory.booked}
                                  </TableCell>
                                  <TableCell
                                    rowSpan={roomCategory.rate_plans.length}
                                  >
                                    {roomCategory.occupancy}
                                  </TableCell>
                                </>
                              )}
                              <TableCell>{ratePlan.name}</TableCell>
                              <TableCell>{rate ? rate.rate : "N/A"}</TableCell>
                              <TableCell>
                                {rate ? rate.min_length_of_stay : "N/A"}
                              </TableCell>
                              <TableCell>
                                {rate ? rate.reservation_deadline : "N/A"}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Available Rooms</TableCell>
              <TableCell>Booked Rooms</TableCell>
              <TableCell>Occupancy</TableCell>
              <TableCell>Rate Plan</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Min Length of Stay</TableCell>
              <TableCell>Reservation Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>N/A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default RoomCategorySection;
