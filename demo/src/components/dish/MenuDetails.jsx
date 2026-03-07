import React, { useEffect, useState } from "react";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { RWebShare } from "react-web-share";
import { useParams } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import { useNavigate } from "react-router-dom";
import { Chip, Divider, Paper, Skeleton, Stack, Tooltip } from '@mui/material';
import Comment from "../Comment";
import LikeDish from "./LikeDish";
import { PublicLayout } from "../layouts";
import { Dish } from "../../classes";
import PageNotFound from "../../pages/PageNotFound";
import { APP_NAME, BASE_URL } from "../../constants";
import { RecommendDish } from "../recommend";
import RelatedDish from "./RelatedDish";
import { ArrowBackIosRounded, AttachMoneyRounded, KeyboardBackspaceRounded, SendRounded } from "@mui/icons-material";
import { SiteButton } from "../miscellaneous";


export default function MenuDetailsPage() {
    const { id } = useParams();
    const [dish, setDish] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const dishClass = new Dish();
            const result = await dishClass.getByDishId(id);
            if (result.status === true) {
                setDish(result.data);
            }
            setIsLoading(false);
        })();
    }, [id]);

    return (
        <PublicLayout>
            {isLoading ? (
                <div className="container-dish">
                    <Card
                        sx={{
                            minWidth: 300,
                            width: 600,
                            m: 1,
                            bgcolor: 'initial',
                            boxShadow: 'none',
                            '--Card-padding': '0px',
                        }}
                    >
                        <Typography
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                pb: 3
                            }}
                            onClick={() => navigate(-1)}
                            component="div"
                        >
                            <ArrowBackIosRounded fontSize='large' />
                            <span style={{ paddingLeft: "10px" }}>
                                Menu
                            </span>
                        </Typography>
                        <Box sx={{ position: 'relative' }}>
                            <Skeleton animation="wave" variant="rectangular" width="100%" height={400} />

                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1.5, alignItems: 'center', }}>
                            <Skeleton height={70} width="100%" />
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    mt: 1,
                                    gap: 1.5,
                                    flexGrow: 1,
                                }}
                            >
                                <Typography sx={{ fontSize: 25, fontWeight: 'xl' }}>
                                    <Skeleton width="60%" height={50} />
                                </Typography>
                                <Typography
                                    underline="none"
                                    sx={{
                                        fontSize: 20,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        display: 'block',
                                        color: 'gray'
                                    }}
                                    variant="h2"
                                >
                                    <Skeleton />
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ mt: 2, mb: 4 }} />
                    </Card>
                </div>
            ) : (
                <>
                    {
                        dish ? (
                            <>
                                <div className="container-dish">
                                    <Card
                                        sx={{
                                            minWidth: 300,
                                            width: 600,
                                            m: 1,
                                            bgcolor: 'initial',
                                            boxShadow: 'none',
                                            '--Card-padding': '0px',
                                        }}
                                    >
                                        <SiteButton sx={{ display: 'flex', justifyContent: 'flex-start', p: 1, mt: 1 }} onClick={() => navigate(-1)}>
                                            <ArrowBackIosRounded fontSize='large' />
                                            <span style={{ paddingLeft: "3px", fontSize: "20px" }}>
                                                Menu
                                            </span>
                                        </SiteButton>
                                        {/* <Box sx={{ position: 'relative' }}> */}
                                        <Paper sx={{ mt: 1, mb: 2, borderRadius: 6 }} elevation={5}>
                                            <AspectRatio >
                                                {/* <figure> */}
                                                <Card
                                                    sx={{ width: 100 }}
                                                >
                                                    <img
                                                        alt={dish?.name || ""}
                                                        style={{
                                                            objectFit: "contain",
                                                            height: "330px",
                                                            width: "580px",
                                                            borderRadius: '10px'
                                                        }}
                                                        src={dish.imageUrl ? dish.imageUrl : "/menu-placeholder.jpeg"}
                                                        srcSet={dish.imageUrl ? dish.imageUrl : "/menu-placeholder.jpeg"}
                                                    />
                                                    <div className='show_price'>
                                                        <Tooltip title="Price">
                                                            <Chip
                                                                label={
                                                                    <Typography
                                                                        color='#fff'
                                                                        fontWeight='bold'
                                                                        size='large'
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        <AttachMoneyRounded
                                                                            fontSize='small'
                                                                            color='#fff'
                                                                        />{dish.price}
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
                                                {/* </figure> */}
                                            </AspectRatio>

                                            {/* </Box> */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    px: 4,
                                                    justifyContent: 'space-between',
                                                    py: 2
                                                }}
                                            >

                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }} >
                                                    <RWebShare
                                                        data={{
                                                            text: `${dish.name} menu's live link!`,
                                                            url: `${BASE_URL}hot-dog-kings/menu/${id}`,
                                                            title: `${APP_NAME} Menu Live Link!`,
                                                        }}
                                                        onClick={() => console.log("shared successfully!")}
                                                    >
                                                        <span style={{
                                                            cursor: "pointer",
                                                            marginLeft: 'auto'
                                                        }}>
                                                            <SendRounded sx={{ mr: 1 }} color="disabled" /></span>
                                                    </RWebShare>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: 'gray',
                                                            display: { xs: 'none', md: 'flex' }
                                                        }} >Share</Typography>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                }} >

                                                    <LikeDish dish={dish} />
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: 'gray',
                                                            display: { xs: 'none', md: 'flex' },
                                                            ml: 1
                                                        }} >Like</Typography>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }} >
                                                    <RecommendDish dish={dish} />
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: 'gray',
                                                            display: { xs: 'none', md: 'flex' }
                                                        }} >Recommend</Typography>
                                                </div>
                                            </Box>
                                            <Box>
                                                <Divider />
                                                <Box
                                                    sx={{
                                                        gap: 1.5,
                                                        flexGrow: 1,
                                                        pl: 4,
                                                        pb: 1,
                                                        my: 2
                                                    }}
                                                >
                                                    <Typography fontWeight='bold' variant="h4" >
                                                        {dish?.name || ""}
                                                    </Typography>
                                                    <Typography
                                                        variant="h3"
                                                    >
                                                        {dish?.description || ""}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                        <Comment dish={dish} />
                                        <Divider sx={{ mt: 2, mb: 4 }} />
                                        {/* <RelatedDish /> */}
                                    </Card>
                                </div>
                            </>
                        ) : (
                            <>
                                <PageNotFound />
                            </>
                        )
                    }
                </>
            )}
        </PublicLayout>
    )
}