import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import { PublicLayout } from './layouts';
import { UserAuth } from '../context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';

const theme = createTheme();

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUpWithGoogleProvider } = UserAuth();

  const signInWithGoogle = async () => {
    const result = await signUpWithGoogleProvider();
    if (result.status) {
      toast("Login successfully!", { type: "success" });
    } else {
      toast(result.message, { type: "error" });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.status) {
        toast("Login successfully!", { type: "success" });
      } else {
        toast(result.message, { type: "error" });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e.message)
    }
  }

  

  if (user) {
    return <Navigate to={user.isAdmin ? '/dashboard' : '/hot-dog-kings/menu'} />
  }

  return (
    <PublicLayout noHeader={true} >
      <ThemeProvider theme={theme}>
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
                Fast, Simple, and Free
              </Typography>
              <Typography variant="h5" color="inherit" paragraph align='center' sx={{ ml: 24, mr: 24 }}>
                Ditch the fees and protect your margins with the menu builder platform built for restaurant operators
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
                  <img
                    src='https://res.cloudinary.com/nell1818/image/upload/v1678603710/MENUUI_6_o6upjt.png'
                    alt=''
                  />
                  <Typography sx={{ mt: 6 }} >
                    Sign In
                  </Typography>
                </div>
                <Divider
                  sx={{ mb: 6 }}
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
                        sx={{ mt: 2 }}
                        variant='outlined'
                      >Loading...</Button>
                    ) : (
                      <Button
                        color='secondary'
                        fullWidth
                        sx={{ mt: 2, textTransform: 'none', fontSize: '18px' }}
                        variant='contained'
                        type="submit">
                        Sign In
                      </Button>
                    )
                  }
                </form>
                <Divider sx={{ m: 2, mx: 0, mt: 3, mb: 3 }}>or</Divider>
                <Button
                  color='secondary'
                  fullWidth
                  sx={{ mt: 0, textTransform: 'none', fontSize: '18px' }}
                  variant='outlined'
                  onClick={signInWithGoogle}
                >
                  <img
                    src='https://res.cloudinary.com/nell1818/image/upload/v1657942104/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13_tw4sqd.png'
                    height={20}
                    alt='googleLogo'
                    className='googleLogo'
                  />
                  Continue with Google
                </Button>
                <div className="login-footer">
                  <p className='pp'><Link to="/forgot-password" className='underline text-danger'>Forgot Password?</Link></p>
                  <p className='t-c'><Link to="/signup" className='underline'>Sign Up</Link></p>
                </div>
                <Divider
                  sx={{ mt: 2, mb: 2 }}
                />
                <div className="login-footer">
                  <p className='pp'>Privacy Policy</p>
                  <p className='t-c'>Terms of Use</p>
                </div>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

    </PublicLayout>
  )
}

export default LoginForm