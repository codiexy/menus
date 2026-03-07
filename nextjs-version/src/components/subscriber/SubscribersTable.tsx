import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { FormControl, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { limit, orderBy, where } from 'firebase/firestore';
import User from '@/classes/User';
import { useAuth } from '@/context/AuthContext';


const columns = [
    { 
        field: 'name', 
        headerName: 'Name', 
        width: 170, 
        sortable: false 
    },
    { 
        field: 'email', 
        headerName: 'Email', 
        width: 200, 
        sortable: false, 
    },
    { 
        field: 'username', 
        headerName: 'Username', 
        width: 200, 
        sortable: false, 
    },
    { 
        field: 'phoneNumber', 
        headerName: 'Mobile', 
        width: 200, 
        sortable: false, 
        valueGetter: (params: any) => (params.row.phoneNumber ? params.row.phoneNumber : "N/A")
    },
    {
        field: 'createdAt', 
        headerName: 'Joined At', 
        width: 170, 
        sortable: false, 
        valueGetter: (params: any) => moment(params.row.createdAt.toDate()).format("Do MMM, YYYY")
    },
    { 
        field: 'status', 
        headerName: 'Status', 
        width: 170, 
        sortable: false, 
    },

];


export default function SubscribersTable() {
    const { tenantId } = useAuth();
    const [isLoading, setIsloading] = React.useState(false)
    const [sort, setSort] = React.useState('');
    const [subscribers, setSubscribers] = React.useState<any[]>([]);
    const [searched, setSearched] = React.useState(subscribers);

    const requestSearch = (searched: any) => {
        setSearched(subscribers.filter((item) => item.email.includes(searched)))
    }

    const handleChange = (event: any) => {
        setSort(event.target.value);
    };


    React.useEffect(() => {
        (async () => {
            setIsloading(true)
            const userClass = new User(tenantId);
            if (sort === "recent") {
                const result = await userClass.get([
                    where('role', "!=", "admin"),
                    // orderBy('createdAt', 'desc'),
                    limit(10)
                ]);
                setSubscribers(result);
            } else {
                const result = await userClass.get([
                    where('role', "!=", "admin"),
                    // orderBy('createdAt', 'desc'),
                ]);
                setSubscribers(result);
            }
            setIsloading(false)
        })();

    }, [sort, tenantId])


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
                        onInput={(e: any) => requestSearch(e.target.value)}
                    />
                    <Typography className='sort_p'>Sort by :</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={sort}
                            onChange={handleChange}
                        >
                            <MenuItem value="recent">Last Update (Newest)</MenuItem>
                            <MenuItem value="all">All</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div id="table-to-export">
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
            </div>
        </>
    );
}