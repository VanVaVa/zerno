"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import styles from "./imageGallery.module.scss";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useGallery } from "@/features/gallery/hooks/use-gallery";

const ImageGallery = () => {
  const { items, loading, error } = useGallery();

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
    <PhotoProvider>
      <div className={styles.wrapper}>
        {items.map((item) => (
          <figure key={item.id} className={styles.figure}>
            <PhotoView src={item.imageUrl}>
              <Image
                src={item.imageUrl}
                alt=""
                objectFit="cover"
                layout="fill"
              />
            </PhotoView>
            <div>
              <h2>{item.caption}</h2>
            </div>
          </figure>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default ImageGallery;
