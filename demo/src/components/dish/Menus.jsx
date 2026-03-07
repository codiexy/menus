import React, { useState, useEffect } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Box, Typography, Skeleton, Paper } from '@mui/material';
import { orderBy } from 'firebase/firestore';
import { Category } from '../../classes';
import DishMenu from './DishMenu';
import { MenuCardSkeleton } from '../skeleton';
import { SiteButton } from '../miscellaneous';

function Menus({ recommendation = false }) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [value, setValue] = useState("");


    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
        localStorage.setItem("tabValue", newValue)
    };


    useEffect(() => {
        (async () => {
            setIsloading(true);
            const tabValue = localStorage.getItem("tabValue")
            const categoryClass = new Category();
            const result = await categoryClass.get([
                orderBy('createdAt')
            ]);
            if (result.status) {
                setCategories(result?.data || []);
                setValue(result?.data[0]?.alias || "");
                if (tabValue) {
                    setValue(tabValue);
                }

            }
            setIsloading(false);
        })();
    }, []);

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1', pb: 1, }}>
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', py: 1, my: 2 }}>
                        {
                            isLoading ? (
                                <Typography
                                    sx={{
                                        margin: "auto",
                                        width: "69%",
                                        marginBottom: -1.6
                                    }}
                                >
                                    <Skeleton height={75} />
                                </Typography>
                            ) : (
                                <div className='sticky_header menu_tablist'>
                                    <TabList
                                        className='menuCategoryBar'
                                        onChange={handleChange}
                                        scrollButtons
                                        allowScrollButtonsMobile
                                        wrapped={value.toString()}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                        aria-label="lab API tabs example"
                                        style={{ marginRight: 0 }}
                                    >
                                        {
                                            categories.map((category, key) => {
                                                return (<Tab sx={{ textTransform: 'none', }} key={key} label={category.name} value={category.alias} />)
                                            })
                                        }
                                    </TabList>
                                </div>
                            )
                        }
                    </Box>
                    {
                        isLoading ? (
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
                        ) : (
                            <>
                                {
                                    categories.map((category, key) => {

                                        return <TabPanel key={key} value={category.alias} sx={{ pt: 1 }}>

                                            <DishMenu category={category} recommendation={recommendation} />

                                        </TabPanel>
                                    })
                                }
                            </>
                        )
                    }
                </TabContext>
            </Box >
        </>

    )
}

export default Menus