import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import DishCard from './DishCard';
import PublicDishCard from './PublicDishCard';
import AddMenuDish from './AddMenuDish';
import { MenuAdminCardSkeleton, MenuCardSkeleton } from '../skeleton';
import { motion } from 'framer-motion'
import { ProgressionBar } from '../miscellaneous';
import Dish from '@/classes/Dish';
import { useTenant } from '@/context/TenantContext';



function DishMenu({ category, admin = false, recommendation = false }: any) {
    const { tenantId } = useTenant();
    const [dishes, setDishes] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const [updated, setUpdated] = useState(false);
    const WithoutImageDishes = dishes.filter((ele: any) => ele.imageUrl === "");
    const percentageValue = WithoutImageDishes.length / dishes.length * 100;


    useEffect(() => {
        (async () => {
            if (category) {
                setIsloading(true);
                const dishClass = new Dish(tenantId);
                let results = [];
                if (admin) {
                    results = await dishClass.getAll({
                        category: category.id,
                        isVote: true,
                        recommendation,
                        upvote: true
                    });
                } else {
                    results = await dishClass.getPublishDish({
                        category: category.id,
                        isVote: true,
                        recommendation,
                        upvote: true
                    });
                }
                setDishes(results);
                setIsloading(false);
            }
        })();
    }, [category, updated, recommendation, tenantId, admin]);



    return (
        <>
            {
                isLoading ? (
                    <>
                        {
                            admin ? (
                                <Typography
                                    component="div"
                                    className="container"
                                    sx={{
                                    }}
                                >
                                    <MenuAdminCardSkeleton length={3} />
                                </Typography>
                            ) : (
                                <Typography
                                    component="div"
                                    className="container"
                                    sx={{
                                        mt: 3,
                                        mx: 25
                                    }}
                                >
                                    <MenuCardSkeleton length={3} />
                                </Typography>
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            dishes.length ? (
                                <>

                                    {
                                        admin ? (
                                            <Box
                                                sx={{ px: { md: 32, sm: 20 }, py: 5 }}
                                            >
                                                <AddMenuDish category={category} useUpdated={() => [updated, setUpdated]} />
                                            </Box>
                                        ) : ""
                                    }
                                    <div className="container" id='dish-menu'>
                                        {
                                            dishes.map((dish, key) => {
                                                return (
                                                    <motion.span
                                                        key={key}
                                                        animate={{ opacity: 1 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        {
                                                            admin ? (
                                                                <DishCard dish={dish} useUpdated={() => [updated, setUpdated]} />
                                                            ) : (
                                                                <PublicDishCard dish={dish} category={category} recommendation={recommendation} />
                                                            )
                                                        }
                                                    </motion.span>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            ) : (
                                <Typography component="div" sx={{
                                    minHeight: "233px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    {
                                        admin ? (
                                            <div className='addCard'>
                                                <AddMenuDish category={category} useUpdated={() => [updated, setUpdated]} />
                                            </div>
                                        ) : (
                                            <Typography variant='h5'>
                                                {!category ? "Category Not Found" : " Data Found"}
                                            </Typography>
                                        )
                                    }
                                </Typography>
                            )
                        }

                        {
                            admin && (
                                <>
                                    {
                                        WithoutImageDishes.length ? (
                                            <Box sx={{ background: 'lightgray', padding: "20px", borderRadius: '10px', width: "50%", marginLeft: '20%' }}>
                                                <ProgressionBar value={percentageValue} />
                                            </Box>
                                        ) : ""
                                    }
                                </>
                            )
                        }

                    </>
                )
            }
        </>
    )
}

export default DishMenu