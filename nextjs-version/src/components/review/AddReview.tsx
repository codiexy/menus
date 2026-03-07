"use client";
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTenant } from '@/context/TenantContext';
import { useAuth } from '@/context/AuthContext';
import Review from '@/classes/Review';
import Notification from '@/classes/Notification';
import { SiteButton } from '../miscellaneous';

const defaultFormData = {
    headline: "",
    comment: "",
    rating: 0,
};

export default function AddReview() {
    const { tenantId, tenant } = useTenant();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);
    const { user, setLoginPopupShow } = useAuth();
    const params = useParams();
    const [error, setError] = useState({ status: false, type: "", message: "" });


    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (params.popup === 'review') {
            setOpen(true);
        }
    }, [params.popup])

    const handleClickOpen = (e: any) => {
        e.preventDefault();
        router.push(`${pathname}?popup=review`);
        resetModal(true);
    };

    const handleClose = (e: any) => {
        e.preventDefault();
        router.push(`${pathname}`);
        resetModal();
    };

    const handleChange = (e: any) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetModal = (open = false) => {
        setFormData(defaultFormData);
        setOpen(open);
        setIsLoading(false);
    }

    const handlePublish = async (event: any) => {
        event.preventDefault();
        if (!user) {
            setLoginPopupShow(true);
            return;
        }
        if (!tenant) {
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
        const reviewClass = new Review(tenantId);
        const result = await reviewClass.insert({
            ...formData,
            createdBy:user.id,
            status: "publish"
        })
        if (result.status) {
            setError({ status: true, type: "success", message: "Thanks for sharing your experience !" });
            const notificationClass = new Notification(tenantId);
            await notificationClass.create({
                parentId: tenant.id,
                parentName: tenant.name,
                refrenceId: result.id,
                refrenceName: `reviews`,
                type: "review",
                action: "create"
            })
            resetModal();
            router.push(`${pathname}`);
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
                        display: "flex",
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 9999,
                        color: "#fff",
                        "&:hover, &.Mui-focusVisible": { backgroundColor: "#9c27b0" }

                    }}
                    onClick={handleClickOpen}
                >
                    <AddIcon fontSize="medium" />
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
                                sx: {
                                    textAlign: "right"
                                }
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
                                value={formData.rating}
                                onChange={(event, newReview) => {
                                    event.preventDefault();
                                    setFormData((prev: any) => ({ ...prev, rating: newReview }));
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
                                <Button sx={{ mt: 4, width: '100%' }} variant='contained' fullWidth onClick={handlePublish}>Post Review</Button>
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

