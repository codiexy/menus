import React, { useState } from 'react';
import { Table, TableBody, DialogContent, DialogActions, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Dialog, DialogTitle, Checkbox, Avatar, Stack, Tooltip } from '@mui/material';
import SnackbarOpen from '../miscellaneous/SnackBar';
import CloseIcon from '@mui/icons-material/Close';
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '@/context/AuthContext';
import TimePicker from '../miscellaneous/TimePicker';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';

let defaultWorkingHours = [
    { day: 'Sunday', openTime: '', closeTime: '', isClosed: true },
    { day: 'Monday', openTime: '', closeTime: '', isClosed: false },
    { day: 'Tuesday', openTime: '', closeTime: '', isClosed: false },
    { day: 'Wednesday', openTime: '', closeTime: '', isClosed: false },
    { day: 'Thursday', openTime: '', closeTime: '', isClosed: false },
    { day: 'Friday', openTime: '', closeTime: '', isClosed: false },
    { day: 'Saturday', openTime: '', closeTime: '', isClosed: false },
]

export default function WorkingHoursData() {

    const { tenant, updateTenant } = useAuth();
    const [isUpdated, setIsUpdated] = useState(false);
    const [editDays, setEditDays] = useState<string[]>([]);
    const [workingHours, setWorkingHours] = useState(() => {
        const wHData: any = tenant?.workingHours || [];
        return defaultWorkingHours.map((data: any) => {
            const dayData: any = wHData.find((v: any) => v.day == data.day) || {};
            return {
                day: data.day,
                openTime: dayData?.openTime || data.openTime,
                closeTime: dayData?.closeTime || data.closeTime,
                isClosed: dayData?.isClosed || data.isClosed,
            }
        })
    });

    const handleChange = (value: any, name: string, day: string) => {
        setIsUpdated(true);
        value = value ? value.format('hh:mm A') : "";
        let newWorkingHours = workingHours;
        newWorkingHours = newWorkingHours.map((data: any) => {
            if (data.day == day) {
                data[name] = value;
            }
            return data;
        })
        setWorkingHours(newWorkingHours);
    };

    const handleUpdate = async () => {
        updateTenant({
            workingHours
        })
    };


    const handleEditable = (value: string) => {
        let newEditDays = editDays;
        newEditDays.push(value);
        newEditDays = newEditDays.filter((v, i) => newEditDays.indexOf(v) === i)
        setEditDays(newEditDays)
    }

    const removeEditable = (value: string) => {
        let newEditDays = editDays;
        newEditDays = newEditDays.filter((v, i) => newEditDays.indexOf(v) === i && v != value)
        setEditDays(newEditDays)
    }

    const handleClosed = (event: React.ChangeEvent<HTMLInputElement>, day: string) => {
        handleChange(event.target.checked, event.target.name, day);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Typography variant='h5' sx={{ p: 2 }}>Working Hours
                    {
                        isUpdated ? (
                            <Tooltip title="Update">
                                <Button
                                    variant="contained"
                                    endIcon={<UpdateIcon />}
                                    onClick={handleUpdate}
                                    sx={{ float: "right" }}
                                >
                                    Update
                                </Button>
                            </Tooltip>
                        ) : ""
                    }
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Open Time</TableCell>
                            <TableCell>Close Time</TableCell>
                            {/* <TableCell>Closed</TableCell> */}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            workingHours.map((ele, key) => {
                                return (
                                    <>
                                        <TableRow key={key}>
                                            <TableCell>{ele.day}</TableCell>
                                            <TableCell>
                                                {
                                                    editDays.includes(ele.day)
                                                        ? (
                                                            <TimePicker value={ele.openTime} day={ele.day} name='openTime' handleChange={handleChange} />
                                                        )
                                                        : (ele.openTime || "N/A")
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    editDays.includes(ele.day)
                                                        ? (
                                                            <TimePicker value={ele.closeTime} day={ele.day} name='closeTime' handleChange={handleChange} />
                                                        )
                                                        : (ele.closeTime || "N/A")
                                                }
                                            </TableCell>
                                            {/* <TableCell>
                                            {
                                                editDays.includes(ele.day)
                                                    ? (
                                                        <Checkbox
                                                            checked={ele.isClosed}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClosed(e, ele.day)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />

                                                    )
                                                    : (ele.isClosed ? "Yes" : "No")
                                            }
                                        </TableCell> */}
                                            <TableCell>
                                                {
                                                    editDays.includes(ele.day) ? (
                                                        <Stack direction="row" spacing={2}>
                                                            <Tooltip title="Cancel">
                                                                <CancelIcon
                                                                    color='error'
                                                                    onClick={() => removeEditable(ele.day)}
                                                                    sx={{ mr: 1, cursor: "pointer" }}
                                                                />

                                                            </Tooltip>
                                                        </Stack>
                                                    ) : (
                                                        <Tooltip title="Edit">
                                                            <EditIcon
                                                                color='primary'
                                                                onClick={() => handleEditable(ele.day)}
                                                                sx={{ mr: 1, cursor: "pointer" }}
                                                            />
                                                        </Tooltip>
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    )
}
