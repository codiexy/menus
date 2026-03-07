
import Card from '@mui/joy/Card';
import { Link } from 'react-router-dom'
import { Box, Chip, Stack, Tooltip } from '@mui/material';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import CardOverflow from '@mui/joy/CardOverflow';
import { MonetizationOnRounded } from '@mui/icons-material';



const PublicDishCard = ({ dish, category, recommendation = false }) => {

    const { id, name, imageUrl, price } = dish;
    const dishImage = imageUrl ? imageUrl : "/menu-placeholder.jpeg";

    return (
        <>

            <Box>

                <Link to={`/hot-dog-kings/menu/${category.alias}/${id}`} className='menuLink'>
                    <CardOverflow>
                        <AspectRatio ratio="4/3">
                            <Card
                                sx={{ borderRadius: 2 }}
                            >
                                <img
                                    src={dishImage}
                                    alt=""
                                    style={{
                                        objectFit: "contain",
                                    }}
                                />
                                <div className='show_price'>
                                    <Tooltip title="Price">
                                        <Chip
                                            label={
                                                <Typography
                                                    color='#fff'
                                                    fontWeight='bold'
                                                    fontSize= '20px'
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <MonetizationOnRounded
                                                        fontSize='small'
                                                        color='#fff'
                                                        sx={{ mr: .5 }}
                                                    />{price}
                                                </Typography>}
                                            style={{ color: '#fff' }}
                                            sx={{
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 300px)',
                                            }}
                                        >
                                        </Chip>
                                    </Tooltip>
                                </div>
                            </Card>
                        </AspectRatio>
                    </CardOverflow>
                </Link>
            </Box>

            {
                recommendation === true ? (
                    <Tooltip title={`${dish.voteCount} Recommendations`} arrow>
                        <Typography
                            component="div"
                            fontSize="lg"
                            mb={1}
                            sx={{
                                position: 'absolute',
                                top: 19,
                                right: 4,
                                color: '#9d30ac',
                                padding: "2px 12px",
                                borderRadius: "5px",
                                width: 20,
                                textAlign: "center"
                            }}
                        >
                            <BiUpvote color={dish.isVote?.type === "up" ? '#9d30ac' : "#333"} fontSize={24} style={{ marginBottom: "-6px" }} />
                            {dish.voteCount}
                            <BiDownvote color={dish.isVote?.type === "down" ? '#9d30ac' : "#333"} fontSize={24} style={{ marginTop: "3px" }} />
                        </Typography>
                    </Tooltip>
                ) : ""
            }
            <Typography key={name} variant="p"  sx={{  mt: 1, mb: 3 }}>
                {name}
            </Typography>
         
        </>
    )
}

export default PublicDishCard;