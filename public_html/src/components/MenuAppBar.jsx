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
import { Link, useLocation, useNavigate } from 'react-router-dom'
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Avatar, Divider, MenuList } from "@mui/material";

import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import { UserAuth } from '../context/AuthContext';
import { AssistantOutlined, AutoAwesomeOutlined, FoodBankOutlined, InfoOutlined } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 18,
  backgroundColor: '#e6e6e6',
  '&:hover': {
    backgroundColor: 'white',
    borderStyle: 'solid',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const data = [
  { name: "Menu", icon: <FoodBankOutlined />, url: "/hot-dog-kings/menu" },
  { name: "About Us", icon: <InfoOutlined />, url: "/hot-dog-kings/menu" },
  { name: "Guest Experiences", icon: <AutoAwesomeOutlined />, url: "/hot-dog-kings/guest-experience" },
  { name: "Dish Recommendations", icon: <AssistantOutlined />, url: "/hot-dog-kings/recommendations" },

];

export default function MenuAppBar() {
  const { user, logout, useLoginPopup } = UserAuth();
  const [loginPopupShow, setLoginPopupShow] = useLoginPopup();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getList = () => (
    <div style={{ width: 300 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index} sx={{ mt: 1 }}>
          <Link className='drawerLink' to={`${item.url}`} style={{ display: "inline-flex" }} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
            {item.chip}
          </Link>
        </ListItem>
      ))}
    </div>
  );


  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await logout();
      navigate('/hot-dog-kings/menu')
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleSignInClick = () => {
    if (!user) {
      setLoginPopupShow(true);
      return;
    }
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
                <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)} sx={{ width: "350px" }} >
                  <div className="drawCancel">
                    <Link to='/dashboard' style={{ width: "100%", marginLeft: 18, color: "#9c27b0", textDecoration: "none" }}><h3>Hot Dog Kings</h3></Link>
                    <IconButton onClick={handleClose}>
                      <CloseIcon sx={{ p: 1, fontSize: 30 }} color="secondary" />
                    </IconButton>
                  </div>
                  <Divider variant='middle' />
                  <div className="drawerProfileHeader">
                    <Avatar>
                      <img src={user?.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Menu…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {
            user ? (
              <Link to="/account" state={{
                location: location
              }} style={{ textDecoration: "none" }} color='secondary'>

                My Profile

              </Link>
            ) : (
              <>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <Button sx={{ mr: 1, fontSize: '13px' }} color="secondary" onClick={handleSignInClick}>Sign in</Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/signup">
                  <Button sx={{ fontSize: '11px', borderRadius: 4 }} variant='contained' color="secondary">Sign up</Button>
                </Link>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
