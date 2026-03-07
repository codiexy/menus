
import Card from '@mui/joy/Card';
import { Link } from 'react-router-dom'
import { Avatar, Tooltip, Box } from '@mui/material';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { Sheet } from '@mui/joy';
import { AttachMoneyRounded } from '@mui/icons-material';


const TopDishCard = ({ dish, category, recommendation = false }) => {

    const { id, name, imageUrl, price } = dish;
    const dishImage = imageUrl ? imageUrl : "/menu-placeholder.jpeg";


    return (
        <>
            <Card
                sx={{
                    minHeight: '130px',
                    minWidth: 130,
                    maxWidth: 300,
                    maxHeight: 350,
                    pb: 0,
                    pt: 0,
                    mt: 3,
                }}
            >
                <Link to={`/hot-dog-kings/menu/${category.alias}/${id}`} className='menuLink'>
                    <CardOverflow>
                        <AspectRatio ratio="4/3">
                            <Card>
                                <img
                                    src={dishImage}
                                    alt=""
                                    style={{
                                        objectFit: 'contain'
                                    }}
                                />

                            </Card>
                        </AspectRatio>
                    </CardOverflow>
                </Link>
                <div className='show_votecount'>
                    <Tooltip title="Votes">
                        <Avatar
                            sx={{
                                backgroundColor: '#4458BE',
                                p: .5,
                                position: 'absolute',
                                top: -29,
                                right: 4,
                            }}
                        >
                            <BiUpvote />
                            {dish.voteCount}
                        </Avatar>
                    </Tooltip>
                </div>

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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                        px: 3,
                    }}
                >
                    <Typography key={name} variant="h3" textAlign='center' sx={{}}>
                        {name}
                    </Typography>
                    <Typography key={price} variant="h3"  textAlign='center' sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachMoneyRounded fontSize='small' sx={{ mr: -.7}} /> {price}
                    </Typography>
                </Box>
            </Card>
        </>
    )
}

export default TopDishCard;