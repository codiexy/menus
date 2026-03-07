/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PrivateLayout } from "../components/layouts";
import AccountDetails from '../components/AccountDetails';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AccountBillingSettings } from "../components/Account-billing";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountNotificationsSettings } from "../components/AccountNotifications";
import { AccountSecuritySettings } from "../components/AccountSecurity";
import AccountTeam from "../components/AccountTeam";
import GroupsIcon from '@mui/icons-material/Groups';

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
          <Tab sx={{ textTransform: 'none' }} icon={<AccountCircleIcon />} iconPosition="start" label="General" {...a11yProps(0)} />
          <Tab sx={{ textTransform: 'none' }} icon={<CreditCardIcon/>} iconPosition="start" label="Billing" {...a11yProps(1)} />
          <Tab sx={{ textTransform: 'none' }} icon={<GroupsIcon />} iconPosition="start" label=" Team" {...a11yProps(2)} />
          <Tab sx={{ textTransform: 'none' }} icon={<NotificationsIcon />} iconPosition="start" label="Notifications" {...a11yProps(3)} />
          <Tab sx={{ textTransform: 'none' }} icon={<LockIcon />} iconPosition="start" label=" Security" {...a11yProps(4)} />
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