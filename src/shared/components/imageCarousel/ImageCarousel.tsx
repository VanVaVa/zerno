"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./imageCarousel.module.scss";
import { useWowPark } from "@/features/wow-park/hooks/use-wow-park";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const ImageCarousel = () => {
  const { images, loading, error } = useWowPark();

  const swiperParams = {
    modules: [Autoplay],
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 20,
    rewind: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    loop: true,
    breakpoints: {
      906: {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,
      },
    },
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">Загрузка Wow-парка...</Typography>
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
    <div className={styles.carouselWrapper}>
      <Swiper {...swiperParams} className={styles.swiperContainer}>
        {images.map((el, idx) => (
          <SwiperSlide key={idx} className={styles.swiperSlide}>
            <div className={styles.imageWrapper}>
              <Image
                src={decodeURIComponent(el)}
                alt={`Wow-park image ${idx + 1}`}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                sizes="(max-width: 905px) 100vw, 30vw"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
