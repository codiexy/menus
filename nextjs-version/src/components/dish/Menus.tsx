import React, { useState, useEffect } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Box, Typography, Skeleton } from '@mui/material';
import { orderBy } from 'firebase/firestore';
import DishMenu from './DishMenu';
import { MenuCardSkeleton } from '../skeleton';
import { useTenant } from '@/context/TenantContext';
import Category from '@/classes/Category';
import { notFound, useParams, useRouter } from 'next/navigation';

function Menus({ recommendation = false }) {
    const { tenantId, tenantSlug } = useTenant();
    const [categories, setCategories] = useState<any>([]);
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
            const result: any = await categoryClass.get([
                orderBy('createdAt')
            ]);
            setCategories(result);
            setIsloading(false);
        })();
    }, [tenantId]);

    const activeTab = category ? category : categories[0]?.alias || "";

    const isCategoryExist = categories.find((cat: any) => cat.alias == activeTab) || false;

    if(!isLoading && !isCategoryExist) {
        notFound();
    }

    return (
        <>
            <Box sx={{ width: '100%', pb: 1, }}>
                <TabContext value={activeTab} >
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
                                        // wrapped={value.toString()}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                        aria-label="lab API tabs example"
                                        style={{ marginRight: 0 }}
                                    >
                                        {
                                            categories.map((cat: any, key: number) => {
                                                return (<Tab sx={{ textTransform: 'none', }} key={key} label={cat.name} value={cat.alias} />)
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
                                    categories.map((cat: any, key: any) => {

                                        return <TabPanel key={key} value={cat.alias} sx={{ pt: 1 }}>
                                            {
                                                cat.alias == activeTab ? (
                                                    <DishMenu category={cat} recommendation={recommendation} />
                                                ) : ""
                                            }

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