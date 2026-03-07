
import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Paper, Typography, Divider } from '@mui/material';
import { object, string } from "yup";
import { UserAuth } from '../../context/AuthContext';
import { PublicLayout } from '../layouts';
import RestaurantName from '../miscellaneous/RestaurantName';
import SnackbarOpen from '../miscellaneous/SnackBar';

const schema = object().shape({
  password: string().required("Password must be required").min(6).max(18),
  email: string().email(),
  lastname: string().required("Last name must be required"),
  firstname: string().required("First name must be required"),
})

const defaultFormData = {
  email: "",
  password: "",
  firstname: "",
  lastname: ""
}

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const { signUpWithGoogleProvider, signUpWithEmailAndPassword, user, useLoginPopup, signUpWithAppleProvider, signUpWithFacebookProvider } = UserAuth();
  const [loginPopupShow, setLoginPopupShow] = useLoginPopup();
  const location = useLocation();
  const [error, setError] = useState({ status: false, type: "", message: "" });
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const nextStep = () => {
    if (!formData.email) {
      setError({ status: true, type: "error", message: "Email is required!" });
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError({ status: true, type: "error", message: "Email is Not Valid!" });
      return;
    }
    if (!formData.password) {
      setError({ status: true, type: "error", message: "Password is required!" });
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


  const signInWithGoogle = async (e) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    const result = await signUpWithGoogleProvider();
    setError({ status: true, type: result.status ? "success" : "error", message: result.message });
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
    if (!formData.firstname) {
      setError({ status: true, type: "error", message: "First Name is required!" });
      return;
    }
    if (!formData.lastname) {
      setError({ status: true, type: "error", message: "Last Name is required!" });
      return;
    }
    setIsLoading(true);
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
        const loginRes = await signUpWithEmailAndPassword(formData);
        setError({ status: true, type: loginRes.status ? "success" : "error", message: loginRes.message });
        setFormData(defaultFormData);
      } else {
        setError({ status: true, type: "error", message: result.errors.shift() });
      }
      setIsLoading(false);
    } catch (error) {
      setError({ status: true, type: "error", message: error.message });
      setIsLoading(false);
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const navigate = useNavigate();
  const handleSignInClick = () => {
    if (!user) {
      setLoginPopupShow(true);
      return;
    }
  }

  if (user) {
    const urlParams = new URLSearchParams(location.search);
    const redirect_url = urlParams.get('redirect_url');
    return <Navigate to={redirect_url ? redirect_url : (user.isAdmin ? '/dashboard' : '/hot-dog-kings/menu')} />
  }


  return (
    <PublicLayout noHeader={true}>
      <div className="signup-container">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 450, my: 3.5 }}
          maxWidth="500px"
        >
          <Paper
            elevation={4} sx={{ width: "100%", p: "1rem" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ mb: 2 }}
              boxShadow
            >
              <h2><RestaurantName /></h2>
              <p>Receive exclusive content, discounts & rewards!</p>
            </Box>
            <form autoComplete='off'
              onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <Typography variant='h5'>Enter your Email and password</Typography>
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
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                  />

                </div>
              )}
              {step === 2 && (
                <div>
                  <Typography variant='h5'>Basic info :</Typography>
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
                </div>

              )}
              <div>
                {step !== 1 && (
                  <Button onClick={prevStep} variant="contained" sx={{ mr: 2, background: "#4458BE" }}>
                    Previous
                  </Button>
                )}
                {step < 2 ? (
                  <Button onClick={nextStep} variant="contained" sx={{ width: '100%', background: "#4458BE", textTransform: 'none', fontSize: 18, fontWeight: 'bold' }} >
                    Continue with email
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
                          Sign Up
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
                label="First Name"
                id="firstname"
                value={formData.firstname}
                name="firstname"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                required
                type="text"
                autoComplete='off'
                label="Last Name"
                id="lastname"
                value={formData.lastname}
                name="lastname"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                required
                type="text"
                autoComplete='off'
                label="Email"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                required
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
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
                    type="submit"
                  > Sign Up </Button>
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
            {
              isGoogleLoading ? (
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
                  onClick={signInWithGoogle}
                  sx={{ textTransform: 'none', fontSize: '18px', display: "flex", backgroundColor: 'lightgrey', color: 'black', fontWeight: 'bold' }}
                >
                  <img
                    src='https://res.cloudinary.com/nell1818/image/upload/v1657942104/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13_tw4sqd.png'
                    height={20}
                    alt='googleLogo'
                    className='googleLogo'
                  />Continue with Google</Button>
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
            <p className="py2">Already have an Account? <sapn onClick={handleSignInClick} style={{ cursor: "pointer" }} className='underline' >Sign In</sapn></p>
          </Paper>
        </Box>
        {
          error.status ?
            <SnackbarOpen
              message={error.message}
              useOpen={() => [error, setError]}
              color={error.type}
            /> :
            ""
        }
      </div>
    </PublicLayout>
  )
}







export default SignupForm
