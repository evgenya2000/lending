import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCreateOrderMutation } from '@/shared/api/cards-api';
import { selectCartItems } from '@/entities/cart/model/cart-slice';
import { CreateOrderDto } from '@/shared/model/types';

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
    handleSubmit,
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

  // Получаем элементы корзины из Redux
  const cartItems = useSelector(selectCartItems);

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    try {
      const items = cartItems.map((item) => ({
        productId: item.id,   // предполагаем, что id карточки = productId
        quantity: item.quantity,
      }));

      // Собираем полный объект заказа
      const orderData: CreateOrderDto = {
        fullName: data.fullName,
        phone: data.phone,
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

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isLoading,
    submitError,
    isPost,
    control,
  };
};