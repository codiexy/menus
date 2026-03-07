import { Backdrop, CircularProgress } from '@mui/material';

const SiteLoader = ({ isLoading = true }) => {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 9999 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default SiteLoader;