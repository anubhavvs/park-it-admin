import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container, Typography, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import Loader from '../components/Loader';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userCreate = useSelector((state) => state.userRegister);
  const {
    success: successUserCreate,
    error: errorUserCreate,
    loading: loadingUserCreate
  } = userCreate;

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { replace: true });
    }
    if (successUserCreate) {
      handleClick('success', 'Admin User created.');
      dispatch({ type: USER_REGISTER_RESET });
    }
    if (errorUserCreate) {
      handleClick('error', errorUserCreate);
      dispatch({ type: USER_REGISTER_RESET });
    }
    if (error) {
      handleClick('error', error);
    }
  }, [userInfo, userCreate, error]);

  const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Must be a valid number')
      .required('Phone is required'),
    password: Yup.string().min(8, 'Password too short').required('Password is required')
  });

  return (
    <>
      <Helmet>
        <title>Register | Park It</title>
      </Helmet>
      <Loader loading={loadingUserCreate || loading} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            onSubmit={(values, { resetForm }) => {
              dispatch(register(values.name, values.email, values.phone, values.password));
              resetForm();
            }}
            validationSchema={schema}
            initialValues={{
              name: '',
              email: '',
              phone: '',
              password: ''
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Create new admin
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Use email and phone to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Phone Number"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.phone}
                  variant="outlined"
                  autoComplete="off"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={loadingUserCreate}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Register
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
