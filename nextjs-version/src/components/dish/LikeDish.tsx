import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@mui/material";
import { where } from "firebase/firestore";
import { FavoriteBorderRounded, FavoriteRounded } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import Like from "@/classes/Like";
import Notification from "@/classes/Notification";

export default function LikeDish({ dish }:any) {
  const [isLiked, setIsLiked] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0)
  const { user, setLoginPopupShow, tenantId } = useAuth();

  useEffect(() => {
    (async () => {
      const likeClass = new Like(tenantId);
      const result = await likeClass.get([
        where('dishId', '==', dish.id)
      ]);
      if (result.length) {
        const userLike = result?.find((like) => like.createdBy === user.uid) || false;
        setIsLiked(userLike);
        setCount(result?.length || 0);
      }
    })();
  }, [dish?.id, user?.uid, tenantId]);


  const handleLikeUnlike = async () => {
    try {
      if (!user) {
        setLoginPopupShow(true);
        return;
      };
      setIsLoading(true);
      const likeClass = new Like(tenantId);
      var result:any = {
        status: false,
        message: "Something went wrong!"
      }
      let action = "liked";
      if (isLiked) {
        action = "unliked";
        result = await likeClass.delete(isLiked.id);
      } else {
        result = await likeClass.insert({ dishId: dish.id,createdBy:user.id });
      }
      if (result.status) {
        if (action === "liked") {
          setCount((prev) => prev + 1);
        } else {
          setCount((prev) => prev - 1);
        }
        setIsLiked(result || false);
        const notificationClass = new Notification(tenantId);
        await notificationClass.create({
          parentId: dish.id,
          parentName: dish.name,
          refrenceId: result?.id || null,
          refrenceName: 'Likes',
          type: 'favorite',
          action: action
        })
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(result.message);
      }
    } catch (error:any) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <Typography component="span">
        <IconButton
          onClick={isLoading ? undefined : handleLikeUnlike}
          color="default"
        >
          {isLiked ? <FavoriteRounded /> : <FavoriteBorderRounded />}
        </IconButton>
      <Typography component="span">{count}</Typography>
    </Typography>
  )
}
