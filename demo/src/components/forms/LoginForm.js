import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import { Navigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { PublicLayout } from '../layouts';
import { UserAuth } from '../../context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import SnackbarOpen from '../miscellaneous/SnackBar';

const theme = createTheme();

function LoginForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUpWithGoogleProvider, signUpWithAppleProvider, signUpWithFacebookProvider } = UserAuth();
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

  const signInWithGoogle = async () => {
    const result = await signUpWithGoogleProvider();
    if (result.status) {
      setError({ status: true, type: "success", message: "Login successfully" });
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
    e.preventDefault()
    try {
      if (!formData.email) {
        setError({ status: true, type: "error", message: "Email is required!" });
        return;
      }
      if (!formData.password) {
        setError({ status: true, type: "error", message: "password is required!" });
        return;
      }
      setIsLoading(true);
      const result = await signIn(formData.email, formData.password);
      if (result.status) {
        setError({ status: true, type: "success", message: "Login successfully" });

      } else {
        setError({ status: true, type: "error", message: result.message });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      throw new Error(e.message);
    }
  }


  if (user.isAdmin) {
    return (
      <Navigate to={user.isAdmin ? '/dashboard' : '/'} />
    )
  }

  return (
    <PublicLayout noHeader={true}>
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
                  <img
                    src='https://res.cloudinary.com/nell1818/image/upload/v1697353582/mvLogo_uzkz5a.png'
                    alt=''
                  />
                  <Typography sx={{ mt: 6 }} >
                    Sign in
                  </Typography>
                </div>
                <Divider
                  sx={{ mb: 6 }}
                />
                <form autoComplete='off'
                  onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div>
                      <Typography variant='h5'>What's your email ?</Typography>
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
                      <Button onClick={nextStep} variant="contained" sx={{ width: '100%', background: "#4458BE", textTransform: 'none' }} >
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
                              sx={{ background: "#4458BE" }}
                              type="submit">
                              Sign in
                            </Button>
                          )}
                      </>
                    )}
                  </div>
                </form>
                {/* <form
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
                </form> */}
                <Box
                  sx={{
                    my: 3,
                  }}
                >
                <Divider>or</Divider>
                </Box>
                <Button
                  fullWidth
                  sx={{ mt: 0, textTransform: 'none', fontSize: '18px', mt: 2, backgroundColor: 'lightgrey', color:'black', fontWeight: 'bold' }}
                  variant='contained'
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
                <Button
                  fullWidth
                  sx={{ mt: 0, textTransform: 'none', fontSize: '18px', mt: 2, backgroundColor: 'lightgrey', color:'black', fontWeight: 'bold' }}
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
                  sx={{ mt: 0, textTransform: 'none', fontSize: '18px', mt: 2, backgroundColor: 'lightgrey', color:'black', fontWeight: 'bold' }}
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
      {
        error.status ?
          <SnackbarOpen
            message={error.message}
            useOpen={() => [error, setError]}
            color={error.type}
          /> :
          ""
      }
    </PublicLayout>
  )
}

export default LoginForm