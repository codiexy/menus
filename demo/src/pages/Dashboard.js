import React, { useState, useEffect } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, Skeleton, Tab, Tooltip, Typography } from '@mui/material';
import DashboardMenuHeader from '../components/DashboardMenuHeader';
import { PrivateLayout } from '../components/layouts';
import { Category } from '../classes';
import DishMenu from '../components/dish/DishMenu';
import { AddCategoryPopup } from '../components/category';
import { orderBy } from 'firebase/firestore';
import { AddRounded } from '@mui/icons-material';
import { SiteButton } from '../components/miscellaneous';

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const categoryClass = new Category();
      const result = await categoryClass.get([
        orderBy('createdAt')
      ]);
      if (result.status) {
        setCategories(result?.data || []);
        setValue(result?.data[0]?.alias || "");
      }
      setIsloading(false);
    })();
  }, [updated]);

  return (
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
                          wrapped={value.toString()}
                          textColor="secondary"
                          indicatorColor="#4458BE"
                          aria-label="lab API tabs example"
                          style={{ marginRight: 0 }}
                        >
                          <Tooltip title="Create category">
                            <SiteButton onClick={() => setOpen(true)} size='small' sx={{ backgroundColor: '#4458BE', borderRadius: 3 }} variant="contained">
                              <AddRounded sx={{ fontSize: 30, color: 'white' }} />
                            </SiteButton>
                          </Tooltip>
                          {
                            categories.map((category, key) => {
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
            categories.map((category, key) => {
              return <TabPanel key={key} value={category.alias}>
                <DishMenu category={category} admin={true} />
              </TabPanel>
            })
          }
        </TabContext>
      </Box>
      <AddCategoryPopup useUpdated={() => [updated, setUpdated]} useOpen={() => [open, setOpen]} />
    </PrivateLayout>

  );
}










