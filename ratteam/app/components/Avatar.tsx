'use client';
import React from 'react';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';
import Link from 'next/link';
import defaultAvatar from '../../public/splinter.jpg';
import Image from 'next/image';
import styles from './avatar.module.css';
import { IUser } from '../lib/types/types';

interface AvatarProps {
  user?: IUser;
}

export default function Avatar({ user }: AvatarProps) {
  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );

  if (!user && !userData) {
    return <div>No user data available</div>;
  }

  if (user) {
    return (
      <>
        {user?.avatar !== undefined && user.avatar !== '' ? (
          //TODO Сделать ссылку на профиль автора
          <Link href="/">
            <Image
              src={user.avatar}
              width={70}
              height={50}
              alt="logo"
              className={styles.avatar}
            />
          </Link>
        ) : (
          //TODO Сделать ссылку на профиль автора
          <Link href="/">
            <Image
              src={defaultAvatar}
              width={70}
              alt="logo"
              className={styles.avatar}
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
            src={userData?.user.avatar}
            width={70}
            height={50}
            alt="logo"
            className={styles.avatar}
          />
        </Link>
      ) : (
        <Link href="/personal/update-profile">
          <Image
            src={defaultAvatar}
            width={70}
            alt="logo"
            className={styles.avatar}
          />
        </Link>
      )}
    </>
  );
}
