import { FC } from "react";
import styles from "./serviceCard.module.scss";
import Link from "next/link";

interface ServiceCardProps {
  title?: string;
  backgroundUrl?: string;
  href?: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, backgroundUrl, href }) => (
  <Link
    href={`/services/${href}` || "/"}
    className={styles.card}
    style={{ backgroundImage: `url(${backgroundUrl})` }}
  >
    <div className={styles.background}>
      <h2>{title}</h2>
    </div>
  </Link>
);

export default ServiceCard;
