import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { CircularProgress, FormControl, MenuItem, Paper, Select, Skeleton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { InfiniteScroller } from '../miscellaneous';
import { Restaurant, Review } from '../../classes';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import moment from 'moment';
import { orderBy } from 'firebase/firestore';

export default function Reviews() {
    const [sort, setSort] = React.useState('');
    const [start, setStart] = useState(0);
    const [limit] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const totalRating = reviews.reduce((a, v) => a = a + v.rating, 0);
    const overAllRating = Math.floor(totalRating / reviews.length);

    const handleChange = async (event) => {
        setSort(event.target.value);
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const restaurantClass = new Restaurant();
            const result = await restaurantClass.getData();
            if (result.status) {
                const reviewClass = new Review(result.data.id);
                if (sort === "all") {
                    const resultReviews = await reviewClass.getAllData([
                        orderBy("createdAt"),
                    ]);
                    setReviews(resultReviews);
                }
                else if (sort === "recent") {
                    const resultReviews = await reviewClass.getRecentData([
                        orderBy("createdAt"),
                    ]);
                    setReviews(resultReviews);
                } else {
                    const resultReviews = await reviewClass.getAllData([
                        orderBy("createdAt"),
                    ]);
                    setReviews(resultReviews);
                }
            }
            setIsLoading(false);
        })();
    }, [sort]);

    return (
        <div className="manuverse-content">
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    mt: 1,

                }}
            >

                <List
                    sx={{
                        width: 515,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        ml: { md: 45 }, mr: { md: 45 },
                        borderBottom: "1px solid gray"
                    }}
                >
                    <ListItem>
                        <ListItemText primary={<strong>Reviews for Hot Dog Kings</strong>}
                            secondary={
                                <>
                                    {
                                        overAllRating ? (
                                            <>
                                                <Rating value={overAllRating} readOnly />
                                                <Typography>{overAllRating || ""} ratings</Typography>
                                            </>
                                        ) : (
                                            <Skeleton variant="rectangular" width={210} height={20} />
                                        )
                                    }
                                </>
                            }
                        />
                    </ListItem>

                </List>
                <Paper sx={{ width: '100%', overflow: 'hidden', ml: { md: 45 }, mr: { md: 45 } }} className="subscribe_card_papercol">

                    {
                        isLoading ? (
                            <Typography variant="body4" color="text.secondary" sx={{
                                height: '470px',
                                width: '100%',
                                textAlign: 'Center',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Typography component="p" ><CircularProgress /></Typography>
                            </Typography>
                        ) : (
                            <>
                                <div className='sort_review'>
                                    <Typography>Sort by :</Typography>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <Select
                                            defaultValue='recent'
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={sort}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="recent">Most recent</MenuItem>
                                            <MenuItem value="all">All</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {reviews.length ? (

                                    <InfiniteScroller handleNext={setStart} totalCount={reviews.length} limit={limit}>
                                        {reviews.slice(0, start + limit).map(({ headline, comment, rating, user, createdAt }, index) => (

                                            <>
                                                <Card sx={{ width: '100%', mb: 4, border: 'none' }} >
                                                    <div className='review_time'>
                                                        <CardHeader
                                                            style={{ borderWidth: '0' }}
                                                            avatar={
                                                                <Avatar aria-label="recipe" key={index} className="review_avtar">
                                                                    {user.name?.charAt(0)}
                                                                </Avatar>
                                                            }
                                                            title={user.name}
                                                            subheader="September 14, 2016"
                                                        />
                                                        <Typography component="p">{moment(createdAt.toDate()).fromNow()}</Typography>
                                                    </div>
                                                    <CardContent>
                                                        <Box
                                                            sx={{
                                                                '& > legend': { mt: 2 },
                                                            }}
                                                        >
                                                            <Rating
                                                                sx={{ mb: -2 }}
                                                                name="review-rating"
                                                                precision={0.5}
                                                                readOnly
                                                                value={rating}

                                                            />
                                                            <Typography sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }} variant="body2" color="text.secondary">Experience</Typography>
                                                        </Box>
                                                        <Typography variant="h5" color="text.primary">
                                                            {headline}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                            {comment}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </>
                                        ))}
                                    </InfiniteScroller>
                                ) : (
                                    <Typography variant="body4" color="text.secondary" sx={{
                                        height: '480px',
                                        width: '100%',
                                        textAlign: 'Center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <Typography component="p" sx={{ fontSize: "40px" }} >No reviews yet</Typography>
                                    </Typography>
                                )}
                            </>
                        )
                    }
                </Paper>
            </Box>
        </div>
    );
}

