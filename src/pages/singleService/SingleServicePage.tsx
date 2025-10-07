import Image from "next/image";
import { FC } from "react";
import styles from "./singleServicePage.module.scss";

const SingleServicePage: FC<{ serviceId: string }> = ({ serviceId }) => {
  return (
    <div className={styles.wrapper}>
      <article>
        <h1 className={styles.header}>Выставочные стенды и сцены</h1>
        <div className={styles.figure}>
          <p>
            Планируете участие в бизнес-мероприятиях? Доверьте эту задачу нам!
            <br />
            <br />
            Мы предлагаем полное решение под ключ: проектируем и разрабатываем
            уникальные дизайны, создаем интерактивные элементы, светодиодные
            инсталляции и объемные конструкции.
            <br />
            <br />
            Мы сделаем аккредитацию и реализуем даже самые сложные проекты.
          </p>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/service_1_1.png"
              layout="fill"
              objectFit="cover"
              alt=""
            />
            <Image
              className={styles.imageOverlay}
              src="/images/service_1_2.png"
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default SingleServicePage;
