import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  Card,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { PropertyList } from './property-list';
import { PropertyListItem } from './property-list-item';
import { Link } from 'react-router-dom';
import { RWebShare } from "react-web-share";
import { APP_NAME, BASE_URL } from '../../constants';
import { Restaurant } from '../../classes'
import { FacebookRounded, InsertLinkRounded, ShareRounded } from '@mui/icons-material';
import RestaurantMap from './RestaurantMap';


export default function MenuHeader(props) {
  const [restaurant, setRestaurant] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const { address1, address2, country, email, isVerified, phone, state, ...other } = props;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const restaurantClass = new Restaurant();
      const result = await restaurantClass.get();
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

          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d106603.29395973955!2d-84.65193328333751!3d33.38795527345576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1697701238348!5m2!1sen!2sin" width="400" height="300" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe> */}

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
                      <InstagramIcon color="disabled" />
                    </a>
                    <a href={restaurant.facebook} target="_blank" rel="noreferrer noopener">
                      <FacebookRounded color="disabled" sx={{ ml: 2 }} />
                    </a>
                    <a href={restaurant.website} target="_blank" rel="noreferrer noopener">
                      <InsertLinkRounded color="disabled" sx={{ ml: 2 }} />
                    </a>
                    <RWebShare
                      data={{
                        text: `${APP_NAME} live menu link!`,
                        url: `${BASE_URL}hot-dog-kings/menu`,
                        title: `${APP_NAME} Live Menu`,
                      }}
                    // onClick={() => console.log("shared successfully!")}
                    >
                      <span style={{ cursor: "pointer" }}><ShareRounded sx={{ ml: 1 }} color="disabled" /></span>
                    </RWebShare>
                  </Typography>
                </Box>
              </Box>

            </PropertyList>
            <RestaurantMap restaurant={restaurant} />

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






