import React, { useEffect, useState, createRef } from 'react'

import moment from 'moment';
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Avatar, Typography, List, ListItem, ListItemText, ListItemAvatar, Menu, MenuItem, IconButton, capitalize } from '@mui/material';


import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { storage } from '../firebase';
import CommentInput from './dish/CommentInput';
import { UserAuth } from '../context/AuthContext';
import { Comment as CommentModal, Notification } from '../classes';
import ReplyCommentDish from './dish/ReplyCommentDish';

export default function Comment({ dish }) {
  const [editComment, setEditComment] = useState("");
  const [currentComment, setCurrentComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = UserAuth();
  const commentRef = createRef();
  const [isLoading, setIsloading] = useState(false)
  const [start, setStart] = useState(0);
  const limit = 5;

  const open = Boolean(anchorEl);

  const handleClick = (event, commentData) => {
    setAnchorEl(event.currentTarget);
    setCurrentComment(commentData);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentComment(false);
    setEditComment("");
  };


  useEffect(() => {
    (async () => {
      setIsloading(true);
      const commentClass = new CommentModal();
      const result = await commentClass.getByDishId(dish.id);
      setComments(result);
      setIsloading(false);

    })();
  }, [dish.id, updated]);

  const handleReadMore = async (event) => {
    event.preventDefault();
    setStart(start + limit);
  }


  const createNotification = async (commentData, action = "create") => {
    const notificationClass = new Notification();
    await notificationClass.create({
      parentId: dish.id,
      parentName: dish.name,
      refrenceId: commentData?.id,
      refrenceName: commentData?.comment || "",
      type: "comment",
      action: action,
    })
  }

  const handleChangeComment = async (e, type, value) => {
    try {
      if (type === "image" || type === "file") {
        if (value.size <= 0) throw new Error("Invalid file data!");
        const name = value.name.replace(' ', "-").replace('_', "-");
        const path = `${dish.id}-${v4()}-${name}`;
        value = await handleUploadFile(value, `${type}s/${path}`);
      }
      if (value) {
        const inputData = {
          comment: type === "image" ? "" : value,
          type,
          url: type === "image" || type === "file" ? value : ""
        }
        const commentClass = new CommentModal();
        if (currentComment) {
          const result = await commentClass.update(currentComment.id, inputData)
          if (result.status) {
            toast("Comment updated successfully!", { type: "success" });
            await createNotification(currentComment, 'update');
            resetComment();
          } else {
            throw new Error(result.message);
          }
        } else {
          const result = await commentClass.insert({
            ...inputData,
            dishId: dish.id,
            status: "publish"
          })
          if (result.status) {
            toast("Comment created successfully!", { type: "success" });
            await createNotification(result.data);
            resetComment();
          } else {
            throw new Error(result.message);
          }
        }
      } else {
        throw new Error("Invalid data!");
      }
    } catch (error) {
      toast(error?.message || "Something went wrong!", { type: "error" });
    }
  };

  const handleUploadFile = async (file, path) => {
    try {
      const imageRef = ref(storage, `comments/${path}`);
      const snapshot = await uploadBytes(imageRef, file);
      return getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error(error.message)
      return false;
    }
  }

  // // delete comment function
  const handleDeleteComment = async () => {
    if (currentComment) {
      const commentClass = new CommentModal();
      const result = await commentClass.delete(currentComment.id);
      if (result.status) {
        resetComment();
        await createNotification(null, 'delete');
      }
    }
  };

  const handleEditComment = () => {
    if (currentComment?.type === "text") {
      setEditComment(currentComment.comment || "");
    }
    setAnchorEl(null);
  }

  const resetComment = () => {
    setUpdated(!updated);
    handleClose();
  }

  const handleCommentAction = (action, commentData = false) => {
    if (action === "edit") {
      handleEditComment();
    } else if (action === "delete") {
      handleDeleteComment();
    }
  }

  return (
    <div>
      <CommentInput comment={editComment} handleSubmit={handleChangeComment} count={comments.length} />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} ref={commentRef}>
        {comments?.length ?
          comments.slice(0, start + limit).map((menuComment, key) => {
            const fromNow = moment(menuComment.createdAt.toDate()).fromNow();
            const commentUser = menuComment.userData || {};
            return (
              <React.Fragment key={key}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={capitalize(commentUser.name || "No Name")} src={commentUser?.photoURL ? commentUser.photoURL : "/user-avatar.png"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <Typography variant='span' sx={{ fontWeight: "bold", width: "100%" }}>
                          {commentUser.name || "No Name"}
                          <Typography variant='caption' sx={{ ml: 1, float: "right" }}>{fromNow}</Typography>
                        </Typography>
                        {
                          user && commentUser?.id === user?.uid && (
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0
                              }}
                              onClick={(event) => handleClick(event, menuComment)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          )
                        }
                      </>
                    }
                    secondary={<CommentContent menuComment={menuComment} />}
                    sx={{ marginTop: "0px", position: "relative", width: "90%" }}
                  />
                  <ReplyCommentDish comment={menuComment} dish={dish} />
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
                <Typography variant='p' fontWeight='700'>Be the first to comment</Typography>
              </ListItemText>
            </ListItem>
          )}
        {
          !isLoading && comments.length > start ? (
            <div className='row notification-load'>
              <div className='col-md-12'>
                <a href="#" onClick={handleReadMore} style={{marginLeft:'60%'}}>Load more</a>
              </div>
            </div>
          ) : ""
        }
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

    </div>
  )
}


const CommentContent = ({ menuComment }) => {
  const { type, comment, url } = menuComment;
  const arrayCommentData = comment && typeof comment === "string" ? comment.split(`\n`) : "";
  return (
    <>
      {
        type === "image" ? (
          <span>
            <img
              src={url || "/dish-612x612.jpg"}
              srcSet={url || "/dish-612x612.jpg"}
              alt={"Comment Image"}
              width={200}
              height={150}
              loading="lazy"
              style={{ marginTop: '15px', borderRadius: "5px" }}
            />
          </span>
        ) : (
          <>
            <Typography variant="body" fontSize='18px'>
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
    </>
  )
}