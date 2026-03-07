import React, { useState, useEffect, createRef } from 'react'
import moment from 'moment';
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    Avatar, Typography, List, ListItem, capitalize, Tooltip, ListItemText,
    ListItemAvatar, Menu, MenuItem, IconButton
} from '@mui/material';

import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { storage } from '../../firebase';
import CommentInput from './CommentInput'
import { CommentReply, Notification } from '../../classes';
import { UserAuth } from '../../context/AuthContext';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { ChatBubbleOutlineRounded } from '@mui/icons-material';

function ReplyCommentDish({ comment, dish }) {
    const [replyAction, setReplyAction] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [currentComment, setCurrentComment] = useState(false);
    const [replyComments, setReplyComments] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const { user } = UserAuth();
    const commentRef = createRef();
    const commentReplyClass = new CommentReply(comment.id);
    const [error, setError] = useState({ status: false, type: "", message: "" });


    const open = Boolean(anchorEl);

    const handleAccordionChange = (event) => {
        event.preventDefault();
        setExpanded(!expanded);
    };

    const handleClick = (event, commentData) => {
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
            const result = await commentReplyClass.getAll();
            setReplyComments(result);
        })();
    }, [updated]);

    const createNotification = async (replyCommentData, action = "create") => {
        const notificationClass = new Notification();
        await notificationClass.create({
            parentId: dish.id,
            parentName: dish.name,
            refrenceId: replyCommentData?.id || null,
            refrenceName: `Comments/${comment.id}/Replies`,
            type: "reply",
            action: action
        })
    }

    const handleSubmit = async (e, type, value) => {
        try {
            if (type === "image" || type === "file") {
                if (value.size <= 0) throw new Error("Invalid file data!");
                const name = value.name.replace(' ', "-").replace('_', "-");
                const path = `${comment.id}-${v4()}-${name}`;
                value = await handleUploadFile(value, `replies/${type}s/${path}`);
            }
            if (value) {
                const inputData = {
                    comment: type === "image" ? "" : value,
                    type,
                    url: type === "image" || type === "file" ? value : ""
                }
                if (currentComment) {
                    const result = await commentReplyClass.update(currentComment.id, inputData)
                    if (result.status) {
                        setError({ status: true, type: "success", message: "Replied comment updated!" });
                        await createNotification(currentComment, 'update');
                    } else {
                        throw new Error(result.message);
                    }
                } else {
                    const result = await commentReplyClass.insert({
                        ...inputData,
                        status: "publish"
                    })
                    if (result.status) {
                        setError({ status: true, type: "success", message: "Replied successfully!" });
                        await createNotification(result.data);
                    } else {
                        throw new Error(result.message);
                    }
                }
                resetComment();
                setExpanded(true);
            } else {
                throw new Error("Invalid data!");
            }
        } catch (error) {
            setError({ status: true, type: "error", message: error?.message || "Something went wrong!" });
        }
    };

    const handleUploadFile = async (file, path) => {
        try {
            const imageRef = ref(storage, `comments/${path}`);
            const snapshot = await uploadBytes(imageRef, file);
            return getDownloadURL(snapshot.ref);
        } catch (error) {
            throw new Error(error.message)
            return false;
        }
    }

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

    const handleCommentAction = (action) => {
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
                                <Typography variant="span">{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} </Typography> {replyComments.length} REPLIES
                            </Typography>
                            {
                                expanded ? (
                                    <>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }} ref={commentRef}>
                                            {replyComments?.length ?
                                                replyComments.map((replyComment, key) => {
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
                                                                            <Typography variant='span' sx={{ fontWeight: "bold", width: "100%" }}>
                                                                                {commentUser.isAdmin ? "Response by owner" : commentUser.name || "No Name"}

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
                                                                        <div style={{ display: "flex", justifyContent: "space-between", width: '50%' }} I>
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
                                                            <Typography variant='p' fontWeight='700'>className=reply Found</Typography>
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
            {
                error.status ?
                    <SnackbarOpen
                        message={error.message}
                        useOpen={() => [error, setError]}
                        color={error.type}
                    /> :
                    ""
            }
        </>
    )
}

const CommentContent = ({ replyComment }) => {
    const { type, comment, url } = replyComment;
    const arrayCommentData = comment && typeof comment === "string" ? comment.split(`\n`) : "";
    const [error, setError] = useState({ status: false, type: "", message: "" });


    return (
        <>
            {
                type === "image" ? (
                    <span>
                        <img
                            src={url || "/menu-placeholder.jpeg"}
                            srcSet={url || "/menu-placeholder.jpeg"}
                            alt={"Comment Image"}
                            width={175}
                            height={125}
                            loading="lazy"
                            style={{ marginTop: '15px', borderRadius: "5px" }}
                        />
                    </span>
                ) : (
                    <>
                        <Typography variant="span">
                            {
                                arrayCommentData.length ? (
                                    <>
                                        {
                                            arrayCommentData.map((string, key) => (
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
            {
                error.status ?
                    <SnackbarOpen
                        message={error.message}
                        useOpen={() => [error, setError]}
                        color={error.type}
                    /> :
                    ""
            }
        </>
    )
}

export default ReplyCommentDish