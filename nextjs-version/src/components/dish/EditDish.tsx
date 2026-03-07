import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { EditRounded } from '@mui/icons-material';
import Dish from '@/classes/Dish';
import { useTenant } from '@/context/TenantContext';

export default function EditDish({ dish, useUpdated }: any) {

  const { tenantId } = useTenant()
  const [updated, setUpdated] = useUpdated()
  const [formData, setFormData] = useState({
    name: dish.name || "",
    description: dish.description || "",
    price: dish.price || "",
  });

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState({ status: false, type: "", message: "" });


  const handleClickOpen = (e: any) => {
    e.preventDefault()
    setOpen(true);
  };

  const handleClose = (e: any) => {
    e.preventDefault()
    setOpen(false);
  };
  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async (e: any) => {
    e.preventDefault()
    if (!formData.name) {
      setError({ status: true, type: "warning", message: "Please fill name!" });
      return;
    }
    if (!formData.description) {
      setError({ status: true, type: "warning", message: "Please fill description!" });
      return;
    }
    if (!formData.price) {
      setError({ status: true, type: "warning", message: "Please fill price!" });
      return;
    }
    setIsLoading(true);
    try {
      const dishClass = new Dish(tenantId)
      const result = await dishClass.update(dish.id, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
      })
      if (result.status) {
        setError({ status: true, type: "success", message: "Menu updated successfully!" });
      }
      setUpdated(!updated)
      setOpen(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError({ status: true, type: "error", message: error.message || "Something went wrong!" });
    }

  };

  return (
    <>
      <div className='addDish'>
        <Tooltip title="Edit dish" arrow placement='left' >
          <IconButton
            onClick=
            {handleClickOpen}
            sx={{
              position: 'absolute',
              top: 35,
              right: 5,
              color: '#fff'
            }}
            aria-label="Edit details" component="label"
          >
            <EditRounded sx={{ fontSize: 25 }} />
          </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Update {formData.name}
            <CloseIcon onClick={handleClose} sx={{ fontSize: 30, float: "right", cursor: "pointer", color: '#4458BE' }} />
          </DialogTitle>
          <DialogContent >
            <form>
              <TextField
                margin="normal"
                fullWidth
                required
                type="text"
                autoComplete='off'
                label="Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                required
                multiline
                rows={4}
                label="Description"
                type="text"
                value={formData.description}
                name="description"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name='price'
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange(e)}
              />
              {
                isLoading ? (
                  <Button
                    disabled
                    variant="outlined"
                    sx={{
                      mt: 2
                    }}
                  >
                    Updating...
                  </Button>
                ) : (
                  <Button
                    sx={{ mt: 2, backgroundColor: '#4458BE', borderRadius: 3 }}
                    color='success'
                    variant='contained'
                    onClick={handlePublish}
                  >
                    Update
                  </Button>
                )
              }
            </form>
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>
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