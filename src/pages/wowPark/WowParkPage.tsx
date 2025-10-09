import ImageCarousel from "@/shared/components/imageCarousel/ImageCarousel";
import WowLine from "@/shared/components/logoLine/WowLine";
import Image from "next/image";
import styles from "./wowParkPage.module.scss";

const WowParkPage = () => (
  <div className={styles.wrapper}>
    <WowLine />
    <div style={{ display: "block" }}>
      <ImageCarousel
        images={[
          "/images/service_1_1.png",
          "/images/service_1_2.png",
          "/images/service_1_1.png",
          "/images/service_1_2.png",
        ]}
      />
    </div>
    <div className={styles.articleWrapper}>
      <article className={styles.article}>
        <p>
          Наша визитная карточка и собственный коммерчески успешный проект —{" "}
          <strong>WOW Park</strong> - эдьютейнмент парк развлечений для детей и
          взрослых в столице Таиланда!
        </p>
        <div>
          <Image
            src="/images/wow_park/zont.svg"
            width={82}
            height={82}
            alt=""
          />
        </div>
      </article>
      <article className={styles.article}>
        <div>
          <Image
            src="/images/wow_park/bubbles.svg"
            width={82}
            height={82}
            alt=""
          />
        </div>
        <p>
          WOW park - это место, где посетители увидят, потрогают экспонаты и
          испытают новые эмоции! WOW park — это коллекция самых крутых опытов и
          экспериментов, собранная в одном специально спроектированном для этого
          месте!
        </p>
      </article>
      <article className={styles.article}>
        <p>
          Мы разработали концепцию и брендинг, подготовили техническую
          документацию, изготовили экспонаты, оформили интерьер, обучили и
          наняли персонал.
        </p>
        <div>
          <Image
            src="/images/wow_park/puzzle.svg"
            width={82}
            height={82}
            alt=""
          />
        </div>
      </article>
    </div>
    <WowLine direction="left" />
  </div>
);

export default WowParkPage;
