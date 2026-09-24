"use client";
import { Order } from "@/shared/model/types";
import {
  StyledContainer,
  StyledTitle,
  StyledTable,
  StyledEmpty,
  StyledCopyableTd,
  StyledCopyMessage,
  StyledWrapperButton,
} from "./orders.styles";
import { Button } from "@/shared/ui/button/button";
import { useModal } from "@/features/modal/lib/use-modal";
import { useState } from "react";
import { handleCopy } from "@/shared/lib/helps/handleCopy";
import { getOrderStatusLabel } from "@/shared/lib/helps/get-order-status-label";
import { useMediaQuery } from "@/shared/lib/hooks/use-media-query";
import { getBreakpoint } from "@/shared/lib/styles";
import { OrdersCards } from "./orders-cards";

const CARD_VIEW_QUERY = `(max-width: ${getBreakpoint("xxl") - 1}px)`;

export const Orders = ({ orders }: { orders: Order[] | undefined }) => {
  const orderDetailsModal = useModal('order-details');
  const assembleOrderModal = useModal('assemble-order');
  const deliverOrderModal = useModal('deliver-order');

  const [isCopied, setIsCopied] = useState(false);
  const isCardView = useMediaQuery(CARD_VIEW_QUERY);


  if (!orders || orders.length === 0) {
    return <StyledEmpty>У вас пока нет заказов.</StyledEmpty>;
  }

  return (
    <StyledContainer>
      <StyledTitle>Все заказы</StyledTitle>
      <StyledCopyMessage $visible={isCopied}>Текст скопирован</StyledCopyMessage>
      {isCardView ? (
        <OrdersCards orders={orders} setIsCopied={setIsCopied} />
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th>Статус</th>
              <th>№</th>
              <th>Дата создания</th>
              <th>Дата выдачи</th>
              <th>Адрес доставки</th>
              <th>Способ доставки</th>
              <th>Имя заказчика</th>
              <th>Номер телефона</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{getOrderStatusLabel(order.status)}</td>
                <td>{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleString("ru-RU")}</td>
                <td>
                  {order.issuedAt
                    ? new Date(order.issuedAt).toLocaleString("ru-RU")
                    : "—"}
                </td>
                <StyledCopyableTd
                  onClick={(e) => handleCopy(e, order.deliveryAddress || '—', setIsCopied)}
                  title="Нажмите, чтобы скопировать">{order.deliveryAddress || "-"}</StyledCopyableTd>
                <td>{order.deliveryMethod === "courier" ? "Курьер" : "Почта"}</td>
                <StyledCopyableTd
                  onClick={(e) => handleCopy(e, order.fullName, setIsCopied)}
                  title="Нажмите, чтобы скопировать">{order.fullName}</StyledCopyableTd>
                <StyledCopyableTd
                  onClick={(e) => handleCopy(e, order.phone, setIsCopied)}
                  title="Нажмите, чтобы скопировать">{order.phone}</StyledCopyableTd>
                <td>
                  <StyledWrapperButton>
                    <Button
                      type="button"
                      onClick={() => orderDetailsModal.open(order)}
                    >
                      Просмотр деталей заказа
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
                  </StyledWrapperButton>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}

    </StyledContainer>
  );
};