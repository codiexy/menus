import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Restaurant } from '../../classes'
import { RWebShare } from "react-web-share";
import { BASE_URL } from '../../constants';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FacebookRounded, InsertLinkRounded, SendRounded } from '@mui/icons-material';
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
      <Box sx={{ width: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
        <Paper sx={{ borderRadius: 6, p: 1 }} elevation={5} >
          <a href={restaurant.instagram} target="_blank" rel="noreferrer noopener">
            <InstagramIcon color="disabled" fontSize='large' />
          </a>
          <a href={restaurant.facebook} target="_blank" rel="noreferrer noopener">
            <FacebookRounded color="disabled" fontSize='large' sx={{ ml: 2 }} />
          </a>
          <a href={restaurant.website} target="_blank" rel="noreferrer noopener">
            <InsertLinkRounded color="disabled" fontSize='large' sx={{ ml: 2 }} />
          </a>
          <RWebShare
            data={{
              text: `${restaurant.name} live menu link!`,
              url: `${BASE_URL}hot-dog-kings/menu`,
              title: `${restaurant.name} Live Menu`,
            }}
            // onClick={() => console.log("shared successfully!")}
          >
            <span style={{ cursor: "pointer" }}><SendRounded sx={{ ml: 1 }} color="disabled" fontSize='large' /></span>
          </RWebShare>
        </Paper>
      </Box>
    </>
  )
}














