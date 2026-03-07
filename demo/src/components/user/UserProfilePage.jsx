import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import MenuFooter from '../MenuFooter';
import Badge from '@mui/material/Badge';
import UserProfileTabs from './UserProfileTabs'
import { UserAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

import '../ProfileMenu.css';
import { PrivateLayout } from '../layouts';
import { SiteButton } from '../miscellaneous';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      <SiteButton >
        <CloseIcon sx={{ fontSize: 30, float: "right", cursor: "pointer" }}  onClick={onClose} />
      </SiteButton>
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function UserProfilePage() {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const handleClose = (e, reason) => {
    e?.preventDefault();
    if (reason !== "backdropClick") {
      if (location.state?.location) {
        const oldLocation = location.state.location;
        navigate(oldLocation.pathname);
      } else {
        navigate("/hot-dog-kings/menu");
      }
    }
  }

  return (
    <PrivateLayout redirect={false}>
      <div className='tes'>
        <BootstrapDialog
          fullScreen
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={true}
        >
          <BootstrapDialogTitle onClose={handleClose} sx={{ display: "flex", justifyContent: "space-between" }} >
            <Typography variant='h5' sx={{ textAlign: "center", width: "100%" }}>
              Profile 
            </Typography>
          </BootstrapDialogTitle>
          <DialogContent
            sx={{ minWidth: 600 }} dividers>
            <UserProfileTabs />
          </DialogContent>
          <MenuFooter />
        </BootstrapDialog>
      </div>
    </PrivateLayout>
  );
}
