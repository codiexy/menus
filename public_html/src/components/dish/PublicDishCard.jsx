
import Card from '@mui/joy/Card';
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { Sheet } from '@mui/joy';


const PublicDishCard = ({ dish, category, recommendation = false }) => {

    const { id, name, imageUrl, price } = dish;
    const dishImage = imageUrl ? imageUrl : "/dish-612x612.jpg";

    return (
        <>
            <Card
                sx={{ minHeight: '130px', minWidth: 130, maxWidth: 300, maxHeight: 350, pb: 0, pt: 0, }}>
                <Link to={`/hot-dog-kings/menu/${category.alias}/${id}`} className='menuLink'>
                    <CardOverflow >
                        <AspectRatio >
                            <Card>
                                <img
                                    src={dishImage}
                                    alt=""
                                    style={{
                                        objectFit: "contain",
                                    }}
                                />

                            </Card>
                        </AspectRatio>
                    </CardOverflow>
                </Link>

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
                <Typography key={name} variant="h1" textAlign='center' sx={{ fontSize: '20px', mt: 1, ml: -2, fontWeight: '900' }}>
                    {name}
                </Typography>
                <Typography key={price} variant='soft' textAlign='center' startDecorator={<AttachMoneyIcon />}
                    sx={{
                        background: "none",
                        fontSize: '20px',
                        color: 'GrayText',
                        display: 'flex',
                        justifyContent: 'center'
                    }} >
                    {price}
                </Typography>
            </Card>
        </>
    )
}

export default PublicDishCard;