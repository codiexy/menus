"use client";
import React, { useState } from 'react'
import { object, ref, string } from "yup";
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, IconButton, Typography, LinearProgress, Box, Divider, FormControl, InputLabel, OutlinedInput, InputAdornment, styled, Paper, Stack, Grid, ButtonBase, Button } from '@mui/material';

import PasswordIcon from '@mui/icons-material/Password';

import { useAuth } from '@/context/AuthContext';
import { updatePassword } from 'firebase/auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const schema = object().shape({
    password: string().required('Password is required'),
    confirmPassword: string().oneOf([ref('password'), ""], 'Passwords must match')
});

function ResetPassword() {
    const { user, updateLoginUser, setSnackbar } = useAuth();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const passwordProvider = user.providerData.find((data: any) => data.providerId == "password") || false;
        if(!passwordProvider) {
            setSnackbar(false, 'Sorry! You are not logged in with email password.');
            return;
        }
        setIsLoading(true)
        try {
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
                await updatePassword(user, formData.password)
                    .then(() => {
                        setSnackbar(true, 'Password updated successfully.');
                        setFormData({
                            password: "",
                            confirmPassword: ""
                        });
                        setIsLoading(false)
                    })
                    .catch((error: any) => {
                        setIsLoading(false)
                        setSnackbar(false, error.message);
                    });
            } else {
                setIsLoading(false)
                setSnackbar(false, result.errors.shift());
            }
        } catch (error: any) {
            setIsLoading(false);
            setSnackbar(false, error.message);
        }

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    console.log(user)


    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PasswordIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Reset Password" secondary="Update your site password" />
                </ListItem>
                <Divider />
            </List>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    mt: 10
                }}
            >
                <Grid container spacing={2}>
                    <Typography
                        component="div"
                        sx={{
                            width: "100%",
                            mt: 2
                        }}
                    >
                        <Avatar
                            sx={{
                                margin: "0 auto"
                            }}
                        >
                            <PasswordIcon />
                        </Avatar>
                    </Typography>
                    <Typography variant='h5' sx={{ width: "100%", textAlign: "center", mt: 1 }}>Reset Password</Typography>
                    {/* <Divider /> */}
                    <Typography
                        component='div'
                        sx={{
                            width: "80%",
                            margin: "0 auto"
                        }}
                    >
                        <FormControl
                            sx={{ mt: 4 }}
                            variant="outlined"
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                sx={{
                                    flexGrow: 1,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderStyle: 'dotted'
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                id="confirm-password"
                                autoComplete='off'
                                name="password"
                                value={formData.password}
                                label="Password"
                                onChange={handleChange}
                                placeholder="Enter Your Password"
                            />
                        </FormControl>
                        <FormControl
                            sx={{ mt: 2, mb: 2 }}
                            variant="outlined"
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                sx={{
                                    flexGrow: 1,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderStyle: 'dotted'
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                id="password"
                                autoComplete='off'
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                label="Confirm Password"
                                onChange={handleChange}
                                placeholder="Confirm Your Password"
                            />
                        </FormControl>
                        {
                            isLoading ? (
                                <Button
                                    disabled
                                    color='secondary'
                                    variant='contained'
                                    sx={{
                                        width: '100%',
                                        background: "#4458BE",
                                        textTransform: 'none'
                                    }}
                                >
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        width: '100%',
                                        background: "#4458BE",
                                        textTransform: 'none'
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Reset Password
                                </Button>
                            )}
                    </Typography>
                </Grid>
            </Paper>
        </>
    )
}

export default ResetPassword