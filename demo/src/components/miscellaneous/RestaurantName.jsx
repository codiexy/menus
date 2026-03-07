import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import {
  Typography
} from '@mui/material';
import { Restaurant } from '../../classes'
import { Paper } from '@mui/material';


export default function MenuHeader(props) {
  const [restaurant, setRestaurant] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  const { address1, address2, country, email, isVerified, phone, state, ...other } = props;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const restaurantClass = new Restaurant();
      const result = await restaurantClass.get()
      if (result.status) {
        setRestaurant(result?.data[0] || false);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Box sx={{ width: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'  }} >
        <Typography className='menuName' variant='h4' color= 'disabled' 
          sx={{ fontSize: { xs: '25px', md: '30px' } }}>
          {restaurant.name}
        </Typography>
      </Box>
    </>
  )
}















