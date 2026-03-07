import { LocalActivityRounded } from '@mui/icons-material'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'

 function Activity() {
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
            <LocalActivityRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Activity" secondary="All recent activity." />
        </ListItem>
        <Divider />
      </List>
    </>
  )
}

export default Activity