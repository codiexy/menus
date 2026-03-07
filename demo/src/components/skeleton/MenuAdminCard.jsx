
import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { AddRounded } from '@mui/icons-material';

const MenuAdminCard = ({ length = 1 }) => {

    return (
        <>
            <div className='container'>
                {
                    Array(length).fill(0).map((value, key) => {
                        return (
                            <Card
                                key={value + key}
                                sx={{
                                    height: '170px',
                                    width: 270,
                                    m: 0,
                                    py: 0,
                                    px: 0.5,
                                }}
                            >
                                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

                                <CardContent sx={{ justifyContent: 'flex-end' }}>
                                    <Typography
                                        level="h2"
                                        fontSize="lg"
                                        textColor="#fff"
                                        mb={1}
                                        sx={{
                                            position: 'absolute',
                                            top: "5px",
                                            right: "8px",
                                            width: "45px",
                                            color: '#fff',
                                            height: "100%"

                                        }}
                                    >
                                        <PhotoCamera />
                                        <EditOutlinedIcon />
                                        <VisibilityIcon />
                                    </Typography>
                                    <Typography
                                        textColor='#fff'
                                        sx={{
                                            position: 'absolute',
                                            bottom: 23,
                                            left: 20,
                                        }}
                                    >
                                        <Skeleton
                                            height={33}
                                            width={200}
                                            animation="wave"
                                            variant="rectangular"
                                        />
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MenuAdminCard;