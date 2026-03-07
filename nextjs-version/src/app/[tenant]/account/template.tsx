"use client";
import MenuAppBar from '@/components/MenuAppBar';
import MenuFooter from '@/components/MenuFooter';
import { SiteButton } from '@/components/miscellaneous'
import { AddReviewPopup } from '@/components/review';
import { LoginPopup } from '@/components/user';
import { useAuth } from '@/context/AuthContext'
import { AccountCircleRounded, FavoriteBorderRounded, LocalActivityRounded, LocalOfferRounded } from '@mui/icons-material'
import { Avatar, Badge, Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import { redirect, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import PasswordIcon from '@mui/icons-material/Password';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#fff',
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

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    const { logout, user, tenantSlug, setSnackbar } = useAuth();
    const pathname = usePathname();
    const router = useRouter()

    const sidebarMenus = [
        {
            name: "Information",
            url: '/account',
            icon: <AccountCircleRounded />
        },
        {
            name: "Favourites",
            url: '/account/favourites',
            icon: <FavoriteBorderRounded />
        },
        {
            name: "Activities",
            url: '/account/activities',
            icon: <LocalActivityRounded />
        },
        {
            name: "Offers",
            url: '/account/offers',
            icon: <LocalOfferRounded />
        },
        {
            name: "Reset Password",
            url: '/account/reset-password',
            icon: <PasswordIcon />
        }
    ]

    const handleRedirectTo = (event: any, url = "") => {
        event.preventDefault();
        router.push(`/${tenantSlug}/${url}`);
    }

    const handleSignOut = async (event: any) => {
        event.preventDefault();
        try {
            await logout();
        } catch (error: any) {
            setSnackbar(false, error.message);
        }
    }

    if(!user) {
        redirect(`/${tenantSlug}/menu`);
    }

    return (
        <>
            <main>
                <MenuAppBar />
                <div className="manuverse-content">
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%" }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={2.5} sx={{ minHeight: "90vh", mt: 3 }} className="left-space">
                                <div className='profile-box'>
                                    <div className='image-box'>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                sx={{
                                                    height: 150,
                                                    width: 150
                                                }}
                                            >
                                                <Image src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={150} width={150} />
                                            </Avatar>
                                        </StyledBadge>
                                    </div>
                                    <p className='profile-name'>Hi, {user.displayName}</p>
                                    <Typography component='span' sx={{ my: 1 }}>@{user.username}</Typography>
                                    <p>Since {moment(user.createdAt?.toDate()).format("Do MMM, YYYY")}</p>
                                </div>
                                <Divider />

                                <List sx={{ width: "100% !important", mt: 0, pt: 0 }}>
                                    {
                                        sidebarMenus.map((menu: any, key: number) => {
                                            return (
                                                <React.Fragment key={key}>
                                                    <ListItem
                                                        sx={{
                                                            width: "100% !important"
                                                        }}
                                                        disablePadding
                                                        onClick={(e) => handleRedirectTo(e, menu.url)}
                                                        className={`${pathname === `/${tenantSlug}${menu.url}` ? 'active-account-list' : ""}`}
                                                    >
                                                        <ListItemButton>
                                                            <ListItemIcon>
                                                                {menu.icon}
                                                            </ListItemIcon>
                                                            <ListItemText primary={menu.name} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    <ListItem
                                        disablePadding
                                        onClick={handleSignOut}
                                    >
                                        <SiteButton sx={{ width: 200, mt: 2, mx: 1, }}>
                                            <Typography textAlign='center'>Sign out</Typography>
                                        </SiteButton>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item 
                                xs={12} 
                                md={9.5} 
                                sx={{ 
                                    display: "inline-block", 
                                    minHeight: "90vh",  
                                    p: "0px !important", 
                                    px: 0,
                                    mt: 2
                                }}
                            >
                                <Box sx={{ flexGrow: 1, justifyContent: "center", position: 'relative', height: "100%" }}>
                                    <Typography component="div" sx={{
                                        mb: 9
                                    }}>
                                        {children}
                                    </Typography>
                                    <Typography 
                                        component="div"
                                        sx={{
                                            position: "absolute",
                                            left: 0,
                                            bottom: 0,
                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <MenuFooter />
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <AddReviewPopup />
                <LoginPopup />
            </main>
        </>
    )
}