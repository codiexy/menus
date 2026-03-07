"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import TenantLink from '../miscellaneous/TenantLink';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import RestaurantName from '../miscellaneous/RestaurantName';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { user, signIn, loginWithProvider, tenantSlug, setSnackbar } = useAuth();
  const router = useRouter();

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const singInWithSocial = async (provider: string = "gmail") => {
    const result = await loginWithProvider(provider);
    let message = result.message;
    if (result.status) {
      message = "Login successfully";
      router.push(`/${tenantSlug}/dashboard`);
    }
    setSnackbar(result.status, message);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (!formData.email) {
        setSnackbar(false, "Email is required!");
        return;
      }
      if (!formData.password) {
        setSnackbar(false, "password is required!");
        return;
      }
      setIsLoading(true);
      const result = await signIn(formData.email, formData.password);
      let message = result.message;
      if (result.status) {
        message = "Login successfully";
        router.push(`/${tenantSlug}/dashboard`);
      }
      setSnackbar(result.status, message);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setSnackbar(false, error.message);
    }
  }

  if (user) {
    redirect(user.role == "admin" ? `/${tenantSlug}/dashboard` : `/${tenantSlug}/menu`);
  }

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh', pb: 3 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: 'url(https://res.cloudinary.com/nell1818/image/upload/v1680250469/Untitled_design_38_nuur5a.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >

          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
              display: { xs: 'none', md: 'flex' }, flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              mt: 8,
              ml: 5,
              mr: 5,
            }}
          >
            <Typography variant="h1" color="inherit" gutterBottom align='center' sx={{ fontWeight: 900, fontSize: '60px' }}>
              Professional grade images - no photography experience needed
            </Typography>
            <Typography variant="h5" color="inherit" paragraph align='center' sx={{ ml: 24, mr: 24 }}>
              Present your dishes in the best light with high-quality images that display your restaurant selection. Cut down on photography expenses while producing images that attract customers and increase sales.
            </Typography>

          </Box>

        </Grid>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}

          >
            <Paper
              sx={{ width: "100%", p: "2rem", }}
            >
              <div className="login-header">
                <RestaurantName />
              </div>
              <Divider
                sx={{ my: 2 }}
              >Log in to</Divider>
              <form autoComplete='off'
                onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  type="email"
                  autoComplete='on'
                  label="Email "
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                />
                <FormControl
                  sx={{ mt: 1 }}
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
                <Typography
                  component="div"
                  sx={{
                    mt: 2
                  }}
                >
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
                      >
                        Sign in
                      </Button>
                    )}
                </Typography>
              </form>
              <Box
                sx={{
                  my: 3,
                }}
              >
                <Divider>or</Divider>
              </Box>
              <Button
                fullWidth
                sx={{ mt: 0, textTransform: 'none', fontSize: '18px', backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                variant='contained'
                onClick={() => singInWithSocial()}
              >
                <Image
                  src='/google-icon.png'
                  height={20}
                  width={20}
                  alt='Menuverse - Google Logo'
                  className='googleLogo'
                />
                Continue with Google
              </Button>
              <Button
                fullWidth
                sx={{ mt: 2, textTransform: 'none', fontSize: '18px', backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                variant='contained'
                onClick={() => singInWithSocial('apple')}
              >
                <Image
                  src='/apple-logo-png-black.png'
                  height={20}
                  width={20}
                  alt='Menuverse - Apple Logo'
                  className='googleLogo'
                />
                Continue with Apple
              </Button>
              <Button
                fullWidth
                sx={{ mb: 1, textTransform: 'none', fontSize: '18px', mt: 2, backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                variant='contained'
                onClick={() => singInWithSocial('facebook')}
              >
                <Image
                  src='/facebook-icon.png'
                  height={20}
                  width={20}
                  alt='Menuverse - Facebook Logo'
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
        </Grid>
      </Grid>
    </>
  )
}

export default LoginForm