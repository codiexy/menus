import { LocalOfferRounded } from '@mui/icons-material'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import CreateOffer from './CreateOffer'

export default function OffersPage() {
  return (
    <div>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          my: 3,
          ml:3
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalOfferRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Offers" secondary="Create and send coupons to your foodies." />
        </ListItem>
      </List>
      <CreateOffer />
    </div>
  )
}
