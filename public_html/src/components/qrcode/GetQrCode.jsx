
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import RenderQrCode from './RenderQrCode'

export default function GetQrCode() {
  return (
    <Box sx={{ m: 3, maxWidth: 500 }} >
      <Typography variant="h4" fontWeight={700} sx={{ mt: 3, mb: 3 }} >
        QR Code
      </Typography>
      <form>
        <TextField
          margin="normal"
          fullWidth
          required
          label="URL for menu page is inserted here"
          type="qrcode"
          id="qrcode"
          name="pw"
        />
        <Button
          color='secondary'
          fullWidth
          sx={{ mt: 2, textTransform: 'none', fontSize: '18px' }}
          variant='contained'
          type="submit">
          Get QR Code
        </Button>
      </form>
      <RenderQrCode />
    </Box>


  )
}
