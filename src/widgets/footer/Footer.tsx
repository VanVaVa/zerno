"use client";

import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { useServices } from "@/features/services/hooks/use-services";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContacts } from "@/features/contacts/hooks/use-contacts";

const Footer = () => {
  const { services, loading, error } = useServices();
  const { contacts, loadingContacts, errorContacts } = useContacts();

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">Загрузка...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error" textAlign="center">
          Ошибка загрузки: {error}
        </Typography>
      </Container>
    );
  }

  if (loadingContacts) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">Загрузка...</Typography>
      </Container>
    );
  }

  if (errorContacts) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error" textAlign="center">
          Ошибка загрузки: {errorContacts}
        </Typography>
      </Container>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.leftSideWrapper}>
          <div>
            <h2>Услуги</h2>
            <ul className={styles.services}>
              {services.map((el) => (
                <li key={el.id}>
                  <Link href={`/services/${el.id}`}>{el.name}</Link>
                </li>
              ))}
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
              <Link href={`tel:${contacts.phone}`}>{contacts.phone}</Link>
            </div>
            <div className={styles.contact}>
              <Image src="/images/email.svg" width={34} height={34} alt="" />
              <Link href={`mailto:${contacts.email}`}>{contacts.email}</Link>
            </div>
            <div className={styles.contact}>
              <Image src="/images/room.svg" width={34} height={34} alt="" />
              <Link href={contacts.mapLink}>{contacts.address}</Link>
            </div>
            <div className={styles.contact}>
              <Image src="/images/web.svg" width={34} height={34} alt="" />
              <div className={styles.webLink}>
                <Link href={contacts.website}>{contacts.website}</Link>
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
                <Link href={`tel:${contacts.phone}`}>{contacts.phone}</Link>
              </div>
              <div className={styles.contact}>
                <Image src="/images/email.svg" width={34} height={34} alt="" />
                <Link href={`mailto:${contacts.email}`}>{contacts.email}</Link>
              </div>
              <div className={styles.contact}>
                <Image src="/images/room.svg" width={34} height={34} alt="" />
                <Link href={contacts.mapLink}>{contacts.address}</Link>
              </div>
              <div className={styles.contact}>
                <Image src="/images/web.svg" width={34} height={34} alt="" />
                <div className={styles.webLink}>
                  <Link href={contacts.website}>{contacts.website}</Link>
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
              {services.map((el) => (
                <li key={el.id}>
                  <Link href={`/services/${el.id}`}>{el.name}</Link>
                </li>
              ))}
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
};

export default Footer;
