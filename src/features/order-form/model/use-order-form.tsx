import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '@/shared/api/cards-api';
import { selectCartItems } from '@/entities/cart/model/cart-slice';
import { CreateOrderDto } from '@/shared/model/types';
import { formatPhone } from '../helps/formatPhone';

export interface OrderFormValues {
  fullName: string;
  phone: string;
  deliveryMethod: 'courier' | 'post';
  deliveryAddress: string;
  postalCode?: string;
  paymentMethod: 'card' | 'sbp';
}

interface UseOrderFormOptions {
  onSuccess?: () => void;
}

export const useOrderForm = ({ onSuccess }: UseOrderFormOptions = {}) => {
  const {
    register,
    handleSubmit: originalHandleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    defaultValues: {
      fullName: '',
      phone: '',
      deliveryMethod: 'courier',
      deliveryAddress: '',
      postalCode: '',
      paymentMethod: 'card',
    },
    shouldUnregister: true,
  });

  const deliveryMethod = useWatch({ control, name: 'deliveryMethod' });
  const isPost = deliveryMethod === 'post';

  const [createOrder, { isLoading, error: submitError }] = useCreateOrderMutation();
  const cartItems = useSelector(selectCartItems);

  const phoneRegister = register('phone', {
    required: 'Телефон обязателен',
    validate: (value) => {
      const digits = value.replace(/\D/g, '');
      if (digits.length === 11 && digits.startsWith('7')) {
        return true;
      }
      if (digits.length === 10) {
        return true;
      }
      return 'Введите корректный номер телефона (например, +7 900 123-45-67)';
    },
  });

  const phoneFieldProps = {
    ...phoneRegister,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhone(e.target.value);
      e.target.value = formatted;
      phoneRegister.onChange(e);
    },
  };

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    try {
      const items = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const cleanedPhone = data.phone.replace(/\D/g, '');

      const orderData: CreateOrderDto = {
        fullName: data.fullName,
        phone: cleanedPhone,
        deliveryMethod: data.deliveryMethod,
        deliveryAddress: data.deliveryAddress,
        ...(data.deliveryMethod === 'post' && { postalCode: data.postalCode }),
        paymentMethod: data.paymentMethod,
        items,
      };

      await createOrder(orderData).unwrap();
      reset();
      onSuccess?.();
    } catch (err) {
      console.error('Ошибка создания заказа:', err);
    }
  };

  const handleSubmit = originalHandleSubmit(onSubmit);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isLoading,
    submitError,
    isPost,
    control,
    phoneFieldProps,
  };
};