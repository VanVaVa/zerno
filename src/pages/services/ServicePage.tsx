import ServiceCard from "@/shared/components/serviceCard/ServiceCard";
import styles from "./servicePage.module.scss";

const ServicePage = () => (
  <div id="services" className={styles.wrapper}>
    <section className={styles.textWrapper}>
      <h2>Услуги</h2>
      <p>
        Наша компания предлагает полный спектр рекламных услуг, от концепции до
        реализации, обеспечивая высокое качество на каждом этапе. Мы готовы
        воплотить ваши идеи в жизнь!
      </p>
    </section>
    <div className={styles.cardsContainter}>
      <ServiceCard
        title="Выставочные стенды и сцены"
        backgroundUrl="/images/services_1.png"
        href="/stands"
      />
      <ServiceCard title="Выставочные стенды и сцены" />
      <ServiceCard title="Выставочные стенды и сцены" />
      <ServiceCard title="Выставочные стенды и сцены" />
      <ServiceCard title="Выставочные стенды и сцены" />
      <ServiceCard title="Выставочные стенды и сцены" />
      <ServiceCard title="Выставочные стенды и сцены" />
      <ServiceCard title="Выставочные стенды и сцены" />
    </div>
  </div>
);

export default ServicePage;
