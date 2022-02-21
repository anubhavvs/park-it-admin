import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import moment from 'moment';
import {
  Avatar,
  Box,
  IconButton,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Switch
} from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const CustomerList = ({ customers, handleStatusChange, updatedCustomer, ...rest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const svgURl = 'https://avatars.dicebear.com/api/avataaars/';

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  if (updatedCustomer) {
    customers.forEach((customer) => {
      if (customer._id === updatedCustomer._id) {
        customer.activeBooking = updatedCustomer.activeBooking; // eslint-disable-line no-param-reassign
      }
    });
  }

  return (
    <Card {...rest}>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Plate</TableCell>
              <TableCell align="center">Registration date</TableCell>
              <TableCell align="center">Registration time</TableCell>
              <TableCell align="center">Active Booking</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : customers
            ).map((customer) => (
              <TableRow key={customer._id} hover>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Avatar src={`${svgURl}${customer.name.split(' ')[0]}.svg`} sx={{ mr: 2 }} />
                    {customer.name}
                  </Box>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.number}</TableCell>
                <TableCell>{customer.plate.toUpperCase()}</TableCell>
                <TableCell align="center">
                  {moment(customer.createdAt).format("Do MMM 'YY")}
                </TableCell>
                <TableCell align="center">{moment(customer.createdAt).format('hh:mm A')}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={customer.activeBooking}
                    onClick={() => handleStatusChange(customer._id)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={RouterLink}
                    to={`/app/customer/${customer._id}`}
                    size="small"
                  >
                    <ArrowForwardIosRoundedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        showFirstButton
        showLastButton
        rowsPerPageOptions={[2, 5, 9]}
      />
    </Card>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  handleStatusChange: PropTypes.func,
  updatedCustomer: PropTypes.any
};

export default CustomerList;
