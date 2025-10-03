import styles from "./mainPage.module.scss";

const MainPage = () => (
  <div className={styles.wrapper}>
    <section className={styles.card}>
      <h1>
        Мы — Рекламное агентство «<span>ЗЕРНО</span>»
      </h1>
      <p>
        Создаём смелые идеи, превращаем их в яркие проекты и доводим до
        результата.
        <br />
        Наша миссия — расти вместе с вами, делая бизнес заметным и успешным!
      </p>
    </section>
  </div>
);

export default MainPage;
