import { useState } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import EditDish from './EditDish';
import ArchiveDish from './ArchiveDish';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { PhotoCameraRounded } from '@mui/icons-material';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';
import SnackbarOpen from '../miscellaneous/SnackBar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import ChooseBackground from './ChooseBackground';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DishCard = ({ dish, useUpdated }) => {

    const [updated, setUpdated] = useUpdated()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({ status: false, type: "", message: "" });
    const [image, setImage] = useState("")
    const [isLoader, setIsLoader] = useState(false);
    const { id, name, imageUrl } = dish;
    const dishUrl = isLoader ? "/Loading_icon.gif" : imageUrl ? imageUrl : "/menu-placeholder.jpeg";


    const handleChange = async (event) => {
        const input = event.target.files[0];
        const imageData = URL.createObjectURL(input)
        if (!input) setError({ status: true, type: "warning", message: "File not selected!" });
        setIsLoader(true);
        if (input) {
            const docRef = doc(db, "Dishes", dish.id);
            const imageRef = ref(storage, `/images/${Date.now()}${input.name}`);
            uploadBytes(imageRef, input).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updateDoc(docRef, {
                        imageUrl: url
                    });
                    setImage(imageData);
                    setIsLoader(false);
                    setError({ status: true, type: "success", message: "Menu image updated successfully!" });
                });
            });

        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Stack direction='column'>
                <Card sx={{ minHeight: '130px', minWidth: 130, maxWidth: 250, maxHeight: 200 }} key={id}>
                    <CardCover>
                        {
                            image ? (
                                <img
                                    className='admin_dish_image'
                                    src={image}
                                    alt=""
                                    style={{
                                        objectFit: "contain",
                                        borderRadius: "10px",
                                    }}

                                />
                            ) : (
                                <img
                                    className='admin_dish_image'
                                    src={imageUrl === " " ? "https://sgame.etsisi.upm.es/pictures/12946.png?1608547866/" : dishUrl}
                                    alt=""
                                    style={{
                                        objectFit: "contain",
                                        borderRadius:"10px"
                                    }}
                                />
                            )
                        }

                    </CardCover>
                    <CardCover
                        sx={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 300px)',
                        }}
                    />
                    <CardContent sx={{ justifyContent: 'flex-end' }}>
                        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                            <Tooltip title={`Update photo`} arrow placement='left'>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        color: '#fff'
                                    }}
                                    color="primary" aria-label="upload picture" component="label"
                                    onClick={handleClickOpen}
                                >
                                    <input hidden accept="image/*" type="file" onChange={handleChange} />
                                    <PhotoCameraRounded />
                                </IconButton>
                            </Tooltip>
                            <EditDish dish={dish} setIsLoader={setIsLoader} />
                            <ArchiveDish dish={dish} setIsLoader={setIsLoader} useUpdated={() => [updated, setUpdated]} />
                        </Typography>
                    </CardContent>
                </Card>
                <Typography
                    textColor='secondary'
                >
                    {name}
                </Typography>
            </Stack>


            {
                error.status ?
                    <SnackbarOpen
                        message={error.message}
                        useOpen={() => [error, setError]}
                        color={error.type}
                    /> :
                    ""
            }

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Choose Dish Background
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <ChooseBackground imageUrl={imageUrl} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>

        </>
    )
}

export default DishCard;