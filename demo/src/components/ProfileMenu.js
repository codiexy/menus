import React, { useState } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, MenuList, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';

import './ProfileMenu.css';
import { SiteButton } from "./miscellaneous";


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
    } catch (e) {
      throw new Error(e.message)
    }
  }



  return (
    <>
      {
        user ? (
          <>
            <Box
              sx={{
                display: 'flex', alignItems: 'center', textAlign: 'center',
              }}

            >
              <Tooltip title={user.displayName}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 0 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 50, height: 50, borderColor: '#FF5A5F', borderWidth: 4 }}>
                    <img src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
                  </Avatar>
                </IconButton>
              </Tooltip>
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
                  borderRadius: 10,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  backgroundColor: 'whitesmoke',
                  '& .MuiAvatar-root': {
                    width: 80,
                    height: 80,

                  },

                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <MenuList>
                  <MenuItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', }}>
                    <Typography variant='h6' sx={{ mt: -2 }}>{user.email}</Typography>
                  </MenuItem>
                </MenuList>
              </MenuItem>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', }}>
                <Avatar>
                  <img src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
                </Avatar>
                <Typography variant='h5' sx={{ my: 2 }}>Hi, {user.displayName ? user.displayName : "No Name"}!</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4, }}>
                <Link to='/profile'>
                  <Button variant="outlined"
                    sx={{ borderBottomLeftRadius: 25, borderTopLeftRadius: 25, p: 2, mr: .1, color: '#FF5A5F', borderColor: '#FF5A5F', backgroundColor: 'white' }}
                  >
                    <Typography variant="p">go to account</Typography>
                  </Button>
                </Link>
                <Link to='/hot-dog-kings/menu'  >
                  <Button variant="outlined"
                    sx={{ borderBottomRightRadius: 25, borderTopRightRadius: 25, p: 2, ml: .1, color: '#FF5A5F', borderColor: '#FF5A5F', backgroundColor: 'white' }}
                  >

                    <Typography variant="p">view live menu</Typography>
                  </Button>
                </Link>
              </Box>
              <Divider />
              <MenuItem>
                <SiteButton onClick={handleLogout}
                  sx={{
                    textTransform: 'none',
                    fontSize: '18px',
                    width: "100%",
                    textAlign: "center",
                    mt: 1,
                    backgroundColor: '#4458BE',
                    color: 'white',
                    borderRadius: 3,
                    '&:hover': {
                      color: '#4458BE',
                      backgroundColor: '#fff',
                    },
                  }}>
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



