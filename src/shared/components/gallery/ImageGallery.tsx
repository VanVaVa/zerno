"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import styles from "./imageGallery.module.scss";

const ImageGallery = () => (
  <PhotoProvider>
    <div className={styles.wrapper}>
      {[
        "/images/service_1_1.png",
        "/images/service_1_1.png",
        "/images/service_1_1.png",
        "/images/service_1_1.png",
      ].map((item, index) => (
        <figure key={index} className={styles.figure}>
          <PhotoView src={item}>
            <Image src={item} alt="" objectFit="cover" layout="fill" />
          </PhotoView>
          <div>
            <h2>хуй</h2>
          </div>
        </figure>
      ))}
    </div>
  </PhotoProvider>
);

export default ImageGallery;
