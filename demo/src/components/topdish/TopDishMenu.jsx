import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material';
import { Dish } from '../../classes';
import { motion } from "framer-motion"
import { MenuCardSkeleton } from '../skeleton';
import TopDishCard from './TopDishCard';

export default function TopDishMenu({ category, admin = false, recommendation = false }) {

    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        (async () => {
            if (category) {
                setIsloading(true);
                const dishClass = new Dish();
                const result = await dishClass.getAll({
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
    }, [category, updated]);


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
                                <Typography className='not_found'>No top dishes yet</Typography>
                            )
                        }
                    </>
                )
            }
        </>
    )
}
