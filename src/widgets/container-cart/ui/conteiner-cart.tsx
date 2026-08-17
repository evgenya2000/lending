"use client";

import { useRefsMap } from '@/shared/lib/hooks/use-refs-map';
import { Card, CartItem } from '@/shared/model/types';
import styles from "./conteiner-cart.module.css"
import { ConteinerCanvas } from '@/shared/ui/conteiner-canvas';
import { MacaronScene } from '@/widgets/macaron-scene/ui/macaron-scene';
import { useCart } from '@/features/cart/useCart';
import { Delete } from '@/shared/icons/delete';
import { useModal } from '@/features/modal/lib/use-modal';

export const ContainerCart = () => {
    const { items, totalPrice, increment, decrement, removeItem, clearCart, totalQuantity } = useCart();
    const orderModal = useModal('order');
    const confirmModal = useModal('confirm');
    const infoModal = useModal('info');

    const keys = items.map(c => String(c.id));
    const refsMap = useRefsMap<HTMLDivElement>(keys);

    /* const handleClearCart = () => {
        confirmModal.open();
    }; */

    const handleCheckout = () => {
        if (totalQuantity < 6) {
            infoModal.open();
        } else {
            orderModal.open();
        }
    };

    if (items.length === 0) {
        return (
            <div className={styles["conteiner"]}>
                <h3>Корзина пуста</h3>
                <p>Добавьте товары из каталога</p>
            </div>
        );
    }

    return (
        <div className={styles["conteiner"]}>
            <ConteinerCanvas>
                {items.map((item: Card) => (
                    <MacaronScene key={item.id} config={item.macaronConfig} id={String(item.id)} track={refsMap.get(String(item.id))!} />
                ))}
            </ConteinerCanvas>
            <h3>Ваша корзина</h3>
            <ul >
                {items.map((item: CartItem) => (
                    <li key={item.id} >
                        <div
                            className={styles["wrapper-3d"]}
                            ref={refsMap.get(String(item.id))!}
                            style={{ position: "relative" }}
                        />
                        <div className={styles["wrapper-text"]}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>Цена: {item.price} ₽</p>
                        </div>
                        <div className={styles["wrapper-button"]}>
                            <button onClick={() => decrement(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increment(item.id)}>+</button>
                            <button className={styles["delete"]} onClick={() => removeItem(item.id)}><Delete /></button>
                        </div>
                        <div className={styles["price"]}>
                            {item.price * item.quantity} руб.
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles["wrapper-total"]}>
                <h3>Итого: {totalPrice} руб.</h3>
                <p>Внимание: заказы принимаются от 6 единиц товара!</p>
                <button onClick={handleCheckout} disabled={totalQuantity < 6}>
                    Оформить заказ
                </button>
                <button onClick={clearCart}>
                    Очистить корзину
                </button>
            </div>
        </div>
    );
};