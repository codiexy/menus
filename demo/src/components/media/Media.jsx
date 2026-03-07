import React, { useState, useEffect } from 'react'
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Card, CardOverflow } from '@mui/joy';
import { PermMediaRounded } from '@mui/icons-material';
import { Dish } from '../../classes';
import { MenuCardSkeleton } from '../skeleton';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';



function Media() {

  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const dishClass = new Dish();
      const resultPublish = await dishClass.getPublishDish();
      setDishes(resultPublish);
      setIsloading(false);
    })();
  }, []);




  return (
    <>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          mb: 3,
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PermMediaRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Media" secondary="Store, share, and collaborate on menu images from your mobile device, tablet, or computer." />
        </ListItem>
      </List>
      {
        isLoading ? (
          <Grid item md={4}>
            <MenuCardSkeleton length={4} />
          </Grid>
        ) :
          <>

            {
              dishes.length ? (
                <>
                  <div className='media_image'>
                    <Grid container sx={{ mx: 5 }}>

                      {
                        dishes.map((dish, key) => {
                          return (
                            <Grid item md={4} key={key} className='media_image_col'>
                              <Box>
                                <Link to={`/hot-dog-kings/menu/${dish.id}`} className='menuLink'>
                                <CardOverflow>
                                  <Card
                                    sx={{ borderRadius: 2 }}
                                  >
                                    <img
                                      src={dish.imageUrl}
                                      alt=""
                                      style={{
                                        objectFit: "cover",
                                        width: "300px",
                                        height: '200px',
                                        borderRadius: "10px"
                                      }}
                                    />
                                  </Card>
                                </CardOverflow>
                                </Link>
                              </Box>

                              <Typography key={dish.name} variant="p" >
                                {dish.name}
                              </Typography>
                            </Grid>

                          )
                        })
                      }
                    </Grid>
                  </div>
                </>
              ) : (
                <Typography>Data not found</Typography>
              )
            }
          </>
      }

    </>
  )
}

export default Media

