"use client";
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar, Chip, Divider, MenuList, Tooltip } from "@mui/material";

import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';

import { AssistantOutlined, AutoAwesomeOutlined, FoodBankOutlined, HelpRounded, InfoOutlined, Person } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TenantLink from './miscellaneous/TenantLink';
import RestaurantName from './miscellaneous/RestaurantName';
import Image from 'next/image';
import ProfileNavbar from '@/components/user/ProfileNavbar';
import { useTenant } from '@/context/TenantContext';



const data = [
  { name: "Menu", icon: <FoodBankOutlined />, url: "/menu" },
  { name: "About Us", icon: <InfoOutlined />, url: "/about" },
  { name: "Guest Experiences", icon: <AutoAwesomeOutlined />, url: "/guestexperience" },
  { name: "Dish Recommendations", icon: <AssistantOutlined />, url: "/recommendation" },

];

export default function MenuAppBar() {
  const {tenantSlug} = useTenant()
  const { user, logout, setLoginPopupShow, setSnackbar } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const getList = () => (
    <div style={{ width: 400 }} onClick={() => setOpen(false)}>
      {data.map((item: any, index) => (
        <ListItem button key={index} sx={{ mt: 1 }}>
          <TenantLink className='drawerLink' href={`${item.url}`} style={{ display: "inline-flex" }} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
            {item.chip}
          </TenantLink>
        </ListItem>
      ))}
    </div>
  );


  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault()
    try {
      router.push(`${tenantSlug}/login`)
      await logout();
    } catch (error: any) {
      setSnackbar(false, error.message);
    }
  }

  const handleSignInClick = (event: any) => {
    event.preventDefault();
    if (!user) {
      setLoginPopupShow(true);
      return;
    }
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <TenantLink href='/menu'>
              <Image
                src={"https://res.cloudinary.com/nell1818/image/upload/v1697353582/mvLogo_uzkz5a.png"}
                height={40}
                width={200}
                alt="logo"
               />
            </TenantLink>
          </Typography>
          <Chip label="Beta" variant="outlined" size="small" sx={{ borderWidth: 2, borderColor: '#FF5A5F', p: .4, mr: 2, display: { xs: 'none', sm: 'block' }, color: '#FF5A5F' }} />
          {
            user && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={() => setOpen(true)}
                >
                  <NotesIcon />
                </IconButton>
                <Drawer 
                  open={open} 
                  anchor={"left"} 
                  onClose={() => setOpen(false)} 
                  className='user-drawer'
                  PaperProps={{
                    width: 100
                  }}
                >
                  <div className="drawCancel">
                    <TenantLink href='/dashboard' style={{ width: "100%", marginLeft: 18, color: "#9c27b0", textDecoration: "none" }}>
                      <h3><RestaurantName /></h3>
                    </TenantLink>
                    <IconButton onClick={handleClose}>
                      <CloseIcon sx={{ p: 1, fontSize: 30 }} color="secondary" />
                    </IconButton>
                  </div>
                  <Divider variant='middle' />
                  <div className="drawerProfileHeader">
                    <Avatar>
                      <Image
                          src={user?.photoURL ? user.photoURL : "/user-avatar.png"}
                          alt="User Profile Pic" 
                          height={50} 
                          width={50}
                       />
                    </Avatar>
                    <MenuList sx={{ ml: 2 }}>
                      <Typography variant='h5'>{user?.displayName ? user.displayName : "No Name"}</Typography>
                      <Typography variant='body2'>
                        {user && user.email}
                      </Typography>
                    </MenuList>
                  </div>
                  <Divider variant='middle' />
                  {getList()}
                  <Button variant='contained' color='secondary' sx={{ textTransform: 'none', fontSize: '18px', mt: 6, ml: 3, mr: 3 }} onClick={handleLogout}>
                    Logout
                  </Button>
                </Drawer>
              </>
            )
          }

          <Box sx={{ flexGrow: 1 }} />
          {
            user ? (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography
                  component="div"
                  sx={{
                    mr: 2
                  }}
                >
                  <Tooltip title='Help' placement="left">
                    <IconButton
                      // size="large"
                      edge="start"
                      color="secondary"
                      aria-label="Help"
                      sx={{ my: 2 }}
                    >
                      <HelpRounded sx={{ fontSize: 30, color: '#FF5A5F' }} />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <ProfileNavbar />
              </Box>
            ) : (
              <>
                <TenantLink href="/signup">
                  <Button sx={{ display: 'flex' }}> <Person /> Sign up</Button>
                </TenantLink>
                <Button sx={{ mr: 1, fontSize: '13px' }} color="secondary" onClick={handleSignInClick}>Sign in</Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
