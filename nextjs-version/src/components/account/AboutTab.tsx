
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  Card,
  Typography,
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Button
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { PropertyList } from './propertyList';
import { PropertyListItem } from './propertyListItem';
import { RWebShare } from "react-web-share";
import { BASE_URL } from '@/constants';
import { FacebookRounded, InsertLinkRounded, ShareRounded } from '@mui/icons-material';
import RestaurantMap from './RestaurantMap';
import Link from 'next/link';
import { useTenant } from '@/context/TenantContext';



export default function AboutTab(props: any) {
  const { tenant, tenantSlug } = useTenant();

  const { address1, address2, country, isVerified, phone, state, ...other } = props;

  return (

    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d106603.29395973955!2d-84.65193328333751!3d33.38795527345576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1697701238348!5m2!1sen!2sin" width="400" height="300" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe> */}

        <Card {...other} sx={{ p: 3, width: 550 }} >
          <Box sx={{ p: 3, textAlign: "center" }} >
            <Typography className='menuName' variant='h4'>{tenant.name} Info</Typography>
          </Box >
          <PropertyList>
            <PropertyListItem
              label="Cusine"
              value={tenant.cuisine}
            />
            <PropertyListItem
              label="Phone"
              value={tenant.phoneNumber}
            />
            <PropertyListItem
              label="Address"
              value={tenant.address}
            />
          </PropertyList>
          <Box sx={{ p: 3 }} >
            <div className="accountListItems">
              <Typography variant='h6'>Working Hours</Typography>
              {
                tenant.workingHours?.length ? (
                  <>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Day</TableCell>
                          <TableCell>Open Time</TableCell>
                          <TableCell>Close Time</TableCell>
                        </TableRow>
                      </TableHead>
                      {
                        tenant.workingHours.map((ele: any, key: number) => {
                          return (
                            <>
                              <TableBody key={key}>
                                <TableCell>{ele.day}</TableCell>
                                {
                                  ele.openTime && ele.closeTime ? (
                                    <>
                                      <TableCell>{ele.openTime}</TableCell>
                                      <TableCell>{ele.closeTime}</TableCell>
                                    </>
                                  ) : (
                                    <TableCell colSpan={2} sx={{ textAlign: "center", color: "green" }}>Closed</TableCell>
                                  )
                                }
                              </TableBody>
                            </>
                          )
                        })
                      }

                    </Table>
                  </>
                ) : (
                  "No working hours updated"
                )
              }
            </div>
          </Box >
          <Box sx={{ p: 3, textAlign: "center" }} >

            <Typography className='menuName' sx={{ mb: 4, }} >Connect with us</Typography>
            <Typography color='secondary' className='socialMedia' sx={{ mt: 3, }} >
              <a href={tenant.instagram} target="_blank" rel="noreferrer noopener">
                <InstagramIcon color="disabled" />
              </a>
              <a href={tenant.facebook} target="_blank" rel="noreferrer noopener">
                <FacebookRounded color="disabled" sx={{ ml: 2 }} />
              </a>
              <a href={tenant.website} target="_blank" rel="noreferrer noopener">
                <InsertLinkRounded color="disabled" sx={{ ml: 2 }} />
              </a>
              <RWebShare
                data={{
                  text: `${tenant.name} live menu link!`,
                  url: `${BASE_URL}${tenantSlug}/menu`,
                  title: `${tenant.name} Live Menu`,
                }}
              // onClick={() => console.log("shared successfully!")}
              >
                <span style={{ cursor: "pointer" }}><ShareRounded sx={{ ml: 1 }} color="disabled" /></span>
              </RWebShare>
            </Typography>
          </Box>
          <Box>
            <RestaurantMap restaurant={tenant} />
          </Box>
        </Card>
      </Box>
      {/* {tenant ? (

      ) : (
        <h3 className='menuHeaderNone'>No details to show. Go to your <Link href="/profile" className='underline'>Account</Link> to add details.</h3>
      )} */}

    </>
  )
}




// MenuHeader.propTypes = {
//   address1: PropTypes.string,
//   address2: PropTypes.string,
//   country: PropTypes.string,
//   // email: PropTypes.string.isRequired,
//   isVerified: PropTypes.bool.isRequired,
//   phone: PropTypes.string,
//   state: PropTypes.string
// };






