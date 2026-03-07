import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Skeleton, Typography } from '@mui/material';

import { Link } from 'react-router-dom';

import { Restaurant } from '../classes'

export default function MenuHeader() {
  const [restaurant, setRestaurant] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLogoLoading, setIsLogoLoading] = useState(true)
  const [isBgLoading, setIsBgLoading] = useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleLoading = (type = 'logo') => {
    console.log('dfsd')
    if (type === 'logo') {
      setIsLogoLoading(false);
    } else {
      setIsBgLoading(false)
    }
  }

  return (
    <div className={`menuHeader`}>
      <Box sx={{
        width: "100%"
      }}>
        <Grid container spacing={0}>
          {
            isLoading ? (
              <>
                <Card
                  sx={{
                    mt: 4,
                    borderRadius: { md: 10 },
                    width: "100%",
                    height: "280px",
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: "none"
                  }}
                >
                  <Skeleton width="100%" height="300px" animation="wave" variant="rectangular" />
                </Card>
                <Skeleton
                  className='menuImg'
                  animation="wave"
                  variant="circular"
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    top: -50,
                    left: 0,
                    right: 0,
                    margin: '0 auto',
                    border: "none"
                  }}
                />
                {/* <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: -5
                  }}
                >
                  <Typography className='menuName' variant='h2' sx={{ width: "50%" }}>
                    <Skeleton animation="wave" />
                  </Typography>
                </Grid> */}
              </>
            ) : (
              <>
                {restaurant ? (
                  <>
                    <Card
                      sx={{
                        mt: 4,
                        width: "100%",
                        height: "280px",
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: { md: 10 },
                        BorderColor: "none"
                      }}
                    >
                      {isBgLoading && <Skeleton width="100%" height="300px" animation="wave" variant="rectangular" />}
                      <CardMedia
                        onLoad={() => handleLoading('bg')}
                        component="img"
                        alt={restaurant.name}
                        image={restaurant.bgImage || "https://res.cloudinary.com/nell1818/image/upload/v1664811886/jason-leung-poI7DelFiVA-unsplash_xdbmur.jpg"}
                        sx={{
                          width: "100%",
                          height: "280px",
                          display: isBgLoading ? 'none' : 'block'
                        }}
                      />
                    </Card>
                    {isLogoLoading && (<Skeleton
                      className='menuImg'
                      animation="wave"
                      variant="circular"
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        top: -50,
                        left: 0,
                        right: 0,
                        margin: '0 auto',
                        border: "none"
                      }}
                    />)}
                    <Avatar
                      onLoad={() => handleLoading('logo')}
                      className='menuImg'
                      alt={restaurant.name}
                      src={restaurant.imageUrl}
                      sx={{
                        width: { xs: 140 },
                        height: { xs: 140 },
                        borderWidth: 4,
                        display: isLogoLoading ? 'none' : 'block',
                        position: 'relative',
                        zIndex: 1,
                        top: -65,
                        left: 0,
                        right: 0,
                        margin: '0 auto',
                      }}
                    />
                    {/* <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 2 }}
                    >

                    </Grid> */}
                  </>
                ) : (
                  <h3 className='menuHeaderNone'>No details to show. Go to your <Link to="/profile" className='underline'>Account</Link> to add details.</h3>
                )}
              </>
            )
          }
        </Grid>
      </Box>
    </div>
  )
}










