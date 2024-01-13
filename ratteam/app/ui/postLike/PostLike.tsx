'use client';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IPostLike } from '../../lib/types/response';
import { IUserData } from '../../lib/types/types';

interface PostLikeProps {
  PostLikes: IPostLike[];
  user: IUserData;
  postId: number;
}

export default function PostLike({ PostLikes, user, postId }: PostLikeProps) {
  const isLiked = PostLikes.some((like) => like.user_id === user.id);

  const handleLikeClick = async () => {
    console.log('лайк');
  };

  return (
    <>
      {isLiked ? (
        <FavoriteIcon sx={{ color: 'red' }} onClick={handleLikeClick} />
      ) : (
        <FavoriteBorderIcon onClick={handleLikeClick} />
      )}

      <span>{PostLikes.length}</span>
    </>
  );
}
