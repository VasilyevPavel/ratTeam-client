'use client';
import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ICommentLike, IPostLike } from '../../lib/types/response';
import PostService from '@/app/lib/data/postService';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import {
  changeLoginModalStatus,
  changeModalStatus,
} from '@/app/lib/redux/modalSlice';
import { RootState } from '@/app/lib/redux/store';
import CommentService from '@/app/lib/data/commentService';

interface LikesProps {
  allLikes: IPostLike[] | ICommentLike[];
  postId?: number;
  commentId?: number;
}

export default function Likes({ allLikes, postId, commentId }: LikesProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(allLikes.length);

  useEffect(() => {
    const isLiked = allLikes.some(
      (like) => like.user_id === userData?.user?.id
    );
    setLiked(isLiked);
  }, [allLikes, userData]);

  const handleLikeClick = async () => {
    if (!userData) {
      dispatch(changeLoginModalStatus());
      dispatch(changeModalStatus());
      return;
    }

    if (commentId) {
      await CommentService.setLike(commentId);
      // revalidateTag('likes');
    } else if (postId) {
      await PostService.setLike(postId);
      // revalidateTag('likes');
    }
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
