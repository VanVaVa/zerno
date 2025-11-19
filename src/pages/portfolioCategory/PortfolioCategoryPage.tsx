"use client";

import ImageGallery from "@/shared/components/gallery/ImageGallery";
import styles from "./styles.module.scss";
import { FC } from "react";
import { useGallery } from "@/features/gallery/hooks/use-gallery";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const PortfolioCategoryPage: FC<{ categoryId: string }> = ({ categoryId }) => {
  const { items, loading, error } = useGallery();
  const item = items.find((el) => el.id === categoryId);

  if (!item) return null;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">Загрузка галереи...</Typography>
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
    <div className={styles.wrapper}>
      <h1>{item.caption}</h1>
      <ImageGallery urls={item.imageUrl} />
    </div>
  );
};

export default PortfolioCategoryPage;
