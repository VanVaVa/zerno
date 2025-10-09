import ImageGallery from "@/shared/components/gallery/ImageGallery";
import styles from "./portfolioPage.module.scss";

const PortfolioPage = () => (
  <div className={styles.wrapper}>
    <h1>Портфолио</h1>
    <ImageGallery />
  </div>
);

export default PortfolioPage;
