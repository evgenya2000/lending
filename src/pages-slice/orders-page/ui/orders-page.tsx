'use client';

import { useGetOrdersQuery } from '@/shared/api/cards-api';
import { ContainerMain } from '@/widgets/main/ui/conteiner-main';
import { Orders } from '@/widgets/orders/orders';

export default function OrdersPage() {
  const { data: orders, isLoading, isError, error } = useGetOrdersQuery();

  if (isLoading) {
    return <ContainerMain
      allWidth={<h3 style={{padding: "40px 30px 20px;"}}>Загрузка заказов...</h3>}
      />
  }

  if (isError) {
    return (
      <ContainerMain
      allWidth={<h3 style={{padding: "40px 30px 20px;"}}>
        Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
      </h3>}
      />
    );
  }

  return (
    <ContainerMain
      allWidth={<Orders orders={orders}/>}
    />
  );
}