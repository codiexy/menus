import React, { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import EmojiPicker from 'emoji-picker-react';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { Tooltip, Avatar, CircularProgress, capitalize, TextField } from '@mui/material';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { UserAuth } from '../../context/AuthContext';
import { SiteButton } from '../miscellaneous';

export default function CommentInput({ comment, handleSubmit, count, handleOuterCancel, type = "post" }) {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, useLoginPopup } = UserAuth();
    const setLoginPopupShow = useLoginPopup()[1];

    useEffect(() => {
        setValue(comment || "")
    }, [comment])


    const handleEmojiClick = (event) => {
        setShow(true);
        setAnchorEl(event.currentTarget);
    };

    const handleEmoji = (emoji) => {
        if (emoji) {
            setValue((prev) => `${prev}${emoji.emoji}`);
        }
    }

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setLoginPopupShow(true);
            return;
        }
        if (isLoading !== "submit") {
            setIsLoading("submit")
            if (typeof handleSubmit === "function") await handleSubmit(event, 'text', value);
            if (typeof handleOuterCancel === "function") handleOuterCancel();
            setShow(false);
            setValue('');
            setIsLoading(false)
        }
    }

    const handleImageSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setLoginPopupShow(true);
            return;
        }
        setIsLoading("image")
        if (typeof handleSubmit === "function") await handleSubmit(event, 'image', event.target.files[0]);
        if (typeof handleOuterCancel === "function") handleOuterCancel();
        setShow(false);
        setValue('');
        setIsLoading(false)
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setValue('');
        if (typeof handleOuterCancel === "function") handleOuterCancel();
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setShow(false);
        } else if (event.key === 'Escape') {
            setShow(false);
        }
    }
    const size = type === "reply" ? "40px" : "50px";

    return (
        <Paper
            component="form"
            onSubmit={handleCommentSubmit}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", mb: 3, position: "relative" }}
            className={`${type}-comment-form`}
        >
            {typeof count === "undefined" ? "" : (
                <div className='sort-comment-wrap'>
                    <p className='total-comment'>{count} Comments</p>
                    {/* <p className='sort-comment'>
                    <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort by
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Top comments</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Newest first</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </p> */}

                </div>
            )}
            <div className='comment-wrap-box'>
                <div className='commet-profile'>
                    <Avatar sx={{ width: size, height: size }}>
                        <img src={user?.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={size} width={size} />
                    </Avatar>
                </div>

                <TextField
                    sx={{ ml: 1, mb: 2, flex: 1 }}
                    InputProps={{
                        style: {
                            borderRadius: "30px",
                        }
                    }}
                    placeholder={type === "post" ? 'Add a comment...' : ""}
                    inputProps={{ 'aria-label': 'dish-comment-input' }}
                    value={value}
                    required
                    multiline
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className='comment-cancle'>
                <div className='left-comment'>
                    <Tooltip title={`Share emoji`} arrow>
                        <IconButton sx={{ p: '10px' }} onClick={handleEmojiClick} >
                            <AddReactionIcon fontSize={type === "reply" ? 'small' : "medium"} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`Share Image`} arrow>
                        <IconButton
                            type="button"
                            sx={{ p: '5px' }}
                            aria-label="Send image"
                            component="label"
                        >
                            {
                                isLoading === "image" ? (
                                    <CircularProgress size={20} color="secondary" />
                                ) : (
                                    <>
                                        <CameraAltIcon fontSize={type === "reply" ? 'small' : "medium"} />
                                        <input hidden accept="image/*" type="file" onChange={handleImageSubmit} />
                                    </>
                                )
                            }
                        </IconButton>
                    </Tooltip>
                </div>
                <div className='right-comment'>
                    {
                        isLoading === "submit" ? (
                            <a className='comment-btn' disabled>Loading...</a>

                        ) : (
                            <>
                                {/* <a href='#' onClick={handleCancel}>Cancel</a> */}
                                {/* <a href='#' onClick={handleCommentSubmit}> */}
                                <a href='#' className='cancle-btn'>

                                    <SiteButton onClick={handleCancel}>Cancel</SiteButton>
                                </a>
                                <SiteButton onClick={handleCommentSubmit}>{capitalize(type)}</SiteButton>

                                {/* </a> */}

                            </>
                        )
                    }
                </div>
            </div>

            <Popper
                open={show}
                anchorEl={anchorEl}
                role={undefined}
                placement="auto"
                transition
                disablePortal
                sx={{ zIndex: 9 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => setShow(false)}>
                                <MenuList
                                    autoFocusItem={show}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    sx={{ p: 0 }}
                                >
                                    <EmojiPicker onEmojiClick={handleEmoji} />
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Paper>
    );
}
