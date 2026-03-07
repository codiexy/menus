import { Card } from '@mui/joy';
import { Grid, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useParams } from 'react-router-dom';
import { Dish } from '../../classes';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MenuCardSkeleton } from '../skeleton';



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

            <Typography style={{ padding: '10px', fontSize: "30px" }}>Related Dishes</Typography>
            {
              dishes.length ? (
                <>
                  <Carousel responsive={responsive}>
                    {dishes.map((dish, key) => {
                      return (
                        <div key={key} className="related_dish_card">
                          <Card>
                            <img src={dish.imageUrl} />
                            <Typography variant="caption" textAlign='center' sx={{ fontSize: '20px', mt: 1, ml: -2, fontWeight: '900' }}>
                              {dish.name}
                            </Typography>
                            <Typography variant='soft' textAlign='center'
                              sx={{
                                background: 'none',
                                fontSize: '20px',
                                color: 'GrayText',
                                display: 'flex',
                                justifyContent: 'center'
                              }} >
                              <AttachMoneyIcon /> {dish.price}
                            </Typography>
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
                  No related dish found
                </Typography>
              )
            }
          </>
        )
      }


    </div>
  )
}
