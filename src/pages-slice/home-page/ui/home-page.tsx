'use client';

import { useGetCardsQuery } from '@/shared/api/cards-api';
import { FilterIcon } from '@/shared/icons/filter-icon';
import { useMediaQuery } from '@/shared/lib/hooks/use-media-query';
import { getBreakpoint } from '@/shared/lib/styles';
import { Lending } from '@/widgets/lending/ui/lending';
import { ContainerMain } from '@/widgets/main/ui/conteiner-main';
import { useFilterCards } from '@/features/catalog-filter/useCatalogFilter';
import { FiltersCards } from '@/widgets/filters-cards/ui/filters-cards';

import { useFiltersDrawer } from '../lib/useFiltersDrawer';

import {
  StyledDrawerClose,
  StyledDrawerHeader,
  StyledDrawerOverlay,
  StyledDrawerTitle,
  StyledFilterToggle,
  StyledFiltersDrawer,
} from './home-page.styles';

/** Ниже 1440px фильтры скрываются в выезжающую панель. */
const COMPACT_QUERY = `(max-width: ${getBreakpoint('xxl') - 1}px)`;

export default function HomePage() {
  const { data: cards, isLoading } = useGetCardsQuery(undefined);
  const { filteredCards, applyFilters } = useFilterCards(cards ?? []);
  const isCompact = useMediaQuery(COMPACT_QUERY);
  const { isFiltersOpen, openFilters, closeFilters, handleApply } =
    useFiltersDrawer(applyFilters);

  const right = (
    <>
      {isCompact && (
        <StyledFilterToggle
          type="button"
          aria-label="Открыть фильтры"
          aria-expanded={isFiltersOpen}
          aria-controls="filters-drawer"
          onClick={openFilters}
        >
          <FilterIcon size={20} />
        </StyledFilterToggle>
      )}
      {isLoading ? (
        <h3 style={{ padding: '40px 10px 10px 10px' }}>Загрузка...</h3>
      ) : (
        <Lending cards={filteredCards} />
      )}
    </>
  );

  return (
    <>
      <ContainerMain
        left={isCompact ? undefined : <FiltersCards onApply={applyFilters} />}
        right={right}
      />

      {isCompact && (
        <>
          <StyledDrawerOverlay $isOpen={isFiltersOpen} onClick={closeFilters} />

          <StyledFiltersDrawer
            id="filters-drawer"
            $isOpen={isFiltersOpen}
            role="dialog"
            aria-modal="true"
            aria-label="Фильтры"
          >
            <StyledDrawerHeader>
              <StyledDrawerTitle>Фильтры</StyledDrawerTitle>
              <StyledDrawerClose
                type="button"
                aria-label="Закрыть фильтры"
                onClick={closeFilters}
              >
                ×
              </StyledDrawerClose>
            </StyledDrawerHeader>
            <FiltersCards onApply={handleApply} />
          </StyledFiltersDrawer>
        </>
      )}
    </>
  );
}
