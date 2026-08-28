"use client";
import { Order } from "@/shared/model/types";

export const ContainerOrders = ({ orders }: { orders: Order[] | undefined}) => {
  if (!orders || orders.length === 0) {
    return <div>У вас пока нет заказов.</div>;
  }

  return (
    <>
    <h3>Текущие заказы</h3>
      {console.log(orders)}
    </>
  );
};