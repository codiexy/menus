import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import { UserAuth } from '../../context/AuthContext';
import { toast } from "react-toastify";
import { Notification, Restaurant, Review } from '../../classes';
import { useLocation, useNavigate } from 'react-router-dom';
// import SnackbarOpen from '../../components/miscellaneous/SnackBar'

const defaultFormData = {
    headline: "",
    comment: "",
    rating: 0,
};

export default function AddReview() {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);
    const [restaurant, setRestaurant] = useState(false);
    const { user, useLoginPopup, } = UserAuth();
    const [loginPopupShow, setLoginPopupShow] = useLoginPopup();
    const location = useLocation();
    const navigate = useNavigate();
    // const [snackBarPopupShow, setsnackBarPPopupShow] = snackBarPopup();
    // console.log("snackBarPopupShow", snackBarPopupShow)

    useEffect(() => {
        (async () => {
            const restaurantClass = new Restaurant();
            const result = await restaurantClass.getData();
            if (result.status) {
                setRestaurant(result.data);
            }
        })();
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const popup = urlParams.get('popup');
        if(popup === 'review') {
            setOpen(true);
        }
    }, [location])

    const handleClickOpen = (e) => {
        e.preventDefault();
        navigate(window.location.pathname+'?popup=review')
        resetModal(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        navigate(window.location.pathname);
        resetModal();
    };

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetModal = (open = false) => {
        setFormData(defaultFormData);
        setOpen(open);
        setIsLoading(false);
    }

    const handlePublish = async (event) => {
        event.preventDefault();
        if (!user) {
            setLoginPopupShow(true);
            return;
        }
        if (!restaurant) {
            toast("Restaurant data not found!", { type: "error" });
            return;
        }
        if (!formData.headline.trim()) {
            // setsnackBarPPopupShow(true);
            // toast("Headline must be required!", { type: "error" });
            return;
        }
        if (!formData.comment.trim()) {
            toast("Comment must be required!", { type: "error" });
            return;
        }
        if (formData.rating <= 0) {
            toast("Rating must be required!", { type: "error" });
            return;
        }
        setIsLoading(true);
        const reviewClass = new Review(restaurant.id);
        const result = await reviewClass.insert({
            ...formData,
            status: "publish"
        })
        if (result.status) {
            toast("Thanks for sharing your experience!", { type: "success" });
            const notificationClass = new Notification();
            await notificationClass.create({
                parentId: restaurant.id,
                parentName: restaurant.name,
                refrenceId: result.data.id,
                refrenceName: `RestaurantInfo/${restaurant.id}/Reviews`,
                type: "review",
                action: "create"
            })
            resetModal();
            navigate(window.location.pathname);
        } else {
            setIsLoading(false);
            toast("Error adding review", { type: "error" });
        }
    }

    return (
        <>
            {/* <SnackbarOpen /> */}
            <Tooltip title="Share your experience" arrow>
                <IconButton
                    aria-label="add"
                    size="large"
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 9999,
                        color: "#fff",
                        backgroundColor: "#9c27b0",
                        "&:hover, &.Mui-focusVisible": { backgroundColor: "#9c27b0" }
                    }}
                    onClick={handleClickOpen}
                >
                    <AddIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Share Your Experience
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
                            label="Headline"
                            name="headline"
                            value={formData.headline}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            label="Comment"
                            type="text"
                            inputProps={{
                                maxLength: 250
                            }}
                            value={formData.comment}
                            helperText={`${formData.comment.length}/${250}`}
                            FormHelperTextProps={{
                                textAlign: "right"
                            }}
                            name="comment"
                            onChange={(e) => handleChange(e)}
                        />
                        <FormControl
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 2
                            }}
                        >
                            <InputLabel
                                sx={{
                                    fontSize: "22px",
                                    marginLeft: "-11px"
                                }}
                                shrink
                                htmlFor="rating"
                            >Rating</InputLabel>
                            <Rating
                                sx={{ mt: 2 }}
                                name="simple-controlled"
                                id='rating'
                                size="large"
                                precision={0.5}
                                review={formData.rating}
                                onChange={(event, newReview) => {
                                    event.preventDefault();
                                    setFormData((prev) => ({ ...prev, rating: newReview }));
                                }} />
                        </FormControl>
                        {
                            isLoading ? (
                                <Button
                                    disabled
                                    variant="outlined"
                                    sx={{
                                        mt: 2,
                                        width: '100%'
                                    }}
                                >
                                    Sharing...
                                </Button>
                            ) : (
                                <Button sx={{ mt: 2, width: '100%' }} variant='contained' color='secondary' onClick={handlePublish}>Post Review</Button>
                            )
                        }
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

