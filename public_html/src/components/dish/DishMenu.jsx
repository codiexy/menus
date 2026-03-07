import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material';
import { Dish } from '../../classes';
import DishCard from './DishCard';
import PublicDishCard from './PublicDishCard';
import AddMenuDish from './AddMenuDish';
import { MenuAdminCardSkeleton, MenuCardSkeleton } from '../skeleton';
import { motion } from 'framer-motion'



function DishMenu({ category, admin = false, recommendation = false }) {
    const [dishes, setDishes] = useState([])
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
                    upvote: true
                });
                setDishes(result);
                setIsloading(false);
            }
        })();
    }, [category, updated,recommendation]);

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

                                    <div className="container">
                                        {
                                            admin ? (
                                                <div className='addCard'>
                                                    <AddMenuDish category={category} useUpdated={() => [updated, setUpdated]} />
                                                </div>
                                            ) : ""
                                        }
                                        {
                                            dishes.map((dish, key) => {
                                                if (admin) {
                                                    return (
                                                        <>
                                                            <DishCard dish={dish} key={key} />

                                                        </>
                                                    )
                                                }
                                                return (
                                                    <>
                                                        <motion.span
                                                            animate={{ opacity: 1 }}
                                                            whileHover={{ scale: 1.1 }}
                                                        >
                                                            <PublicDishCard dish={dish} category={category} key={key} recommendation={recommendation} />
                                                        </motion.span>
                                                    </>
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
                                                {!category ? "Category Not Found" : "No Data Found"}
                                            </Typography>
                                        )
                                    }
                                </Typography>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default DishMenu