import MapProvider from "@/shared/components/MapProvider";
import styles from "./geographyPage.module.scss";

const GeographyPage = () => (
  <div id="geography" className={styles.wrapper}>
    <section className={styles.textWrapper}>
      <h2>География наших проектов</h2>
      <p>
        Мы не боимся расстояний и растем вместе с Вами. Слаженная команда
        профессионалов готова отправиться в любую точку России для осуществления
        Ваших бизнес-идей!
      </p>
    </section>
    <MapProvider />
  </div>
);

export default GeographyPage;
