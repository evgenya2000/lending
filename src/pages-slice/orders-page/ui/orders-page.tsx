'use client';

import { useGetOrdersQuery } from '@/shared/api/cards-api';
import { ContainerOrders } from '@/widgets/container-orders/container-orders';

export default function OrdersPage() {
  const { data: orders, isLoading, isError, error } = useGetOrdersQuery();

  if (isLoading) {
    return <div >Загрузка заказов...</div>;
  }

  if (isError) {
    return (
      <div >
        Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
      </div>
    );
  }

  return (
    <div>
      <ContainerOrders orders={orders}/>
    </div>
  );
}