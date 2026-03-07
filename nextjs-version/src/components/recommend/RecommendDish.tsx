import React, { useState } from "react";

import { IconButton, Typography } from "@mui/material";
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';

import { BiUpvote, BiDownvote } from 'react-icons/bi'


import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import SnackbarOpen from "../miscellaneous/SnackBar";
import { useAuth } from "@/context/AuthContext";
import Vote from "@/classes/Vote";
import Notification from "@/classes/Notification";

export default function RecommendDish({ dish }:any) {
    const [vote, setVote] = useState(dish.isVote);
    const [upvote, setUpvote] = useState(dish.isVote?.type === 'up');
    const [downvote, setDownvote] = useState(dish.isVote?.type === 'down');
    const [isLoading, setIsLoading] = useState(false);
    const [votes, setVotes] = useState(dish.voteCount || 0);
    const [formData, setFormData] = useState({
        type: "",
        description: ""
    })
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const { user, setLoginPopupShow, tenantId, setSnackbar } = useAuth();

    const handleOpenModal = (event:any, type = "up") => {
        event.preventDefault();
        setOpen(true);
        setFormData(prev => ({ type, description: "" }));
    }

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!formData.type) {
            setSnackbar(false, "Vote type not found!")
            return;
        };
        if (!formData.description.trim()) {
            setSnackbar(false, "Reason must be requred!");
            return;
        }
        const result:any = await handleVote();
        if (result.status) {
            if (formData.type === "up") {
                const newUpvote = !upvote;
                setUpvote(newUpvote);
                setDownvote(false);
                const addition = downvote ? 2 : 1;
                setVotes((prev:any) => (newUpvote ? prev + addition : prev - addition))
            } else {
                const newDownvote = !downvote;
                setUpvote(false);
                setDownvote(newDownvote);
                const addition = upvote ? 2 : 1;
                setVotes((prev:any) => (newDownvote ? prev - addition : prev + addition));
            }
        }
    }

    const handleVote = async () => {
        const type = formData.type;
        try {
            if (!user) {
                setLoginPopupShow(true);
                return;
            }
            setIsLoading(true);
            let result;
            let isUpvoteOrDownvote = false;
            const inputData = {
                type,
                description: formData.description.trim(),
                createdBy:user.id
            };
            const voteClass = new Vote(tenantId, dish.id);
            if (type === "up" && !upvote) isUpvoteOrDownvote = true;
            if (type === "down" && !downvote) isUpvoteOrDownvote = true;
            if (isUpvoteOrDownvote) {
                let id;
                if (vote) {
                    id = vote.id;
                    result = await voteClass.update(vote.id, inputData);
                } else {
                    result = await voteClass.insert(inputData);
                    id = result.id;
                }
                if (result.status) {
                    setOpen(false);
                    setVote(result);
                    await createNotification(type, "create", id);
                } else {
                    setSnackbar(false, result.message);
                }
            } else {
                result = await voteClass.update(vote.id, {
                    ...inputData,
                    status: "inactive"
                });
                if (result.status) {
                    setOpen(false);
                    setVote(false)
                    await createNotification(type, "delete", vote?.id);
                } else {
                    setSnackbar(false, result.message);
                }
            }
            setIsLoading(false);
            return {
                status: result?.status || false,
                type: type
            }
        } catch (error) {
            setIsLoading(false);
            return {
                status: false,
                type: type
            }
        }

    }

    const createNotification = async (type:any, action:any, refId = null) => {
        const notificationClass = new Notification(tenantId);
        await notificationClass.create({
            parentId: dish.id,
            parentName: dish.name,
            refrenceId: refId,
            refrenceName: `Dishes/${dish.id}/Votes`,
            type: "recommend",
            subType: type,
            action: action
        })
    }

    return (
        <>
            <Typography component="span">
                <IconButton
                    onClick={isLoading ? undefined : (e) => handleOpenModal(e)}
                    color={upvote ? "inherit" : "default"}
                >
                    <BiUpvote color={upvote ? "#9d30ac" : "#333"} />
                </IconButton>
                <Typography
                    component="span"
                    sx={{
                        color: upvote ? "#9d30ac" : downvote ? "#45a9e3" : "#b0aeb1"
                    }}
                >{votes}</Typography>
                <IconButton
                    onClick={isLoading ? undefined : (e) => handleOpenModal(e, "down")}
                    color={downvote ? "secondary" : "default"}
                >
                    <BiDownvote color={downvote ? "#9d30ac" : "#333"} />
                </IconButton>
            </Typography>

            <CssVarsProvider>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <Typography
                            id="basic-modal-dialog-title"
                            component="h2"
                            variant="inherit"
                            fontSize="1.25em"
                            mb="0.25em"
                        >
                            Recommend this dish
                        </Typography>
                        <Typography
                            id="basic-modal-dialog-description"
                            mt={0.5}
                            mb={2}
                            // textColor="text.tertiary"
                        >
                            {
                                upvote ? (
                                    <>Please let us know what you did not like about this dish.</>
                                ) : (
                                    <>
                                        {
                                            formData.type === "up" ? (
                                                <>Please share what you enjoyed about this dish.</>
                                            ) : formData.type === "down" && !downvote ? (
                                                <>Please let us know what you did not like about this dish.</>
                                            ) : (
                                                <>Please let us know why are you removing from downvote.</>
                                            )
                                        }
                                    </>
                                )
                            }
                        </Typography>
                        <form
                            onSubmit={isLoading ? () => { } : handleSubmit}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Reason</FormLabel>
                                    <Textarea
                                        placeholder="Type in here…"
                                        value={formData.description}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            setError(value.trim().length ? "" : "Reason must be required!");
                                            setFormData(prev => ({ ...prev, description: event.target.value }))
                                        }}
                                        minRows={3}
                                        maxRows={4}
                                        color={error ? "danger" : "neutral"}
                                        required
                                    />
                                    {
                                        error ? (
                                            <FormHelperText sx={{
                                                color: "red"
                                            }}>{error}</FormHelperText>
                                        ) : ""
                                    }
                                </FormControl>
                                <Button type="submit">{isLoading ? "Loading..." : "Submit"}</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </>
    )
}
