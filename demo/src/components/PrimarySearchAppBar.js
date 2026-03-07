
import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom'
import { Divider, Tooltip } from "@mui/material";
import ProfileMenu from './ProfileMenu';
import { UserAuth } from "../context/AuthContext";
import NotificationsBell from "./miscellaneous/NotificationsBell";
import { ArrowBackIosRounded, ArrowForwardIosRounded, ColorLensRounded, DashboardCustomizeRounded, FeedbackRounded, GroupsRounded, HelpRounded, LocalOfferRounded, PermMediaRounded, QrCode2Rounded } from "@mui/icons-material";

const data = [
  { name: "Dashboard", icon: <DashboardCustomizeRounded />, url: "/dashboard", title: 'Home' },
  { name: "Foodies", icon: <GroupsRounded />, url: "/subscribers", title: 'View foodies' },
  { name: "Color Pallet", icon: <ColorLensRounded />, url: "/color-pallet", title: 'Adjust menu color pallet' },
  { name: "QR Code", icon: <QrCode2Rounded />, url: "/getqrcode", title:'QR Code'},
  { name: "Analytics", icon: <EqualizerRoundedIcon />, url: "/analytics", title: 'View analytics' },
  { name: "Offers", icon: <LocalOfferRounded />, url: "/create-offers", title: 'Create and edit offers' },
  { name: "Media", icon: <PermMediaRounded />, url: "/media-library", title: 'View all photos' },
  { name: "Feedback", icon: <FeedbackRounded />, url: "/feedback", title: 'View customer feedback' },
];





export default function PrimarySearchAppBar() {
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 270, height: 740 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index} sx={{ mt: -1 }}>
          <Tooltip title={item.title} placement="right">
          <Link className='drawerLink' to={`${item.url}`} style={{ display: "inline-flex" }} >
            <ListItemIcon sx={{ color: '#FF5A5F' }} >{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.name}
              sx={{ ml: -2, }}
            />
          </Link>
          </Tooltip>
        </ListItem>
      ))}
    </div>
  );


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2, }}>
      <AppBar position="static" color="default"  >
        <Toolbar>
          <Tooltip title='Open menu'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, fontSize: 30 }}
              onClick={() => setOpen(true)}
            >
              <ArrowForwardIosRounded />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to='/dashboard'>
              <img
                src="https://res.cloudinary.com/nell1818/image/upload/v1697353582/mvLogo_uzkz5a.png"
                height={40}
                alt="logo"
              />
            </Link>
          </Typography>
          <Chip label="Beta" variant="outlined" size="small" sx={{ borderWidth: 2, borderColor: '#FF5A5F', p: .4, display: { xs: 'none', sm: 'block' }, color: '#FF5A5F' }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title='Help' placement="left">
              <IconButton aria-label="Help">
                <HelpRounded sx={{ fontSize: 30, color: '#FF5A5F' }} />
              </IconButton>
            </Tooltip>
            <NotificationsBell />
            <ProfileMenu />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Tooltip title='Help' >
              <IconButton aria-label="Help">
                <HelpRounded sx={{ fontSize: 30, color: '#FF5A5F' }} />
              </IconButton>
            </Tooltip>
            <NotificationsBell />
            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor={"left"}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundImage: 'url(/drawerBg.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            elevation: 8,
            color: 'white'
          },
          style: { fontColor: 'white' }
        }}
        color="white"
        sx={{ width: { md: "270px", xs: "150" } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* <HomeRounded style={{ fontSize: '30px' }} sx={{ ml:1, mt:2 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: 'block' } }}
          >
            <Link to='/dashboard' >
              <Box sx={{ mt: 2, ml: 2 }}>
                <img
                  src="https://res.cloudinary.com/nell1818/image/upload/v1697353582/mvLogo_uzkz5a.png"
                  height={30}
                  alt="logo"
                />
              </Box>
            </Link>
          </Typography>
          <IconButton onClick={handleClose}>
            <ArrowBackIosRounded sx={{ p: 1, fontSize: 30 }} style={{ color: 'white' }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {getList()}
      </Drawer>
    </Box >
  );
}



