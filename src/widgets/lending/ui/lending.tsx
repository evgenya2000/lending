"use client";
import styles from "./lending.module.css";
import { MacaronScene } from "@/widgets/macaron-scene/ui/macaron-scene";
import { Card } from "@/shared/model/types";
import { ConteinerCanvas } from '@/shared/ui/conteiner-canvas/conteiner-canvas';
import { useRefsMap } from "@/shared/lib/hooks/use-refs-map";
import { useCart } from "@/features/cart/useCart";
import { Button } from "@/shared/ui/button/button";
export const Lending = ({ cards }: { cards: Card[] }) => {
  const { addItem, getQuantityInCart, increment, decrement } = useCart();
  const keys = cards.map(c => String(c.id));
  const refsMap = useRefsMap<HTMLDivElement>(keys);

  if (!cards?.length) return <h3 className={styles["text"]}>Ничего не найдено</h3>;

  return (
    <>
      <ConteinerCanvas
      >
        {cards.map((card: Card) => (
          <MacaronScene key={card.id} config={card.macaronConfig} id={String(card.id)} track={refsMap.get(String(card.id))!} />
        ))}
      </ConteinerCanvas>

      <div className={styles.grid}>
        {cards.map((card: Card) => {
          const quantity = getQuantityInCart(card.id);
          return (
            <div key={card.id} className={styles["card-wrapper"]}>
              <div
                className={styles["wrapper-3d"]}
                ref={refsMap.get(String(card.id))!}
                style={{ position: "relative" }}
              />
               <div className={styles["card-wrapper-text"]}>
                <h3>{card.title}</h3>
                <p className={styles["card-wrapper-text-description"]}>{card.description}</p>
                <p className={styles["card-wrapper-text-price"]}>{card.price} ₽</p>
                {!!quantity && (
                  <div className={styles["card-wrapper-text-quantity"]}>
                    <Button variant="quantity" onClick={() => decrement(card.id)}>
                      -
                    </Button>
                    <p>{quantity}</p>
                    <Button variant="quantity" onClick={() => increment(card.id)}>
                      +
                    </Button>
                  </div>
                )}
                {!quantity && (
                  <Button fullWidth onClick={() => addItem(card)}>
                    Добавить в корзину
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
};