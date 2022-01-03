import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Avatar } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetail } from '../actions/customerActions';
import Loader from '../components/Loader';

const User = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [url, setUrl] = useState('');

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  useEffect(() => {
    if (!customer.name || customer._id !== id) {
      dispatch(getCustomerDetail(id));
    } else {
      setUrl(
        `https://avatars.dicebear.com/api/avataaars/${
          customer.name.split(' ')[0]
        }.svg?background=%235664d2`
      );
    }
  }, [dispatch, customer, id]);

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          {loading ? (
            <Loader loading={loading} />
          ) : error ? null : (
            <Avatar src={url} sx={{ width: 70, height: 70 }} />
          )}
        </Container>
      </Box>
    </>
  );
};

export default User;
