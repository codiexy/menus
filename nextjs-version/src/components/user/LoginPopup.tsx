"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantName from '../miscellaneous/RestaurantName';
import { SiteButton } from '../miscellaneous';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import TenantLink from '../miscellaneous/TenantLink';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;


    return (
        <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
            {children}
            {typeof onClose === "function" ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme: any) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ fontSize: 30, float: "right", cursor: "pointer" }} />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function LoginPopup() {
    const { setLoginPopupShow, LoginPopupShow, signIn, loginWithProvider, tenantSlug, setSnackbar } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const pathname = usePathname();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleChange = (e: React.ChangeEvent) => {
        const { name, value }: any = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const singInWithSocial = async (provider: string = "gmail") => {
        const result = await loginWithProvider(provider);
        if (result.status) {
            setLoginPopupShow(false);
            setSnackbar(true, "Login successfully");
        } else {
            setSnackbar(false, result.message);
        }
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!formData.email) {
            setSnackbar(false, "Email is required!");
            return;
        }
        if (!formData.password) {
            setSnackbar(false, "password is required!");
            return;
        }
        setIsLoading(true);
        try {
            const result = await signIn(formData.email, formData.password);
            if (result.status) {
                setLoginPopupShow(false);
                setSnackbar(true, "Login successfully!");
            } else {
                setSnackbar(false, result.message);
            }
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setSnackbar(false, error.message);
        }
    }

    const handleClose = (e: React.MouseEvent, reason: string) => {
        e?.preventDefault();
        if (reason !== "backdropClick") {
            setLoginPopupShow(false);
        }
    }



    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={LoginPopupShow}
            >
                <BootstrapDialogTitle
                    onClose={handleClose}
                />
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 450 }}
                    maxWidth="500px"
                >
                    <Paper
                        elevation={4}
                        sx={{ width: 450, p: "20px !important" }}
                    >
                        <div className="login-header">
                            <RestaurantName />
                        </div>
                        <Divider
                            sx={{ my: 2 }}
                        >Log in to</Divider>
                        <form
                            autoComplete='off'
                            onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                type="email"
                                autoComplete='off'
                                label="Email "
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Your Email"
                            />
                            <FormControl
                                sx={{ mt: 3, mb: 3 }}
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
                                    id="password"
                                    autoComplete='off'
                                    name="password"
                                    value={formData.password}
                                    label="Password"
                                    onChange={handleChange}
                                    placeholder="Enter Your Password"
                                />
                            </FormControl>
                            {
                                isLoading ? (
                                    <Button
                                        disabled
                                        variant="outlined"
                                        color='secondary'
                                        fullWidth
                                        sx={{ width: '100%', display: "flex", textTransform: 'none' }}
                                    >
                                        Loading...
                                    </Button>
                                ) : (
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ width: '100%', background: "#4458BE", display: "flex", textTransform: 'none' }}
                                        type="submit"
                                    >
                                        Sign in
                                    </Button>
                                )
                            }
                        </form>
                        <Box
                            sx={{
                                my: 3,
                            }}
                        >
                            <Divider>or</Divider>
                        </Box>
                        {
                            isGoogleLoading ? (
                                <SiteButton
                                    disabled
                                    color='secondary'
                                    fullWidth
                                    sx={{ mt: 0, textTransform: 'none', fontSize: '18px' }}
                                    variant='outlined'
                                >Loading...</SiteButton>
                            ) : (
                                <Button
                                    fullWidth
                                    sx={{ mt: 0, textTransform: 'none', fontSize: '18px', display: "flex", backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                                    variant='contained'
                                    onClick={() => singInWithSocial('gmail')}
                                >
                                    <Image
                                        src='/google-icon.png'
                                        height={25}
                                        width={25}
                                        alt='Gmail logo'
                                        className='googleLogo'
                                    />
                                    Continue with Google
                                </Button>
                            )
                        }
                        <Button
                            fullWidth
                            sx={{ mt: 0, textTransform: 'none', fontSize: '18px', marginTop: 2, display: "flex", backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                            variant='contained'
                            onClick={() => singInWithSocial('apple')}
                        >
                            <Image
                                src='/apple-logo-png-black.png'
                                height={25}
                                width={25}
                                alt='Apple Logo'
                                className='googleLogo'
                            />
                            Continue with Apple
                        </Button>
                        <Button
                            fullWidth
                            sx={{ mt: 0, textTransform: 'none', fontSize: '18px', marginTop: 2, display: "flex", backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                            variant='contained'
                            onClick={() => singInWithSocial('facebook')}
                        >
                            <Image
                                src='/facebook-icon.png'
                                height={25}
                                width={25}
                                alt='facebook logo'
                                className='googleLogo'
                            />
                            Continue with Facebook
                        </Button>
                        <div className="login-footer">
                            <p className='pp'><TenantLink href="/forgot-password" className='underline text-danger'>Forgot Password?</TenantLink></p>
                            <p className='t-c'><TenantLink href="/signup" className='underline'>Sign Up</TenantLink></p>
                        </div>
                        <Divider />
                        <div className="login-footer">
                            <p className='pp'>Privacy Policy</p>
                            <p className='t-c'>Terms of Use</p>
                        </div>
                    </Paper>
                </Box>
            </BootstrapDialog>
        </>
    )
}

export default LoginPopup