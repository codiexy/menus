/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, doc, orderBy, onSnapshot, updateDoc, where } from 'firebase/firestore';
import AddRestaurantInfo from "./AddRestaurantInfo";
import { v4 } from "uuid";
import {
  ImageListItem, Typography, Avatar, Box,
  Grid, List, ListItem, Divider, IconButton, Paper, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { toast } from "react-toastify";
import { db } from '../firebase';
import RdEdit from "./RdEdit";
import DeleteAccount from "./DeleteAccount";





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Profile() {
  const { user, logout, updateLoginUser } = UserAuth();
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);
  const [restaurant, setRestaurant] = useState(false)
  const [images, setImages] = useState({
    image: "",
    banner: ""
  });
  const [userImage, setUserImage] = useState("/user-avatar.png");
  const [isLoading, setIsLoading] = useState(false);
  const [isRestLoading, setIsRestLoading] = useState({
    image: false,
    banner: false
  });
  const [tableRef, sertTableRef] = useState(false);



  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload == null) return;
    setIsLoading(true)
    const imageRef = ref(storage, `avatar/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateLoginUser({
          image: url
        })
        toast("Profile pic updated successfully!", { type: "success" });
        setIsLoading(false)
      }).then(() => {
        setIsLoading(false)
      });
    }).catch(() => {
      setIsLoading(false)
    });
  };

  const handleChangeProfilePic = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const image_url = URL.createObjectURL(input.files[0]);
      setUserImage(image_url)
      setImageUpload(input.files[0]);
    }
  }

  useEffect(() => {
    if (user?.uid) {
      const infoRef = collection(db, "RestaurantInfo");
      const q = query(infoRef, where('createdBy', "==", user.uid), orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        let info = snapshot.docs.map((infoDoc) => ({
          id: infoDoc.id,
          ...infoDoc.data(),
        }))
        const newInfo = info[0] || false;
        setRestaurant(newInfo);
        if (newInfo) {
          setImages({
            image: newInfo.imageUrl || "",
            banner: newInfo.bgImage || ""
          });
          let tableRef = doc(db, "RestaurantInfo", newInfo.id);
          sertTableRef(tableRef)
        }
      })
    }
    setUserImage(user?.photoURL ? user.photoURL : "/user-avatar.png")
  }, [user?.photoURL, user?.uid]);

  const handleChange = (event, name = "image") => {
    const input = event.target;
    if (input.files && input.files[0]) {
      images[name] = URL.createObjectURL(input.files[0]);
      setImages(images)
      setImageUpload(input.files[0]);
    }
  }

  const handleUpload = async (event, name = "image", filePath = "logo") => {
    event.preventDefault();
    if (imageUpload == null) return;
    const imageName = name === "image" ? "imageUrl" : "bgImage";
    const defaultLoading = {
      image: false,
      banner: false
    };
    setIsRestLoading({
      ...defaultLoading,
      [name]: true
    })
    const fileName = imageUpload.name.replace(' ', '-').replace('_', '-');
    const imageRef = ref(storage, `restaurantLogo/${filePath}/${fileName}-${Date.now()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateDoc(tableRef, {
          [imageName]: url
        });
        setIsRestLoading(false);
        toast(`Restaurant ${filePath} updated successfully!`, { type: "success" });
      }).then(() => {
        setIsRestLoading({
          ...defaultLoading,
          [name]: false
        })
      });
    }).then(() => {
      setIsRestLoading({
        ...defaultLoading,
        [name]: false
      })
    });
  }

  return (
      <Box sx={{ flexGrow: 1, pb: 5, }}>
        
          <Grid item xs={12} md={4} >
            <Item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mb: 3, }}>
              <Avatar sx={{ width: 100, height: 100 }}>
                <img src={userImage} alt="User Logo" height={100} width={100} />
              </Avatar>
              <p>Add a profile picture.</p>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden type="file" onChange={handleChangeProfilePic} />
                <PhotoCamera color="secondary" />
              </IconButton>
              {
                isLoading ? (
                  <Button disabled variant="outlined" >Uploading...</Button>
                ) : (
                  <Button variant='contained' color="grey" size="small" onClick={uploadFile}>Upload</Button>
                )
              }
            </Item>
            </Grid>
            <Grid item xs={12} md={4}>
            <Item>
              <ListItem>
                <h2>Restaurant Details</h2>
              </ListItem>
              {
                restaurant ? (
                  <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <>
                          <div className="accountListItems">
                            <Typography variant='h6'>Name of Restaurant</Typography>
                            <Typography>
                              {restaurant?.name || ""}
                            </Typography>
                          </div>
                          <RdEdit docRef={tableRef} defaultValue={restaurant?.name || ""} name="name" title="Edit Name" />
                        </>
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <div className="accountListItems">
                          <Typography variant='h6'>Email Address</Typography>
                          <Typography>
                            {user && user.email}
                          </Typography>
                        </div>
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <>
                          <div className="accountListItems">
                            <Typography variant='h6'>Address</Typography>
                            <Typography>
                              {restaurant?.address || ""}
                            </Typography>
                          </div>
                          <RdEdit docRef={tableRef} defaultValue={restaurant?.address || ""} name="address" title="Edit Address" />
                        </>
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <>
                          <div className="accountListItems">
                            <Typography variant='h6'>Phone Number</Typography>
                            <Typography>
                              {restaurant.phoneNumber || ""}
                            </Typography>
                          </div>
                          <RdEdit docRef={tableRef} defaultValue={restaurant.phoneNumber || ""} name="phoneNumber" title="Edit Phone Number" />
                        </>
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <>
                          <div className="accountListItems">
                            <Typography variant='h6'>Cuisine Type</Typography>
                            <Typography>
                              {restaurant.cuisine || ""}
                            </Typography>
                          </div>
                          <RdEdit docRef={tableRef} defaultValue={restaurant.cuisine || ""} name="cuisine" title="Edit Cuisine Type" />
                        </>
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <>
                          <div className="accountListItems">
                            <Typography variant='h6'>Instagram Link</Typography>
                            <Typography variant="subtitle2">
                              {restaurant?.instagram || ""}
                            </Typography>
                          </div>
                          <RdEdit docRef={tableRef} defaultValue={restaurant?.instagram || ""} type="url" name="instagram" title="Edit Instagram Url" />
                        </>
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <>
                          <div className="accountListItems">
                            <Typography variant='h6'>Facebook Link</Typography>
                            <Typography variant="subtitle2">
                              {restaurant?.facebook || ""}
                            </Typography>
                          </div>
                          <RdEdit docRef={tableRef} defaultValue={restaurant?.facebook || ""} type="url" name="facebook" title="Edit Facebook Url" />
                        </>
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                      <ListItem sx={{ maxwidth: 600, display: 'flex', justifyContent: 'space-between' }} >
                        <>
                          <div className="accountListItems">
                            <Typography variant='h6'>Website Url</Typography>
                            <Typography variant="subtitle2">
                              {restaurant?.website || ""}
                            </Typography>
                          </div>
                          <RdEdit docRef={tableRef} defaultValue={restaurant?.website || ""} type="url" name="website" title="Edit Website Url" />
                        </>
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
                              <img
                                src={images.image ? images.image : restaurant.imageUrl}
                                alt='logo'
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "10px"
                                }}
                              />
                              <input type="file" id={`rest-logo`} style={{ display: "none" }} onChange={(event) => handleChange(event, "image")} />
                            </label>
                          </ImageListItem>
                        </div>
                        {
                          isRestLoading.image ? (
                            <Button disabled variant="contained" color="grey" >Uploading...</Button>
                          ) : (
                            <Button variant='contained' color="grey" onClick={(event) => handleUpload(event)}>Upload</Button>
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
                              <img
                                src={images.banner ? images.banner : restaurant.bgImage}
                                alt='banner'
                                style={{
                                  width: "250px",
                                  height: "100px",
                                  borderRadius: "10px"
                                }}
                              />
                              <input type="file" id={`rest-banner`} style={{ display: "none" }} onChange={(event) => handleChange(event, "banner")} />
                            </label>
                          </ImageListItem>
                        </div>
                        {
                          isRestLoading.bgImage ? (
                            <Button disabled variant="contained" color="grey" >Uploading...</Button>
                          ) : (
                            <Button variant='contained' color="grey" onClick={(event) => handleUpload(event, "bgImage", 'banner')}>Upload</Button>
                          )
                        }
                      </ListItem>
                    </List>
                  </Box>
                )
                  : (
                    <>
                      <ListItem>
                        <AddRestaurantInfo />
                      </ListItem>
                      <Divider sx={{ mt: 4, mb: 4 }} />
                    </>
                  )
              }
            </Item>
          </Grid>
          <DeleteAccount />
      </Box>
  );
}