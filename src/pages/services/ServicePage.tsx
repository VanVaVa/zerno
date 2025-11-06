"use client";

import ServiceCard from "@/shared/components/serviceCard/ServiceCard";
import styles from "./servicePage.module.scss";
import { useServices } from "@/features/services/hooks/use-services";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const ServicePage = () => {
  const { services, loading, error } = useServices();

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

  return (
    <div id="services" className={styles.wrapper}>
      <section className={styles.textWrapper}>
        <h2>Услуги</h2>
        <p>
          Наша компания предлагает полный спектр рекламных услуг, от концепции
          до реализации, обеспечивая высокое качество на каждом этапе. Мы готовы
          воплотить ваши идеи в жизнь!
        </p>
      </section>
      <div className={styles.cardsContainter}>
        {services.map((el) => (
          <ServiceCard
            key={el.id}
            title={el.name}
            backgroundUrl={decodeURIComponent(el.gallery[0])}
            href={el.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
