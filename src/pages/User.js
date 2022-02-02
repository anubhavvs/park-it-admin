import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Avatar, Typography, Stack, Grid, Button, TextField } from '@mui/material';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, Close, Done, ArrowBack } from '@mui/icons-material';
import { getCustomerDetail } from '../actions/customerActions';
import Loader from '../components/Loader';

const Item = ({ data, editToggle }) => {
  return editToggle ? (
    <Box sx={{ padding: '0.5rem 0 0.5rem 2rem', borderBottom: '1px solid black' }}>
      <TextField value={data} size="small" sx={{ width: '70%' }} />
    </Box>
  ) : (
    <Box sx={{ padding: '1rem 0 1rem 2rem', borderBottom: '1px solid black' }}>
      <Typography>{data}</Typography>
    </Box>
  );
};

Item.propTypes = {
  data: PropTypes.any,
  editToggle: PropTypes.bool
};

Item.defaultProps = {
  editToggle: false
};

const User = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [url, setUrl] = useState('');

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const [editToggle, setEditToggle] = useState(false);

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
          py: 10
        }}
      >
        <Container maxWidth="lg">
          {loading ? (
            <Loader loading={loading} />
          ) : error ? null : (
            <Container maxWidth="md">
              <Box>
                <Button component={Link} to="/app/customer" startIcon={<ArrowBack />}>
                  Customers
                </Button>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={4}
                sx={{ padding: '2rem 0' }}
              >
                <Avatar src={url} sx={{ width: 70, height: 70 }} />
                <Box>
                  <Typography variant="h2">{customer.name}</Typography>
                  <Typography variant="h6">
                    user_id:{' '}
                    <span
                      style={{
                        backgroundColor: '#5664d2',
                        color: 'white',
                        padding: '0.25rem',
                        borderRadius: '0.5rem'
                      }}
                    >
                      {customer._id}
                    </span>
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="column" sx={{ borderRadius: '0.75rem' }} maxWidth="sm">
                <Typography variant="h3" sx={{ padding: '2rem', borderBottom: '1px solid black' }}>
                  Basic Details
                </Typography>
                <Grid container>
                  <Grid item xs={3}>
                    <Item data="Name" />
                  </Grid>
                  <Grid item xs={9}>
                    <Item data={customer.name} editToggle={editToggle} />
                  </Grid>
                  <Grid item xs={3}>
                    <Item data="Email" />
                  </Grid>
                  <Grid item xs={9}>
                    <Item data={customer.email} editToggle={editToggle} />
                  </Grid>
                  <Grid item xs={3}>
                    <Item data="Number" />
                  </Grid>
                  <Grid item xs={9}>
                    <Item data={customer.number} editToggle={editToggle} />
                  </Grid>
                  <Grid item xs={3}>
                    <Item data="Plate" />
                  </Grid>
                  <Grid item xs={9}>
                    <Item data={customer.plate} editToggle={editToggle} />
                  </Grid>
                </Grid>
              </Stack>
              <Stack direction="row" sx={{ padding: '4rem 1rem' }} spacing={4}>
                {editToggle ? (
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Done />}
                    onClick={() => setEditToggle(true)}
                    color="success"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Edit />}
                    onClick={() => setEditToggle(true)}
                  >
                    Edit
                  </Button>
                )}

                {editToggle ? (
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Close />}
                    onClick={() => setEditToggle(false)}
                    color="error"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button variant="outlined" size="large" color="error" startIcon={<Delete />}>
                    Delete
                  </Button>
                )}
              </Stack>
            </Container>
          )}
        </Container>
      </Box>
    </>
  );
};

export default User;
