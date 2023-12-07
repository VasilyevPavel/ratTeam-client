'use client';

import styles from '@/app/ui/navbar/navbar.module.css';
import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import logo from '../../../public/logo.png';

import {
  changeLoginModalStatus,
  changeModalStatus,
  changeRegistrationModalStatus,
} from '../../lib/redux/modalSlice';

import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { useEffect, useState } from 'react';
import { checkAuthThunk, logoutThunk } from '@/app/lib/data/authThunk';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

export default function NavBar() {
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);

  console.log('isAuth', isAuth);
  useEffect(() => {
    setLoading(true);

    const checkAuth = async () => {
      await dispatch(checkAuthThunk());
      setLoading(false);
      setIsAuthenticated(true);
    };

    if (localStorage.getItem('token')) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [isAuth, dispatch]);

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
    setIsAuthenticated(false);
  }

  return (
    <div className={styles.shape}>
      <Link href="/">
        <Image src={logo} width={100} alt="logo" className={styles.logo} />
      </Link>
      {loading ? (
        <div className={styles.auth}>Загрузка...</div>
      ) : isAuthenticated ? (
        <div className={styles.auth}>
          {' '}
          <span className={styles.enter} onClick={logoutHandler}>
            Выйти{' '}
          </span>
        </div>
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
