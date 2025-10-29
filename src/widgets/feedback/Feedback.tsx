import Image from "next/image";
import styles from "./feedback.module.scss";

const Feedback = () => (
  <div className={styles.wrapper} id="feedback">
    <Image src="/images/feedback.png" alt="" width={800} height={656} />
    <div className={styles.content}>
      <h1>Оставьте заявку уже сейчас и мы свяжемся с вами</h1>
      <form>
        <div className={styles.formWrapper}>
          <input placeholder="Имя" />
          <input type="email" placeholder="Email" />
          <input placeholder="Телефон" type="tel" />
          <input placeholder="Ваш вопрос" />
        </div>
        <div className={styles.submitWrapper}>
          <div className={styles.fileContainer}>
            <div className={styles.fileInput}>
              <input id="file" type="file" placeholder="Добавить файл" />
              <label htmlFor="file">Добавить файл</label>
            </div>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">
              Отправляя форму, вы даете согласие на обработку персональных
              данных
            </label>
          </div>
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
  </div>
);

export default Feedback;
