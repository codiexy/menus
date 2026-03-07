import React from 'react'
import Box from '@mui/material/Box';
import {
  Typography
} from '@mui/material';
import { useTenant } from '@/context/TenantContext';


export default function RestaurantName() {
  const { tenant } = useTenant();

  return (
    <>
      <Box sx={{ width: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'  }} >
        <Typography className='menuName' variant='h4' color= 'disabled' 
          sx={{ fontSize: { xs: '25px', md: '30px' } }}>
          {tenant.name}
        </Typography>
      </Box>
    </>
  )
}















