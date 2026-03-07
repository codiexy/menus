import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, MenuList, Tooltip, Typography } from '@mui/material';

import { useAuth } from '@/context/AuthContext';
import TenantLink from '@/components/miscellaneous/TenantLink';


import '../ProfileMenu.css';
import { SiteButton } from '@/components/miscellaneous';
import Image from 'next/image';
import { useTenant } from '@/context/TenantContext';

export default function ProfileNavbar() {
  const {tenantSlug} = useTenant()
  const { user, logout, setSnackbar } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter()

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e: any) => {
    try {
      router.push(`/${tenantSlug}/login`)
      await logout();
    } catch (error: any) {
      setSnackbar(false, error.message);
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
                    <Image src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
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
                  <Image src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={80} width={80} />
                </Avatar>
                <Typography variant='h5' sx={{ my: 2 }}>Hi, {user.displayName ? user.displayName : "No Name"}!</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4, }}>
                <TenantLink href='/account'>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "25px 0px 0px 25px !important",
                      p: 2,
                      mr: .1,
                      color: '#FF5A5F',
                      borderColor: '#FF5A5F',
                      backgroundColor: 'white',
                      textTransform: "uppercase"
                    }}
                  >
                    <Typography component="p">GO TO ACCOUNT</Typography>
                  </Button>
                </TenantLink>
                <TenantLink
                  href='/menu'
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "0px 25px 25px 0px !important",
                      p: 2,
                      ml: .1,
                      color: '#FF5A5F',
                      borderColor: '#FF5A5F',
                      backgroundColor: 'white',
                      textTransform: "uppercase"
                    }}
                  >
                    <Typography component="p">VIEW LIVE MENU</Typography>
                  </Button>
                </TenantLink>
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
          <TenantLink href="/login" className='login-btn'>Login</TenantLink>
        )
      }
    </>
  );

}



