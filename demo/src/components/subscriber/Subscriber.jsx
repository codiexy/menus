import React from 'react';
import {
    Paper, Box, TableContainer, Button, SvgIcon, List, ListItem, ListItemAvatar, Avatar, ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SubscribersTable from './SubscribersTable';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DownloadRounded, GroupsRounded } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { SiteButton } from '../miscellaneous';


export default function Subscriber() {

    const exportToExcel = () => {
        // Get the table element
        const table = document.getElementById('table-to-export');

        // Convert the table to a worksheet
        const ws = XLSX.utils.table_to_sheet(table);

        // Create a workbook with the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Save the workbook as an Excel file
        XLSX.writeFile(wb, 'table-data.xlsx');
    }


    return (
        <div className='subscriber_table'>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    mt: 5,
                    mx: 8,
                    justifyContent: 'flex-start'
                }}
            >
                <List

                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        mb: 3
                    }}
                >
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <GroupsRounded />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Foodies" secondary="Hungry subscribers of your menu." />
                    </ListItem>
                </List>

                <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 6 }} elevation={8}>
                    <TableContainer sx={{}}>
                        <div className='table_heading'>
                            <div>
                                <Button
                                    onClick={exportToExcel}
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
                                            <DownloadRounded />
                                        </SvgIcon>
                                    )}
                                >
                                    Import
                                </Button>
                            </div>
                                <SiteButton
                                    sx={{ backgroundColor: '#4458BE', display: "flex" }}
                                    variant="contained"
                                >
                                    <SvgIcon>
                                        <AddIcon />
                                    </SvgIcon>
                                    Add
                                </SiteButton>

                        </div>
                        <div >
                            <SubscribersTable />
                        </div>
                    </TableContainer>

                </Paper>
            </Box>

        </div>
    );
}