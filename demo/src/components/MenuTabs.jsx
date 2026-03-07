import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Reviews from './review/Reviews';
import AboutTab from '../components/account/AboutTab'
import Menus from './dish/Menus';
import { TopDishes } from './topdish';
import DishSearch from './dish/DishSearch';


function TabPanel(props) {
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
        <Box sx={{}}>
          <Typography>{children}</Typography>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', }} >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <DishSearch hidden={true} />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          position='fixed'
        >
          <Tab sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }} label={'Menu'} {...a11yProps(0)} />
          <Tab sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }} label={'About'} {...a11yProps(1)} />
          <Tab sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }} label={'Reviews'}{...a11yProps(2)} />
          <Tab sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }} label={'dishes'} {...a11yProps(3)} />
        </Tabs>

      </Box>
      <TabPanel value={value} index={0}>
        <Menus />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AboutTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Reviews />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TopDishes />
      </TabPanel>
    </Box>
  );
}
