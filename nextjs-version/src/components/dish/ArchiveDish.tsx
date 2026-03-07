import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import { useTenant } from '@/context/TenantContext';
import Dish from '@/classes/Dish';

function ArchiveDish({ dish, setIsLoader, useUpdated }: any) {

  const { tenantId } = useTenant();
  const [updated, setUpdated] = useUpdated();
  const [error, setError] = useState({ status: false, type: "", message: "" });

  const status = dish?.status === "publish" ? 'publish' : "draft";

  const handleDisabled = async (e: any) => {
    e.preventDefault()
    setIsLoader(true);
    try {
      setUpdated(true);
      const dishClass = new Dish(tenantId)
      let docRef = await dishClass.update(dish.id, {
        status: status === "draft" ? "publish" : "draft"
      });
      setError({ status: true, type: "success", message: `Now Menu Dish ${status === "draft" ? "Available" : "Disavailable"}!` });
      setIsLoader(false);
      setUpdated(false);
    } catch (error: any) {
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