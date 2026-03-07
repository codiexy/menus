import React, { useState, useEffect, createRef } from 'react'
import moment from 'moment';
import {
    Avatar, Typography, List, ListItem, capitalize, Tooltip, ListItemText,
    ListItemAvatar, Menu, MenuItem, IconButton
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import CommentInput from './CommentInput'
import { ChatBubbleOutlineRounded } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import Notification from '@/classes/Notification';
import CommentReply from '@/classes/CommentReply';
import Image from 'next/image';
import useFileStorage from '@/lib/useFileStorage';

function ReplyCommentDish({ comment, dish }:any) {
    const [replyAction, setReplyAction] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [currentComment, setCurrentComment] = useState<any>(false);
    const [replyComments, setReplyComments] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const { user, tenantId, setSnackbar } = useAuth();
    const commentRef = createRef<any>();
    const commentReplyClass = new CommentReply(tenantId, comment.id);
    const { upload } = useFileStorage()


    const open = Boolean(anchorEl);

    const handleAccordionChange = (event:any) => {
        event.preventDefault();
        setExpanded(!expanded);
    };

    const handleClick = (event:any, commentData:any) => {
        setAnchorEl(event.currentTarget);
        setCurrentComment(commentData);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentComment(false);
        setReplyAction(false);
        setEditComment("");
    };

    useEffect(() => {
        (async () => {
            const crClass = new CommentReply(tenantId, comment.id);
            const result:any = await crClass.getAll();
            setReplyComments(result);
        })();
    }, [updated, tenantId, comment?.id]);

    const createNotification = async (replyCommentData:any, action = "create") => {
        const notificationClass = new Notification(tenantId);
        await notificationClass.create({
            parentId: dish.id,
            parentName: dish.name,
            refrenceId: replyCommentData?.id || null,
            refrenceName: `Comments/${comment.id}/Replies`,
            type: "reply",
            action: action
        })
    }

    const handleSubmit = async (e:any, type:any, value:any) => {
        try {
            if (type === "image" || type === "file") {
                if (value.size <= 0) throw new Error("Invalid file data!");
                
                await upload(value, `replies/${type}s`, async (url: string) => {
                    const inputData = {
                        comment: type === "image" ? "" : url,
                        type,
                        url: url
                    }
                    if (currentComment && currentComment.id) {
                        const result = await commentReplyClass.update(currentComment.id, inputData)
                        if (result.status) {
                            setSnackbar(true, "Replied comment updated!");
                            await createNotification(currentComment, 'update');
                        } else {
                            setSnackbar(false, result.message);
                        }
                    } else {
                        const result = await commentReplyClass.insert({
                            ...inputData,
                            createdBy:user.id,
                            status: "publish"
                        })
                        if (result.status) {
                            setSnackbar(true, "Replied successfully!");
                            const data = await commentReplyClass.first(result.id); 
                            await createNotification(data);
                        } else {
                            setSnackbar(false, result.message);
                        }
                    }
                    resetComment();
                    setExpanded(true);
                })
            }
        } catch (error: any) {
            setSnackbar(false, error?.message || "Something went wrong!");
        }
    };

    // // delete comment function
    const handleDeleteComment = async () => {
        if (currentComment) {
            const result = await commentReplyClass.delete(currentComment.id);
            if (result.status) {
                resetComment();
                await createNotification(null, 'delete');
            }
        }
    };

    const handleEditComment = () => {
        if (currentComment?.type === "text") {
            setReplyAction(true);
            setEditComment(currentComment.comment || "");
        }
        setAnchorEl(null);
    }

    const resetComment = () => {
        setUpdated(!updated);
        handleClose();
    }

    const handleCommentAction = (action: string) => {
        if (action === "edit") {
            handleEditComment();
        } else if (action === "delete") {
            handleDeleteComment();
        }
    }

    return (
        <>

            <Typography variant="body1" sx={{ width: "100%", pl: 6 }}>
                <Tooltip title={`Reply`} arrow>
                    <IconButton onClick={() => setReplyAction(true)}  >
                        <ChatBubbleOutlineRounded />
                        <Typography sx={{ ml: 1, fontWeight: 700 }}>Reply</Typography>
                    </IconButton>
                </Tooltip>
            </Typography>
            <Typography component="div" sx={{
                margin: "0 0 0 auto",
                width: "91%"
            }}>
                {
                    replyAction ? (
                        <Typography component="div">
                            <CommentInput comment={editComment} handleSubmit={handleSubmit} handleOuterCancel={handleClose} type="reply" />
                        </Typography>
                    ) : ""
                }
                {
                    replyComments.length ? (
                        <Typography
                            component='div'
                        >
                            <Typography
                                component='span'
                                sx={{ color: "#9c27b0", fontSize: "14px", cursor: "pointer", display: "inline-flex" }}
                                onClick={handleAccordionChange}
                            >
                                <Typography component="span">{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} </Typography> {replyComments.length} REPLIES
                            </Typography>
                            {
                                expanded ? (
                                    <>
                                        <List 
                                            sx={{ 
                                                width: '100%', 
                                                bgcolor: 'background.paper' 
                                            }} 
                                            ref={commentRef}
                                        >
                                            {replyComments?.length ?
                                                replyComments.map((replyComment:any, key:any) => {
                                                    const fromNow = moment(replyComment.createdAt.toDate()).fromNow();
                                                    const commentUser = replyComment.userData || {};
                                                    return (
                                                        <React.Fragment key={key}>
                                                            <ListItem alignItems="flex-start">
                                                                <ListItemAvatar sx={{ minWidth: "42px", marginTop: "3px" }}>
                                                                    <Avatar sx={{ width: "30px", height: "30px" }} alt={capitalize(commentUser.name || "No Name")} src={commentUser?.photoURL ? commentUser.photoURL : "/user-avatar.png"} />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={
                                                                        <>
                                                                            <Typography component='span' sx={{ fontWeight: "bold", width: "100%" }}>
                                                                                {commentUser.role == "admin" ? "Response by owner" : commentUser.name || "No Name"}

                                                                            </Typography>
                                                                            {
                                                                                user && commentUser?.id === user?.uid && (
                                                                                    <IconButton
                                                                                        sx={{
                                                                                            position: "absolute",
                                                                                            top: 0,
                                                                                            right: 0
                                                                                        }}
                                                                                        onClick={(event) => handleClick(event, replyComment)}
                                                                                    >
                                                                                        <MoreVertIcon />
                                                                                    </IconButton>
                                                                                )
                                                                            }
                                                                        </>
                                                                    }
                                                                    secondary={
                                                                        <div style={{ display: "flex", justifyContent: "space-between", width: '50%' }}>
                                                                            <CommentContent replyComment={replyComment} />
                                                                            <Typography variant='caption' sx={{ ml: 1, float: "right" }}>{fromNow}</Typography>
                                                                        </div>
                                                                    }
                                                                    sx={{ marginTop: "0px", position: "relative", width: "91%" }}
                                                                />
                                                                {/* <ReplyCommentDish comment={replyComment} /> */}
                                                            </ListItem>
                                                        </React.Fragment>
                                                    )
                                                }) : (
                                                    <ListItem alignItems="flex-start" sx={{
                                                        background: "#ccc"
                                                    }}>
                                                        <ListItemText
                                                            sx={{
                                                                textAlign: "center"
                                                            }}
                                                        >
                                                            <Typography component='p' fontWeight='700'>className=reply Found</Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                )}
                                        </List>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                            sx={{ p: 0, width: "270px" }}
                                        >
                                            {
                                                currentComment?.type === "text" ? (
                                                    <MenuItem onClick={() => handleCommentAction('edit')}><EditOutlinedIcon sx={{ mr: 2 }} /><Typography>Edit</Typography></MenuItem>
                                                ) : ""
                                            }
                                            <MenuItem onClick={() => handleCommentAction('delete')}><HighlightOffIcon sx={{ mr: 2 }} /><Typography>Remove</Typography></MenuItem>
                                        </Menu>
                                    </>
                                ) : ""
                            }
                        </Typography>
                    ) : ""
                }
            </Typography>
        </>
    )
}

const CommentContent = ({ replyComment }: any) => {
    const { type, comment, url } = replyComment;
    const arrayCommentData = comment && typeof comment === "string" ? comment.split(`\n`) : [];


    return (
        <>
            {
                type === "image" ? (
                    <span>
                        <Image
                            src={url || "/menu-placeholder.jpeg"}
                            // srcSet={url || "/menu-placeholder.jpeg"}
                            alt={"Comment Image"}
                            width={175}
                            height={125}
                            loading="lazy"
                            style={{ marginTop: '15px', borderRadius: "5px" }}
                        />
                    </span>
                ) : (
                    <>
                        <Typography component="span">
                            {
                                arrayCommentData.length ? (
                                    <>
                                        {
                                            arrayCommentData.map((string: string, key: number) => (
                                                <React.Fragment key={key}>
                                                    {string}
                                                    {
                                                        arrayCommentData.length > (key + 1) ? (
                                                            <br />
                                                        ) : ""
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                    </>
                                ) : ""
                            }
                        </Typography>
                    </>
                )
            }
        </>
    )
}

export default ReplyCommentDish