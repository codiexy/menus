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
import { UserAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import SnackbarOpen from '../miscellaneous/SnackBar';
import RestaurantName from '../miscellaneous/RestaurantName';
import { SiteButton } from '../miscellaneous';
import { Button, Typography } from '@mui/material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;


    return (
        <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
            {children}
            {typeof onClose === "function" ? (
                <SiteButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ fontSize: 30, float: "right", cursor: "pointer" }} />
                </SiteButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function LoginPopup() {
    const { useLoginPopup, signIn, signUpWithGoogleProvider, signUpWithAppleProvider, signUpWithFacebookProvider } = UserAuth();
    const [open, setOpen] = useLoginPopup();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState({ status: false, type: "", message: "" });


    const nextStep = () => {
        if (!formData.email) {
            setError({ status: true, type: "error", message: "Input is required!" });
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSignInWithGoogle = async () => {
        const result = await signUpWithGoogleProvider();
        if (result.status) {
            setError({ status: true, type: "success", message: "Login successfully!" });
            setIsGoogleLoading(false);
            handleClose();
        } else {
            setError({ status: true, type: "error", message: result.message });
        }
    }

    const signInWithApple = async () => {
        const result = await signUpWithAppleProvider();
        if (result.status) {
            setError({ status: true, type: "success", message: "Login successfully" });
        } else {
            setError({ status: true, type: "error", message: result.message });
        }
    }

    const signInWithFacebook = async () => {
        const result = await signUpWithFacebookProvider();
        if (result.status) {
            setError({ status: true, type: "success", message: "Login successfully" });
        } else {
            setError({ status: true, type: "error", message: result.message });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            setError({ status: true, type: "error", message: "Email is required!" });
            return;
        }
        if (!formData.password) {
            setError({ status: true, type: "error", message: "password is required!" });
            return;
        }
        setIsLoading(true);
        try {
            const result = await signIn(formData.email, formData.password);
            if (result.status) {
                setError({ status: true, type: "success", message: "Login successfully!" });
                handleClose();
            } else {
                setError({ status: true, type: "error", message: result.message });
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            throw new Error(e.message)
        }
    }

    const handleClose = (e, reason) => {
        e?.preventDefault();
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    }

    const handleRedirectTo = (event, url = "") => {
        event.preventDefault();
        const redirect_url = location.pathname + location.search;
        setOpen(false)
        navigate(url + '?redirect_url=' + redirect_url);
    }



    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
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
                        elevation={4} sx={{ width: 450, p: "1rem" }}
                    >
                        <div className="login-header">

                            <p>Log in to </p>
                            <RestaurantName />
                        </div>
                        <Divider
                            sx={{ my: 2 }}
                        />
                        <form autoComplete='off'
                            onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div>
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
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                    <Typography variant='h5'>password</Typography>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        type="password"
                                        autoComplete='off'
                                        label="Password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter Your Password"
                                    />

                                </div>
                            )}
                            <div>
                                {step !== 1 && (
                                    <Button onClick={prevStep} variant="contained" sx={{ mr: 2, background: "#4458BE" }}>
                                        Previous
                                    </Button>
                                )}
                                {step < 2 ? (
                                    <Button onClick={nextStep} variant="contained" sx={{ width: '100%', background: "#4458BE", display: "flex", textTransform: 'none' }} >
                                        Continue
                                    </Button>
                                ) : (
                                    <>
                                        {
                                            isLoading ? (
                                                <Button
                                                    disabled
                                                    color='secondary'
                                                    fullWidth
                                                    sx={{ mt: 2 }}
                                                    variant='outlined'
                                                >Loading...
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    sx={{ background: "#4458BE", mt: 2 }}
                                                    type="submit">
                                                    Sign in
                                                </Button>
                                            )}
                                    </>
                                )}
                            </div>
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
                                    onClick={handleSignInWithGoogle}
                                >
                                    <img
                                        src='https://res.cloudinary.com/nell1818/image/upload/v1657942104/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13_tw4sqd.png'
                                        height={20}
                                        alt='googleLogo'
                                        className='googleLogo'
                                    />
                                    Continue with Google
                                </Button>
                            )
                        }
                        <Button
                            fullWidth
                            sx={{ mt: 0, textTransform: 'none', fontSize: '18px', mt: 2, display: "flex", backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                            variant='contained'
                            onClick={signInWithApple}
                        >
                            <img
                                src='https://www.edigitalagency.com.au/wp-content/uploads/apple-logo-png-black.png'
                                height={20}
                                alt='googleLogo'
                                className='googleLogo'
                            />
                            Continue with Apple
                        </Button>
                        <Button
                            fullWidth
                            sx={{ mt: 0, textTransform: 'none', fontSize: '18px', mt: 2, display: "flex", backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                            variant='contained'
                            onClick={signInWithFacebook}
                        >
                            <img
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzp-JsRosVMrybJM86ctjRvPdydfzbzBEb1g&usqp=CAU'
                                height={20}
                                alt='googleLogo'
                                className='googleLogo'
                            />
                            Continue with Facebook
                        </Button>
                        <Divider
                            sx={{ mt: 5, color: 'GrayText' }}
                        >Don't have an account?</Divider>
                        <Box textAlign='center' >
                            {/* <p className='pp' onClick={(e) => handleRedirectTo(e, "/forget-password")} style={{ cursor: 'pointer' }}>Forgot Password?</p> */}
                            <Button sx={{ mt: 3 }} variant='outlined' onClick={(e) => handleRedirectTo(e, "/signup")} style={{ cursor: 'pointer' }}>Sign Up</Button>
                        </Box>
                    </Paper>
                </Box>
            </BootstrapDialog>
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

export default LoginPopup