import Image from "next/image";
import styles from "./header.module.scss";
import Link from "next/link";

const Header = () => (
  <header className={styles.header}>
    <Link href="/">
      <Image src="/images/logo.svg" width={174} height={50} alt="зерно" />
    </Link>
    <ul className={styles.list}>
      <li>
        <Link href="/about-us">О нас</Link>
      </li>
      <li>
        <Link href="/services">Услуги</Link>
      </li>
      <li>
        <Link href="/">WOW-парк</Link>
      </li>
      <li>
        <Link href="/">Портфолио</Link>
      </li>
      <li>
        <Link href="/">Контакты</Link>
      </li>
      <li className={styles.filled}>
        <Link href="/">Заказать услугу</Link>
      </li>
    </ul>
  </header>
);

export default Header;
