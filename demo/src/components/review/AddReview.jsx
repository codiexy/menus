import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import { UserAuth } from '../../context/AuthContext';
import { Notification, Restaurant, Review } from '../../classes';
import { useLocation, useNavigate } from 'react-router-dom';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { SiteButton } from '../miscellaneous';

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
    const [error, setError] = useState({ status: false, type: "", message: "" });

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
        if (popup === 'review') {
            setOpen(true);
        }
    }, [location])

    const handleClickOpen = (e) => {
        e.preventDefault();
        navigate(window.location.pathname + '?popup=review')
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
            setError({ status: true, type: "error", message: "Restaurant data not found !" });
            return;
        }
        if (!formData.headline.trim()) {
            setError({ status: true, type: "warning", message: "Headline must be required !" });
            return;
        }
        if (!formData.comment.trim()) {
            setError({ status: true, type: "warning", message: "Comment must be required !" });
            return;
        }
        if (formData.rating <= 0) {
            setError({ status: true, type: "warning", message: "Rating must be required !" });
            return;
        }
        setIsLoading(true);
        const reviewClass = new Review(restaurant.id);
        const result = await reviewClass.insert({
            ...formData,
            status: "publish"
        })
        if (result.status) {
            setError({ status: true, type: "success", message: "Thanks for sharing your experience !" });
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
            setError({ status: true, type: "error", message: "Error adding review !" });
        }
    }

    return (
        <>
            <Tooltip title="Share your experience" placement='left'>
                <SiteButton
                    aria-label="add"
                    size="large"
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 9999,
                        color: "#fff",
                        "&:hover, &.Mui-focusVisible": { backgroundColor: "#9c27b0" }
                        
                    }}
                    onClick={handleClickOpen}
                >
                    <AddIcon fontSize="50px" />
                    Leave a review
                </SiteButton>
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
                                <SiteButton
                                    disabled
                                    variant="outlined"
                                    sx={{
                                        mt: 2,
                                        width: '100%'
                                    }}
                                >
                                    Sharing...
                                </SiteButton>
                            ) : (
                                <SiteButton sx={{ mt: 4, width: '100%' }} variant='contained' fullWidth onClick={handlePublish}>Post Review</SiteButton>
                            )
                        }
                    </form>
                </DialogContent>
            </Dialog>
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
    );
}

