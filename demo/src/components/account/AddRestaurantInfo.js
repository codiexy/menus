import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "../../firebase"
import { UserAuth } from '../../context/AuthContext';

const defaultFormData = {
  name: "",
  address: "",
  phoneNumber: "",
  cuisine: "",
  instagram: "",
  facebook: "",
  website: "",
  image: "",
  bgImage: "",
  createdAt: Timestamp.now().toDate(),
  workingHours: [
    { day: "sunday", openTime: "9:30", closeTime: "6:30" },
    { day: "Monday", openTime: "9:30", closeTime: "6:30" },
    { day: "Tuesday", openTime: "9:30", closeTime: "6:30" },
    { day: "Wednesday", openTime: "9:30", closeTime: "6:30" },
    { day: "Thrusday", openTime: "9:30", closeTime: "6:30" },
    { day: "Friday", openTime: "9:30", closeTime: "6:30" },
    { day: "Saturday", openTime: "9:30", closeTime: "6:30" },
  ]

};

export default function AddRestaurantInfo() {
  const { user } = UserAuth();
  const [formData, setFormData] = useState(defaultFormData);
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState({ status: false, type: "", message: "" });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError({ status: true, type: "warning", message: "Please fill name!" });
      return;
    }
    if (!formData.address) {
      setError({ status: true, type: "warning", message: "Please fill address!" });
      return;
    }
    if (!formData.phoneNumber) {
      setError({ status: true, type: "warning", message: "Please fill  phoneNumber!" });
      return;
    }
    if (!formData.cuisine) {
      setError({ status: true, type: "warning", message: "Please fill  cuisine!" });
      return;
    }
    if (!formData.instagram) {
      setError({ status: true, type: "warning", message: "Please fill  instagram!" });
      return;
    } if (!formData.facebook) {
      setError({ status: true, type: "warning", message: "Please fill  facebook!" });
      return;
    }
    if (!formData.website) {
      setError({ status: true, type: "warning", message: "Please fill  website!" });
      return;
    }
    if (!formData.image) {
      setError({ status: true, type: "warning", message: "Please fill  image!" });
      return;
    }
    if (!formData.bgImage) {
      setError({ status: true, type: "warning", message: "Please fill  bgImage!" });
      return;
    }

    setIsUploading(true);
    let newFormData = formData;

    // Uploading logo image of the restaurant
    const imageResult = await uploadFile(formData.image);
    if (imageResult.status) {
      newFormData.image = imageResult.url;
    } else {
      setError({ status: true, type: "error", message: imageResult.message });
      setIsUploading(false);
      return;
    }

    // Uploading banner image of the restaurant
    const bgImageResult = await uploadFile(formData.bgImage, 'banner');
    if (bgImageResult.status) {
      newFormData.bgImage = bgImageResult.url;
    } else {
      setError({ status: true, type: "error", message: bgImageResult.message });
      setIsUploading(false);
      return;
    }

    handleCreate(newFormData);
  };

  const uploadFile = async (file, type = "logo") => {
    try {
      const imageFileName = file.name.replace(' ', '-').replace('_', '-');
      const storageRef = ref(storage, `/restaurantLogo/${type}/${imageFileName}-${Date.now()}`);
      const uploadImage = await uploadBytes(storageRef, file)
      if (uploadImage.ref) {
        const fileUrl = await getDownloadURL(uploadImage.ref);
        return {
          status: true,
          message: "File uploaded successfully!",
          url: fileUrl
        }
      } else {
        return {
          status: false,
          message: "File not uploaded successfully!"
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message || "Something went wrong"
      }
    }
  }

  const handleCreate = (data) => {
    const infoRef = collection(db, "RestaurantInfo");
    addDoc(infoRef, {
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      cuisine: data.cuisine,
      instagram: data.instagram,
      facebook: data.facebook,
      website: data.website,
      imageUrl: data.image,
      bgImage: data.bgImage,
      createdBy: user.uid,
      createdAt: Timestamp.now().toDate(),
      workingHours: data.workingHours
    })
      .then(() => {
        setIsUploading(false);
        setError({ status: true, type: "success", message: "Details added successfully" });
        setFormData(defaultFormData);
      })
      .catch((err) => {
        setIsUploading(false);
        setError({ status: true, type: "error", message: "Error adding details" });
      });
  }

  return (
    <div>
      <Button
        size='small'
        sx={{ m: 1, backgroundColor: '#4458BE', borderRadius: 3, p: 1 }}
        variant="contained"
        onClick=
        {handleClickOpen}>
        Add Restaurant Details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add restaurant details to the Menuverse
          <CloseIcon onClick={handleClose} sx={{ fontSize: 30, float: "right", cursor: "pointer" }} color="secondary" />
        </DialogTitle>
        <DialogContent >
          <form>
            <TextField
              margin="normal"
              fullWidth
              type="text"
              autoComplete='off'
              label="Name of restaurant"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Restaurant address"
              type='text'
              value={formData.address}
              name="address"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Phone number"
              type='tel'
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              fullWidth
              name='cuisine'
              label="Cuisine Type"
              type="text"
              value={formData.cuisine}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              fullWidth
              name='instagram'
              label="Instagram profile url"
              type="url"
              value={formData.instagram}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              fullWidth
              name='facebook'
              label="Facebook profile url"
              type='url'
              value={formData.facebook}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              fullWidth
              name='website'
              label="Webesite url"
              type="url"
              value={formData.website}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name='image'
              label="Add Logo"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name='bgImage'
              label="Add cover photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
            {
              isUploading ? (
                <Button
                  disabled
                  variant="outlined"
                  sx={{
                    mt: 2
                  }}
                >
                  Adding...
                </Button>
              ) : (
                <Button sx={{ mt: 2 }} variant='contained' color='secondary' onClick={handlePublish}>Add</Button>
              )
            }
          </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>

      </Dialog>
    </div>
  )
}
