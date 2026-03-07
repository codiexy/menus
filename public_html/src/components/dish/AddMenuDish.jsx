import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../../firebase"
import { FormControl, FormControlLabel, FormGroup, IconButton, Typography, } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useAuthState } from "react-firebase-hooks/auth";
import { Dish } from '../../classes';
import { AddRounded } from '@mui/icons-material';

const defaultFormData = {
    name: "",
    description: "",
    price: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
};

export default function AddMenuDish({ category, useUpdated }) {
    const [updated, setUpdated] = useUpdated();
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState(defaultFormData);

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleClickOpen = (e) => {
        e.preventDefault()
        resetModal(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        resetModal();
    };
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePublish = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.description || !formData.price) {
            toast("Please fill name, description and price atleast!", { type: "warning" });
            return;
        }

        setIsLoading(true);
        try {
            if (formData.image) {
                const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
                const uploadImage = uploadBytesResumable(storageRef, formData.image);

                uploadImage.on(
                    "state_changed",
                    (snapshot) => {
                        const progressPercent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progressPercent);
                    },
                    (err) => {
                        console.log(err);
                    },
                    async () => {
                        const url = await getDownloadURL(uploadImage.snapshot.ref);
                        await handleSubmit(url);
                    }
                );
            } else {
                await handleSubmit();
            }
        } catch (error) {
            toast(error.message || "Something went wrong!", { type: "error" });
            setIsLoading(false);
        }

    };

    const handleSubmit = async (url = "") => {
        if (!category) {
            toast("Category not found!", { type: "error" });
            return;
        }
        setIsLoading(true);
        const dishClass = new Dish();
        const result = await dishClass.insert({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            imageUrl: url,
            categoryId: category.id,
            userId: user.uid,
            status: "publish"
        })
        if (result.status) {
            toast("Dish added successfully", { type: "success" });
            resetModal();
            setUpdated(!updated);
        } else {
            setIsLoading(false);
            toast("Error adding dish", { type: "error" });
        }
    }

    const resetModal = (open = false) => {
        setProgress(0);
        setFormData(defaultFormData);
        setOpen(open);
        setIsLoading(false);
    }

    return (
        <div className='addDish'>
            <IconButton
                color='secondary'
                onClick={handleClickOpen}
                sx={{ display: 'flex', flexDirection: 'column' }}
            >
                <AddRounded sx={{ fontSize: 60 }} />
                <Typography>Create dish</Typography>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant='h4' fontSize={'20px'} fontWeight={700}>
                    Add new dish
                    <CloseIcon onClick={handleClose} sx={{ fontSize: 30, float: "right", cursor: "pointer" }} color="secondary" />
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
                        <Typography sx={{ mt: 2 }} >
                            Upload image
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name='image'
                            label=""
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                        />
                        <FormControl component='fieldset' sx={{ mt: 2, mb: 2, }} >
                            <FormGroup sx={{ display: 'flex', flexDirection: 'row', pr: '-16px', }} >
                                <FormControlLabel
                                    value="start"
                                    control={<Checkbox />}
                                    label="Replace dish background?"
                                    labelPlacement="end"
                                />

                            </FormGroup>
                        </FormControl>

                        {progress === 0 ? null : (
                            <div className="progress">
                                <Box sx={{ width: `${progress}%` }}>
                                    <LinearProgress />
                                    {`uploading image ${progress}%`}
                                </Box>
                            </div>
                        )}
                        {
                            isLoading ? (
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
                                <Button sx={{ mt: 2 }} style={{ width: '100%' }} variant='contained' color='secondary' onClick={handlePublish}>Add dish</Button>
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