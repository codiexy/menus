import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box, Grid, TextField, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { UserAuth } from '../../context';
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from '../../firebase';


const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;

export default function WorkingHoursData({ restaurant, setIsLoading }) {

    const { user } = UserAuth();
    const [activeIndex, setActiveIndex] = useState(-1);
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");
    const [error, setError] = useState({ status: false, type: "", message: "" });

    const handleEdit = (index, data) => {
        setActiveIndex(index);
        setOpenTime(data.openTime)
        setCloseTime(data.closeTime)
    }

    const handleUpdate = async () => {
        if (!timeRegex.test(openTime)) {
            setError({ status: true, type: "error", message: "Opening Time is not valid" });
            return;
        }
        if (!timeRegex.test(closeTime)) {
            setError({ status: true, type: "error", message: "Closing Time is not valid" });
            return;
        }
        // let collectionRef = doc(db, "RestaurantInfo", restaurant.id);
        // const result = await updateDoc(collectionRef, {
        //     closeTime: closeTime,
        //     closeTime: closeTime,
        //     updatedBy: user.id,
        //     updatedAt: Timestamp.now().toDate()
        // })
        // const data = await result.first(restaurant.id);
        // return {
        //     status: true,
        //     message: "Updated successfully!",
        //     data: data
        // }
        // }
        // // setIsLoading(true)
        // const dishClass = new Restaurant();
        // const result = await dishClass.update(restaurant.id, {
        //     openTime: openTime,
        //     closeTime: closeTime
        // })
        // console.log("result", result)
        // setIsLoading(true)

    }


    return (
        <div>
            <div className="accountListItems">
                <Typography variant='h6'>Working Hours</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Day</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.workingHours.map((ele, index) => (
                                <TableRow key={index}>
                                    <TableCell>{ele.day}</TableCell>
                                    <TableCell>{ele.openTime}</TableCell>
                                    <TableCell>{ele.closeTime}</TableCell>
                                    <TableCell>
                                        {activeIndex === index ? (
                                            <>
                                                <Box
                                                    sx={{
                                                        maxWidth: '100%',
                                                    }}
                                                >
                                                    <h3>Update Timing</h3>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <TextField size='small' value={openTime} onChange={(e) => setOpenTime(e.target.value)} label="Opening time" />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField size='small' value={closeTime} onChange={(e) => setCloseTime(e.target.value)} label="Closing time" />
                                                        </Grid>
                                                        <Grid item xs={12} justifyContent="center">
                                                            <Button onClick={handleUpdate} variant='contained' size="small">update</Button>{" "}
                                                            <Button onClick={() => setActiveIndex(-1)} variant='contained' color="grey" size="small">Cancel</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </>
                                        ) : (
                                            <IconButton onClick={() => handleEdit(index, ele)}>
                                                <Edit />
                                            </IconButton>

                                        )
                                        }


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {
                error.status ?
                    <SnackbarOpen
                        message={error.message}
                        useOpen={() => [error, setError]}
                        color={error.type}
                    /> :
                    ""
            }
        </div>
    )
}
