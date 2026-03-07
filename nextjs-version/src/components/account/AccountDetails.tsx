'use-client';
import React, { useState } from "react";
import {
  ImageListItem, Typography, Avatar, Box,
  Grid, List, ListItem, Divider, IconButton, Button, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import RdEdit from "../RdEdit";
import DeleteAccount from "./DeleteAccount";
import { SiteButton } from "../miscellaneous";
import WorkingHoursData from "./WorkingHours";
import { useAuth } from "@/context/AuthContext";
import useFileStorage from "@/lib/useFileStorage";
import Image from "next/image";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Profile() {
  const { user, updateLoginUser, updateTenant, tenant, setSnackbar } = useAuth();
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [images, setImages] = useState({
    image: tenant.imageUrl,
    banner: tenant.bgImage
  });
  const [userImage, setUserImage] = useState(user?.photoURL ? user.photoURL : "/user-avatar.png");
  const [loadingType, setLoadingType] = useState("");
  const { loading, upload } = useFileStorage();

  const uploadFile = async (e: any) => {
    e.preventDefault();
    if (imageUpload == null) return;
    setLoadingType('uImage');
    await upload(imageUpload, "users/profiles", (url: string) => {
      // Update User image
      updateLoginUser({
        image: url
      })
      setSnackbar(true, "Profile pic updated successfully!");
    });
  };

  const handleChangeProfilePic = (event: any) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const image_url = URL.createObjectURL(input.files[0]);
      setUserImage(image_url)
      setImageUpload(input.files[0]);
    }
  }

  const handleChange = (event: any, name = "image") => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const newImages: any = images;
      newImages[name] = URL.createObjectURL(input.files[0]);
      setImages(newImages)
      setImageUpload(input.files[0]);
    }
  }

  const handleUpload = async (event: any, name = "imageUrl", filePath = "logo") => {
    event.preventDefault();
    if (imageUpload == null) return;
    setLoadingType(name);
    await upload(imageUpload, filePath, (url: string) => {
      // Update tenant images
      updateTenant({
        [name]: url
      });
      setSnackbar(true, "Image updated successfully!");
    });
  }

  const handleUpate = (value: string, name: string, type: string = "user") => {
    if (type == "tenant") {
      updateTenant({
        [name]: value
      });
    } else {
      updateLoginUser({
        [name]: value
      });
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, pb: 5, }}>
        <Grid item xs={12} md={4} >
          <Item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mb: 3, }}>
            <Avatar sx={{ width: 100, height: 100 }}>
              <Image src={userImage} alt="User Logo" height={100} width={100} />
            </Avatar>
            <p>Add a profile picture.</p>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden type="file" onChange={handleChangeProfilePic} />
              <PhotoCamera />
            </IconButton>
            {
              loading && loadingType == "uImage" ? (
                <SiteButton disabled variant="outlined" >Uploading...</SiteButton>
              ) : (
                <SiteButton variant='contained' color="grey" size="small" onClick={uploadFile}>Upload</SiteButton>
              )
            }
            <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
              <RdEdit onUpdate={handleUpate} defaultValue={user?.username ? user.username : ""} title="Username" name="username" />
            </ListItem>
            <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
              <RdEdit onUpdate={handleUpate} defaultValue={user?.displayName || ""} title="Full Name" name="name" />
            </ListItem>
            <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }}>
              <div className="accountListItems">
                <Typography variant='h6'>Email Address</Typography>
                <Typography>
                  {user.email}
                </Typography>
              </div>
            </ListItem>
            <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
              <RdEdit onUpdate={handleUpate} defaultValue={user?.phoneNumber ? user?.phoneNumber : ""} title="Mobile Number" name="mobile" />
            </ListItem>
            <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
              <RdEdit onUpdate={handleUpate} defaultValue={user?.bio ? user.bio : ""} title="Bio" name="bio" />
            </ListItem>

          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <ListItem>
              <h2>Restaurant Details</h2>
            </ListItem>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <List sx={{ width: '100% !important', bgcolor: 'background.paper' }}>
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <RdEdit onUpdate={(value: string, name: string) => handleUpate(value, name, "tenant")} defaultValue={tenant.name || ""} title="Name of Restaurant" name="name" />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <div className="accountListItems">
                    <Typography variant='h6'>Email Address</Typography>
                    <Typography>
                      {user.email}
                    </Typography>
                  </div>
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <RdEdit onUpdate={(value: string, name: string) => handleUpate(value, name, "tenant")} defaultValue={tenant.address || ""} title="Address" name="address" />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <RdEdit onUpdate={(value: string, name: string) => handleUpate(value, name, "tenant")} defaultValue={tenant.phoneNumber || ""} title="Phone Number" name="phoneNumber" />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <RdEdit onUpdate={(value: string, name: string) => handleUpate(value, name, "tenant")} defaultValue={tenant.cuisine || ""} title="Cuisine Type" name="cuisine" />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }} >
                  <WorkingHoursData />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <RdEdit onUpdate={(value: string, name: string) => handleUpate(value, name, "tenant")} defaultValue={tenant?.instagram || ""} type="url" name="instagram" title="Instagram" />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <RdEdit onUpdate={(value: string, name: string) => handleUpate(value, name, "tenant")} defaultValue={tenant.facebook || ""} title="Facebook" name="facebook" />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <RdEdit onUpdate={(value: string, name: string) => handleUpate(value, name, "tenant")} defaultValue={tenant.website || ""} title="Website" name="website" />
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <div className="accountListItems">
                    <Typography variant='h6'>Logo</Typography>
                    <ImageListItem>
                      <label
                        htmlFor={`rest-logo`}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <Image
                          src={images.image ? images.image : tenant.imageUrl}
                          alt='logo'
                          width={100}
                          height={100}
                          style={{
                            borderRadius: "10px"
                          }}
                        />
                        <input type="file" id={`rest-logo`} style={{ display: "none" }} onChange={(event) => handleChange(event, "image")} />
                      </label>
                    </ImageListItem>
                  </div>
                  {
                    loading && loadingType == "imageUrl" ? (
                      <Button disabled variant="contained" color="secondary" >Uploading...</Button>
                    ) : (
                      <Button variant='contained' color="secondary" onClick={(event) => handleUpload(event)}>Upload</Button>
                    )
                  }
                </ListItem>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                  <div className="accountListItems">
                    <Typography variant='h6'>Banner</Typography>
                    <ImageListItem>
                      <label
                        htmlFor={`rest-banner`}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <Image
                          src={images.banner ? images.banner : tenant.bgImage}
                          alt='banner'
                          width={250}
                          height={100}
                          style={{
                            borderRadius: "10px"
                          }}
                        />
                        <input type="file" id={`rest-banner`} style={{ display: "none" }} onChange={(event) => handleChange(event, "banner")} />
                      </label>
                    </ImageListItem>
                  </div>
                  {
                    loading && loadingType == "bgImage" ? (
                      <Button disabled variant="contained" color="secondary" >Uploading...</Button>
                    ) : (
                      <Button variant='contained' color="secondary" onClick={(event) => handleUpload(event, "bgImage", 'banner')}>Upload</Button>
                    )
                  }
                </ListItem>
              </List>
            </Box>
          </Item>
        </Grid>
        <DeleteAccount />
      </Box>
    </>
  );
}