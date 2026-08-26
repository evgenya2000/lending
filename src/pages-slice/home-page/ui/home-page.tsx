'use client';

import { useGetCardsQuery } from '@/shared/api/cards-api';
import { ContainerLending } from '@/widgets/container-lending/ui/container-lending';
import { ContainerFilters } from '@/widgets/container-filters/ui/container-filters';
import { ContainerMain } from '@/widgets/main/ui/conteiner-main';
import { useFilterCards } from '@/features/catalog-filter/useCatalogFilter';

export default function HomePage() {
  const { data: cards, isLoading } = useGetCardsQuery(undefined);
  const { filteredCards, applyFilters } = useFilterCards(cards ?? []);

  return (
    <ContainerMain
      left={<ContainerFilters onApply={applyFilters} />}
      right={isLoading ? <div style={{padding: "40px 10px 10px 10px"}}>Загрузка...</div> : <ContainerLending cards={filteredCards} />}
    />
  );
}