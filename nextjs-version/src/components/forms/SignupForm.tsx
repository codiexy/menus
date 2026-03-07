"use client";
import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Divider, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { object, string } from "yup";
import RestaurantName from '../miscellaneous/RestaurantName';
import { useAuth } from '@/context/AuthContext';
import { redirect, useRouter } from 'next/navigation';
import TenantLink from '../miscellaneous/TenantLink';
import Image from 'next/image';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UndoIcon from '@mui/icons-material/Undo';

const schema = object()
  .shape({
    password: string().required("Password must be required").min(6).max(18),
    email: string().email().required('Email must be required!'),
    lastname: string().required("Last name must be required"),
    firstname: string().required("First name must be required"),
  }
  )

const defaultFormData = {
  email: "",
  password: "",
  firstname: "",
  lastname: ""
}

const SignupForm = () => {
  const [loading, setLoading] = useState<'gmail' | "email" | "facebook" | "apple" | "">("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultFormData);
  const { loginWithProvider, register, user, tenantSlug, setSnackbar } = useAuth();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const nextStep = () => {
    if (!formData.email) {
      setSnackbar(false, "Email is required!");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setSnackbar(false, "Email is Not Valid!");
      return;
    }
    if (!formData.password) {
      setSnackbar(false, "Password is required!");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const singInWithSocial = async (provider: string = "gmail") => {
    const result = await loginWithProvider(provider);
    if (result.status) {
      setSnackbar(true, "Login successfully");

      router.push(`/${tenantSlug}/login`);
    } else {
      setSnackbar(false, result.message);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading("email");
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
        const loginRes = await register(result.data);
        setSnackbar(true, loginRes.message);
        if (loginRes.status) {
          setFormData(defaultFormData);
          router.push(`/${tenantSlug}/login`);
        }
      } else {
        setSnackbar(false, result.errors.shift());
      }
      setLoading("");
    } catch (error: any) {
      setSnackbar(false, error.message);
      setLoading("");
    }
  }

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (user) {
    redirect(user.role == "admin" ? `/${tenantSlug}/dashboard` : `/${tenantSlug}/menu`);
  }

  return (
    <div className="signup-container">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 550, my: 3.5 }}
        maxWidth="500px"
      >
        <Paper
          sx={{ width: "100%", py: 2 }}
        >
          <div className="login-header">
            <RestaurantName />
            <Typography>Receive exclusive content, discounts & rewards!</Typography>
          </div>
          <form
            autoComplete='off'
            onSubmit={handleSubmit}
            style={{
              margin: "0 15px"
            }}
          >
            {step === 1 && (
              <>
                <Divider component='h2' sx={{ my: 2 }} textAlign="center">Email & password</Divider>
                <TextField
                  margin="normal"
                  fullWidth
                  type="text"
                  autoComplete='off'
                  label="Email"
                  id="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
                <FormControl
                  sx={{ my: 2 }}
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
              </>
            )}
            {step === 2 && (
              <>
                <Divider component='h2' sx={{ my: 2 }} textAlign="center">Basic info</Divider>
                <TextField
                  margin="normal"
                  fullWidth
                  type="text"
                  autoComplete='off'
                  label="First Name"
                  id="firstname"
                  value={formData.firstname}
                  name="firstname"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  type="text"
                  autoComplete='off'
                  label="Last Name"
                  id="lastname"
                  value={formData.lastname}
                  name="lastname"
                  onChange={handleChange}
                />
              </>

            )}
            <div>
              {step !== 1 && (
                <Typography
                  sx={{
                    display: "flex",
                    mx: 2,
                    cursor: "pointer",
                    color: "#4458BE"
                  }}
                  onClick={prevStep}
                >
                  <UndoIcon sx={{ ml: "auto" }} />
                  <Typography component="span" marginLeft={1} >Back</Typography>
                </Typography>
              )}
              {step < 2 ? (
                <Button
                  onClick={nextStep}
                  variant="contained"
                  sx={{
                    width: '100%',
                    background: "#4458BE",
                    textTransform: 'none',
                    fontSize: 18,
                    fontWeight: 'bold'
                  }} >
                  Sign Up With Email
                </Button>
              ) : (
                <>
                  {
                    loading == "email" ? (
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
                        type='submit'
                        variant="contained"
                        fullWidth
                        sx={{
                          background: "#4458BE",
                          textTransform: 'none',
                          fontSize: 18,
                          fontWeight: 'bold'
                        }} >
                        Sign Up
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
          <Box
            sx={{
              mx: 2,
            }}
          >
            {
              loading == "gmail" ? (
                <Button
                  disabled
                  color='secondary'
                  fullWidth
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  variant='outlined'
                >Loading...</Button>
              ) : (
                <Button
                  fullWidth
                  variant='contained'
                  onClick={() => singInWithSocial()}
                  sx={{ textTransform: 'none', fontSize: '18px', display: "flex", backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                >
                  <Image
                    src='/google-icon.png'
                    height={25}
                    width={25}
                    alt='Menuverse - Google Logo'
                    className='googleLogo'
                  />Continue with Google</Button>
              )
            }
            {
              loading == "apple" ? (
                <Button
                  disabled
                  color='secondary'
                  fullWidth
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  variant='outlined'
                >Loading...</Button>
              ) : (
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
                    alt='Menuverse - Apple Logo'
                    className='googleLogo'
                  />
                  Continue with Apple
                </Button>
              )
            }
            {
              loading == "facebook" ? (
                <Button
                  disabled
                  color='secondary'
                  fullWidth
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  variant='outlined'
                >Loading...</Button>
              ) : (
                <Button
                  fullWidth
                  sx={{
                    mt: 0,
                    textTransform: 'none',
                    fontSize: '18px',
                    marginTop: 2,
                    display: "flex",
                    backgroundColor: 'lightgrey',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                  variant='contained'
                  onClick={() => singInWithSocial('facebook')}
                >
                  <Image
                    src='/facebook-icon.png'
                    height={25}
                    width={25}
                    alt='Menuverse - Facebook Logo'
                    className='googleLogo'
                  />
                  Continue with Facebook
                </Button>
              )
            }
          </Box>
          <p className="py2">Already have an Account?
            <TenantLink
              href="/login"
            >
              <span
                style={{ cursor: "pointer", marginLeft: 5 }}
                className='underline'
              >
                Sign In
              </span>
            </TenantLink>
          </p>
          <Divider />
          <div className="login-footer" style={{ marginLeft: "18px", marginRight: "18px"}}>
            <p className='pp'>Privacy Policy</p>
            <p className='t-c'>Terms of Use</p>
          </div>
        </Paper>
      </Box>
    </div>
  )
}







export default SignupForm
