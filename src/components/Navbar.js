import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Box, IconButton, Hidden } from '@mui/material';
import { MenuOutlined, LogoutOutlined, Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Logo from './Logo';
import { logout } from '../actions/userActions';

const Navbar = ({ onMobileNavOpen, isMobileNavOpen, ...rest }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar sx={{ height: 64 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        {userInfo ? (
          <>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              onClick={() => {
                dispatch(logout());
              }}
            >
              <LogoutOutlined />
            </IconButton>
            <Hidden lgUp>
              <IconButton onClick={onMobileNavOpen}>
                {isMobileNavOpen ? <Close /> : <MenuOutlined />}
              </IconButton>
            </Hidden>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  isMobileNavOpen: PropTypes.bool,
  onMobileNavOpen: PropTypes.func
};

export default Navbar;
