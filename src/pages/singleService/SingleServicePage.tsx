import Image from "next/image";
import { FC } from "react";
import styles from "./singleServicePage.module.scss";
import Tiles from "@/shared/components/tiles/Tiles";
import Feedback from "@/widgets/feedback/Feedback";

const SingleServicePage: FC<{ serviceId: string }> = ({ serviceId }) => {
  return (
    <div>
      <div className={styles.headerImageWrapper}>
        <Image
          src="/images/service_1_1.png"
          layout="fill"
          objectFit="cover"
          alt=""
        />
        <div>
          <h2>
            Планируете участие в бизнес-мероприятиях?
            <br /> <strong>Доверьте эту задачу нам!</strong>
          </h2>
          <h1>Коммерческая застройка выставочных стендов под ключ</h1>
        </div>
      </div>
      <div className={styles.textWrapper}>
        <article className={styles.leftContent}>
          <p>
            Мы предлагаем полное решение застройки выставочных стендов и сцен
            под ключ
            <br />
            Аккредитацию мы также можем взять на себя!
          </p>
          <div className={styles.listSection}>
            <p>
              Проектирование, разработка дизайна и оформление массовых
              мероприятий:
            </p>
            <ul>
              <li>стенды,</li>
              <li>интерактивы,</li>
              <li>светодиодные инсталяции,</li>
              <li>широкоформатная печать, </li>
              <li>объемные конструкции и т.д.</li>
            </ul>
          </div>
          <h2>Мы беремся за реализацию даже самых сложных проектов!</h2>
          <div className={styles.buttonWrapper}>
            <a href="#feedback">Заказать сейчас</a>
          </div>
        </article>
        <article className={styles.rightContent}>
          <section>
            <div>
              <h2>Качественное освещение</h2>
              <p>
                Правильно организованное освещение акцентирует привлекающие
                внимание аспекты продукции и создает уютную атмосферу, благодаря
                чему посетители охотнее заходит в стенд для более детального
                ознакомления с товарами.
              </p>
            </div>
            <Image src="/images/light.svg" alt="" width={52} height={52} />
          </section>
          <section>
            <div>
              <h2>Удобство для сотрудников и гостей</h2>
              <p>
                Стандартные выставочные стенды не всегда удобны, особенно если
                ваш товар является специфическим или крупногабаритным. В таких
                случаях индивидуальный проект помогает решить возникшие
                трудности.
              </p>
            </div>
            <Image src="/images/touch.svg" alt="" width={52} height={52} />
          </section>
          <section>
            <div>
              <h2>Уникальный дизайн</h2>
              <p>
                Проект может быть выполнен в любом стиле — от хай-тека до
                старинного. Все зависит от типа продукции, фирменного стиля
                компании и требований заказчика. Мы изготовим стенды любой
                сложности и из различных материалов
              </p>
            </div>
            <Image src="/images/stars.svg" alt="" width={52} height={52} />
          </section>
        </article>
      </div>
      <div className={styles.examplesWrapper}>
        <h2>Примеры наших работ</h2>
        <Tiles
          images={[
            "/images/service_1_1.png",
            "/images/service_1_1.png",
            "/images/service_1_1.png",
            "/images/service_1_1.png",
            "/images/service_1_1.png",
          ]}
        />
      </div>
      <Feedback />
    </div>
  );
};

export default SingleServicePage;
