import { useForm } from 'react-hook-form';
import { useRef, useCallback } from 'react';
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

  const previousFrom = useRef('0');
  const previousTo = useRef('');

  // Применить текущие значения формы
  const applyFilters = useCallback(() => {
    const data = getValues();
    const from = parseFloat(data.priceFrom);
    const to = parseFloat(data.priceTo);
    onFilterSubmit?.({
      priceFrom: isNaN(from) ? undefined : from,
      priceTo: isNaN(to) ? undefined : to,
      tastes: [...data.tastes],
    });
  }, [getValues, onFilterSubmit]);

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

  const handlePriceBlur = useCallback(
    (field: 'priceFrom' | 'priceTo') => () => {
      const current = getValues(field);
      const otherField = field === 'priceFrom' ? 'priceTo' : 'priceFrom';
      const otherValue = getValues(otherField);

      if (!isValidPriceUpdate(current, field, otherValue)) {
        const previous = field === 'priceFrom' ? previousFrom.current : previousTo.current;
        setValue(field, previous, { shouldValidate: false });
      }
      // Применяем фильтры после blur
      applyFilters();
    },
    [getValues, setValue, applyFilters]
  );

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

  // Обработчик изменения вкусов – сразу применяет фильтры
  const handleTasteChange = useCallback(
    (newValue: string[]) => {
      setValue('tastes', newValue, { shouldValidate: true });
      applyFilters();
    },
    [setValue, applyFilters]
  );

  const handleReset = () => {
    reset(defaultValues);
    onFilterSubmit({ priceFrom: undefined, priceTo: undefined, tastes: [] });
  };

  return {
    control,
    handleSubmit: handleSubmit(() => {}),
    handlePriceBlur,
    handlePriceFocus,
    handleTasteChange,
    handleReset,
  };
};