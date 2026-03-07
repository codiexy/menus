'use client';
import React, { useState, useEffect } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Grid, Skeleton, Tab, Tooltip, Typography } from '@mui/material';
import { orderBy } from 'firebase/firestore';
import { AddRounded } from '@mui/icons-material';
import DashboardMenuHeader from '@/components/DashboardMenuHeader';
import DishMenu from '@/components/dish/DishMenu';
import { AddCategoryPopup } from '@/components/category';
import Category from '@/classes/Category';
import { useTenant } from '@/context/TenantContext';
import PrivateLayout from '@/components/layouts/PrivateLayout';

export default function Dashboard() {
    const { tenantId } = useTenant();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState('');

    const handleChange = (event: any, newValue: any) => {
        event.preventDefault();
        setValue(newValue);
    };

    useEffect(() => {
        (async () => {
            setIsloading(true);
            const categoryClass = new Category(tenantId);
            const results: any = await categoryClass.get([
                orderBy('createdAt')
            ]);
            if (results.length) {
                setCategories(results || []);
                setValue(results?.[0]?.alias || "");
            }
            setIsloading(false);
        })();
    }, [updated, tenantId]);

    return (
        <>
            <PrivateLayout>
                <DashboardMenuHeader />
                <Box sx={{ width: '100%', typography: 'body1', }}>
                    <TabContext value={value}>
                        <Box sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                        }}>

                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={1}>
                                    {
                                        isLoading ? (
                                            <Typography
                                                sx={{
                                                    margin: "auto",
                                                    width: "90%",
                                                    mt: -2,
                                                    marginBottom: -1.6
                                                }}
                                            >
                                                <Skeleton height={85} />
                                            </Typography>
                                        ) : (
                                            <>
                                                <div className='admin_menu_tablist'>
                                                    <TabList
                                                        className='menuCategoryBar '
                                                        onChange={handleChange}
                                                        scrollButtons="auto"
                                                        // wrapped={value.toString()}
                                                        textColor="secondary"
                                                        indicatorColor="secondary"
                                                        aria-label="lab API tabs example"
                                                        style={{ marginRight: 0 }}
                                                    >
                                                        <Tooltip title="Create category">
                                                            <Button onClick={() => setOpen(true)} size='small' sx={{ backgroundColor: '#4458BE', borderRadius: 3 }} variant="contained">
                                                                <AddRounded sx={{ fontSize: 30, color: 'white' }} />
                                                            </Button>
                                                        </Tooltip>
                                                        {
                                                            categories.map((category: any, key) => {
                                                                return <Tab sx={{ textTransform: 'none', fontSize: '18px' }} key={key} label={category.name} value={category.alias} />
                                                            })
                                                        }
                                                    </TabList>
                                                </div>
                                            </>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            categories.map((category: any, key) => {
                                return <TabPanel key={key} value={category.alias}>
                                    <DishMenu category={category} admin={true} />
                                </TabPanel>
                            })
                        }
                    </TabContext>
                </Box>
                <AddCategoryPopup useUpdated={() => [updated, setUpdated]} useOpen={() => [open, setOpen]} />
            </PrivateLayout>
        </>

    );
}