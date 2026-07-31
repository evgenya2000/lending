"use client"
import { useCart } from "@/features/cart/useCart";
import Link from "next/link";
import styles from "./header.module.css"
import { Icon } from "@/shared/icons/icon";
export const Header = () => {
    const { totalQuantity } = useCart();
    return (
        <header className={styles["header"]}>
            <Icon/>
            <nav>
                <Link href="/">Главная</Link>
                <Link href="/cart">Корзина ({totalQuantity})</Link>
            </nav>
        </header>
    );
}