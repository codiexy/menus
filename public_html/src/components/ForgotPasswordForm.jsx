// import { ButtonRoot } from '@mui/joy/Button/Button'
import { Box, TextField, Typography, Paper, Button } from '@mui/material'
import React from 'react'
// import MenuFooter from './MenuFooter'

export default function ForgotPasswordForm() {
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
            <Typography color='gray' sx={{ fontSize: 18, mb: 1 }} >Recover Account</Typography>
            <Typography sx={{ fontSize: 30, fontWeight: '900' }}>Forgot your password?</Typography>
            <Typography color='gray' sx={{ fontSize: 16, mb: 3 }} >Enter your email address below we'll get you back on track.</Typography>
            <Typography>Enter your email</Typography>
            <form
              autoComplete='off'
            // onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                fullWidth
                required
                label="Email"
                type="password-recovery"
                id="password-recovery"
                name="password-recovery"
              />
              <Button
                color='secondary'
                fullWidth
                sx={{ mt: 2, textTransform: 'none', fontSize: '18px' }}
                variant='contained'
                type="submit">
                Send reset link
              </Button>
            </form>
          </Paper>
        </Box>
      </div>

  )
}
