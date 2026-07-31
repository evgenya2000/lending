"use client";
import React from "react";
import styles from "./container-lending.module.css";
import { MacaronScene } from "@/widgets/macaron-scene/ui/macaron-scene";
import { Card } from "@/shared/model/types";
import { ConteinerCanvas } from "@/shared/ui/conteiner-canvas";
import { useRefsArray } from "@/shared/lib/hooks/use-refs-array";
import { useCart } from "@/features/cart/useCart";
export const ContainerLending = ({ cards }: { cards: Card[] }) => {
  const { addItem, getQuantityInCart, increment, decrement } = useCart();
  const refsArray: React.RefObject<HTMLElement>[] = useRefsArray(cards?.length ?? 0);

  if (!cards?.length) return <p>Ничего не найдено</p>;

  return (
    <>
      <ConteinerCanvas
      >
        {cards.map((card: Card, index: number) => (
          <MacaronScene key={card.id} config={card.macaronConfig} id={String(card.id)} track={refsArray[index]} />
        ))}
      </ConteinerCanvas>

      <div className={styles.grid}>
        {cards.map((card: Card, index: number) => {
          const quantity = getQuantityInCart(card.id);
          return (

            <div key={card.id} className={styles["card-wrapper"]}>
              <div
                className={styles["wrapper-3d"]}
                ref={refsArray[index] as React.RefObject<HTMLDivElement>}
                style={{ position: "relative" }}
              />
              <div className={styles["card-wrapper-text"]}>
                <h3>{card.title}</h3>
                <p className={styles["card-wrapper-text-description"]}>{card.description}</p>
                <p className={styles["card-wrapper-text-price"]}>{card.price} ₽</p>
                {
                  !!quantity &&
                  <div className={styles["card-wrapper-text-quantity"]}>
                    { <button onClick={() => decrement(card.id)}>-</button>}<p>{quantity}</p><button onClick={() => increment(card.id)}>+</button>
                  </div>
                }
                {!quantity && <button onClick={() => addItem(card)} className={styles["card-wrapper-text-btn"]}>
                  Добавить в корзину
                </button>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
};