import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Avatar, Card, Tooltip, Button, Typography, Skeleton } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { storage } from '../firebase'
import { Restaurant } from '../classes';
import SnackbarOpen from './miscellaneous/SnackBar';
import { SiteButton } from './miscellaneous';

export default function DashboardMenuHeader() {
  const [restaurant, setRestaurant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState({ status: false, type: "", message: "" });


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
      if (!input) setError({ status: true, type: "warning", message: `File not selected!` });
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
          setError({ status: true, type: result.status ? "success" : "error", message: result.message, });
          if (result.status) {
            setUpdated(!updated);
          }
        } else {
          setError({ status: true, type: "error", message: "Invalid image snapshot reference!" });
        }
      } else {
        setError({ status: true, type: "error", message: "File not uploaded!" });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError({ status: true, type: "error", message: error.message });
    }
  }

  return (
    <>
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
                <Tooltip title={`Update cover photo`} >
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
                    <Card
                      sx={{
                        width: "100%",
                        height: "235px",
                        position: "relative",
                        textAlign: "center",
                        borderRadius: 8
                      }}
                    >
                      <img
                        width="100%"
                        height="235px"
                        alt={restaurant.name}
                        src={restaurant.bgImage ? restaurant.bgImage : "/menu-placeholder.jpeg"}
                      />
                      <Tooltip title={`Update cover photo`} placement='right'>

                        <SiteButton
                          sx={{
                            position: 'absolute',
                            top: 25,
                            right: 25,
                            backgroundColor: '#4458BE',
                            textTransform: 'none',
                            borderRadius: 3,
                            display: "flex"
                          }}
                          aria-label="upload picture" component="label"
                          startIcon={<PhotoCamera sx={{ color: 'white' }} />}
                          variant='contained'
                          color='common'
                        >
                          <PhotoCamera />
                          <input hidden name="bgImage" accept="image/*" type="file" onChange={handleChange} />
                          <Typography variant='body1' color='white'>Update cover photo</Typography>
                        </SiteButton>
                      </Tooltip>
                    </Card>
                    <Tooltip title='Update logo' placement='right-end' >
                      <label
                        htmlFor="imageUrl"
                        style={{
                          position: 'relative',
                          zIndex: 1,
                          top: -80,
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
                            width: { xs: 140 },
                            height: { xs: 140 },
                            borderWidth: 4,
                          }}
                        />
                        
                        <Avatar
                          sx={{
                            position: "absolute",
                            bottom: "25px",
                            right: "-5%",
                            background: '#4458BE',
                            color: "#fff",
                            '&:hover': {
                              background: '#4458BE',
                            },
                            zIndex: 1
                          }}
                          aria-label="upload picture"
                          component="label"
                        >
                          <input hidden name="imageUrl" id="imageUrl" accept="image/*" type="file" onChange={handleChange} />
                          <PhotoCamera sx={{ fontSize: 28 }} />
                        </Avatar>
                      </label>
                    </Tooltip>
                  </Grid>
                ) : (
                  <h3 className='menuHeaderNone'>No details to show. Go to your <Link to="/profile" className='underline'>Account</Link> to add details.</h3>
                )
              }
            </>
          )
        }
      </div>
      {
        error.status ?
          <SnackbarOpen
            message={error.message}
            useOpen={() => [error, setError]}
            color={error.type}
          /> :
          ""
      }
    </>
  )
}