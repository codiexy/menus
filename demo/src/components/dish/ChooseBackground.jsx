import { Avatar, Box, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'


export default function ChooseBackground({ imageUrl }) {

  const imageFile = imageUrl;

  const [image, setImage] = useState("");

  const removeBackgroundWithWhite = async (imageUrl) => {
    const options = {
      method: 'GET',
      url: 'https://beta-sdk.photoroom.com/v1/render',
      headers: { 'Content-Type': 'application/json', 'x-api-key': 'a1de6ce39356ce11187d08ef0122b70d9cfe8306' },
      params: {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/hot-dog-kings.appspot.com/o/images%2F1697009869027cs-PhotoRoom%20(1).png?alt=media&token=434d483f-61cc-4ea7-8ce5-e7ddb6e140b1",
        templateId: "9124f52a-3512-48b7-80f1-2cb07a3607fb"
      }
    };
    try {
      const { data } = await axios(options);

      setImage(data)
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeBackgroundWithTransparent = async (imageUrl) => {
    const options = {
      method: 'GET',
      url: 'https://beta-sdk.photoroom.com/v1/render',
      headers: { 'Content-Type': 'application/json', 'x-api-key': '40b5b64eda031a2d69988ae023aa3cc35c28896b' },
      params: {
        imageUrl: imageUrl,
        templateId: "9124f52a-3512-48b7-80f1-2cb07a3607fb"
      }
    };
    try {
      const { data } = await axios(options);

      setImage(data)
    } catch (error) {
      throw new Error(error);
    }
  };


  const backGroundChangeImage = async () => {
    const options = {
      method: 'GET',
      url: 'https://beta-sdk.photoroom.com/v1/instant-backgrounds',
      headers: { Accept: 'image/png, application/json', 'x-api-key': '40b5b64eda031a2d69988ae023aa3cc35c28896b' },
      params: {
        imageUrl: imageUrl,
        prompt: 'A beautiful sunset',
      }

    };

    try {
      const { data } = await axios(options);
    } catch (error) {
      throw new Error(error);
    }
  }



  return (
    <Box sx={{ display: 'flex' }} >
      <Typography fontWeight={700}>WITH</Typography>
      <div onClick={() => backGroundChangeImage(imageFile)}>
        <Stack sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={'./whiteBackground.png'}
            alt='white'
            sx={{
              height: 125,
              width: 125,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'lightgray',
              m: 1
            }}
          />
          <Typography>
            White
          </Typography>
        </Stack>
      </div>

      <Typography fontWeight={700}>OR</Typography>
      <div onClick={() => removeBackgroundWithTransparent(imageFile)}>
        <Stack sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={'./transparentBackground.png'}
            alt='transparent'
            sx={{
              height: 125,
              width: 125, borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'lightgray',
              m: 1

            }}
          />
          <Typography>
            Transparent
          </Typography>
        </Stack>
      </div>
    </Box>
  )
}
