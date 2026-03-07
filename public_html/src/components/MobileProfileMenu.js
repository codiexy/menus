/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserAuth } from "../context/AuthContext";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebase'
import {
  ref, getDownloadURL, listAll,
} from "firebase/storage";
import { MenuList } from '@mui/material';

export default function ProfileMenu() {
  const { user, logout } = UserAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [info, setInfo] = useState([])
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "avatar/");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const infoRef = collection(db, "RestaurantInfo");
    const q = query(infoRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const info = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setInfo(info);
    })
  }, []);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);


  return (
    <React.Fragment>

      <><Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

      </Box><Menu
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
          {imageUrls.map((url) => (

            <Avatar>
              <img key={url} src={url} alt="" />
            </Avatar>
          ))}
            {info.map(({ name }) => (
              <MenuList sx={{ ml: 2 }}>
                <Typography variant='h6'>
                  {name}
                </Typography>
                <Typography variant='body2'>
                  {user && user.email}
                </Typography>
              </MenuList>
            ))}
          </MenuItem><Divider /><MenuItem>
            My account
          </MenuItem><MenuItem>
            View live menu
          </MenuItem><MenuItem>
            Privacy policy
          </MenuItem><MenuItem>
            Get help
          </MenuItem><Divider /><MenuItem>
            Logout
          </MenuItem>
        </Menu></>
    </React.Fragment>
  );

}