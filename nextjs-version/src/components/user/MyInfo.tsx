"use client";
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { object, string } from "yup";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Button, IconButton, Typography, Backdrop, LinearProgress, Box, Divider } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import 'react-phone-number-input/style.css'
import { SiteButton } from '../miscellaneous';
import { useAuth } from '@/context/AuthContext';
import useFileStorage from '@/lib/useFileStorage';
import Image from 'next/image';

function LinearProgressWithLabel(props: any) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress sx={{ height: "10px" }} color="secondary" variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography color="white" variant="body2">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const defaultFormData = {
    name: "",
    username: "",
    bio: "",
    phoneNumber: "",
}

const schema = object().shape({
    bio: string().required("Bio must be required"),
    phoneNumber: string().required("Mobile must be required").min(11).max(15),
    username: string().required("Username must be required"),
    name: string().required("Name must be required"),
})

function MyInfo() {
    const { user, updateLoginUser, setSnackbar } = useAuth();
    const [formData, setFormData] = useState(defaultFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const { progress, loading, error, upload } = useFileStorage();


    const handleClickOpen = (e: any) => {
        e.preventDefault()
        setOpen(true);
        setFormData({
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
            phoneNumber: user?.phoneNumber || "",
        })
    };

    const handleClose = (e: any) => {
        e.preventDefault()
        setIsLoading(false)
        setOpen(false);
        setFormData(defaultFormData);
    };
    const handleChange = (e: any) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (event: any) => {
        event.preventDefault();
        const { files } = event.target;
        const file = files[0];
        if (file?.name) {
            await upload(file, "users/profiles", (url: string) => {
              // Update User image
              updateLoginUser({
                image: url
              })
              setSnackbar(true, "Profile pic updated successfully!");
            });
        } else {
            setSnackbar(false, "File is not selected");
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const isValidMobile = isValidPhoneNumber(formData.phoneNumber);
            if (!isValidMobile) {
                throw new Error('Invalid mobile number!');
            }
            const result = await schema.validate(formData)
                .then((value) => {
                    return {
                        status: true,
                        errors: [],
                        data: value
                    }
                })
                .catch(function (err) {
                    return {
                        status: false,
                        errors: err.errors,
                        data: {}
                    };
                });

            if (result.status) {
                await updateLoginUser(formData, 'Profile updated successfully!');
                setOpen(false);
                setFormData(defaultFormData);
            } else {
                setSnackbar(false, result.errors.shift());
            }
            setIsLoading(false)
        } catch (error: any) {
            setIsLoading(false);
            setSnackbar(false, error.message);
        }

    }

    const handleMobileChange = (phoneNumber: string) => {
        setFormData((prev) => ({ ...prev, phoneNumber }))
    }

    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <InfoOutlinedIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="My Info" secondary="Profile info for the menuverse." />
                </ListItem>
                <Divider />
            </List>
            <div className='single-profile'>
                <SiteButton
                    variant="outlined"
                    sx={{
                        textDecoration: "none",
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 1,
                        textTransform: 'none',
                        fontSize: '18px'
                    }}
                    startIcon={<EditOutlinedIcon />}
                    onClick={handleClickOpen}
                >
                    Edit
                </SiteButton>
                <div className='single-image'>
                    <IconButton 
                        sx={{
                            position: "absolute",
                            bottom: "90px",
                            right: "43%",
                            background: '#9c27b0',
                            color: "#fff",
                            '&:hover': {
                                background: '#9c27b0',
                            },
                            zIndex: 1
                        }}
                        aria-label="upload picture"
                        component="label"
                    >
                        <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                        <PhotoCamera sx={{ fontSize: 28 }} />
                    </IconButton>
                    <Avatar sx={{ width: "150px", height: "150px" }}>
                        <Image src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={150} width={150} />
                    </Avatar>
                    <Typography variant='h3' sx={{ mb: 0 }}>{user.name}</Typography>
                    <Typography component='span' sx={{ my: 1, textAlign: "center" }}>@{user.username}</Typography>
                </div>
                <div className='number border-line'>
                    <p className='bold'>Mobile Number</p>
                    <p>{user.phoneNumber || "N/A"}</p>
                </div>
                <div className='email border-line'>
                    <p className='bold'>Email</p>
                    <p>{user.email}</p>
                </div>
                <div className='bio border-line'>
                    <p className='bold'>Bio</p>
                    <p>{user?.bio || "N/A"}</p>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Update Profile Info
                    <CloseIcon onClick={handleClose} sx={{ fontSize: 30, float: "right", cursor: 'pointer', color: '#4458BE' }} />
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            type="text"
                            autoComplete='off'
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            type="text"
                            autoComplete='off'
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => handleChange(e)}
                        />
                        <FormControl sx={{ m: 1, ml: 0, width: "95%" }}>
                            {/* <InputLabel htmlFor="mobile">Mobile</InputLabel> */}
                            <PhoneInput
                                id="mobile"
                                international
                                defaultCountry="RU"
                                value={formData.phoneNumber}
                                onChange={handleMobileChange}
                            />
                        </FormControl>
                        <TextField
                            margin="normal"
                            fullWidth
                            inputProps={{
                                maxlength: 250
                            }}
                            helperText={`${formData.bio.length}/${250}`}
                            required
                            multiline
                            rows={4}
                            label="Bio"
                            type="text"
                            value={formData.bio}
                            name="bio"
                            onChange={(e) => handleChange(e)}
                        />
                        <Typography 
                        component="div"
                            sx={{
                                mt: 3
                            }}
                        >
                        {
                            isLoading ? (
                                <Button disabled variant='contained' sx={{ mt: 2 }}>Updating...</Button>
                            ) : (
                                <SiteButton
                                    sx={{ textTransform: 'none', fontSize: '18px', mt: 4 }}
                                    variant='contained'
                                    fullWidth
                                    color='secondary' 
                                    type="submit"
                                >Update</SiteButton>
                            )
                        }
                        </Typography>
                    </form>
                </DialogContent>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: 1}}
                open={progress > 0 ? true : false}
            >
                <Box sx={{ width: '60%' }}>
                    <LinearProgressWithLabel value={progress} valueBuffer={progress + 10} />
                </Box>
            </Backdrop>
        </>
    )
}

export default MyInfo