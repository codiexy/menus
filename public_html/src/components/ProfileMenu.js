import React, { useState } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { AccountCircleOutlined, ContactSupportOutlined, OpenInBrowserOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, MenuList, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';

import './ProfileMenu.css';
import { SiteButton } from "./miscellaneous";

const data = [
  { name: "Account Page", icon: <AccountCircleOutlined />, url: "/profile" },
  { name: "View Menu", icon: <OpenInBrowserOutlined />, url: "/hot-dog-kings/menu" },
  { name: "Help", icon: <ContactSupportOutlined />, url: "/subscribers" },

];

export default function ProfileMenu() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openList, setOpenList] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await logout();
      navigate('/login')
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message)
    }
  }

  const getList = () => (
    <div style={{ width: 350 }} onClick={() => setOpenList(false)}>
      {data.map((item, index) => (
        <ListItem button key={index} sx={{ mt: 2 }}>
          <Link className='drawerLink' to={`${item.url}`} style={{ display: "inline-flex" }} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </Link>
        </ListItem>
      ))}
    </div>
  );


  return (
    <>
      {
        user ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 0 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 50, height: 50 }}>
                  <img src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
                </Avatar>
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 50,
                    height: 50,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Avatar>
                  <img src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
                </Avatar>
                <MenuList>
                  <MenuItem>
                    <Typography variant='h5'>{user.displayName ? user.displayName : "No Name"}</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography variant='span' sx={{ mt: -2 }}>{user.email}</Typography>
                  </MenuItem>
                </MenuList>
              </MenuItem>
              <Divider />
              {getList()}
              <Divider />
              <MenuItem>
                <SiteButton
                  onClick={handleLogout}
                  sx={{
                    textTransform: 'none',
                    fontSize: '18px',
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Logout
                </SiteButton>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link to="/" className='login-btn'>Login</Link>
        )
      }
    </>
  );

}



