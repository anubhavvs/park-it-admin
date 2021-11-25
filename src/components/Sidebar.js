import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Avatar, Typography, Divider, List, Hidden, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import { DirectionsCar, Group, ManageAccounts, PersonAddAlt1 } from '@mui/icons-material';
import NavItem from './NavItem';

const user = {
  avatar: 'https://visualpharm.com/assets/314/Admin-595b40b65ba036ed117d36fe.svg',
  jobTitle: 'Admin',
  name: 'John Doe'
};

const items = [
  {
    href: '/app/customer',
    icon: Group,
    title: 'Customers'
  },
  {
    href: '/app/area',
    icon: DirectionsCar,
    title: 'Areas'
  },
  {
    href: '/app/account',
    icon: ManageAccounts,
    title: 'Account'
  },
  {
    href: '/app/register',
    icon: PersonAddAlt1,
    title: 'Register'
  }
];

const Sidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default Sidebar;
