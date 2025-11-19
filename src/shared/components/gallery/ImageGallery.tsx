"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import styles from "./imageGallery.module.scss";
import { FC } from "react";

const ImageGallery: FC<{ urls: string[] }> = ({ urls }) => {
  return (
    <PhotoProvider>
      <div className={styles.wrapper}>
        {urls.map((item, idx) => (
          <PhotoView src={item} key={idx}>
            <div className={styles.figure}>
              <Image
                src={decodeURIComponent(item)}
                alt=""
                objectFit="cover"
                layout="fill"
              />
            </div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default ImageGallery;
