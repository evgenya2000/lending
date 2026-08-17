"use client";

import { useRefsMap } from '@/shared/lib/hooks/use-refs-map';
import { Card, CartItem } from '@/shared/model/types';
import styles from "./conteiner-cart.module.css"
import { ConteinerCanvas } from '@/shared/ui/conteiner-canvas';
import { MacaronScene } from '@/widgets/macaron-scene/ui/macaron-scene';
import { useCart } from '@/features/cart/useCart';
import { Delete } from '@/shared/icons/delete';
import { useModal } from '@/features/modal/lib/use-modal';
import { Button } from '@/shared/ui/button/button';

export const ContainerCart = () => {
    const { items, totalPrice, increment, decrement, removeItem, clearCart, totalQuantity } = useCart();
    const orderModal = useModal('order');
    /* const confirmModal = useModal('confirm');
    const infoModal = useModal('info'); */

    const keys = items.map(c => String(c.id));
    const refsMap = useRefsMap<HTMLDivElement>(keys);

    /* const handleClearCart = () => {
        confirmModal.open();
    }; */

    const handleCheckout = () => {
        orderModal.open();
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
                            <Button variant="quantity" onClick={() => decrement(item.id)}>
                                -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button variant="quantity" onClick={() => increment(item.id)}>
                                +
                            </Button>
                            <Button variant="delete" onClick={() => removeItem(item.id)}>
                                <Delete />
                            </Button>
                        </div>
                        <div className={styles["price"]}>{item.price * item.quantity} руб.</div>
                    </li>
                ))}
            </ul>
            <div className={styles["wrapper-total"]}>
                <h3>Итого: {totalPrice} руб.</h3>
                <p>Внимание: заказы принимаются от 6 единиц товара!</p>
                <div className={styles["wrapper-total-button"]}>
                    <Button type="button" onClick={handleCheckout} disabled={totalQuantity < 6}>
                        Оформить заказ
                    </Button>
                    <Button type="button" onClick={clearCart} variant="secondary">
                        Очистить корзину
                    </Button>
                </div>
            </div>
        </div>
    );
};