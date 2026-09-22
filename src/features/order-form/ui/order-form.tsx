import { useOrderForm } from '../model/use-order-form';
import { Button } from '@/shared/ui/button/button';
import {
  StyledButtons,
  StyledError,
  StyledField,
  StyledForm,
  StyledFormInput,
  StyledLabel,
  StyledRadioGroup,
  StyledRadioLabel,
  StyledWrapper,
} from './order-form.styles';

interface OrderFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (text: string) => void;
}

export const OrderForm = ({ onSuccess, onCancel, onError }: OrderFormProps) => {
  const { register, handleSubmit, errors, isSubmitting, isPost, phoneFieldProps } = useOrderForm({ onSuccess, onError });

  return (
    <StyledWrapper>
      <h3>Оформление заказа</h3>
      <p>Пожалуйста, заполните форму</p>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <StyledField>
          <StyledLabel htmlFor="fullName">Имя</StyledLabel>
          <StyledFormInput
            id="fullName"
            {...register('fullName', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
            })}
            aria-invalid={errors.fullName ? 'true' : 'false'}
          />
          {errors.fullName && (
            <StyledError>{errors.fullName.message}</StyledError>
          )}
        </StyledField>

        {/* Телефон */}
        <StyledField>
          <StyledLabel htmlFor="phone">Номер телефона</StyledLabel>
          <StyledFormInput
            id="phone"
            {...phoneFieldProps}
            placeholder="+7 900 123-45-67"
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone && <StyledError>{errors.phone.message}</StyledError>}
        </StyledField>

        {/* Способ доставки */}
        <StyledField>
          <StyledLabel>Способ доставки</StyledLabel>
          <StyledRadioGroup>
            <StyledRadioLabel>
              <input
                type="radio"
                value="courier"
                {...register('deliveryMethod', {
                  required: 'Выберите способ доставки',
                })}
              />
              Курьер
            </StyledRadioLabel>
            <StyledRadioLabel>
              <input
                type="radio"
                value="post"
                {...register('deliveryMethod')}
              />
              Почта
            </StyledRadioLabel>
          </StyledRadioGroup>
          {errors.deliveryMethod && (
            <StyledError>{errors.deliveryMethod.message}</StyledError>
          )}
        </StyledField>

        {/* Адрес доставки */}
        <StyledField>
          <StyledLabel htmlFor="deliveryAddress">Адрес доставки</StyledLabel>
          <StyledFormInput
            id="deliveryAddress"
            {...register('deliveryAddress', {
              required: 'Укажите адрес доставки',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
            })}
            placeholder="Город, улица, дом, квартира"
            aria-invalid={errors.deliveryAddress ? 'true' : 'false'}
          />
          {errors.deliveryAddress && (
            <StyledError>{errors.deliveryAddress.message}</StyledError>
          )}
        </StyledField>

        {/* Почтовый индекс (только при доставке почтой) */}
        {isPost && (
          <StyledField>
            <StyledLabel htmlFor="postalCode">Почтовый индекс</StyledLabel>
            <StyledFormInput
              id="postalCode"
              {...register('postalCode', {
                required: 'Укажите почтовый индекс',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Индекс должен состоять из 6 цифр',
                },
              })}
              placeholder="123456"
              aria-invalid={errors.postalCode ? 'true' : 'false'}
            />
            {errors.postalCode && (
              <StyledError>{errors.postalCode.message}</StyledError>
            )}
          </StyledField>
        )}

        {/* Способ оплаты */}
        <StyledField>
          <StyledLabel>Способ оплаты</StyledLabel>
          <StyledRadioGroup>
            <StyledRadioLabel>
              <input
                type="radio"
                value="card"
                {...register('paymentMethod', {
                  required: 'Выберите способ оплаты',
                })}
              />
              Карта
            </StyledRadioLabel>
            <StyledRadioLabel>
              <input
                type="radio"
                value="sbp"
                {...register('paymentMethod')}
              />
              СБП
            </StyledRadioLabel>
          </StyledRadioGroup>
          {errors.paymentMethod && (
            <StyledError>{errors.paymentMethod.message}</StyledError>
          )}
        </StyledField>

        {/* Кнопки */}
        <StyledButtons>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Оформление...' : 'Заказать'}
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Отмена
            </Button>
          )}
        </StyledButtons>
      </StyledForm>
    </StyledWrapper>
  );
};
