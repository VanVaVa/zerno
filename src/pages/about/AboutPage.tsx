import Image from "next/image";
import styles from "./aboutPage.module.scss";
import LogoLine from "@/shared/components/logoLine/LogoLine";

const AboutPage = () => (
  <>
    <div id="about" className={styles.wrapper}>
      <h1>О нас</h1>
      <div className={styles.section}>
        <p>
          Мы — команда специалистов с опытом более 10 лет в рекламе и
          производстве. У нас есть собственные цеха и современное оборудование,
          что позволяет работать без посредников и выполнять проекты любой
          сложности.
        </p>
        <Image
          src="/images/about/about_2.png"
          width={578}
          height={330}
          alt=""
        />
      </div>
      <div className={styles.section}>
        <Image
          src="/images/about/about_1.png"
          width={578}
          height={330}
          alt=""
        />
        <p>
          Мы — команда специалистов с опытом более 10 лет в рекламе и
          производстве. У нас есть собственные цеха и современное оборудование,
          что позволяет работать без посредников и выполнять проекты любой
          сложности.
        </p>
      </div>
      <span className={styles.subtitle}>
        Наша сила — в креативе, надёжности и умении довести проект до{" "}
        <strong>результата</strong>!
      </span>
    </div>
    <div className={styles.logoLineWrapper}>
      <LogoLine color="#289BFF" />
      <LogoLine color="#FF3D3D" direction="left" />
    </div>
  </>
);

export default AboutPage;
