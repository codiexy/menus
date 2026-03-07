import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@mui/material";
import { where } from "firebase/firestore";
import { Like, Notification } from "../../classes";
import { UserAuth } from "../../context/AuthContext";
import { FavoriteBorderRounded, FavoriteRounded } from "@mui/icons-material";

export default function LikeDish({ dish }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0)
  const { user, useLoginPopup } = UserAuth();
  const setLoginPopupShow = useLoginPopup()[1];

  useEffect(() => {
    (async () => {
      const likeClass = new Like();
      const result = await likeClass.get([
        where('dishId', '==', dish.id)
      ]);
      if (result.status) {
        const userLike = result.data?.find((like) => like.createdBy === user.uid) || false;
        setIsLiked(userLike);
        setCount(result?.data?.length || 0);
      }
    })();
  }, [dish?.id, user?.uid]);


  const handleLikeUnlike = async () => {
    try {
      if (!user) {
        setLoginPopupShow(true);
        return;
      };
      setIsLoading(true);
      const likeClass = new Like();
      var result = {
        status: false,
        message: "Something went wrong!"
      }
      let action = "liked";
      if (isLiked) {
        action = "unliked";
        result = await likeClass.delete(isLiked.id);
      } else {
        result = await likeClass.insert({ dishId: dish.id });
      }
      if (result.status) {
        if (action === "liked") {
          setCount((prev) => prev + 1);
        } else {
          setCount((prev) => prev - 1);
        }
        setIsLiked(result?.data || false);
        const notificationClass = new Notification();
        await notificationClass.create({
          parentId: dish.id,
          parentName: dish.name,
          refrenceId: result?.data?.id || null,
          refrenceName: 'Likes',
          type: 'favorite',
          action: action
        })
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(result.message);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error(error);
    }
  };

  return (
    <Typography variant="span">

        <IconButton
          onClick={isLoading ? undefined : handleLikeUnlike}
          color="disabled"
        >
          {isLiked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
        </IconButton>
      <Typography variant="span">{count}</Typography>
    </Typography>
  )
}
