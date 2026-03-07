import React, { useEffect, useState } from "react";

import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/material/Chip';
import { RWebShare } from "react-web-share";
import { useParams } from 'react-router-dom';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import { useNavigate } from "react-router-dom";
import { Divider, Skeleton } from '@mui/material';

import ShareIcon from '@mui/icons-material/Share';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Comment from "../Comment";
import LikeDish from "../LikeDish";
import { PublicLayout } from "../layouts";
import { Dish } from "../../classes";
import PageNotFound from "../../pages/PageNotFound";
import { APP_NAME, BASE_URL } from "../../constants";
import { RecommendDish } from "../recommend";
import RelatedDish from "./RelatedDish";


export default function DishDetails() {
    const { id, type } = useParams();
    const [dish, setDish] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const dishClass = new Dish();
            const result = await dishClass.getByCategory(type, {
                dishId: id
            });
            setDish(result);
            setIsLoading(false);
        })();
    }, [id,type]);

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
                            onClick={() => navigate('/hot-dog-kings/menu')}
                            component="div"
                        >
                            <KeyboardBackspaceIcon fontSize='large' />
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
                                        <IconButton sx={{ display: 'flex', justifyContent: 'flex-start', pb: 3 }} onClick={() => navigate('/hot-dog-kings/menu')}>
                                            <KeyboardBackspaceIcon fontSize='large' />
                                            <span style={{ paddingLeft: "10px" }}>
                                                Menu
                                            </span>
                                        </IconButton>
                                        <Box sx={{ position: 'relative' }}>
                                            <AspectRatio objectFit='fill' ratio='1'>
                                                <figure>
                                                    <img
                                                        alt={dish?.name || ""}
                                                        width="330"
                                                        height="247"
                                                        sizes="338px"
                                                        data-sizes="auto"
                                                        src={dish.imageUrl ? dish.imageUrl : "/dish-612x612.jpg"}
                                                        srcSet={dish.imageUrl ? dish.imageUrl : "/dish-612x612.jpg"}
                                                    />
                                                </figure>
                                            </AspectRatio>

                                        </Box>
                                        <Box sx={{ display: 'flex', position: "relative", gap: 1, mt: 1.5, alignItems: 'center', }}>
                                            <Chip
                                                label={<Typography sx={{ fontSize: 20 }}>
                                                    {dish?.price}
                                                </Typography>}
                                                variant="outlined"
                                                color="success"
                                                size="medium"
                                                sx={{
                                                    borderRadius: 'sm',
                                                    py: 0.25,
                                                    px: 2,
                                                    color: 'green'
                                                }}
                                                icon={<AttachMoneyIcon />}
                                            />

                                            <RWebShare
                                                data={{
                                                    text: `${dish.name} menu's live link!`,
                                                    url: `${BASE_URL}hot-dog-kings/menu/${type}/${id}`,
                                                    title: `${APP_NAME} Menu Live Link!`,
                                                }}
                                                onClick={() => console.log("shared successfully!")}
                                            >
                                                <span style={{
                                                    cursor: "pointer",
                                                    marginLeft: 'auto'
                                                }}><ShareIcon sx={{ ml: 1 }} color="secondary" /></span>
                                            </RWebShare>
                                            <LikeDish dish={dish} />
                                            <RecommendDish dish={dish} />
                                        </Box>
                                        <Box>
                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    gap: 1.5,
                                                    flexGrow: 1,
                                                }}
                                            >
                                                <Typography sx={{ fontSize: 25, fontWeight: 'xl' }}>
                                                    {dish?.name || ""}
                                                </Typography>
                                                <Typography
                                                    // overlay
                                                    underline="none"
                                                    sx={{
                                                        fontSize: 20,
                                                        textOverflow: 'ellipsis',
                                                        overflow: 'hidden',
                                                        display: 'block',
                                                        color: 'gray'
                                                    }}
                                                    level="h2">
                                                    {dish?.description || ""}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Divider sx={{ mt: 2, mb: 4 }} />
                                        <Comment dish={dish} />
                                        <Divider sx={{ mt: 2, mb: 4 }} />
                                        <RelatedDish />
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