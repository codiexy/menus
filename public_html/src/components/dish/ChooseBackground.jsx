import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'


export default function ChooseBackground() {
  return (
    <Box sx={{ display: 'flex' }} >
      <Typography  fontWeight={700}>WITH</Typography>
      <Stack sx={{ display: 'flex', alignItems: 'center' }} >
        <Avatar
          src={'./whiteBackground.png'}
          alt='white'
          sx={{
            height: 125,
            width: 125,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgray',
            m: 1
          }}
        />
        <Typography>
          White
        </Typography>
      </Stack>
      <Typography  fontWeight={700}>OR</Typography>
      <Stack sx={{ display: 'flex', alignItems: 'center' }} >
        <Avatar
          src={'./transparentBackground.png'}
          alt='transparent'
          sx={{
            height: 125,
            width: 125, borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgray',
            m: 1
            
          }}
        />
        <Typography>
          Transparent
        </Typography>
      </Stack>
    </Box>
  )
}
