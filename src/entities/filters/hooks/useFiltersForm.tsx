import { useForm } from 'react-hook-form';
import { useRef, useCallback, useState, useEffect } from 'react';
import { AppliedFilters, FilterFormValues } from '@/shared/model/types';

const defaultValues: FilterFormValues = {
  priceFrom: '0',
  priceTo: '',
  tastes: [],
};

export const useFiltersForm = (onFilterSubmit: (filters: AppliedFilters) => void) => {
  const { control, handleSubmit, getValues, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  // Рефы для сохранения значений на момент получения фокуса
  const previousFrom = useRef('0');
  const previousTo = useRef('');

  const [resetTriggered, setResetTriggered] = useState(false);

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

  const handleReset = () => {
    // TODO: сделать красивое обновление в фильтрах
    reset(defaultValues);
    onFilterSubmit({ priceFrom: undefined, priceTo: undefined, tastes: [] });
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    handlePriceBlur,
    handlePriceFocus,
    handleReset
  };
};