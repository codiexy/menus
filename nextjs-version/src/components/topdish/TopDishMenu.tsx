import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material';
import { motion } from "framer-motion"
import { MenuCardSkeleton } from '../skeleton';
import TopDishCard from './TopDishCard';
import { useTenant } from '@/context/TenantContext';
import Dish from '@/classes/Dish';

export default function TopDishMenu({ category, isActive = false, admin = false, recommendation = false }: any) {

    const { tenantId } = useTenant();
    const [dishes, setDishes] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        (async () => {
            if (category && isActive) {
                setIsloading(true);
                const dishClass = new Dish(tenantId);
                const result: any = await dishClass.getAll({
                    category: category.id,
                    isVote: true,
                    recommendation,
                    upvote: true,
                    isTopDishes: true
                });
                const res = [...result].sort((a, b) => b.voteCount - a.voteCount);
                setDishes(res);
                setIsloading(false);
            }
        })();
    }, [category, tenantId, isActive, recommendation]);


    return (
        <>
            {
                isLoading ? (
                    <>
                        {
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
                        }
                    </>
                ) : (
                    <>
                        {
                            dishes.length ? (
                                <>
                                    <div className="container">
                                        {
                                            dishes.map((dish, key) => {
                                                return (
                                                    <motion.span
                                                        key={key}
                                                        animate={{ opacity: 1 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        <TopDishCard dish={dish} category={category} key={key} recommendation={recommendation} topdish={false} />
                                                    </motion.span>
                                                )

                                            })
                                        }
                                    </div>
                                </>
                            ) : (
                                <Typography
                                    component="div"
                                    className="container"
                                    sx={{
                                        mt: 3,
                                        mx: 25
                                    }}
                                >
                                    <Typography variant='h3' className='not_found'>No top dishes yet</Typography>
                                </Typography>
                            )
                        }
                    </>
                )
            }
        </>
    )
}
