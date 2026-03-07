import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, CircularProgress, Grid, Divider } from '@mui/material';
import { Like } from '../../classes';
import PublicDishCard from '../dish/PublicDishCard';
import { FavoriteRounded } from '@mui/icons-material';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const likeClass = new Like();
            const result = await likeClass.favorites();
            setFavorites(result);
            setIsLoading(false);
        })();
    }, [])

    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FavoriteRounded />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Favorites" secondary="Menu dish favorites list." />
                </ListItem>
                <Divider />
            </List>
            {
                isLoading ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, 0)"
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {
                            favorites.length ? (
                                <>
                                    <Grid container sx={{ marginTop: '-10px !important' }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 12 }}>
                                        {
                                            favorites.map((dish, index) => (
                                                <Grid item xs={2} sm={4} md={4} key={index}>
                                                    <PublicDishCard dish={dish} category={dish.category} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </>
                            ) : (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, 0)"
                                    }}
                                >
                                    <div className='blank-box'>
                                        <img src="/favorites-icon.png" />
                                        <p>You have not added any favorites yet</p>
                                    </div>
                                </Box>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default Favorites