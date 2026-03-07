import { Card } from '@mui/joy';
import { Avatar, Box, Grid, Skeleton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Dish } from '../../classes';
import { MenuCardSkeleton } from '../skeleton';
import { AttachMoneyRounded } from '@mui/icons-material';



const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


export default function RelatedDish() {

  const [dishes, setDishes] = useState([])
  const [isLoading, setIsloading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const { id, type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (type) {
        setIsloading(true);
        const dishClass = new Dish();
        const result = await dishClass.getByCategory(type);
        const relatedData = result.filter((ele) => ele.id !== id);
        setDishes(relatedData);
        setIsloading(false);
      }
    })();
  }, [type, updated]);

  const handleOnClick = (dish) => {
    navigate(`/hot-dog-kings/menu/${type}/${dish.id}`)
  }



  return (
    <div>
      {
        isLoading ? (
          <>
            <Grid container spacing={2} sx={{ marginRight: "2px" }}>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={40} width={250} />
              </Grid>
              <Grid item xs={4}>
                <MenuCardSkeleton />
              </Grid>
              <Grid item xs={4}>
                <MenuCardSkeleton />
              </Grid>
              <Grid item xs={4}>
                <MenuCardSkeleton />
              </Grid>
            </Grid>
          </>
        ) : (
          <>

            <Typography style={{ padding: '10px', fontSize: "30px", fontWeight: 700 }}>More like this</Typography>
            {
              dishes.length ? (
                <>
                  <Carousel responsive={responsive}>
                    {dishes.map((dish, key) => {
                      return (
                        <div key={key} className="related_dish_card" onClick={() => handleOnClick(dish)}>
                          <Card>
                            <img src={dish.imageUrl} />
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 3,
                                px: 3,
                              }}
                            >
                              <Typography key={dish.name}  textAlign='center' sx={{}}>
                                {dish.name}
                              </Typography>
                            </Box>
                            <div className='show_price'>
                              <Tooltip title="Price">
                                <Avatar
                                  sx={{
                                    backgroundColor: 'transparent',
                                    position: 'absolute',
                                    top: { xs: -46, md: -30 },
                                    left: { xs: -25, md: -9 },
                                    p: .5,
                                    color: 'success',
                                    borderColor: 'success',
                                    borderWidth: 2
                                  }}
                                >
                                  <AttachMoneyRounded fontSize='small' sx={{ mr: -.5, }} color='success' />
                                  <Typography color='success' fontWeight='500'>{dish.price}</Typography>
                                </Avatar>
                              </Tooltip>
                            </div>
                          </Card>
                        </div>
                      )
                    })}
                  </Carousel>
                </>
              ) : (

                <Typography
                  variant='h6'
                  textAlign="center"

                >
                  No related dishes yet
                </Typography>
              )
            }
          </>
        )
      }


    </div>
  )
}
