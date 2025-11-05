"use client";

import axios from "axios";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import styles from "./feedback.module.scss";
import { useContacts } from "@/features/contacts/hooks/use-contacts";

const Feedback = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { contacts, loadingContacts, errorContacts } = useContacts();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agree) {
      setMessage("Необходимо согласие на обработку персональных данных");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("name", name);
    formData.append("email", email);
    // Объединяем телефон и вопрос в одно поле text, как в примере
    formData.append("text", `Телефон: ${phone}\nВопрос: ${question}`);

    if (!loadingContacts) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/message/${contacts.email}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        setMessage("Заявка отправлена успешно");

        // Очистка формы после успешной отправки
        setName("");
        setEmail("");
        setPhone("");
        setQuestion("");
        setFile(null);
        setAgree(false);

        // Сброс file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        setMessage("Произошла ошибка при отправке сообщения.");
        console.error("Ошибка отправки формы:", error);
      }
    }
  };

  return (
    <div className={styles.wrapper} id="feedback">
      <div className={styles.imageWrapper}>
        <Image
          src="/images/feedback.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.content}>
        <h1>Оставьте заявку уже сейчас и мы свяжемся с вами</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formWrapper}>
            <input
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Телефон"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              placeholder="Ваш вопрос"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className={styles.submitWrapper}>
            <div className={styles.fileContainer}>
              <div className={styles.fileInput}>
                <input
                  id="file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <label htmlFor="file">
                  {file ? file.name : "Добавить файл"}
                </label>
              </div>
            </div>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="checkbox">
                Отправляя форму, вы даете согласие на обработку персональных
                данных
              </label>
            </div>
            <button type="submit" disabled={loadingContacts}>
              Отправить
            </button>
          </div>

          {/* Сообщение о статусе отправки */}
          {message && (
            <div
              className={styles.message}
              style={{
                color:
                  message === "Заявка отправлена успешно"
                    ? "#73c886"
                    : "#ea8282",
                marginTop: "15px",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Feedback;
