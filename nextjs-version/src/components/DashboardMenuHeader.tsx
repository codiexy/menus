import React, { useState } from 'react';
import { Grid, Avatar, Card, Tooltip, Typography, Skeleton, CardMedia } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Link from 'next/link';
import { useTenant } from '@/context/TenantContext';
import { SiteButton } from './miscellaneous';
import useFileStorage from '@/lib/useFileStorage';
import Image from 'next/image';

export default function DashboardMenuHeader() {
  const { tenant, updateTenant, setSnackbar } = useTenant();
  const [updated, setUpdated] = useState(false);
  const { loading, upload } = useFileStorage();


  const handleChange = async (event: any) => {
    try {
      const { files, name } = event.target;
      const input = files[0];
      if (!input) setSnackbar(false, `File not selected!`);

      await upload(input, (name == "bgImage" ? "banner" : "logo"), (url: string) => {
        // Update tenant images
        updateTenant({
          [name]: url
        });
        setSnackbar(true, "Image updated successfully!");
        setUpdated(!updated);
      });
    } catch (error: any) {
      setSnackbar(true, error.message);
    }
  }

  return (
    <>
      <div className={`menuHeader`}>
        {
          loading ? (<>
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
                tenant ? (
                  <Grid container spacing={0}
                    height='400px'
                  >
                    <Card
                      sx={{
                        mt: 2,
                        width: "100%",
                        height: "280px",
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: { md: 8 },
                        BorderColor: "none",
                        position: "relative"
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={tenant.name}
                        image={tenant.bgImage || "/menu-placeholder.jpeg"}
                        sx={{
                          width: "100%",
                          height: "280px",
                        }}
                      />
                      <Tooltip title={`Update cover photo`} placement='right'>

                        <SiteButton
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            backgroundColor: '#4458BE',
                            textTransform: 'none',
                            borderRadius: 3,
                            display: "flex"
                          }}
                          aria-label="upload picture" component="label"
                          // startIcon={<PhotoCamera sx={{ color: 'white' }} />}
                          variant='contained'
                          color='primary'
                        >
                          <PhotoCamera sx={{ color: 'white' }} />
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
                          cursor: "pointer",
                        }}

                      >
                        <Avatar
                          className='menuImg'
                          alt={tenant.name}
                          src={tenant.imageUrl}
                          sx={{
                            width: { xs: 140 },
                            height: { xs: 140 },
                            borderWidth: 4,
                            background: "#fff"
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
                          <PhotoCamera sx={{ cursor: "pointer", fontSize: 28 }} />
                        </Avatar>
                      </label>
                    </Tooltip>
                  </Grid>
                ) : (
                  <h3 className='menuHeaderNone'>No details to show. Go to your <Link href="/profile" className='underline'>Account</Link> to add details.</h3>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}