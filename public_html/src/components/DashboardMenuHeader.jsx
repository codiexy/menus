import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Avatar, Card, CircularProgress, Tooltip, Button, Typography, Skeleton } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { storage } from '../firebase'
import { Restaurant } from '../classes';

export default function DashboardMenuHeader() {
  const [restaurant, setRestaurant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const restaurantClass = new Restaurant();
      const result = await restaurantClass.get()
      if (result.status) {
        setRestaurant(result?.data[0] || false);
      }
      setIsLoading(false);
    })();
  }, [updated]);

  const handleChange = async (event) => {
    try {
      const { files, name } = event.target;
      const input = files[0];
      if (!input) toast(`File not selected!`, { type: "warning" });
      setIsLoading(true);
      const imageRef = ref(storage, `/restaurantLogo/${Date.now()}${input.name}`);
      const snapshot = await uploadBytes(imageRef, input);
      if (snapshot?.ref) {
        const url = await getDownloadURL(snapshot.ref);
        if (url) {
          const restaurantClass = new Restaurant();
          const result = await restaurantClass.update(restaurant.id, {
            [name]: url
          });
          toast(result.message, { type: result.status ? "success" : "error" });
          if (result.status) {
            setUpdated(!updated);
          }
        } else {
          toast("Invalid image snapshot reference!", { type: "error" });
        }
      } else {
        toast("File not uploaded!", { type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.message, { type: "error" });
    }
  }

  return (
    <div className={`menuHeader`}>
      {
        isLoading ? (<>
          <Grid container spacing={0}
          >
            <Card
              sx={{
                width: "100%",
                height: "201px",
                position: "relative",
                textAlign: "center",
                boxShadow: "none"
              }}
            >
              <Skeleton width="100%" height="300px" animation="wave" variant="rectangular" />
              <Tooltip title={`Update cover photo`} arrow>
                <Skeleton
                  width="30%"
                  height={30}
                  animation="wave"
                  variant="rectangular"
                  sx={{
                    position: 'absolute',
                    top: 15,
                    right: 5,
                    textTransform: 'none'
                  }}
                />
              </Tooltip>
            </Card>
            <label
              htmlFor="imageUrl"
              style={{
                position: 'relative',
                zIndex: 1,
                top: -60,
                left: 0,
                right: 0,
                margin: '0 auto',
                cursor: "pointer"
              }}
            >
              <Skeleton width={145} height={145} animation="wave" variant="circular" />
            </label>
          </Grid>
        </>
        ) : (
          <>
            {
              restaurant ? (
                <Grid container spacing={0} 
                height='320px'
                >
                  <Card sx={{ width: "100%", height: "235px", position: "relative", textAlign: "center" }}
                  >
                    <img
                      width="100%"
                      height="235px"
                      alt={restaurant.name}
                      src={restaurant.bgImage ? restaurant.bgImage : "/dish-612x612.jpg"}
                    />
                    <Tooltip title={`Update cover photo`} arrow>
                      <Button
                        sx={{
                          position: 'absolute',
                          top: 15,
                          right: 5,
                          backgroundColor: '#fff',
                          textTransform: 'none'
                        }}
                        aria-label="upload picture" component="label"
                        startIcon={<PhotoCamera />}
                        variant='contained'
                        color='common'
                      >
                        <input hidden name="bgImage" accept="image/*" type="file" onChange={handleChange} />
                        <Typography variant='body1' color='common'>Update cover photo</Typography>
                      </Button>
                    </Tooltip>
                  </Card>
                  <label
                    htmlFor="imageUrl"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      top: -120,
                      left: 0,
                      right: 0,
                      margin: '0 auto',
                      cursor: "pointer"
                    }}

                  >
                    <Avatar
                      className='menuImg'
                      alt={restaurant.name}
                      src={restaurant.imageUrl}
                      sx={{
                        width: { xs: 180 },
                        height: { xs: 180 },
                        borderWidth: 4,
                      }}
                    />
                    <input hidden name="imageUrl" id="imageUrl" accept="image/*" type="file" onChange={handleChange} />
                  </label>
                </Grid>
              ) : (
                <h3 className='menuHeaderNone'>No details to show. Go to your <Link to="/profile" className='underline'>Account</Link> to add details.</h3>
              )
            }
          </>
        )
      }
    </div>
  )
}