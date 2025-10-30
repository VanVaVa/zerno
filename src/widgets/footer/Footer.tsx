import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.leftSideWrapper}>
        <div>
          <h2>Услуги</h2>
          <ul className={styles.services}>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
          </ul>
        </div>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <Link href="/about-us">О нас</Link>
            </li>
            <li>
              <Link href="/services">Услуги</Link>
            </li>
            <li>
              <Link href="/wow-park">WOW-парк</Link>
            </li>
            <li>
              <Link href="/portfolio">Портфолио</Link>
            </li>
            <li>
              <Link href="/">Контакты</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.contacts}>
        <h2>Контакты</h2>
        <address className={styles.address}>
          <div className={styles.contact}>
            <Image src="/images/phone.svg" width={34} height={34} alt="" />
            <Link href="tel:89139035210">+7 913 903 5210</Link>
          </div>
          <div className={styles.contact}>
            <Image src="/images/email.svg" width={34} height={34} alt="" />
            <Link href="mailto:89139035210@mail.ru">89139035210@mail.ru</Link>
          </div>
          <div className={styles.contact}>
            <Image src="/images/room.svg" width={34} height={34} alt="" />
            <Link href="https://yandex.ru/maps/org/umny_muzey/154032104008/?ll=82.922091%2C54.960711&z=16">
              г. Новосибирск,
              <br />
              ул. Бетонная 14, стр.2
            </Link>
          </div>
          <div className={styles.contact}>
            <Image src="/images/web.svg" width={34} height={34} alt="" />
            <div className={styles.webLink}>
              <Link href="https://example.com">https://example.com</Link>
              <span>Официальный сайт</span>
            </div>
          </div>
        </address>
      </div>
    </div>
    <div className={styles.footerContentSmall}>
      <Accordion className={styles.list}>
        <AccordionItem
          header={
            <div className={styles.itemHeader}>
              <h2>Контакты</h2>
              <Image
                src={"/images/chevron.svg"}
                alt=""
                width={17}
                height={6}
                className={`${styles.chevron} chevron`}
              />
            </div>
          }
          className={styles.item}
          buttonProps={{
            className: styles.itemBtn,
          }}
          contentProps={{
            className: styles.itemContent,
          }}
        >
          <address className={styles.address}>
            <div className={styles.contact}>
              <Image src="/images/phone.svg" width={34} height={34} alt="" />
              <Link href="tel:89139035210">+7 913 903 5210</Link>
            </div>
            <div className={styles.contact}>
              <Image src="/images/email.svg" width={34} height={34} alt="" />
              <Link href="mailto:89139035210@mail.ru">89139035210@mail.ru</Link>
            </div>
            <div className={styles.contact}>
              <Image src="/images/room.svg" width={34} height={34} alt="" />
              <Link href="https://yandex.ru/maps/org/umny_muzey/154032104008/?ll=82.922091%2C54.960711&z=16">
                г. Новосибирск,
                <br />
                ул. Бетонная 14, стр.2
              </Link>
            </div>
            <div className={styles.contact}>
              <Image src="/images/web.svg" width={34} height={34} alt="" />
              <div className={styles.webLink}>
                <Link href="https://example.com">https://example.com</Link>
                <span>Официальный сайт</span>
              </div>
            </div>
          </address>
        </AccordionItem>
        <AccordionItem
          header={
            <div className={styles.itemHeader}>
              <h2>Услуги</h2>
              <Image
                src={"/images/chevron.svg"}
                alt=""
                width={17}
                height={6}
                className={`${styles.chevron} chevron`}
              />
            </div>
          }
          className={styles.item}
          buttonProps={{
            className: styles.itemBtn,
          }}
          contentProps={{
            className: styles.itemContent,
          }}
          headingProps={{
            className: styles.itemHeader,
          }}
        >
          <ul className={styles.services}>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
            <li>Выставочные стенды и сцены</li>
          </ul>
        </AccordionItem>
      </Accordion>
      <nav>
        <ul className={`${styles.navigation} ${styles.small}`}>
          <li>
            <Link href="/about-us">О нас</Link>
          </li>
          <li>
            <Link href="/services">Услуги</Link>
          </li>
          <li>
            <Link href="/wow-park">WOW-парк</Link>
          </li>
          <li>
            <Link href="/portfolio">Портфолио</Link>
          </li>
          <li>
            <Link href="/">Контакты</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className={styles.credits}>
      <span>© Copyright 2000-2025 “ЗЕРНО”</span>
      <Link href="/">Политика конфиденциальности</Link>
      <Link href="/">Условия пользования</Link>
    </div>
  </footer>
);

export default Footer;
