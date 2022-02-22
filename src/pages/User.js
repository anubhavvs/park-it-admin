import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Avatar,
  Typography,
  Stack,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, Edit, Close, Done, ArrowBack } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { getCustomerDetail, updateCustomer, deleteCustomer } from '../actions/customerActions';
import Loader from '../components/Loader';
import { CUSTOMER_UPDATE_RESET, CUSTOMER_DELETE_RESET } from '../constants/customerConstants';

const Item = ({ data }) => {
  return (
    <Box sx={{ padding: '1rem 0 1rem 2rem' }}>
      <Typography>{data}</Typography>
    </Box>
  );
};

Item.propTypes = {
  data: PropTypes.any
};

const useStyles = makeStyles(() => ({
  inputRoot: {
    '& input.Mui-disabled': {
      WebkitTextFillColor: 'black'
    }
  }
}));

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const classes = useStyles();

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const { error: updateError, success } = customerUpdate;

  const customerDelete = useSelector((state) => state.customerDelete);
  const { success: deleteSuccess, error: deleteError } = customerDelete;

  const [editToggle, setEditToggle] = useState(false);
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (!customer.name || customer._id !== id || success) {
      dispatch(getCustomerDetail(id));
    } else {
      setUrl(
        `https://avatars.dicebear.com/api/avataaars/${
          customer.name.split(' ')[0]
        }.svg?background=%235664d2`
      );
    }
  }, [dispatch, customer, id, success]);

  useEffect(() => {
    if (error) {
      handleClick('error', error);
    }
    if (updateError) {
      handleClick('error', error);
      dispatch({ type: CUSTOMER_UPDATE_RESET });
    } else if (success) {
      handleClick('success', 'User details updated.');
      dispatch({ type: CUSTOMER_UPDATE_RESET });
    }
  }, [error, updateError, success]);

  useEffect(() => {
    if (deleteSuccess) {
      handleClick('success', 'User data deleted.');
      navigate('/app/customer');
      dispatch({ type: CUSTOMER_DELETE_RESET });
    } else if (deleteError) {
      handleClick('error', deleteError);
    }
  }, [deleteError, deleteSuccess]);

  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Must be a valid email'),
    name: Yup.string().required('Name is required'),
    number: Yup.string()
      .required('Phone is required')
      .matches(/^[6-9]\d{9}$/, 'Must be a valid number'),
    plate: Yup.string().required('Plate is required')
  });

  const deleteHandler = () => {
    dispatch(deleteCustomer(id));
  };

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
              <Formik
                onSubmit={(values) => {
                  dispatch(
                    updateCustomer({
                      _id: id,
                      name: values.name,
                      email: values.email,
                      number: values.number,
                      plate: values.plate
                    })
                  );
                  setEditToggle(false);
                }}
                validationSchema={schema}
                initialValues={{
                  name: customer.name,
                  email: customer.email,
                  number: customer.number,
                  plate: customer.plate
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                  resetForm,
                  dirty,
                  isValid
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack direction="column" sx={{ borderRadius: '0.75rem' }} maxWidth="sm">
                      <Typography variant="h3" sx={{ padding: '2rem' }}>
                        Basic Details
                      </Typography>
                      <Grid container>
                        <Grid item xs={3}>
                          <Item data="Name" />
                        </Grid>
                        <Grid item xs={9}>
                          <Box
                            sx={{
                              padding: '0.5rem 0 0.5rem 2rem'
                            }}
                          >
                            <TextField
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                              name="name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name}
                              variant="outlined"
                              autoComplete="off"
                              size="small"
                              sx={{ width: '70%' }}
                              InputProps={{
                                readOnly: !editToggle,
                                disabled: !editToggle,
                                classes: {
                                  root: classes.inputRoot
                                }
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Item data="Email" />
                        </Grid>
                        <Grid item xs={9}>
                          <Box
                            sx={{
                              padding: '0.5rem 0 0.5rem 2rem'
                            }}
                          >
                            <TextField
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              variant="outlined"
                              autoComplete="off"
                              size="small"
                              sx={{ width: '70%' }}
                              InputProps={{
                                readOnly: !editToggle,
                                disabled: !editToggle,
                                classes: {
                                  root: classes.inputRoot
                                }
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Item data="Number" />
                        </Grid>
                        <Grid item xs={9}>
                          <Box
                            sx={{
                              padding: '0.5rem 0 0.5rem 2rem'
                            }}
                          >
                            <TextField
                              error={Boolean(touched.number && errors.number)}
                              helperText={touched.number && errors.number}
                              name="number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.number}
                              variant="outlined"
                              autoComplete="off"
                              size="small"
                              sx={{ width: '70%' }}
                              InputProps={{
                                readOnly: !editToggle,
                                disabled: !editToggle,
                                classes: {
                                  root: classes.inputRoot
                                }
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Item data="Plate" />
                        </Grid>
                        <Grid item xs={9}>
                          <Box
                            sx={{
                              padding: '0.5rem 0 0.5rem 2rem'
                            }}
                          >
                            <TextField
                              error={Boolean(touched.plate && errors.plate)}
                              helperText={touched.plate && errors.plate}
                              name="plate"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.plate && values.plate.toUpperCase()}
                              variant="outlined"
                              autoComplete="off"
                              size="small"
                              sx={{ width: '70%' }}
                              InputProps={{
                                readOnly: !editToggle,
                                disabled: !editToggle,
                                classes: {
                                  root: classes.inputRoot
                                }
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                    <Stack direction="row" sx={{ padding: '4rem 1rem' }} spacing={4}>
                      {editToggle && (
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<Done />}
                          color="success"
                          type="submit"
                          disabled={!dirty || !isValid}
                        >
                          Save
                        </Button>
                      )}

                      {!editToggle && (
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
                          onClick={() => {
                            setEditToggle(false);
                            resetForm();
                          }}
                          color="error"
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          size="large"
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => setDeleteDialogToggle(true)}
                        >
                          Delete
                        </Button>
                      )}
                    </Stack>
                  </form>
                )}
              </Formik>
            </Container>
          )}
        </Container>
      </Box>
      <Dialog
        open={deleteDialogToggle}
        onClose={() => setDeleteDialogToggle(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: '20px' }}>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All the data will be removed from the database permanently for this user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogToggle(false)}>Cancel</Button>
          <Button onClick={() => deleteHandler()} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;
