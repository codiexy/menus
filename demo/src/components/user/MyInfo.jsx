import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { object, string } from "yup";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, Button, IconButton, Typography, Backdrop, LinearProgress, Box, Divider } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { UserAuth } from '../../context/AuthContext';
import { storage } from '../../firebase';

import 'react-phone-number-input/style.css'
import SnackbarOpen from '../miscellaneous/SnackBar';
import { SiteButton } from '../miscellaneous';

function LinearProgressWithLabel(props) {
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

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

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
    const { user, updateLoginUser } = UserAuth();
    const [formData, setFormData] = useState(defaultFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState({ status: false, type: "", message: "" });


    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true);
        setFormData({
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
            phoneNumber: user?.phoneNumber || "",
        })
    };

    const handleClose = (e) => {
        e.preventDefault()
        setIsLoading(false)
        setOpen(false);
        setFormData(defaultFormData);
    };
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (event) => {
        event.preventDefault();
        const { files } = event.target;
        const file = files[0];
        if (file.name) {
            const storageRef = ref(storage, `/images/${Date.now()}${file.name}`);
            const uploadImage = uploadBytesResumable(storageRef, file);

            uploadImage.on(
                "state_changed",
                (snapshot) => {
                    const progressPercent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progressPercent > 0 ? progressPercent : 0);
                },
                (err) => {
                    throw new Error(err);
                },
                async () => {
                    const url = await getDownloadURL(uploadImage.snapshot.ref);
                    await updateLoginUser({
                        image: url
                    });
                    setProgress(0);
                }
            );
        }

    }

    const handleSubmit = async (event) => {
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
                setIsLoading(false)
                setOpen(false);
                setFormData(defaultFormData);
            } else {
                throw new Error(result.errors.shift());
            }

        } catch (error) {
            setIsLoading(false);
            setError({ status: true, type: "error", message: error.message });
        }

    }

    const handleMobileChange = (phoneNumber) => {
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
                    <SiteButton
                        sx={{
                            position: "absolute",
                            bottom: "75px",
                            right: "42%",
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
                    </SiteButton>
                    <Avatar sx={{ width: "150px", height: "150px" }}>
                        <img src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={"150px"} width={"150px"} />
                    </Avatar>
                    <Typography variant='h3' sx={{ mb: 0 }}>{user.name}</Typography>
                    <Typography variant='span' sx={{ my: 1, textAlign: "center" }}>@{user.username}</Typography>
                </div>
                {
                    user?.phoneNumber && (
                        <div className='number border-line'>
                            <p className='bold'>Mobile Number</p>
                            <p>{user.phoneNumber}</p>
                        </div>
                    )
                }
                <div className='email border-line'>
                    <p className='bold'>Email</p>
                    <p>{user.email}</p>
                </div>
                <div className='bio border-line'>
                    <p className='bold'>Bio</p>
                    <p>{user?.bio || ""}</p>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Update Profile Info
                    <CloseIcon onClick={handleClose} sx={{ fontSize: 30, float: "right", cursor: 'pointer', color: '#4458BE' }} />
                </DialogTitle>
                <DialogContent >
                    <form>
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
                        {
                            isLoading ? (
                                <Button disabled variant='contained' sx={{ mt: 2 }}>Updating...</Button>
                            ) : (
                                <SiteButton
                                    sx={{ textTransform: 'none', fontSize: '18px', mt: 4 }}
                                    variant='contained'
                                    fullWidth
                                    color='secondary' onClick={handleSubmit} >Update</SiteButton>
                            )
                        }
                    </form>
                </DialogContent>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress > 0 ? true : false}
            >
                <Box sx={{ width: '60%' }}>
                    <LinearProgressWithLabel value={progress} valueBuffer={progress + 10} />
                </Box>
            </Backdrop>
            {
                error.status ?
                    <SnackbarOpen
                        message={error.message}
                        useOpen={() => [error, setError]}
                        color={error.type}
                    /> :
                    ""
            }
        </>
    )
}

export default MyInfo