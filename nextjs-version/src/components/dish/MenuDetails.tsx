import React, { useEffect, useState } from "react";
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { RWebShare } from "react-web-share";
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import { Chip, Divider, Paper, Skeleton, Tooltip } from '@mui/material';
import Comment from "../Comment";
import LikeDish from "./LikeDish";
import { APP_NAME, BASE_URL } from "../../constants";
import { RecommendDish } from "../recommend";
import { ArrowBackIosRounded, AttachMoneyRounded, SendRounded } from "@mui/icons-material";
import { notFound, useParams, useRouter } from "next/navigation";
import Dish from "@/classes/Dish";
import { useTenant } from "@/context/TenantContext";
import Image from "next/image";
// import RelatedDish from "./RelatedDish";


export default function MenuDetailsPage() {
    const { tenantId, tenantSlug } = useTenant();
    const { routes }: any = useParams();
    const [dishId] = routes;
    const [dish, setDish] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const dishClass = new Dish(tenantId);
            const result = await dishClass.first(dishId);
            setDish(result);
            setIsLoading(false);
        })();
    }, [tenantId, dishId]);
    

    if(!isLoading && dish === false) {
        notFound();
    }

    return (
        <div className="container-dish">
            <Card
                sx={{
                    minWidth: 300,
                    width: 600,
                    m: 1,
                    bgcolor: 'initial',
                    boxShadow: 'none',
                    '--Card-padding': '0px',
                    px: 3,
                    mt: 3
                }}
            >
                {isLoading ? (
                    <>
                        <Typography
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                pb: 3
                            }}
                            onClick={() => router.back()}
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
                    </>
                ) : (
                    <>
                        {
                            dish ? (
                                <>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            p: 1,
                                            mt: 1,
                                        }}
                                    >
                                        <Chip
                                            avatar={<ArrowBackIosRounded fontSize='large' />}
                                            label="Back"
                                            onClick={() => router.back()}
                                            sx={{
                                                cursor: "pointer"
                                            }}
                                        />
                                    </Typography>
                                    <Paper sx={{ mt: 1, mb: 2, borderRadius: 6 }} elevation={5}>
                                        <AspectRatio >
                                            <Card
                                                sx={{ width: 100 }}
                                            >
                                                <Image
                                                    width={580}
                                                    height={330}
                                                    alt={dish?.name || ""}
                                                    style={{
                                                        objectFit: "contain",
                                                        borderRadius: '10px'
                                                    }}
                                                    src={dish.imageUrl ? dish.imageUrl : "/menu-placeholder.jpeg"}
                                                />
                                                <div className='show_price'>
                                                    <Tooltip title="Price">
                                                        <Chip
                                                            label={
                                                                <Typography
                                                                    // size='large'
                                                                    sx={{
                                                                        fontWeight: "bold",
                                                                        color: "#fff",
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}
                                                                >
                                                                    <AttachMoneyRounded
                                                                        fontSize='small'
                                                                        sx={{
                                                                            color: "#fff"
                                                                        }}
                                                                    />{dish.price}
                                                                </Typography>}
                                                            style={{ color: '#fff' }}
                                                            sx={{
                                                                background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 300px)',
                                                            }}
                                                        />

                                                    </Tooltip>
                                                </div>
                                            </Card>
                                        </AspectRatio>

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
                                                cursor: "pointer"
                                            }} >
                                                <RWebShare
                                                    data={{
                                                        text: `${dish.name} menu's live link!`,
                                                        url: `${BASE_URL}${tenantSlug}/${dishId}`,
                                                        title: `${APP_NAME} Menu Live Link!`,
                                                    }}
                                                // onClick={() => console.log("shared successfully!")}
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
                                                <Typography
                                                    fontWeight='bold'
                                                    component="h4"
                                                    sx={{
                                                        textTransform: "capitalize"
                                                    }}
                                                >
                                                    {dish?.name || ""}
                                                </Typography>
                                                <Typography
                                                    component="p"
                                                    sx={{
                                                        mt: 1
                                                    }}
                                                >
                                                    {dish?.description || ""}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                    <Comment dish={dish} />
                                </>
                            ) : (
                                ""
                            )
                        }
                    </>
                )}
            </Card>
        </div>
    )
}