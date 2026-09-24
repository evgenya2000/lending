'use client';

import { useState } from 'react';
import { useDeliverOrderMutation } from '@/shared/api/cards-api';
import { Order } from '@/shared/model/types';
import { Button } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';
import { OrderDetails } from '@/features/order-details/ui/order-details';
import {
  StyledActions,
  StyledContainer,
  StyledError,
  StyledField,
  StyledLabel,
} from './deliver-order.styles';

interface DeliverOrderProps {
  order: Order;
  onSuccess: () => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

export const DeliverOrder = ({ order, onSuccess, onCancel, onError }: DeliverOrderProps) => {
  const [courierName, setCourierName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [deliverOrder, { isLoading }] = useDeliverOrderMutation();

  const handleConfirm = async () => {
    const trimmedName = courierName.trim();

    if (!trimmedName) {
      setValidationError('Укажите имя курьера');
      return;
    }

    setValidationError('');

    try {
      await deliverOrder({ id: order.id, courierName: trimmedName }).unwrap();
      onSuccess();
    } catch {
      onError('Не удалось передать заказ курьеру. Попробуйте позже.');
    }
  };

  return (
    <StyledContainer>
      <OrderDetails order={order} />
      <StyledField>
        <StyledLabel htmlFor="courierName">Имя курьера</StyledLabel>
        <Input
          id="courierName"
          value={courierName}
          onChange={(event) => {
            setCourierName(event.target.value);
            if (validationError) {
              setValidationError('');
            }
          }}
          placeholder="Введите имя курьера"
          disabled={isLoading}
        />
        {validationError && <StyledError>{validationError}</StyledError>}
      </StyledField>
      <StyledActions>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Отмена
        </Button>
        <Button type="button" onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? 'Передача…' : 'Передать заказ курьеру'}
        </Button>
      </StyledActions>
    </StyledContainer>
  );
};
