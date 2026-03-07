import { FeedbackRounded } from '@mui/icons-material'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'

export default function GetFeedback() {
  return (
    <div>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          mb: 3,
          ml: 3
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FeedbackRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Feedback" secondary="View feedback submissions from your menu, google reviews and intergrations." />
        </ListItem>
      </List>

    </div>
  )
}
