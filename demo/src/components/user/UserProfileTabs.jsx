import * as React from 'react';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Grid, Box, Divider, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge, Typography } from '@mui/material';

import { AccountCircleRounded, FavoriteBorderRounded, LocalActivityRounded, LocalOfferRounded} from '@mui/icons-material';

import { UserAuth } from '../../context/AuthContext';
import { SiteButton } from '../miscellaneous';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#fff',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function VerticalTabs() {
  const { logout, user } = UserAuth();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const handleRedirectTo = (event, url = "") => {
    event.preventDefault();
    navigate(url, { state });
  }

  const handleSignOut = async (event) => {
    event.preventDefault();
    await logout();
    navigate('/hot-dog-kings/menu');
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} className="left-space">
          <div className='profile-box'>
            <div className='image-box'>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar sx={{ width: "150px", height: "150px" }}>
                  <img src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={"150px"} width={"150px"} />
                </Avatar>
              </StyledBadge>
            </div>
            <p className='profile-name'>Hi, {user.name}</p>
            <Typography variant='span' sx={{ my: 1 }}>@{user.username}</Typography>
            <p>Member since {moment(user.createdAt.toDate()).format("Do MMM, YYYY")}</p>
          </div>
          <Divider />

          <List sx={{ width: "100%", mt: 0, pt: 0 }}>
            <ListItem
              disablePadding
              onClick={(e) => handleRedirectTo(e, '/account')}
              className={`${pathname === "/account" ? 'active-account-list' : ""}`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteBorderRounded />
                </ListItemIcon>
                <ListItemText primary="My Favorites" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              disablePadding
              onClick={(e) => handleRedirectTo(e, '/account/my-info')}
              className={`${pathname === "/account/my-info" ? 'active-account-list' : ""}`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleRounded />
                </ListItemIcon>
                <ListItemText primary="My Info" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              disablePadding
              onClick={(e) => handleRedirectTo(e, '/account/activity')}
              className={`${pathname === "/account/activity" ? 'active-account-list' : ""}`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LocalActivityRounded/>
                </ListItemIcon>
                <ListItemText primary="Activity" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              disablePadding
              onClick={(e) => handleRedirectTo(e, '/account/offers')}
              className={`${pathname === "/account/offers" ? 'active-account-list' : ""}`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LocalOfferRounded/>
                </ListItemIcon>
                <ListItemText primary="Offers" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              disablePadding
              onClick={handleSignOut}
            >
              <SiteButton sx={{ width: 200, mt:2, mx: 1,  }}>
                <Typography textAlign='center'>Sign out</Typography>
              </SiteButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={10} sx={{ display: "inline-block", paddingTop: "0px !important" }}>
          <Box sx={{ flexGrow: 1, justifyContent: "center", position: 'relative', px: 3, pb: 2 }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
