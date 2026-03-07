import React, { useState, useEffect } from 'react';
import { orderBy, where } from 'firebase/firestore';
import {
    Paper, Box, TableContainer, Button, Typography, SvgIcon
} from '@mui/material';
import { User } from '../../classes';
import AddIcon from '@mui/icons-material/Add';
import SubscribersTable from './SubscribersTable';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';


export default function Subscriber() {

    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        (async () => {
            const userClass = new User();
            const result = await userClass.get([
                where('isAdmin', "==", false),
                orderBy('createdAt', 'desc')
            ]);
            if (result.status) {
                setSubscribers(result.data);
            } else {
                console.error(result.message);
            }
        })();
    }, [])





    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    mt: 5,
                    mx: 8,
                    justifyContent: 'flex-start'
                }}
            >

                <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: 900 }} elevation={8}>
                    <TableContainer>
                        <Typography variant='h4' sx={{ padding: '5px' }}>Subscribers</Typography>
                        <div className='table_heading'>
                            <div>
                                <Button
                                    color="inherit"
                                    size="small"
                                    startIcon={(
                                        <SvgIcon>
                                            <ArrowDownwardIcon />
                                        </SvgIcon>
                                    )}
                                >
                                    Export
                                </Button>
                                <Button
                                    color="inherit"
                                    size="small"
                                    startIcon={(
                                        <SvgIcon>
                                            <DownloadIcon />
                                        </SvgIcon>
                                    )}
                                >
                                    Import
                                </Button>
                            </div>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon>
                                            <AddIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                >
                                    Add
                                </Button>
                            </div>

                        </div>

                        <SubscribersTable subscribers={subscribers} />
                    </TableContainer>

                </Paper>
            </Box>

        </>
    );
}