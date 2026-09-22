"use client";

import { useEffect } from 'react';
import { useRefsMap } from '@/shared/lib/hooks/use-refs-map';
import { useVisibilityTracker } from '@/shared/lib/hooks/use-visibility-tracker';
import { Card, CartItem } from '@/shared/model/types';
import { ContainerCanvas } from '@/shared/ui/container-canvas/container-canvas';
import { MacaronScene } from '@/widgets/macaron-scene/ui/macaron-scene';
import { useCart } from '@/features/cart/useCart';
import { Delete } from '@/shared/icons/delete';
import { useModal } from '@/features/modal/lib/use-modal';
import { Button } from '@/shared/ui/button/button';
import { StyledContainer, StyledPrice, StyledWrapper3d, StyledWrapperButton, StyledWrapperText, StyledWrapperTotal, StyledWrapperTotalButton } from './cart.styles';


export const Cart = () => {
    const { items, totalPrice, increment, decrement, removeItem, clearCart, totalQuantity } = useCart();
    const orderModal = useModal('order');

    const keys = items.map(c => String(c.id));
    const refsMap = useRefsMap<HTMLDivElement>(keys);
    const { observe, isVisible } = useVisibilityTracker();

    useEffect(() => {
        keys.forEach((key) => {
            const el = refsMap.get(key)?.current;
            if (el) {
                observe(el, key);
            }
        });
    }, [keys, refsMap, observe]);

    const handleCheckout = () => {
        orderModal.open();
    };

    if (items.length === 0) {
        return (
            <StyledContainer>
                <h3>Корзина пуста</h3>
                <p>Добавьте товары из каталога</p>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <ContainerCanvas>
                {items.map((item: Card) => {
                    const key = String(item.id);
                    return (
                        <MacaronScene
                            key={key}
                            config={item.macaronConfig}
                            id={key}
                            track={refsMap.get(key)!}
                            visible={isVisible(key)}
                        />
                    );
                })}
            </ContainerCanvas>
            <h3>Ваша корзина</h3>
            <ul >
                {items.map((item: CartItem) => (
                    <li key={item.id} >
                        <StyledWrapper3d
                            ref={refsMap.get(String(item.id))!}
                            style={{ position: "relative" }}
                        />
                        <StyledWrapperText>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>Цена: {item.price} ₽</p>
                        </StyledWrapperText>
                        <StyledWrapperButton>
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
                        </StyledWrapperButton>
                        <StyledPrice>{item.price * item.quantity} руб.</StyledPrice>
                    </li>
                ))}
            </ul>
            <StyledWrapperTotal>
                <h3>Итого: {totalPrice} руб.</h3>
                <p>Внимание: заказы принимаются от 6 единиц товара!</p>
                <StyledWrapperTotalButton>
                    <Button type="button" onClick={handleCheckout} disabled={totalQuantity < 6}>
                        Оформить заказ
                    </Button>
                    <Button type="button" onClick={clearCart} variant="secondary">
                        Очистить корзину
                    </Button>
                </StyledWrapperTotalButton>
            </StyledWrapperTotal>
        </StyledContainer>
    );
};