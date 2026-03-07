import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { Tooltip } from '@mui/material';


export default function BasicMenu({ dish, setIsLoader }) {

  const handleChange = async (event) => {
    const input = event.target.files[0];
    if (!input) toast(`File not selected!`, { type: "warning" });
    setIsLoader(true);
    if (input) {
      const docRef = doc(db, "Dishes", dish.id);
      const imageRef = ref(storage, `/images/${Date.now()}${input.name}`);
      uploadBytes(imageRef, input).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateDoc(docRef, {
            imageUrl: url
          });
          setIsLoader(false);
          toast(`Menu image updated successfully!`, { type: "success" });
        });
      });
    }
  }

  return (
    <div>
      <Tooltip title={`Update photo`} arrow placement='left' >
        <IconButton
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            color: '#fff'
          }}
          color="primary" aria-label="upload picture" component="label"
        >
          <input hidden accept="image/*" type="file" onChange={handleChange} />
          <PhotoCamera />
        </IconButton>
      </Tooltip>

    </div>
  );
}