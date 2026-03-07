// import { ButtonRoot } from '@mui/joy/Button/Button'
import { Box, TextField, Typography, Paper, Button, Divider } from '@mui/material'
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import TenantLink from '../miscellaneous/TenantLink';
import RestaurantName from '../miscellaneous/RestaurantName';

export default function ForgotPasswordForm() {
  const { auth, tenantSlug, setSnackbar } = useAuth();
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSnackbar(true, "Please check your email!");
      router.push(`/${tenantSlug}/login`);
    } catch (error: any) {
      let message = "Something went wrong!";
      if (error.code == "auth/user-not-found") {
        message = "Email not found!";
      }
      setSnackbar(false, message);
    }
  };


  return (
    <div className="login-container">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 500, mt: 8 }}
        maxWidth="500px"
      >
        <Paper
          elevation={3} sx={{ width: "100%", p: "1rem" }}
        >
          <Typography color='gray' sx={{ fontSize: 18, mb: 1 }} ><RestaurantName /></Typography>
          <Typography sx={{ fontSize: 30, fontWeight: '900' }}>Forgot your password?</Typography>
          <Typography color='gray' sx={{ fontSize: 16, mb: 3 }} >Enter your email address below we&lsquo;ll get you back on track.</Typography>
          <Typography>Enter your email</Typography>
          <form
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              fullWidth
              required
              label="Email"
              type="email"
              id="password-recovery"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type='submit'
              color='secondary'
              fullWidth
              sx={{ mt: 2, textTransform: 'none', fontSize: '18px' }}
              variant='contained'
            >
              Send reset link
            </Button>
          </form><Box
            sx={{
              mt: 2,
            }}
          >
            <Divider>or</Divider>
          </Box>
          <div className="login-footer">
            <p className='pp'><TenantLink href="/login" className='underline text-danger'>Login</TenantLink></p>
            <p className='t-c'><TenantLink href="/signup" className='underline'>Sign Up</TenantLink></p>
          </div>
          <Divider
            sx={{ mt: 1 }}
          />
          <div className="login-footer">
            <p className='pp'>Privacy Policy</p>
            <p className='t-c'>Terms of Use</p>
          </div>
        </Paper>
      </Box>
    </div>

  )
}
