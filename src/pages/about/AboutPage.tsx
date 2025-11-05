"use client";

import Image from "next/image";
import styles from "./aboutPage.module.scss";
import LogoLine from "@/shared/components/logoLine/LogoLine";
import { useCompanyInfo } from "@/features/company/hooks/use-company-info";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const AboutPage = () => {
  const { blocks, loading, error } = useCompanyInfo();

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">
          Загрузка информации о компании...
        </Typography>
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
    <>
      <div id="about" className={styles.wrapper}>
        <h1>О нас</h1>
        {blocks.map((el) => {
          console.log(el.imageUrl);
          return (
            <div className={styles.section} key={el.id}>
              <p
                style={{
                  textAlign: !el.imageUrl ? "center" : "unset",
                }}
              >
                {el.text}
              </p>
              {el.imageUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={decodeURIComponent(el.imageUrl)}
                    fill
                    objectFit="cover"
                    alt=""
                  />
                </div>
              )}
            </div>
          );
        })}
        <span className={styles.subtitle}>
          Наша сила — в креативе, надёжности и умении довести проект до{" "}
          <strong>результата</strong>!
        </span>
      </div>
      <div className={styles.logoLineWrapper}>
        <LogoLine color="#289BFF" />
        <LogoLine color="#FF3D3D" direction="left" />
      </div>
    </>
  );
};

export default AboutPage;
