import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/app/customer');
    }
    if (error) {
      handleClick('error', error);
    }
  }, [userInfo, error]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Cannot be less than 6 charecters')
  });

  return (
    <>
      <Helmet>
        <title>Login | Park It</title>
      </Helmet>
      <Loader loading={loading} />
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
            onSubmit={(values) => {
              dispatch(login(values.email, values.password));
            }}
            validationSchema={validationSchema}
            initialValues={{ email: '', password: '' }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                  <Typography color="textPrimary" variant="h2">
                    Log In
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Log in with your email and password.
                  </Typography>
                </Box>
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
                  autoComplete="off"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Log in
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

export default Login;
