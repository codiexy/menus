import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';

import { Category } from '../../classes';

const defaultFormData = {
    name: "",
    description: "",
};

export default function AddMenuDish({ useUpdated, useOpen }) {
    const [formData, setFormData] = useState(defaultFormData);
    const [updated, setUpdated] = useUpdated();

    const [open, setOpen] = useOpen();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = (e) => {
        e.preventDefault();
        resetModal();
    };
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.description) {
            toast("Please fill name and description!", { type: "warning" });
            return;
        }

        setIsLoading(true);
        try {
            const { name, description } = formData;
            const alias = name.toLocaleLowerCase().replace(" ", '-');
            const collection = name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            }).replace(" ", "");
            const categoryClass = new Category();
            const result = await categoryClass.insert({ name, description, alias, collection })
            if (result.status) {
                if (typeof setUpdated === "function") setUpdated(!updated);
                toast("Category added successfully", { type: "success" });
                resetModal();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            toast(error.message || "Something went wrong!", { type: "error" });
            setIsLoading(false);
        }
    }

    const resetModal = (open = false) => {
        setFormData(defaultFormData);
        setOpen(open);
        setIsLoading(false);
    }

    return (
        <div className='category-modal-wrapper'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add new category
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
                        {
                            isLoading ? (
                                <Button
                                    disabled
                                    sx={{
                                        mt: 2,
                                        width: "100%"
                                    }}
                                    variant='contained'
                                    color='secondary'
                                >
                                    Adding...
                                </Button>
                            ) : (
                                <Button
                                    sx={{
                                        mt: 2,
                                        width: "100%"
                                    }}
                                    variant='contained'
                                    color='secondary'
                                    onClick={handleSubmit}
                                >Add Category</Button>
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