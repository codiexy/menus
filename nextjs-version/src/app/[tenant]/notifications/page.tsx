'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Link from 'next/link';
import { NotificationCardSkeleton } from '@/components/skeleton';
import { useTenant } from '@/context/TenantContext';
import Notification from '@/classes/Notification';
import { useRouter } from 'next/navigation';
import PrivateLayout from '@/components/layouts/PrivateLayout';

function Notifications() {
    const { tenantSlug, tenantId } = useTenant();
    const [notifications, setNotifications] = useState<any>([]);
    const [updated, setUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [start, setStart] = useState(0);
    const limit = 5;
    const router = useRouter();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const notificationClass = new Notification(tenantId);
            const result = await notificationClass.getAll();
            setNotifications(result)
            setIsLoading(false);
        })();
    }, [updated, tenantId])

    const handleRead = async (event: React.MouseEvent, notification: any) => {
        event.preventDefault();
        const notificatinClass = new Notification(tenantId);
        const result = await notificatinClass.markedAsRead(notification.id);
        if (result) setUpdated(!updated);
    }

    const handleMarkedAsRead = async (event: React.MouseEvent) => {
        event.preventDefault();
        const notificatinClass = new Notification(tenantId);
        const result = await notificatinClass.markedAsRead();
        if (result) setUpdated(!updated);
    }

    const handleReadMore = async (event: React.MouseEvent) => {
        event.preventDefault();
        setStart(start + limit);
    }

    const handleOnclick = (notification: any) => {
        const notificationType = notification.type;
        if (notificationType === "review") {
            router.push(`/${tenantSlug}/menu`);
            return;
        }
        if (notificationType === "comment") {
            router.push(`/${tenantSlug}/menu/mains/${notification.parentId}`);
            return;
        }
    }


    return (
        <PrivateLayout>

            <section className='notification-wrap'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h1>Notification <NotificationsNoneIcon sx={{ mt: 1 }} />
                                <Typography
                                    component='small'
                                    onClick={isLoading ? () => { } : handleMarkedAsRead}
                                    sx={{
                                        float: "right",
                                        color: "#9c27b0",
                                        cursor: "pointer"
                                    }}>marked as read</Typography>
                            </h1>
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <NotificationCardSkeleton length={4} className="notificationbox" />
                        ) : (
                            <>
                                {
                                    notifications.slice(0, start + limit).map((notification: any, key: number) => {
                                        return (
                                            <div
                                                key={key}
                                                onClick={() => handleOnclick(notification)}
                                            >
                                                <div
                                                    className={`row notificationbox${notification.isRead ? "" : " unread-notification"}`}
                                                    style={{ cursor: notification.isRead ? "default" : "pointer" }}
                                                    onClick={(event) => {
                                                        if (!notification.isRead) {
                                                            handleRead(event, notification);
                                                        }
                                                    }}
                                                >
                                                    <div className='col-sm-12 col-md-12'>
                                                        <Avatar sx={{ height: "50px", width: "50px", color: "#9c27b0" }}>
                                                            {notification.icon}
                                                        </Avatar>
                                                    </div>
                                                    <div className='col-sm-12 col-md-12'>
                                                        <div className='notif-text'>
                                                            <div className='top-notif'>
                                                                <h5>{notification.title}</h5>
                                                                <p className='notification-time'>{notification.time}</p>
                                                            </div>
                                                            <p>{notification.description}</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                    {
                        !isLoading && notifications.length > start ? (
                            <div className='row notification-load'>
                                <div className='col-md-12'>
                                    <Link href="#" onClick={handleReadMore}>Load more</Link>
                                </div>
                            </div>
                        ) : ""
                    }
                </div>
            </section>
        </PrivateLayout>
    )
}

export default Notifications