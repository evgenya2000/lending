"use client";

import { useRefsMap } from '@/shared/lib/hooks/use-refs-map';
import { Card, CartItem } from '@/shared/model/types';
import styles from "./conteiner-cart.module.css"
import { ConteinerCanvas } from '@/shared/ui/conteiner-canvas';
import { MacaronScene } from '@/widgets/macaron-scene/ui/macaron-scene';
import { useCart } from '@/features/cart/useCart';

export const ContainerCart = () => {
    const { items, totalPrice, increment, decrement, removeItem, clearCart, totalQuantity } = useCart();
    const keys = items.map(c => String(c.id));
    const refsMap = useRefsMap<HTMLDivElement>(keys);

    if (items.length === 0) {
        return (
            <div>
                <h2>Корзина пуста</h2>
                <p>Добавьте товары из каталога</p>
            </div>
        );
    }

    return (
        <div >
            <ConteinerCanvas>
                {items.map((item: Card) => (
                    <MacaronScene key={item.id} config={item.macaronConfig} id={String(item.id)} track={refsMap.get(String(item.id))!} />
                ))}
            </ConteinerCanvas>
            <h2>Ваша корзина</h2>
            <ul >
                {items.map((item: CartItem) => (
                    <li key={item.id} >
                        <div
                            className={styles["wrapper-3d"]}
                            ref={refsMap.get(String(item.id))!}
                            style={{ position: "relative" }}
                        />
                        <div >
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>Цена: {item.price} ₽</p>
                        </div>
                        <div >
                            <button onClick={() => decrement(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increment(item.id)}>+</button>
                            <button onClick={() => removeItem(item.id)}>🗑️</button>
                        </div>
                        <div>
                            <strong>{item.price * item.quantity} руб.</strong>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Итого: {totalPrice} руб.</h3>
                <p>Внимание: заказы принимаются от 6 единиц товара!</p>
                <button onClick={() => alert('Заказ успешно оформлен')} disabled={totalQuantity < 6}>
                    Оформить заказ
                </button>
                <button onClick={clearCart}>
                    Очистить корзину
                </button>
            </div>
        </div>
    );
};