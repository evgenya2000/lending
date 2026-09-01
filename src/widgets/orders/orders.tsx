"use client";
import { Order } from "@/shared/model/types";
import styles from "./orders.module.css";
import { Button } from "@/shared/ui/button/button";
import { useModal } from "@/features/modal/lib/use-modal";

export const Orders = ({ orders }: { orders: Order[] | undefined }) => {
  const orderDetailsModal = useModal('order-details');

  if (!orders || orders.length === 0) {
    return <div className={styles.empty}>У вас пока нет заказов.</div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Все заказы</h3>
      <table className={styles.table}>
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
              <td>{order.deliveryAddress || "—"}</td>
              <td>{order.deliveryMethod === "courier" ? "Курьер" : "Почта"}</td>
              <td>{order.fullName}</td>
              <td>{order.phone}</td>
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
      </table>
    </div>
  );
};