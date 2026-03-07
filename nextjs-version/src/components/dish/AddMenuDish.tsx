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
import { Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { Divider, Tooltip, Typography, } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { useAuth } from '@/context/AuthContext';
import Dish from '@/classes/Dish';
import SiteButtonOutlined from '@/components/miscellaneous/SiteButtonOutlined';

const defaultFormData:any = {
    name: "",
    description: "",
    price: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
};

export default function AddMenuDish({ category, useUpdated }: any) {
    const [updated, setUpdated] = useUpdated();
    const { user, tenantSlug, tenantId } = useAuth();
    const [formData, setFormData] = useState(defaultFormData);
    const [error, setError] = useState({ status: false, type: "", message: "" });
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleClickOpen = (e: any) => {
        e.preventDefault()
        resetModal(true);
    };

    const handleClose = (e: any) => {
        e.preventDefault();
        resetModal();
    };
    const handleChange = (e: any) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e: any) => {
        e.preventDefault()
        setFormData({ ...formData, image: e.target.files[0] });
    };




    const handlePublish = async (e: any) => {
        e.preventDefault()
        if (!formData.name) {
            setError({ status: true, type: "warning", message: "Please fill name  !" });
            return;
        }
        if (!formData.description) {
            setError({ status: true, type: "warning", message: "Please fill description  !" });
            return;
        }
        if (!formData.price) {
            setError({ status: true, type: "warning", message: "Please fill price  !" });
            return;
        }

        setIsLoading(true);
        try {
            if (formData.image) {
                const path = `/${tenantSlug}/images/${Date.now()}${formData.image.name}`;
                const storageRef = ref(storage, path);
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
                        throw err;
                    },
                    async () => {
                        const url = await getDownloadURL(uploadImage.snapshot.ref);
                        await handleSubmit(url);
                    }
                );
            } else {
                await handleSubmit();
            }
        } catch (error: any) {
            setError({ status: true, type: "error", message: error.message || "Something went wrong !" });
            setIsLoading(false);
        }

    };

    const handleSubmit = async (url = "") => {
        if (!category) {
            setError({ status: true, type: "error", message: error.message || "Category not found !" });
            return;
        }
        setIsLoading(true);
        const dishClass = new Dish(tenantId);
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
            setError({ status: true, type: "success", message: "Dish added successfully !" });
            resetModal();
            setUpdated(!updated);
        } else {
            setIsLoading(false);
            setError({ status: true, type: "error", message: "Error adding dish !" });
        }
    }

    const resetModal = (open = false) => {
        setProgress(0);
        setFormData(defaultFormData);
        setOpen(open);
        setIsLoading(false);
    }

    return (
        <>
            <div className='addDish'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Typography variant='h4' sx={{ fontWeight: 700 }} color='gray'>
                        Dishes
                    </Typography>
                    <Tooltip title='Create new dish' placement='top'>
                        <SiteButtonOutlined
                            variant='contained'
                            color='secondary'
                            onClick={handleClickOpen}
                            sx={{ textTransform: 'none', backgroundColor: '#4458BE', ml: 2, borderRadius: 3, display: "flex" }}
                            startIcon={<AddRounded />}
                        >
                            <Typography>Create dish</Typography>
                        </SiteButtonOutlined>
                    </Tooltip>
                </Box>
                <Divider sx={{ mt: 2 }} />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle variant='h4' fontSize={'20px'} fontWeight={700}>
                        Add new dish
                        <CloseIcon
                            onClick={handleClose}
                            sx={{ fontSize: 30, float: "right", cursor: "pointer", color: '#4458BE' }} />
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
                                // accept="image/*"
                                onChange={(e) => handleImageChange(e)}
                            />

                            {/* <FormControl component='fieldset' sx={{ mt: 2, mb: 2, }} >
                                <FormGroup sx={{ display: 'flex', flexDirection: 'row', pr: '-16px', }} >
                                    <FormControlLabel
                                        value="start"
                                        control={<Checkbox />}
                                        label="Replace dish background?"
                                        labelPlacement="end"
                                    />

                                </FormGroup>
                            </FormControl> */}

                            {/* <ChooseBackground imageUrl={formData.image} /> */}

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
                                    <Button sx={{ mt: 2, backgroundColor: '#4458BE', display: "flex" }} style={{ width: '100%', textAlign: "center" }} variant='contained' color='secondary' onClick={handlePublish}>Add dish</Button>
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