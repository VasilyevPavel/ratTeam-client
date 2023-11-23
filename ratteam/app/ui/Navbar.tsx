import styles from "@/app/ui/navbar.module.css";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import logo from "../../public/logo.png";
export default function NavBar() {
  return (
    <div className={styles.shape}>
      <Image src={logo} width={100} alt="logo" className={styles.logo} />
      <div className={styles.auth}>
        <Link className={styles.loginLink} href="/info">
          Войти
        </Link>
        или
        <Link className={styles.regLink} href="/info">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
