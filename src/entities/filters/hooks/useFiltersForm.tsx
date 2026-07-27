import { useForm } from 'react-hook-form';
import { useRef, useCallback } from 'react';
import { AppliedFilters, FilterFormValues } from '@/helps/interface';

export const useFiltersForm = (onFilterSubmit: (filters: AppliedFilters) => void) => {
  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: { priceFrom: '0', priceTo: '', tastes: [], },
  });

  // Рефы для сохранения значений на момент получения фокуса
  const previousFrom = useRef('0');
  const previousTo = useRef('');

  // Проверка, можно ли оставить введённое значение
  const isValidPriceUpdate = (
    newValue: string,
    field: 'priceFrom' | 'priceTo',
    otherValue: string
  ) => {
    if (newValue === '' || otherValue === '') return true;
    const num = parseFloat(newValue);
    const other = parseFloat(otherValue);
    if (isNaN(num) || isNaN(other)) return true;
    return field === 'priceFrom' ? num <= other : num >= other;
  };

  // Обработчик blur с валидацией и откатом при необходимости
  const handlePriceBlur = useCallback(
    (field: 'priceFrom' | 'priceTo') => () => {
      const current = getValues(field);
      const otherField = field === 'priceFrom' ? 'priceTo' : 'priceFrom';
      const otherValue = getValues(otherField);

      if (!isValidPriceUpdate(current, field, otherValue)) {
        // Откат к значению, которое было при фокусе
        const previous = field === 'priceFrom' ? previousFrom.current : previousTo.current;
        setValue(field, previous, { shouldValidate: false });
      }
    },
    [getValues, setValue]
  );

  // Сохранение значения при фокусе
  const handlePriceFocus = useCallback(
    (field: 'priceFrom' | 'priceTo') => () => {
      const value = getValues(field);
      if (field === 'priceFrom') {
        previousFrom.current = value;
      } else {
        previousTo.current = value;
      }
    },
    [getValues]
  );

  const onSubmit = (data: FilterFormValues) => {
    const from = parseFloat(data.priceFrom);
    const to = parseFloat(data.priceTo);
    onFilterSubmit?.({ priceFrom: from || undefined, priceTo: to || undefined, tastes: [...data.tastes] });
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    handlePriceBlur,
    handlePriceFocus,
  };
};