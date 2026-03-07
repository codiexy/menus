import React from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from "react-toastify";

import { db } from '../../firebase';

function ArchiveDish({ dish, setIsLoader }) {
  const status = dish?.status === "publish" ? 'publish' : "draft";
  
  const handleDisabled = async (e) => {
    e.preventDefault()
    setIsLoader(true);
    try {
      let docRef = doc(db, "Dishes", dish.id);
      await updateDoc(docRef, {
        status: status === "draft" ? "publish" : "draft"
      });
      toast(`Now Menu Dish ${status === "draft" ? "Available" : "Disavailable"}!`, { type: "success" });
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      toast(error.message || "Something went wrong!", { type: "error" });
    }
  }

  return (
    <Tooltip title={`${status === "publish" ? "Available" : "Hidden"} Dish`} arrow placement='left' >
      <IconButton
        sx={{
          position: 'absolute',
          top: 75,
          right: 5,
          color: '#fff'
        }}
        color="primary" aria-label="Edit details" component="label"
        onClick={handleDisabled}
      >
        {
          status === "publish" ? (
            <VisibilityIcon sx={{ fontSize: 25 }} />
          ) : (
            <VisibilityOffIcon sx={{ fontSize: 25 }} />
          )
        }
      </IconButton>
    </Tooltip>
  )
}

export default ArchiveDish