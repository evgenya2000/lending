import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

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
    formState: { errors, isSubmitting },
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
    shouldUnregister: true,      // автоматически удаляет скрытые поля из состояния
  });

  // Безопасное получение значения deliveryMethod через useWatch
  const deliveryMethod = useWatch({
    control,
    name: 'deliveryMethod',
  });

  const isPost = deliveryMethod === 'post';

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Order data:', data);
    reset();
    onSuccess?.();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isPost,
    control,
  };
};