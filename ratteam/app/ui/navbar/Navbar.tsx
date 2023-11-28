"use client";

import styles from "@/app/ui/navbar/navbar.module.css";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import logo from "../../../public/logo.png";

import {
  changeLoginModalStatus,
  changeModalStatus,
  changeRegistrationModalStatus,
} from "../../lib/redux/modalSlice";

import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";

export default function NavBar() {
  const dispatch = useAppDispatch();
  function loginHandler() {
    dispatch(changeLoginModalStatus());
    dispatch(changeModalStatus());
  }
  function registrationHandler() {
    dispatch(changeRegistrationModalStatus());
    dispatch(changeModalStatus());
  }

  return (
    <div className={styles.shape}>
      <Link href="/">
        <Image src={logo} width={100} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.auth}>
        <span className={styles.enter} onClick={loginHandler}>
          Войти{" "}
        </span>
        <span> или </span>

        <span className={styles.enter} onClick={registrationHandler}>
          Зарегистрироваться
        </span>
      </div>
    </div>
  );
}
