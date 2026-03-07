import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UserAuth } from '../../context/AuthContext';
import { redirect, useLocation, useNavigate } from 'react-router-dom';


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
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ fontSize: 30, float: "right", cursor: "pointer" }} color="secondary" />
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
    const { useLoginPopup, signIn, signUpWithGoogleProvider } = UserAuth();
    const [open, setOpen] = useLoginPopup();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignInWithGoogle = async () => {
        const result = await signUpWithGoogleProvider();
        if (result.status) {
            toast("Login successfully!", { type: "success" });
            setIsGoogleLoading(false);
            handleClose();
        } else {
            toast(result.message, { type: "error" });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await signIn(email, password);
            if (result.status) {
                toast("Login successfully!", { type: "success" });
                handleClose();
            } else {
                toast(result.message, { type: "error" });
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.error(e.message);
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

                        <img
                            src='https://res.cloudinary.com/nell1818/image/upload/v1657931015/Menuverse_nff3qo.png'
                            alt=''
                        />
                        <p>Sign In</p>
                    </div>
                    <Divider
                        sx={{ mb: 5 }}
                    />
                    <form
                        autoComplete='off'
                        onSubmit={handleSubmit}
                    >

                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            type="text"
                            autoComplete='off'
                            label="Email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            label="Password"
                            type="password"
                            id="password"
                            name="pw"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            isLoading ? (
                                <Button
                                    disabled
                                    color='secondary'
                                    fullWidth
                                    sx={{ mt: 2, textTransform: 'none', fontSize: '18px' }}
                                    variant='outlined'
                                >Loading...</Button>
                            ) : (
                                <Button
                                    color='secondary'
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    variant='contained'
                                    type="submit"> Sign In </Button>
                            )
                        }
                    </form>
                    <div className="or">
                        <p>or</p>
                    </div>
                    {
                        isGoogleLoading ? (
                            <Button
                                disabled
                                color='secondary'
                                fullWidth
                                sx={{ mt: 0, textTransform: 'none', fontSize: '18px' }}
                                variant='outlined'
                            >Loading...</Button>
                        ) : (
                            <Button
                                color='secondary'
                                fullWidth
                                sx={{ mt: 0, textTransform: 'none', fontSize: '18px' }}
                                variant='outlined'
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
                    <Divider
                        sx={{ mt: 5 }}
                    />
                    <div className="login-footer">
                        <p className='pp' onClick={(e) => handleRedirectTo(e, "/forget-password")} style={{ cursor: 'pointer' }}>Forgot Password?</p>
                        <p className='t-c' onClick={(e) => handleRedirectTo(e, "/signup")} style={{ cursor: 'pointer' }}>Sign Up</p>
                    </div>
                </Paper>
            </Box>
        </BootstrapDialog>
    )
}

export default LoginPopup