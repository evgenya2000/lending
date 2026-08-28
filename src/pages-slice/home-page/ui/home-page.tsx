'use client';

import { useGetCardsQuery } from '@/shared/api/cards-api';
import { Lending } from '@/widgets/lending/ui/lending';
import { ContainerMain } from '@/widgets/main/ui/conteiner-main';
import { useFilterCards } from '@/features/catalog-filter/useCatalogFilter';
import { FiltersCards } from '@/widgets/filters-cards/ui/filters-cards';

export default function HomePage() {
  const { data: cards, isLoading } = useGetCardsQuery(undefined);
  const { filteredCards, applyFilters } = useFilterCards(cards ?? []);

  return (
    <ContainerMain
      left={<FiltersCards onApply={applyFilters} />}
      right={isLoading ? <div style={{padding: "40px 10px 10px 10px"}}>Загрузка...</div> : <Lending cards={filteredCards} />}
    />
  );
}