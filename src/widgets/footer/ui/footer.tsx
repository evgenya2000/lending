import { Telegram } from "@/shared/icons/tg";
import styles from "./footer.module.css"
import { Vk } from "@/shared/icons/vk";
import { Mail } from "@/shared/icons/mail";
export const Footer = () => {
    return (
        <footer className={styles["footer"]}>
            <p>Дизайн и разработка: Лукьянова Евгения</p>
            <div className={styles["wrapper-icons"]}>
                <a href="https://t.me/@evgenia_veg"><Telegram/></a>
                <a href=""><Vk/></a>
                <a href="evgenya@yandex.ru"><Mail /></a>
            </div>
            <p>Сделано с позитивным настроением</p>
        </footer>
    );
}