import React, { useState, useEffect } from 'react'
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Card, CardOverflow } from '@mui/joy';
import { PermMediaRounded } from '@mui/icons-material';
import { MenuCardSkeleton } from '../skeleton';
import { Box } from '@mui/material';
import Dish from '@/classes/Dish';
import { useAuth } from '@/context/AuthContext';
import TenantLink from '../miscellaneous/TenantLink';
import Image from 'next/image';



function Media() {
  const { tenantId,tenantSlug } = useAuth();
  const [dishes, setDishes] = useState<any>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const dishClass = new Dish(tenantId);
      const resultPublish = await dishClass.getPublishDish();
      setDishes(resultPublish);
      setIsloading(false);
    })();
  }, [tenantId]);




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
                        dishes.map((dish: any, key: number) => {
                          return (
                            <Grid item mb={5} md={4} key={key} className='media_image_col'>
                              <Box>
                                <TenantLink href={`/${dish.id}`} className='menuLink'>
                                  <CardOverflow>
                                    <Card
                                      sx={{ borderRadius: 2 }}
                                    >
                                      <Image
                                        src={dish.imageUrl}
                                        alt=""
                                        height={200}
                                        width={300}
                                        style={{
                                          objectFit: "cover",
                                          borderRadius: "10px"
                                        }}
                                      />
                                    </Card>
                                  </CardOverflow>
                                </TenantLink>
                              </Box>

                              <Typography 
                                key={dish.name} 
                                component="p" 
                              >
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

