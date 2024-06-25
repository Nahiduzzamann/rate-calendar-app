'use client'
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RoomCategorySection: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Box>
      {data.data?.map((roomCategory: any) => (
        <Box key={roomCategory.id} my={4}>
          <Typography variant="h6">{roomCategory.name}</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
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
                  <TableRow key={inventory.id}>
                    <TableCell>{inventory.status ? 'Sellable' : 'Not Sellable'}</TableCell>
                    <TableCell>{inventory.available}</TableCell>
                    <TableCell>{inventory.booked}</TableCell>
                    <TableCell>{roomCategory.occupancy}</TableCell>
                    {roomCategory.rate_plans.map((ratePlan: any) => (
                      <TableRow key={ratePlan.id}>
                        <TableCell>{ratePlan.name}</TableCell>
                        <TableCell>{ratePlan.calendar[0].rate}</TableCell>
                        <TableCell>{ratePlan.calendar[0].min_length_of_stay}</TableCell>
                        <TableCell>{ratePlan.calendar[0].reservation_deadline}</TableCell>
                      </TableRow>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

export default RoomCategorySection;
