import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { IconButton, Stack, Typography } from '@mui/material'; import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { InfoRounded } from '@mui/icons-material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
    borderColor: '#4458BE',
    backgroundColor: 'whitesmoke',
    borderWidth: 4
};


export default function CustomizedProgressBars({ value }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Box sx={{ flexGrow: 1, borderRadius: 18 }}>
            <Stack direction='row' >
                <Typography variant='h5' sx={{ padding: '5px' }}>
                    Photo progress for this category
                </Typography>
                <IconButton sx={{ color: '#4458BE' }} onClick={handleOpen}><InfoRounded /></IconButton>
            </Stack>
            <BorderLinearProgress variant="determinate" value={value} />
            <Typography variant='p' >
                {`${Math.round(
                    value
                )}%`} of dishes in this category, needs a photo.
            </Typography>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}