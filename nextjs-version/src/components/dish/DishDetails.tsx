import React, { useEffect, useState } from "react";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { RWebShare } from "react-web-share";
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import { Chip, Divider, Paper, Skeleton, Stack, Tooltip } from '@mui/material';
import Comment from "../Comment";
import LikeDish from "./LikeDish";
import PublicLayout from "@/components/layouts/PublicLayout";
import { APP_NAME, BASE_URL } from "../../constants";
import { RecommendDish } from "../recommend";
import RelatedDish from "./RelatedDish";
import { ArrowBackIosRounded, AttachMoneyRounded, KeyboardBackspaceRounded, MonetizationOnRounded, SendRounded } from "@mui/icons-material";
import { SiteButton } from "../miscellaneous";
import { redirect, useParams, useRouter } from "next/navigation";
import Dish from "@/classes/Dish";
import { useTenant } from "@/context/TenantContext";
import PageNotFound from "@/app/[tenant]/pagenotfound/page";
import Image from "next/image";




export default function DishDetails() {
    const { tenantId, tenantSlug } = useTenant();
    const { id, type, slug } = useParams();
    const router = useRouter()
    const [dish, setDish] = useState<any>(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const dishClass = new Dish(tenantId);
            const result = await dishClass.getByCategory(type, {
                dishId: id
            });
            setDish(result);
            setIsLoading(false);
        })();
    }, [id, type, tenantId]);

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
                                    sx={{
                                        fontSize: 20,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        display: 'block',
                                        color: 'gray'
                                    }}
                                    component="h2"
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
                                        <SiteButton sx={{ display: 'flex', justifyContent: 'flex-start', p: 1, mt: 1 }} onClick={() => router.push(`/${tenantSlug}/menu`)}>
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
                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        alt={dish?.name || ""}
                                                        style={{
                                                            objectFit: "contain",
                                                        }}
                                                        src={dish.imageUrl ? dish.imageUrl : "/menu-placeholder.jpeg"}
                                                    // srcSet={dish.imageUrl ? dish.imageUrl : "/menu-placeholder.jpeg"}
                                                    />
                                                    <div className='show_price'>
                                                        <Tooltip title="Price">
                                                            <Chip
                                                                label={
                                                                    <Typography
                                                                        fontWeight='bold'
                                                                        fontSize='30px'
                                                                        sx={{
                                                                            color: "#fff",
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        <MonetizationOnRounded
                                                                            fontSize='small'
                                                                            sx={{
                                                                                color: "#fff",
                                                                                mr: .5,
                                                                                fontSize: '30px'
                                                                            }}
                                                                        />{dish.price}
                                                                    </Typography>}
                                                                style={{ color: '#fff' }}
                                                                sx={{
                                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 300px)',
                                                                    p: 3
                                                                }}
                                                            />

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
                                                            url: `${BASE_URL}hot-dog-kings/menu/${type}/${id}`,
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
                                                        // mt: 2,
                                                        gap: 1.5,
                                                        flexGrow: 1,
                                                        pl: 4,
                                                        pb: 1,
                                                        my: 2
                                                    }}
                                                >
                                                    <Typography fontWeight='bold' component="h4" >
                                                        {dish?.name || ""}
                                                    </Typography>
                                                    <Typography
                                                        component="h3"
                                                    >
                                                        {dish?.description || ""}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
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