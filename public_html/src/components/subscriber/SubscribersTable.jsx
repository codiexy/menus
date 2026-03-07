import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { FormControl, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const columns = [
    { field: 'name', headerName: 'Name', width: 170, sortable: false },
    { field: 'email', headerName: 'Email', width: 200, sortable: false, },
    {
        field: 'createdAt', headerName: 'Joined At', width: 170, sortable: false, valueGetter: (params) =>
            moment(params.row.createdAt.toDate()).format("Do MMM, YYYY")
    },
    { field: 'status', headerName: 'Status', width: 170, sortable: false, },

];


export default function SubscribersTable({ subscribers }) {

    const [sort, setSort] = React.useState('');
    const [searched, setSearched] = React.useState(subscribers);

    const requestSearch = (searched) => {
        setSearched(subscribers.filter((item) => item.email.includes(searched)))
    }

    const handleChange = (event) => {
        setSort(event.target.value);
    };


    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <div className='table_search'>

                    <TextField

                        variant='outlined'
                        placeholder='search customers'
                        type='search'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onInput={(e) => requestSearch(e.target.value)}
                    />
                    <Typography className='sort_p'>Sort by :</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={sort}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Last Update (Newest)</MenuItem>
                            <MenuItem value={20}>All</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <DataGrid
                    rows={searched.length ? searched : subscribers}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 50]}
                    checkboxSelection
                    disableColumnMenu

                />
            </div>
        </>
    );
}