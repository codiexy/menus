import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import { Divider, Skeleton } from '@mui/material';
import RestaurantName from './miscellaneous/RestaurantName';
import { Link } from 'react-router-dom';
import RestaurantShareIcons from './miscellaneous/RestaurantShareIcons'
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
    if (type === 'logo') {
      setIsLogoLoading(false);
    } else {
      setIsBgLoading(false)
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
                    // mt: 4,
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
                    left: { xs: 0, md: -265 },
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
                        mt: 2,
                        width: "100%",
                        height: "280px",
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: { md: 8 },
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
                        left: { xs: 0, md: -265 },
                        right: 0,
                        margin: '0 auto',
                        border: "none"
                      }}
                    />)}
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4} sx={{
                          width: { xs: 125, md: 150 },
                          height: { xs: 125, md: 150  },
                          position: 'relative',
                          zIndex: 1,
                          top: -75,
                          left: { xs: 3, md: 80 },
                          mb: { xs: -7, md: -3 },
                          right: 0,
                          margin: '0, auto',
                        }} >
                        <Avatar
                        onLoad={() => handleLoading('logo')}
                        className='menuImg'
                        alt={restaurant.name}
                        src={restaurant.imageUrl}
                        sx={{
                          width: { xs: 100, md: 168  },
                          height: { xs: 100, md: 168 },
                          borderWidth: 3,
                          borderColor: 'lightgray',
                          display: isLogoLoading ? 'none' : 'block',
                          justifyContent: {xs: 'center'}
                        }}
                        style={{
                          objectFit: "contain",
                      }}
                      />
                      </Grid>
                      <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <RestaurantName />
                      </Grid>
                      <Grid item xs={12} md={4} sx={{ display: {xs: 'none', md: 'flex'},}}  >
                        <RestaurantShareIcons />
                      </Grid>
                    </Grid>
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
        <Divider variant='middle' sx={{ mb: 2 }}/>
      </Box>

    </div>
  )
}










