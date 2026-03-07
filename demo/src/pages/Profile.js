/* eslint-disable react-hooks/exhaustive-deps */
import React, { } from "react";
import { PrivateLayout } from "../components/layouts";
import AccountDetails from '../components/account/AccountDetails';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AccountBillingSettings } from "../components/account/Account-billing";
import { AccountNotificationsSettings } from "../components/account/AccountNotifications";
import { AccountSecuritySettings } from "../components/account/AccountSecurity";
import AccountTeam from "../components/account/AccountTeam";
import { AccountCircleRounded, CreditCardRounded, GroupsRounded, LockRounded, NotificationsRounded } from "@mui/icons-material";

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
        <Box sx={{ p: 3 }}>
          <Typography >{children}</Typography>
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


export default function Profile() {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <PrivateLayout>
      <Typography variant="h4" sx={{ p: 3, fontWeight: 600, }}>
        Account
      </Typography>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', ml: { md: 3 }, mr: { md: 3 }, }}>
        <Tabs  value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ textTransform: 'none' }} icon={<AccountCircleRounded />} iconPosition="start" label="General" {...a11yProps(0)} />
          <Tab sx={{ textTransform: 'none' }} icon={<CreditCardRounded/>} iconPosition="start" label="Billing" {...a11yProps(1)} />
          <Tab sx={{ textTransform: 'none' }} icon={<GroupsRounded />} iconPosition="start" label=" Team" {...a11yProps(2)} />
          <Tab sx={{ textTransform: 'none' }} icon={<NotificationsRounded />} iconPosition="start" label="Notifications" {...a11yProps(3)} />
          <Tab sx={{ textTransform: 'none' }} icon={<LockRounded />} iconPosition="start" label=" Security" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AccountDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountBillingSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AccountTeam/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AccountNotificationsSettings />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AccountSecuritySettings />
      </TabPanel>
    </Box>
    </PrivateLayout>
  );
}