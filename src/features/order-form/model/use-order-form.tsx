import { useForm, SubmitHandler } from 'react-hook-form';

export interface OrderFormValues {
  fullName: string;
  phone: string;
  deliveryMethod: 'courier' | 'post';
  deliveryAddress: string;
  postalCode?: string; // необязательное, показывается только для почты
  paymentMethod: 'card' | 'sbp';
}

interface UseOrderFormOptions {
  onSuccess?: () => void;
}

export const useOrderForm = ({ onSuccess }: UseOrderFormOptions = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<OrderFormValues>({
    defaultValues: {
      fullName: '',
      phone: '',
      deliveryMethod: 'courier',
      deliveryAddress: '',
      postalCode: '',
      paymentMethod: 'card',
    },
  });

  const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
    // Имитация отправки на сервер
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
    watch,
  };
};