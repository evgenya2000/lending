import { Order } from '@/shared/model/types';

const STATUS_LABELS: Partial<Record<Order['status'], string>> = {
  PENDING: 'Ожидает',
  ASSEMBLED: 'Собран',
  DELIVERING: 'Доставляется',
};

export const getOrderStatusLabel = (status: Order['status']): string =>
  STATUS_LABELS[status] ?? '-';
