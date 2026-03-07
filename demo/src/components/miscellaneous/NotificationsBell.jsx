import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip, Drawer, Typography, AppBar, Avatar, Badge } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Notification } from "../../classes";
import { NotificationCardSkeleton } from "../skeleton";
// import { NotificationsRounded } from "@mui/icons-material";
import { AiTwotoneBell } from 'react-icons/ai';


export default function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const notificationClass = new Notification();
      const result = await notificationClass.getAll({
        unread: true
      });
      setNotifications(result);
      setIsLoading(false);
    })();
  }, [updated])

  const handleRead = async (event, notification) => {
    const notificatinClass = new Notification();
    const result = await notificatinClass.markedAsRead(notification.id);
    if (result) {
      setUpdated(!updated);
    }
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

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <IconButton
        // size="large"
        edge="start"
        color="secondary"
        aria-label="open drawer"
        sx={{ my: 2 }}
        onClick={() => setOpen(true)}
      >
        <Tooltip title="Notifications">
          <Badge badgeContent={notifications.length} color="error">
            <AiTwotoneBell style={{ fontSize: 30, color: '#FF5A5F' }} />
            {/* <NotificationsRounded sx={{ fontSize: 30, color: '#FF5A5F' }} /> */}
          </Badge>
        </Tooltip>
      </IconButton>
      <Drawer open={open} anchor={"right"} onClose={handleClose}>
        <AppBar style={{ width: 450, height: 50 }} sx={{ backgroundColor: "secondary" }}>
          <div className="notification-popup" style={{ display: "", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ ml: 2 }} variant="h5">
              Notifications
            </Typography>
            <div className="notification-menu-box">
              {
                isLoading ? (
                  <NotificationCardSkeleton
                    sx={{
                      width: "92%"
                    }}
                    length={4}
                    className="notificationbox"
                    cols={[2, 10]}
                  />
                ) : (
                  <>
                    {
                      notifications.length
                        ? notifications.slice(0, 5).map((notification, key) => {
                          return (
                            <>
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
                            </>
                          )
                        }) : (
                          <Typography component="p" sx={{ textAlign: "center" }}>No new notifications</Typography>
                        )
                    }
                  </>
                )
              }
            </div>
            {
              !isLoading && (
                <Link to="/notifications" className="viewall-noti">View All</Link>
              )
            }
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ fontSize: 25, right: 2 }} />
            </IconButton>
          </div>
        </AppBar>
        {/* {getNotifications()} */}
      </Drawer>
    </div>
  )
}
