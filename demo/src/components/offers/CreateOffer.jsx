import { AddRounded } from '@mui/icons-material'
import { Box, Tooltip, Typography, Button } from '@mui/material'
import React from 'react'

export default function CreateOffer() {
  return (
    <div className='container'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <Typography variant='h4' sx={{ fontWeight: 700 }} color='gray'>
          Offers
        </Typography>
        <Tooltip title='Create new dish' placement='top' >
          <Button
            variant='contained'
            color='secondary'
            // onClick={handleClickOpen}
            sx={{ textTransform: 'none', backgroundColor: '#4458BE', borderRadius: 3 }}
            startIcon={<AddRounded />}
          >
            <Typography>Create offer</Typography>
          </Button>
        </Tooltip>
      </Box>
    </div>
  )
}