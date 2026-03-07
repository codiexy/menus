import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { PrivateLayout } from '../components/layouts';
import { Notification } from '../classes';
import { NotificationCardSkeleton } from '../components/skeleton';
import { Link, useNavigate } from 'react-router-dom';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [start, setStart] = useState(0);
    const limit = 5;
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const notificationClass = new Notification();
            const result = await notificationClass.getAll();
            setNotifications(result)
            setIsLoading(false);
        })();
    }, [updated])

    const handleRead = async (event, notification) => {
        event.preventDefault();
        const notificatinClass = new Notification();
        const result = await notificatinClass.markedAsRead(notification.id);
        if (result) setUpdated(!updated);
    }

    const handleMarkedAsRead = async (event) => {
        event.preventDefault();
        const notificatinClass = new Notification();
        const result = await notificatinClass.markedAsRead();
        if (result) setUpdated(!updated);
    }

    const handleReadMore = async (event) => {
        event.preventDefault();
        setStart(start + limit);
    }

    const handleOnclick = (notification) => {
        const notificationType = notification.type;
        if (notificationType === "review") {
            navigate(`/hot-dog-kings/menu`);
            return;
        }
        if (notificationType === "comment") {
            navigate(`/hot-dog-kings/menu/mains/${notification.parentId}`);
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
                                    onClick={isLoading ? null : handleMarkedAsRead}
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
                                    notifications.slice(0, start + limit).map((notification, key) => {
                                        return (
                                            <div onClick={() => handleOnclick(notification)}>

                                                <div
                                                    key={key}
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
                                    <Link to="#" onClick={handleReadMore}>Load more</Link>
                                </div>
                            </div>
                        ) : ""
                    }
                </div>
            </section>
        </PrivateLayout >
    )
}

export default Notifications