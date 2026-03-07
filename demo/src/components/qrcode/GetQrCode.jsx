
import { FileDownloadRounded, QrCode2Rounded } from '@mui/icons-material';
import { Box, Button, TextField, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from '@mui/material'
import QRCode from 'qrcode.react';
import React, { useRef, useState } from 'react'
import { SiteButton, SnackBarOpen } from '../miscellaneous';
import RenderQrCode from './RenderQrCode'
import { ShareButton } from './ShareQrCode';

export default function GetQrCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');
  const canvasRef = useRef(null);
  const [error, setError] = useState({ status: false, type: "", message: "" });

  const generateQRCode = () => {
    if (!inputText) {
      setError({ status: true, type: "error", message: "Input field must be required !" });
      return;
    }
    setIsLoading(true);
    setQRCodeText(inputText);
    setIsLoading(false);
  }

  const downloadQR = async () => {
    try {
      if (!inputText) {
        setError({ status: true, type: "error", message: "Please Generate the QR code !" });
        return;
      }
      const canvas = document.getElementById('qr-canvas');
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${inputText}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error(error);
    }
  };


  return (
    <>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          mb: 3
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <QrCode2Rounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="QR Code" secondary="Create table tops and share handless menus for your patrons." />
        </ListItem>
      </List>
      <Box sx={{
        m: 3,
        // display: "flex",
        // justifyContent: "space-around",
        background: "#f9f6f6",
        borderRadius: '10px', padding: '20px'
      }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <div>
              <Typography variant="h4" fontWeight={700} sx={{ mt: 3, mb: 3 }} >
                Generate QR Code
              </Typography>
              <form>
                <TextField
                  onChange={e => setInputText(e.target.value)}
                  margin="normal"
                  fullWidth
                  required
                  label="URL for menu page is inserted here"
                  type="qrcode"
                  id="qrcode"
                  name="inputtext"
                />
                <SiteButton
                  onClick={generateQRCode}
                  color='secondary'
                  fullWidth
                  sx={{ mt: 2, textTransform: 'none', fontSize: '18px', display: "flex" }}
                  variant='contained'
                  type="button">
                  Get QR Code
                </SiteButton>
              </form>

              <SiteButton
                endIcon={<FileDownloadRounded />}
                id="qrCodeEl"
                onClick={downloadQR}
                disabled={!qrCodeText}
                color='secondary'
                fullWidth
                sx={{ mt: 2, textTransform: 'none', fontSize: '18px', display: "flex" }}
                variant='contained'
                type="button">
                Download
              </SiteButton>
              <ShareButton
                value={qrCodeText}
              />
            </div>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={5}>
            <div>
              <RenderQrCode value={qrCodeText} ref={canvasRef} id="qr-canvas" />
            </div>
          </Grid>
        </Grid>



      </Box>
      {
        error.status ?
          <SnackBarOpen
            message={error.message}
            useOpen={() => [error, setError]}
            color={error.type}
          /> :
          ""
      }
    </>



  )
}
