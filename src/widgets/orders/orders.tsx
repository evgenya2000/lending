"use client";
import { Order } from "@/shared/model/types";
import {
  StyledContainer,
  StyledTitle,
  StyledTable,
  StyledEmpty,
  StyledCopyableTd,
  StyledCopyMessage,
} from "./orders.styles";
import { Button } from "@/shared/ui/button/button";
import { useModal } from "@/features/modal/lib/use-modal";
import { useState } from "react";
import { handleCopy } from "@/shared/lib/helps/handleCopy";

export const Orders = ({ orders }: { orders: Order[] | undefined }) => {
  const              orderDetailsModal = useModal('order-details');
  const [isCopied, setIsCopied] = useState(false);

  if (!orders || orders.length === 0) {
    return <StyledEmpty>У вас пока нет заказов.</StyledEmpty>;
  }

  return (
    <StyledContainer>
      <StyledTitle>Все заказы</StyledTitle>
      <StyledCopyMessage $visible={isCopied}>Текст скопирован</StyledCopyMessage>
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
              <td>{order.status === "PENDING" ? "Ожидает" : order.status === "ASSEMBLED" ? "Собран" : "-"}</td>
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
                <Button
                  type="button"
                  onClick={() => orderDetailsModal.open(order)}
                >
                  Просмотр деталей заказа
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
};