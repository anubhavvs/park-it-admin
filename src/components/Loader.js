import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import PropTypes from 'prop-types';

const Loader = ({ loading }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool
};

Loader.defaultProps = {
  loading: false
};

export default Loader;
