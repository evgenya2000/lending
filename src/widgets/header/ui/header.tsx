"use client"
import { useCart } from "@/features/cart/useCart";
import Link from "next/link";
import styles from "./header.module.css"
import { Icon } from "@/shared/icons/icon";
import { ShoppingBasket } from "@/shared/icons/shopping-basket";
export const Header = () => {
    const { totalQuantity } = useCart();
    return (
        <header className={styles["header"]}>
            <Link href="/" className="main"><Icon/></Link>
            <nav>
                <Link href="/cart" className={styles["basket"]} title={"Перейти в корзину"}><ShoppingBasket/><span className={`${styles["totalQuantity"]} ${totalQuantity !== 0 ? styles.red : ""}`}>{totalQuantity}</span></Link>
            </nav>
        </header>
    );
}