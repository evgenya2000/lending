"use client"
import { useCart } from "@/features/cart/useCart";
import Link from "next/link";

export const Header = () => {
    const { totalQuantity } = useCart();
    return (
        <header>
            <h1>Macarons</h1>
            <nav>
                <Link href="/">Главная</Link>
                <Link href="/cart">Корзина ({totalQuantity})</Link>
            </nav>
        </header>
    );
}