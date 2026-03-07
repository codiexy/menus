import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import ImageTools from './ImageTools';
import ProductExp from "./product-exp.component";
import Contactless from './Contactless';
import Build from './Build';
import Analytics from './Analytics';


function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsContent() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Divider variant='middle' sx={{ my: 9 }} />
      <Typography variant="h2" component="h2" gutterBottom textAlign='center'
        sx={{ fontSize: { xs: '28px', md: '40px' } }}
      >
        The Menuverse Platform
      </Typography>
      <Typography variant='subtitle2' textAlign='center' color='grey'
        sx={{ fontSize: { xs: '18px', md: '22px' }, mb: 4, px: { md: 14 } }}
      >Menus for small & medium sized restaurants, built better at the fraction of the cost.</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          // centered={true}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab sx={{ textTransform: 'none', fontWeight: 500, color: "#5e2791" }} label="Image Tools"  {...a11yProps(0)} />
          <Tab sx={{ textTransform: 'none', fontWeight: 500, color: "#5e2791" }} label="Menu Builder" {...a11yProps(1)} />
          <Tab sx={{ textTransform: 'none', fontWeight: 500, color: "#5e2791" }} label="Social" {...a11yProps(2)} />
          <Tab sx={{ textTransform: 'none', fontWeight: 500, color: "#5e2791" }} label="Contactless" {...a11yProps(3)} />
          <Tab sx={{ textTransform: 'none', fontWeight: 500, color: "#5e2791" }} label="Analytics" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ImageTools />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Build />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductExp />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Contactless />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Analytics />
      </TabPanel>
    </Box>
  );
}
