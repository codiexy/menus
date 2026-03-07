import { FileDownloadOutlined, ShortcutOutlined } from '@mui/icons-material'
import { Box, Card, IconButton, Tooltip } from '@mui/material'
import React from 'react'

export default function RenderQrCode() {
  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Card sx={{
          borderStyle: 'solid',
          borderWidth: 2,
          height: 300,
          maxWidth: 500,
          mt: 5
        }}
        >
          {/* /if statement will go in here
          /if no qr code has been requested, then show statement "no qr code yet" */}
        </Card>
        <Box>
        <Tooltip title='download qr code' arrow>
        <IconButton aria-label="download" >
          <FileDownloadOutlined  sx={{ fontSize: 30 }}  />
        </IconButton>
        </Tooltip>
        <Tooltip title='share qr code' arrow>
        <IconButton aria-label="share" >
          <ShortcutOutlined  sx={{ fontSize: 30 }}  />
        </IconButton>
        </Tooltip>
        </Box>
      </Box>

  )
}
