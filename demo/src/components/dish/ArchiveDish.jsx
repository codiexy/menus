import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import { updateDoc, doc } from 'firebase/firestore';

import { db } from '../../firebase';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';

function ArchiveDish({ dish, setIsLoader, useUpdated }) {

  const [updated, setUpdated] = useUpdated();
  const [error, setError] = useState({ status: false, type: "", message: "" });

  const status = dish?.status === "publish" ? 'publish' : "draft";

  const handleDisabled = async (e) => {
    e.preventDefault()
    setIsLoader(true);
    try {
      setUpdated(true);
      let docRef = doc(db, "Dishes", dish.id);
      await updateDoc(docRef, {
        status: status === "draft" ? "publish" : "draft"
      });
      setError({ status: true, type: "success", message: `Now Menu Dish ${status === "draft" ? "Available" : "Disavailable"}!` });
      setIsLoader(false);
      setUpdated(false);
    } catch (error) {
      setIsLoader(false);
      setError({ status: true, type: "error", message: error.message || "Something went wrong!" });
    }
  }

  return (
    <>
      <Tooltip title={`${status === "publish" ? "Hide" : "Unhide"} Dish`} arrow placement='left' >
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
              <VisibilityRounded sx={{ fontSize: 25 }} />
            ) : (
              <VisibilityOffRounded sx={{ fontSize: 25 }} />
            )
          }
        </IconButton>
      </Tooltip>
      {
        error.status ?
          <SnackbarOpen
            message={error.message}
            useOpen={() => [error, setError]}
            color={error.type}
          /> :
          ""
      }
    </>
  )
}

export default ArchiveDish