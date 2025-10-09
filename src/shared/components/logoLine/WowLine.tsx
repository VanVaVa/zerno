import { FC } from "react";
import styles from "./logoLine.module.scss";

const WowLine: FC<{ direction?: "left" | "right" }> = ({
  direction = "right",
}) => (
  <div className={styles.wrapper_logo} data-direction={direction}>
    {Array.from({ length: 15 }, () => "WOW-Park")
      .flat()
      .map((el, idx) => (
        <span key={idx} style={{ textWrap: "nowrap" }}>
          {el}
        </span>
      ))}
  </div>
);

export default WowLine;
