import { useState } from "react";
import { Telegram } from "@/shared/icons/tg";
import styles from "./footer.module.css";
import { Vk } from "@/shared/icons/vk";
import { Mail } from "@/shared/icons/mail";
import { Git } from "@/shared/icons/git";

const EMAIL = "evgenya@yandex.ru";

export const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  return (
    <footer className={styles["footer"]}>
      <p>Дизайн и разработка: Лукьянова Евгения</p>
      <div className={styles["wrapper-icons"]}>
        <span className={`${styles["copy-message"]} ${isCopied ? styles["visible"] : ""}`}>
          {"Почта скопирована"}
        </span>
        <a href="https://t.me/@evgenia_veg"><Telegram /></a>
        <a href="https://vk.ru/id61396007"><Vk /></a>
        <a href={`mailto:${EMAIL}`} onClick={handleCopyEmail} title="Кликните, чтобы скопировать почту">
          <Mail />
        </a>
        <a href="https://github.com/evgenya2000"><Git/></a>
      </div>
      
      <p>Сделано с позитивным настроением</p>
    </footer>
  );
};