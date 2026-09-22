"use client";
import { useEffect } from "react";
import { MacaronScene } from "@/widgets/macaron-scene/ui/macaron-scene";
import { Card } from "@/shared/model/types";
import { ContainerCanvas } from '@/shared/ui/container-canvas/container-canvas';
import { useRefsMap } from "@/shared/lib/hooks/use-refs-map";
import { useVisibilityTracker } from "@/shared/lib/hooks/use-visibility-tracker";
import { useCart } from "@/features/cart/useCart";
import { Button } from "@/shared/ui/button/button";
import {
  StyledGrid,
  StyledCardWrapper,
  StyledCardWrapperText,
  StyledCardDescription,
  StyledCardPrice,
  StyledCardQuantity,
  StyledWrapper3d,
  StyledText,
} from "./lending.styles";


export const Lending = ({ cards }: { cards: Card[] }) => {
  const { addItem, getQuantityInCart, increment, decrement } = useCart();
  const keys = cards.map(c => String(c.id));
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

  if (!cards?.length) return <StyledText>Ничего не найдено</StyledText>;

  return (
    <>
      <ContainerCanvas>
        {cards.map((card: Card) => {
          const key = String(card.id);
          return (
            <MacaronScene
              key={key}
              config={card.macaronConfig}
              id={key}
              track={refsMap.get(key)!}
              visible={isVisible(key)}
            />
          );
        })}
      </ContainerCanvas>

      <StyledGrid>
        {cards.map((card: Card) => {
          const key = String(card.id);
          const quantity = getQuantityInCart(card.id);
          return (
            <StyledCardWrapper key={key}>
              <StyledWrapper3d ref={refsMap.get(key)!} />
              <StyledCardWrapperText>
                <h3>{card.title}</h3>
                <StyledCardDescription>{card.description}</StyledCardDescription>
                <StyledCardPrice>{card.price} ₽</StyledCardPrice>
                {!!quantity && (
                  <StyledCardQuantity>
                    <Button variant="quantity" fontWeight={'regular'} onClick={() => decrement(card.id)}>
                      -
                    </Button>
                    <p>{quantity}</p>
                    <Button variant="quantity" fontWeight={'regular'} onClick={() => increment(card.id)}>
                      +
                    </Button>
                  </StyledCardQuantity>
                )}
                {!quantity && (
                  <Button fullWidth fontWeight={'regular'} onClick={() => addItem(card)}>
                    Добавить в корзину
                  </Button>
                )}
              </StyledCardWrapperText>
            </StyledCardWrapper>
          );
        })}
      </StyledGrid>
    </>
  );
};
