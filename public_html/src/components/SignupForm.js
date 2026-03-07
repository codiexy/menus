
import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Paper } from '@mui/material';
import { object, string } from "yup";
import { toast } from 'react-toastify';

import { UserAuth } from '../context/AuthContext';
import { PublicLayout } from './layouts';

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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const { signUpWithGoogleProvider, signUpWithEmailAndPassword, user, useLoginPopup } = UserAuth();
  const [loginPopupShow, setLoginPopupShow] = useLoginPopup();
  const location = useLocation();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    const result = await signUpWithGoogleProvider();
    toast(result.message, { type: result.status ? "success" : "error" });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast(loginRes.message, { type: loginRes.status ? "success" : "error" });
        setFormData(defaultFormData);
      } else {
        toast(result.errors.shift(), { type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      toast(error.message, { type: "error" });
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
              sx={{ mb: 4 }}
              boxShadow
            >
              <h2>Join Hot Dog King's Menuverse!</h2>
              <p>Receive exclusive content, discounts & rewards!</p>
            </Box>
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
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  variant='outlined'
                >Loading...</Button>
              ) : (
                <Button
                  color='secondary'
                  fullWidth
                  variant='outlined'
                  onClick={signInWithGoogle}
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                >
                  <img
                    src='https://res.cloudinary.com/nell1818/image/upload/v1657942104/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13_tw4sqd.png'
                    height={20}
                    alt='googleLogo'
                    className='googleLogo'
                  />Continue with Google</Button>
              )
            }
            <p className="py2">Already have an Account? <sapn onClick={handleSignInClick} className='underline'>Sign In</sapn></p>
          </Paper>
        </Box>
      </div>
    </PublicLayout>
  )
}







export default SignupForm
