'use client';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IPostLike } from '../../lib/types/response';
import { IUser } from '../../lib/types/types';
import PostService from '@/app/lib/data/postService';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import {
  changeLoginModalStatus,
  changeModalStatus,
} from '@/app/lib/redux/modalSlice';
import { RootState } from '@/app/lib/redux/store';

interface PostLikeProps {
  PostLikes: IPostLike[];

  postId: number;
}

export default function PostLike({ PostLikes, postId }: PostLikeProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(PostLikes.length);

  useEffect(() => {
    const isLiked = PostLikes.some(
      (like) => like.user_id === userData?.user?.id
    );
    setLiked(isLiked);
  }, [PostLikes, userData]);

  const handleLikeClick = async () => {
    if (!userData) {
      dispatch(changeLoginModalStatus());
      dispatch(changeModalStatus());
      return;
    }

    const userId = userData.user.id;
    if (!userId) {
      return;
    }
    await PostService.setLike(userId, postId);
    setLiked((prevLiked) => !prevLiked);
    if (liked) {
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }
  };

  return (
    <>
      {liked ? (
        <FavoriteIcon
          sx={{ color: 'red', cursor: 'pointer' }}
          onClick={handleLikeClick}
        />
      ) : (
        <FavoriteBorderIcon
          sx={{ cursor: 'pointer' }}
          onClick={handleLikeClick}
        />
      )}

      <span>{likes}</span>
    </>
  );
}
