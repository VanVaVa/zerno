"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./stylesOverride.css";
import { FC } from "react";
import styles from "./imageCarousel.module.scss";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
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

  return (
    <div className={styles.carouselWrapper}>
      <div>
        <Slider {...settings}>
          {images.map((el, idx) => (
            <div className={styles.imageWrapper} key={idx}>
              <Image src={el} alt="" layout="fill" objectFit="cover" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;
