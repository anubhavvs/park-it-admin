import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import CustomerList from '../components/CustomerList';
import Loader from '../components/Loader';
import { listCustomer } from '../actions/customerActions';

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerList = useSelector((state) => state.customerList);
  const { loading: customerLoading, error: customerError, customers } = customerList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(listCustomer());
    } else {
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (customerError) {
      handleClick('error', customerError);
    }
  }, [customerError]);

  return (
    <>
      <Helmet>
        <title>Customers | Park It</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="xl">
          <Box>
            {customerLoading ? (
              <Loader loading={customerLoading} />
            ) : customerError ? null : (
              <CustomerList customers={customers.filter((obj) => obj.isAdmin !== true)} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Customer;
