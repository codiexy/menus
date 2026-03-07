
import { Box, Card } from '@mui/material'
import React from 'react'
import QRCode from 'qrcode.react';


export default function RenderQrCode({ value, ref, id }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Card sx={{
        padding: '5px',
        borderStyle: 'solid',
        borderWidth: 1,
        mt: 5,
        height: "300px",
        width: "300px"

      }}
      >
        {
          value ? (
            <QRCode
              id={id}
              ref={ref}
              title={value}
              value={value}
              size={300}
              bgColor="#9c27b0"
              fgColor='white'
              imageSettings={{
                src: "/images/favicon.png",
                height: 45,
                width: 45,
                excavate: true,
              }}
            />
          ) : "No QR Code Generate Yet !"
        }
      </Card>

    </Box >

  )
}
