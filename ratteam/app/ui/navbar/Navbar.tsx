'use client';

import styles from '@/app/ui/navbar/navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/logo.png';

import {
  changeLoginModalStatus,
  changeModalStatus,
  changeRegistrationModalStatus,
} from '../../lib/redux/modalSlice';

import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { useEffect, useState } from 'react';
import { checkAuthThunk, logoutThunk } from '@/app/lib/data/authThunk';
import { usePathname } from 'next/navigation';
import { RootState } from '@/app/lib/redux/store';
import { useRouter } from 'next/navigation';
import Avatar from '@/app/components/Avatar';
import { resetPostData } from '@/app/lib/redux/postSlice';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );

  const router = useRouter();
  const pathname = usePathname();
  console.log('pathname', pathname);

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem('token')) {
        await dispatch(checkAuthThunk());
      }
      setLoading(false);
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    const isEditPostPage = pathname?.startsWith('/blog/edit-post/');

    if (isEditPostPage) {
      return () => {
        dispatch(resetPostData());
      };
    }
  }, [pathname, dispatch]);

  function loginHandler() {
    dispatch(changeLoginModalStatus());
    dispatch(changeModalStatus());
  }
  function registrationHandler() {
    dispatch(changeRegistrationModalStatus());
    dispatch(changeModalStatus());
  }
  function logoutHandler() {
    dispatch(logoutThunk());
    router.push('/');
  }

  return (
    <div className={styles.shape}>
      <Link href="/">
        <Image src={logo} width={100} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.hello}>
        {' '}
        {userData && userData.user.name && (
          <>
            <span className={styles.helloSign}>
              Привет, {userData.user.name}
            </span>
            <Avatar />
          </>
        )}
      </div>

      {loading ? (
        <div className={styles.auth}>Загрузка...</div>
      ) : userData ? (
        <>
          <Link href="/personal">
            <div className={styles.helloSign}>Личный кабинет</div>
          </Link>
          <div className={styles.auth}>
            {' '}
            <span className={styles.enter} onClick={logoutHandler}>
              Выйти{' '}
            </span>
          </div>
        </>
      ) : (
        <div className={styles.auth}>
          <span className={styles.enter} onClick={loginHandler}>
            Войти{' '}
          </span>
          <span> или </span>
          <span className={styles.enter} onClick={registrationHandler}>
            Зарегистрироваться
          </span>
        </div>
      )}
    </div>
  );
}
