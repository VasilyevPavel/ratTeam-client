'use client';

import styles from '@/app/ui/navbar.module.css';
import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import logo from '../../public/logo.png';

import { changeModalStatus } from '../lib/redux/modalSlice';

import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';

export default function NavBar() {
  const dispatch = useAppDispatch();
  function enterHandler() {
    dispatch(changeModalStatus());
  }
  const test = useAppSelector((state) => state.modalSlice.isOpen);
  console.log('test', test);
  return (
    <div className={styles.shape}>
      <Link href="/">
        <Image src={logo} width={100} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.auth}>
        <span className={styles.enter} onClick={enterHandler}>
          Войти{' '}
        </span>
        или
        <Link className={styles.regLink} href="/info">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
