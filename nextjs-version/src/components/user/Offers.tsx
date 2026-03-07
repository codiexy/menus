import { LocalOfferRounded } from '@mui/icons-material'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'

function Offers() {
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalOfferRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Offers" secondary="Available offers and coupons." />
        </ListItem>
        <Divider />
      </List>
    </>
  )
}

export default Offers