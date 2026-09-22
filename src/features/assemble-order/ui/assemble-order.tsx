'use client';

import { useAssembleOrderMutation } from '@/shared/api/cards-api';
import { Order } from '@/shared/model/types';
import { Button } from '@/shared/ui/button/button';
import { OrderDetails } from '@/features/order-details/ui/order-details';
import { StyledActions, StyledContainer } from './assemble-order.styles';

interface AssembleOrderProps {
  order: Order;
  onSuccess: () => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

export const AssembleOrder = ({ order, onSuccess, onCancel, onError }: AssembleOrderProps) => {
  const [assembleOrder, { isLoading }] = useAssembleOrderMutation();

  const handleConfirm = async () => {
    try {
      await assembleOrder(order.id).unwrap();
      onSuccess();
    } catch {
      onError('Не удалось собрать заказ. Попробуйте позже.');
    }
  };

  return (
    <StyledContainer>
      <OrderDetails order={order} />
      <StyledActions>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Отмена
        </Button>
        <Button type="button" onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? 'Сборка…' : 'Подтвердить сборку заказа'}
        </Button>
      </StyledActions>
    </StyledContainer>
  );
};
