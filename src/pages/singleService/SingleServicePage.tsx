"use client";

import Image from "next/image";
import { FC } from "react";
import styles from "./singleServicePage.module.scss";
import Tiles from "@/shared/components/tiles/Tiles";
import Feedback from "@/widgets/feedback/Feedback";
import { useServices } from "@/features/services/hooks/use-services";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { IconName, getIconComponent } from "@/features/services/lib/icons";

const SingleServicePage: FC<{ serviceId: string }> = ({ serviceId }) => {
  const { services, loading, error } = useServices();

  const service = services.find((el) => el.id === serviceId);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">Загрузка услуг...</Typography>
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

  if (!service)
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">Услуга не найдена</Typography>
      </Container>
    );

  return (
    <div>
      <div className={styles.headerImageWrapper}>
        <Image
          src={decodeURIComponent(service.gallery[0])}
          layout="fill"
          objectFit="cover"
          alt=""
        />
        <div>
          <h2>{service.subtitle}</h2>
          <h1>{service.headerTitle}</h1>
        </div>
      </div>
      <div className={styles.textWrapper}>
        <article className={styles.leftContent}>
          <p>{service.leftParagraph1}</p>
          <div className={styles.listSection}>
            <p>{service.leftParagraph2}</p>
            <ul>
              {service.leftList.map((el, idx) => (
                <li key={idx}>{el}</li>
              ))}
            </ul>
          </div>
          <h2>{service.leftParagraph3}</h2>
          <div className={styles.buttonWrapper}>
            <a href="#feedback">Заказать сейчас</a>
          </div>
        </article>
        <article className={styles.rightContent}>
          {service.features.map((el) => {
            const IconComponent = getIconComponent(el.iconName as IconName);
            return (
              <section key={el.id}>
                <div>
                  <h2>{el.title}</h2>
                  <p>{el.text}</p>
                </div>
                <IconComponent sx={{ width: 42, height: 42 }} />
              </section>
            );
          })}
        </article>
      </div>
      <div className={styles.examplesWrapper}>
        <h2>Примеры наших работ</h2>
        <Tiles images={service.gallery} />
      </div>
      <Feedback />
    </div>
  );
};

export default SingleServicePage;
