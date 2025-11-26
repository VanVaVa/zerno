"use client";

import Image from "next/image";
import styles from "./header.module.scss";
import Link from "next/link";
import { useState } from "react";
import { pages } from "./constants";
import { useContacts } from "@/features/contacts/hooks/use-contacts";

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { contacts, loadingContacts, errorContacts } = useContacts();

  return (
    <header className={styles.header}>
      <Link href="/" onClick={() => setIsMenuOpened(false)}>
        <Image
          src="/images/logo.svg"
          width={174}
          height={50}
          alt="зерно"
          priority
        />
      </Link>
      <nav>
        <ul className={styles.list}>
          {pages.map((el) => (
            <li key={el.link}>
              <Link href={el.link}>{el.name}</Link>
            </li>
          ))}
          <li className={styles.filled}>
            <Link href="/feedback">Заказать услугу</Link>
          </li>
          {loadingContacts || errorContacts || !contacts.whatsapp ? null : (
            <li>
              <Link
                href={contacts.whatsapp}
                className={styles.whatsappButton}
                target="_blank"
              >
                <Image
                  src={"/images/whatsapp.svg"}
                  width={48}
                  height={48}
                  alt=""
                  priority
                />
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <button
        className={styles.button}
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        <Image
          src={isMenuOpened ? "/images/cross.svg" : "/images/burger.svg"}
          width={22}
          height={19}
          alt=""
        />
      </button>
      <div className={styles.menu} data-is-opened={isMenuOpened}>
        <nav>
          <ul className={styles.menuList}>
            {pages.map((el) => (
              <li key={el.link} onClick={() => setIsMenuOpened(false)}>
                <Link href={el.link}>
                  {el.name}
                  <Image
                    src="/images/arrow.svg"
                    alt=""
                    width={21}
                    height={17}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
