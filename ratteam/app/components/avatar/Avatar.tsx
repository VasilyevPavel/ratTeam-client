'use client';
import React from 'react';
import { useAppSelector } from '../../lib/redux/hooks';
import { RootState } from '../../lib/redux/store';
import Link from 'next/link';
import defaultAvatar from '../../../public/splinter.jpg';
import Image from 'next/image';
import styles from './avatar.module.css';
import { IUser } from '../../lib/types/types';
import { CircularProgress } from '@mui/material';

interface AvatarProps {
  user?: IUser;
  style?: string;
}

export default function Avatar({ user, style }: AvatarProps) {
  const avatarClassName =
    style === 'comment' ? styles.commentAvatar : styles.avatar;

  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );

  if (!user && !userData) {
    return <CircularProgress />;
  }

  if (user) {
    return (
      <>
        {user?.avatar !== undefined && user.avatar !== '' ? (
          //TODO Сделать ссылку на профиль автора
          <Link href="/">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${userData?.user.avatar}`}
              width={70}
              height={50}
              alt="logo"
              className={avatarClassName}
            />
          </Link>
        ) : (
          //TODO Сделать ссылку на профиль автора
          <Link href="/">
            <Image
              src={defaultAvatar}
              width={70}
              alt="logo"
              className={avatarClassName}
            />
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      {userData?.user?.avatar !== undefined && userData?.user?.avatar !== '' ? (
        <Link href="/personal/update-profile">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${userData?.user.avatar}`}
            width={70}
            height={50}
            alt="logo"
            className={avatarClassName}
          />
        </Link>
      ) : (
        <Link href="/personal/update-profile">
          <Image
            src={defaultAvatar}
            width={70}
            alt="logo"
            className={avatarClassName}
          />
        </Link>
      )}
    </>
  );
}
