import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  Card,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import InsertLinkSharpIcon from '@mui/icons-material/InsertLinkSharp';
import { PropertyList } from '../components/property-list';
import { PropertyListItem } from '../components/property-list-item';
import { Link } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import { RWebShare } from "react-web-share";
import { APP_NAME, BASE_URL } from '../constants';


import { Restaurant } from '../classes'


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
      {restaurant ? (
      
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <Card {...other} sx={{ p: 3, }} >
              <Box sx={{ p: 3 }} >
                <Typography className='menuName' variant='h4'>{restaurant.name} Info</Typography>
              </Box >
              <PropertyList>
                <PropertyListItem
                  divider
                  label="Cusine"
                  value={restaurant.cuisine}
                />
                <PropertyListItem
                  divider
                  label="Phone"
                  value={restaurant.phoneNumber}
                />
                <PropertyListItem
                  divider
                  label="Address"
                  value={restaurant.address}
                />
                <Box>
                  <Box sx={{ p: 3, }} >

                    <Typography className='menuName' variant='body' sx={{ mb: 4, }} >Connect with us</Typography>
                    <Typography color='secondary' className='socialMedia' sx={{ mt: 3, }} >
                      <a href={restaurant.instagram} target="_blank" rel="noreferrer noopener">
                        <InstagramIcon color="disabled"  />
                      </a>
                      <a href={restaurant.facebook} target="_blank" rel="noreferrer noopener">
                        <FacebookIcon color="disabled" sx={{ ml: 2 }} />
                      </a>
                      <a href={restaurant.website} target="_blank" rel="noreferrer noopener">
                        <InsertLinkSharpIcon color="disabled" sx={{ ml: 2 }} />
                      </a>
                      <RWebShare
                        data={{
                          text: `${APP_NAME} live menu link!`,
                          url: `${BASE_URL}hot-dog-kings/menu`,
                          title: `${APP_NAME} Live Menu`,
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <span style={{ cursor: "pointer" }}><ShareIcon sx={{ ml: 1 }} color="disabled" /></span>
                      </RWebShare>
                    </Typography>
                  </Box>
                </Box>

              </PropertyList>

            </Card>
          </Box>
      ) : (
        <h3 className='menuHeaderNone'>No details to show. Go to your <Link to="/profile" className='underline'>Account</Link> to add details.</h3>
      )}
    </>
  )
}




MenuHeader.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string
};






