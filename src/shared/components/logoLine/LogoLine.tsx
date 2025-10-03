import Image from "next/image";
import styles from "./logoLine.module.scss";
import { FC } from "react";

interface LogoLineProps {
  color?: string;
  direction?: "left" | "right";
}

const data = [
  {
    src: "/images/logos/wb.svg",
    width: 77,
    height: 42,
  },
  {
    src: "/images/logos/alfa.svg",
    width: 44,
    height: 61,
  },
  {
    src: "/images/logos/beeline.svg",
    width: 63,
    height: 61,
  },
  {
    src: "/images/logos/5opka.svg",
    width: 61,
    height: 61,
  },
  {
    src: "/images/logos/samokat.svg",
    width: 68,
    height: 61,
  },
  {
    src: "/images/logos/rshb.svg",
    width: 145,
    height: 29,
  },
];

const LogoLine: FC<LogoLineProps> = ({ color, direction }) => (
  <div
    className={styles.wrapper}
    style={{ backgroundColor: color }}
    data-direction={direction}
  >
    {Array.from({ length: 4 }, () => data)
      .flat()
      .map((el, idx) => (
        <Image
          src={el.src}
          width={el.width}
          height={el.height}
          alt=""
          key={idx}
        />
      ))}
  </div>
);

export default LogoLine;
