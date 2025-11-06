// components/Gallery.tsx
import React from "react";
import Image from "next/image";
import styles from "./tiles.module.scss";

interface TilesProps {
  images: string[];
}

const Tiles: React.FC<TilesProps> = ({ images }) => {
  const getGalleryLayout = () => {
    switch (images.length) {
      case 1:
        return styles.single;
      case 2:
        return styles.double;
      case 3:
        return styles.triple;
      case 4:
        return styles.quad;
      case 5:
        return styles.penta;
      case 6:
        return styles.hexa;
      default:
        return styles.defaultGrid;
    }
  };

  return (
    <div className={`${styles.gallery} ${getGalleryLayout()}`}>
      {images.map((src, index) => (
        <div
          key={index}
          className={styles.imageContainer}
          data-count={images.length}
          data-index={index}
        >
          <Image
            src={decodeURIComponent(src)}
            alt={`Gallery image ${index + 1}`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
};

export default Tiles;
