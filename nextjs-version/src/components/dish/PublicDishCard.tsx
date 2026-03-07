
import Card from '@mui/joy/Card';
import { Box, Chip, Tooltip } from '@mui/material';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import CardOverflow from '@mui/joy/CardOverflow';
import { MonetizationOnRounded } from '@mui/icons-material';
import TenantLink from '../miscellaneous/TenantLink';
import Image from 'next/image';
import { useParams } from 'next/navigation';



const PublicDishCard = ({ dish, recommendation = false }: any) => {
    const { id, name, imageUrl, price } = dish;
    const dishImage = imageUrl ? imageUrl : "/menu-placeholder.jpeg";

    return (
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
            <TenantLink href={`/${id}`} className='menuLink'>
                <CardOverflow>
                    <AspectRatio ratio="4/3">
                        <Card>
                            <Image
                                width={200}
                                height={200}
                                src={dishImage}
                                alt=""
                                style={{
                                    objectFit: 'contain'
                                }}
                            />

                        </Card>
                    </AspectRatio>
                </CardOverflow>
            </TenantLink>
            <div className='show_price'>
                <Tooltip title="Price">
                    <Chip

                        label={
                            <Typography
                                sx={{
                                    color: '#ff5a5f',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <MonetizationOnRounded
                                    fontSize='small'
                                    sx={{ mr: .5 }}
                                />{price}
                            </Typography>}
                        style={{ color: '#fff' }}
                        sx={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 300px)',
                        }}
                    />

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
                <Typography key={name} component="h3" textAlign='center' sx={{}}>
                    {name}
                </Typography>
                {/* <Typography key={price} variant="h3" textAlign='center' sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyRounded fontSize='small' sx={{ mr: -.7 }} /> {price}
                </Typography> */}
            </Box>
        </Card>
    )
}

export default PublicDishCard;