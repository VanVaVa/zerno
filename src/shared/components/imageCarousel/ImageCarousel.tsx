"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./stylesOverride.css";
import styles from "./imageCarousel.module.scss";
import { useWowPark } from "@/features/wow-park/hooks/use-wow-park";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const ImageCarousel = () => {
  const { images, loading, error } = useWowPark();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease",
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 905,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "60px",
        },
      },
    ],
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
      <div>
        <Slider {...settings}>
          {images.map((el, idx) => (
            <div className={styles.imageWrapper} key={idx}>
              <Image
                src={decodeURIComponent(el)}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
