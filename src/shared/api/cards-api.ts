import { Card, CreateOrderDto, Order } from '@/shared/model/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchCards(): Promise<Card[]> {
  const res = await fetch(`${API_URL}/cards`);
  if (!res.ok) throw new Error('Не удалось загрузить карточки');
  return res.json();
}

export async function createOrder(data: CreateOrderDto): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Не удалось оформить заказ');
  return res.json();
}