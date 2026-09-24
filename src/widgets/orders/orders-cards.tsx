"use client";

import { Order } from "@/shared/model/types";
import { Button } from "@/shared/ui/button/button";
import { useModal } from "@/features/modal/lib/use-modal";
import { handleCopy } from "@/shared/lib/helps/handleCopy";
import { getOrderStatusLabel } from "@/shared/lib/helps/get-order-status-label";
import {
  StyledCardsList,
  StyledCard,
  StyledCardRow,
  StyledCardLabel,
  StyledCardValue,
  StyledCardCopyable,
  StyledCardActions,
} from "./orders-cards.styles";

interface OrdersCardsProps {
  orders: Order[];
  setIsCopied: (value: boolean) => void;
}



export const OrdersCards = ({ orders, setIsCopied }: OrdersCardsProps) => {
  const orderDetailsModal = useModal("order-details");
  const assembleOrderModal = useModal("assemble-order");
  const deliverOrderModal = useModal("deliver-order");

  return (
    <StyledCardsList>
      {orders.map((order) => (
        <StyledCard key={order.id}>
          <StyledCardRow>
            <StyledCardLabel>Статус</StyledCardLabel>
            <StyledCardValue>{getOrderStatusLabel(order.status)}</StyledCardValue>
          </StyledCardRow>

          <StyledCardRow>
            <StyledCardLabel>№</StyledCardLabel>
            <StyledCardValue>{order.id}</StyledCardValue>
          </StyledCardRow>

          <StyledCardRow>
            <StyledCardLabel>Дата создания</StyledCardLabel>
            <StyledCardValue>
              {new Date(order.createdAt).toLocaleString("ru-RU")}
            </StyledCardValue>
          </StyledCardRow>

          <StyledCardRow>
            <StyledCardLabel>Дата выдачи</StyledCardLabel>
            <StyledCardValue>
              {order.issuedAt
                ? new Date(order.issuedAt).toLocaleString("ru-RU")
                : "—"}
            </StyledCardValue>
          </StyledCardRow>

          <StyledCardRow>
            <StyledCardLabel>Адрес доставки</StyledCardLabel>
            <StyledCardCopyable
              onClick={(e) =>
                handleCopy(e, order.deliveryAddress || "—", setIsCopied)
              }
              title="Нажмите, чтобы скопировать"
            >
              {order.deliveryAddress || "-"}
            </StyledCardCopyable>
          </StyledCardRow>

          <StyledCardRow>
            <StyledCardLabel>Способ доставки</StyledCardLabel>
            <StyledCardValue>
              {order.deliveryMethod === "courier" ? "Курьер" : "Почта"}
            </StyledCardValue>
          </StyledCardRow>

          <StyledCardRow>
            <StyledCardLabel>Имя заказчика</StyledCardLabel>
            <StyledCardCopyable
              onClick={(e) => handleCopy(e, order.fullName, setIsCopied)}
              title="Нажмите, чтобы скопировать"
            >
              {order.fullName}
            </StyledCardCopyable>
          </StyledCardRow>

          <StyledCardRow>
            <StyledCardLabel>Номер телефона</StyledCardLabel>
            <StyledCardCopyable
              onClick={(e) => handleCopy(e, order.phone, setIsCopied)}
              title="Нажмите, чтобы скопировать"
            >
              {order.phone}
            </StyledCardCopyable>
          </StyledCardRow>

          <StyledCardActions>
            <Button
              type="button"
              onClick={() => orderDetailsModal.open(order)}
            >
              Посмотреть детали заказа
            </Button>
            {order.status === "PENDING" && (
              <Button
                type="button"
                onClick={() => assembleOrderModal.open(order)}
              >
                Собрать заказ
              </Button>
            )}
            {order.status === "ASSEMBLED" && (
              <Button
                type="button"
                onClick={() => deliverOrderModal.open(order)}
              >
                Передать заказ курьеру
              </Button>
            )}
          </StyledCardActions>
        </StyledCard>
      ))}
    </StyledCardsList>
  );
};
