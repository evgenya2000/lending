import { useCallback, useEffect, useState } from 'react';

import { AppliedFilters } from '@/shared/model/types';

/**
 * Состояние выезжающей панели фильтров.
 *
 * Инкапсулирует открытие и закрытие панели, закрытие по Escape и применение
 * фильтров. Панель не закрывается автоматически при выборе вкуса — только
 * по явному действию пользователя (кнопка закрытия, оверлей, Escape).
 */
export function useFiltersDrawer(
  applyFilters: (filters: AppliedFilters) => void,
) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const openFilters = useCallback(() => setIsFiltersOpen(true), []);
  const closeFilters = useCallback(() => setIsFiltersOpen(false), []);

  useEffect(() => {
    if (!isFiltersOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFiltersOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFiltersOpen]);

  const handleApply = useCallback(
    (filters: AppliedFilters) => {
      applyFilters(filters);
    },
    [applyFilters],
  );

  return { isFiltersOpen, openFilters, closeFilters, handleApply };
}
