
import { Grid, Skeleton } from '@mui/material';

const NotificationCard = ({ length = 1, cols = [1, 11], className = "", ...props }) => {

    return (
        <>
            {
                Array(length).fill(0).map((value, key) => {
                    return (
                        <Grid
                            className={className || ""}
                            container
                            spacing={0}
                            key={value + key}
                            {...props}
                        >
                            <Grid item md={cols[0]}>
                                <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            </Grid>
                            <Grid item md={cols[1]}>
                                <Skeleton animation="wave" variant="rectangular" width="50%" />
                                <Skeleton sx={{ mt: 1 }} animation="wave" variant="text" width="90%" />
                            </Grid>
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default NotificationCard;