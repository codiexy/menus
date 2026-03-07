'use client';
import React from 'react'
import PublicLayout from "@/components/layouts/PublicLayout";
import { useParams, useRouter } from 'next/navigation';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import DishSearch from '@/components/dish/DishSearch';
import MenuHeader from '@/components/MenuHeader'
import { useAuth } from '@/context/AuthContext';


const tabs: any = [
    "menu",
    "about",
    "reviews",
    "dishes"
];

function a11yProps(index: number | string) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        sx: { textTransform: 'none', fontSize: 16, fontWeight: 600 }
    };
}

function RouteTemplate({ children }: { children: React.ReactNode }) {
    const { routes }: any = useParams();
    const [route] = routes;
    const { tenantSlug } = useAuth();

    const value: any = Object.keys(tabs).find(key => tabs[key] === route) || -1;

    const router = useRouter();

    const handleChange = (e: any, newValue: string) => {
        router.push(`/${tenantSlug}/${newValue}`);
    }

    return (
        <>
            <PublicLayout>
                {
                    value < 0 ?
                        children :
                        (
                            <>
                                <MenuHeader />
                                <Box sx={{ width: '100%', }} >
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <DishSearch hidden={true} />
                                        <Tabs
                                            value={route}
                                            onChange={handleChange}
                                            aria-label="basic tabs example"
                                        // position='fixed'
                                        >
                                            {tabs.map((tab: string) => <Tab key={tab} value={tab} label={tab.toUpperCase()} {...a11yProps(tab)} />)}
                                        </Tabs>

                                    </Box>
                                    {tabs.map((tab: string) => {
                                        return (
                                            <div
                                                key={tab}
                                                role="tabpanel"
                                                hidden={route !== tab}
                                                id={`simple-tabpanel-${tab}`}
                                                aria-labelledby={`simple-tab-${tab}`}
                                            >
                                                {route === tab && (
                                                    <Box>
                                                        <Typography component="div">{children}</Typography>
                                                    </Box>
                                                )}
                                            </div>
                                        )
                                    })}
                                </Box>
                            </>
                        )
                }
            </PublicLayout>
        </>

    )
}

export default RouteTemplate