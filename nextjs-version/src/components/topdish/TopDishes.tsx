
import React, { useState, useEffect } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Box, Typography, Skeleton } from '@mui/material';
import { orderBy } from 'firebase/firestore';
import { MenuCardSkeleton } from '../skeleton';
import TopDishMenu from './TopDishMenu';
import Category from '@/classes/Category';
import { useTenant } from '@/context/TenantContext';
import { notFound, useParams, useRouter } from 'next/navigation';

export default function TopDishes({ recommendation = false }) {
    const { tenantId, tenantSlug } = useTenant();
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState(true);
    const { routes }: any = useParams();
    const [route, category] = routes;
    const router = useRouter();

    const handleChange = (event: any, newValue: any) => {
        event.preventDefault();
        router.push(`/${tenantSlug}/${route}/${newValue}`)
    };

    useEffect(() => {
        (async () => {
            setIsloading(true);
            const categoryClass = new Category(tenantId);
            const result = await categoryClass.get([
                orderBy('createdAt')
            ]);
            setCategories(result);
            setIsloading(false);
        })();
    }, [tenantId]);

    const activeTab = category ? category : categories[0]?.alias || "";

    const isCategoryExist = categories.find(cat => cat.alias == activeTab) || false;

    if (!isLoading && !isCategoryExist) {
        notFound();
    }

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1', pb: 1, mt: 2 }}>
                <TabContext value={activeTab} >
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            pb: 1
                        }}
                    >
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
                                <div className='sticky_header'>
                                    <TabList
                                        className='menuCategoryBar'
                                        onChange={handleChange}
                                        scrollButtons="auto"
                                        // wrapped={value.toString()}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                        aria-label="lab API tabs example"
                                        style={{ marginRight: 0 }}
                                    >
                                        {
                                            categories.map((category, key) => {
                                                return <Tab sx={{ textTransform: 'none', }} key={key} label={category.name} value={category.alias} />
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
                                        return <TabPanel key={key} value={category.alias}>
                                            <TopDishMenu category={category} isActive={category.alias == activeTab} recommendation={recommendation} />
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
