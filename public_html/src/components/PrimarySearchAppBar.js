
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
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom'
import { Avatar, Divider, MenuList } from "@mui/material";

import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

import ProfileMenu from './ProfileMenu';
import { UserAuth } from "../context/AuthContext";
import NotificationsBell from "./NotificationsBell";
import { ColorLensOutlined, QrCode2Rounded, SettingsOutlined } from "@mui/icons-material";

const data = [
  { name: "Dashboard", icon: <DashboardCustomizeOutlinedIcon />, url: "/dashboard" },
  { name: "Subscribers", icon: <GroupsOutlinedIcon />, url: "/subscribers" },
  { name: "Color Pallet", icon: <ColorLensOutlined />, url: "/color-pallet" },
  { name: "Analytics", icon: <EqualizerRoundedIcon />, url: "/analytics", chip: <Chip label="Coming Soon" variant="outlined" color="success" size="small" sx={{ ml: 1 }} /> },

];



export default function PrimarySearchAppBar() {
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 350 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index} sx={{ mt: 2 }}>
          <Link className='drawerLink' to={`${item.url}`} style={{ display: "inline-flex" }} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} sx={{ ml: -2 }} />
            {item.chip}

          </Link>
        </ListItem>
      ))}
    </div>
  );


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to='/dashboard'>
              <img
                src="https://res.cloudinary.com/nell1818/image/upload/v1678603710/MENUUI_6_o6upjt.png"
                height={40}
                alt="logo"
              />
            </Link>
          </Typography>
          <Chip label="BETA" variant="outlined" color="success" size="small" sx={{ borderWidth: 2, ml: 1 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NotificationsBell />
            <ProfileMenu />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <NotificationsBell />
            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)} sx={{ width: "370px" }} >
        <div className="drawCancel">
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ p: 1, fontSize: 30 }} color="secondary" />
          </IconButton>
        </div>

        <Divider />
        {getList()}
      </Drawer>
    </Box >
  );
}
