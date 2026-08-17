import { Input } from '@/shared/ui/input/input';
import { useOrderForm } from '../model/use-order-form';
import { Button } from '@/shared/ui/button/button';
import styles from './order-form.module.css';

interface OrderFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const OrderForm = ({ onSuccess, onCancel }: OrderFormProps) => {
  const { register, handleSubmit, errors, isSubmitting, watch } = useOrderForm({ onSuccess });

  const deliveryMethod = watch('deliveryMethod');
  const isPost = deliveryMethod === 'post';

  return (
  <div className={styles['wrapper-order-form']}>
    <h3>Оформление заказа</h3>
    <p>Пожалуйста, заполните форму</p>
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      {/* ФИО */}
      <div className={styles.field}>
        <label htmlFor="fullName" className={styles.label}>ФИО</label>
        <Input
          id="fullName"
          className={styles.input}
          {...register('fullName', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
          placeholder="Иванов Иван Иванович"
          aria-invalid={errors.fullName ? 'true' : 'false'}
        />
        {errors.fullName && (
          <span className={styles.error}>{errors.fullName.message}</span>
        )}
      </div>

      {/* Телефон */}
      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>Номер телефона</label>
        <Input
          id="phone"
          className={styles.input}
          {...register('phone', {
            required: 'Телефон обязателен',
            pattern: {
              value: /^\+?[0-9]{10,15}$/,
              message: 'Введите корректный телефон (10–15 цифр, допускается +)',
            },
          })}
          placeholder="+7 900 123-45-67"
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </div>

      {/* Способ доставки */}
      <div className={styles.field}>
        <label className={styles.label}>Способ доставки</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="courier"
              {...register('deliveryMethod', {
                required: 'Выберите способ доставки',
              })}
            />
            Курьер
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="post"
              {...register('deliveryMethod')}
            />
            Почта
          </label>
        </div>
        {errors.deliveryMethod && (
          <span className={styles.error}>{errors.deliveryMethod.message}</span>
        )}
      </div>

      {/* Адрес доставки */}
      <div className={styles.field}>
        <label htmlFor="deliveryAddress" className={styles.label}>Адрес доставки</label>
        <Input
          id="deliveryAddress"
          className={styles.input}
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
          <span className={styles.error}>{errors.deliveryAddress.message}</span>
        )}
      </div>

      {/* Почтовый индекс (только при доставке почтой) */}
      {isPost && (
        <div className={styles.field}>
          <label htmlFor="postalCode" className={styles.label}>Почтовый индекс</label>
          <Input
            id="postalCode"
            className={styles.input}
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
            <span className={styles.error}>{errors.postalCode.message}</span>
          )}
        </div>
      )}

      {/* Способ оплаты */}
      <div className={styles.field}>
        <label className={styles.label}>Способ оплаты</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="card"
              {...register('paymentMethod', {
                required: 'Выберите способ оплаты',
              })}
            />
            Карта
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="sbp"
              {...register('paymentMethod')}
            />
            СБП
          </label>
        </div>
        {errors.paymentMethod && (
          <span className={styles.error}>{errors.paymentMethod.message}</span>
        )}
      </div>

      {/* Кнопки */}
      <div className={styles.buttons}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Оформление...' : 'Заказать'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
        )}
      </div>
    </form>
  </div>
  );
};