
import { Card, CardContent, Skeleton, Typography } from '@mui/material';

const MenuCard = ({ length = 1 }) => {

    return (
        <>
            {
                Array(length).fill(0).map((value, key) => {
                    return (
                        <Card
                            key={value + key}
                            sx={{
                                minHeight: '130px',
                                minWidth: 130,
                                maxWidth: 300,
                                maxHeight: 350,
                                boxShadow: "none",
                                position: "relative"
                            }}
                        >
                            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                            <CardContent sx={{ justifyContent: 'flex-end', p: 0 }}>
                                <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                                    <Skeleton height={40} />
                                    <Skeleton height={50} width={50} />
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default MenuCard;