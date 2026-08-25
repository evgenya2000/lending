'use client';

import { Suspense } from 'react';
import { useGetCardsQuery } from '@/shared/api/cards-api';
import { ContainerLending } from '@/widgets/container-lending/ui/container-lending';
import { ContainerFilters } from '@/widgets/container-filters/ui/container-filters';
import { ContainerMain } from '@/widgets/main/ui/conteiner-main';
import { useFilterCards } from '@/features/catalog-filter/useCatalogFilter';
import { ErrorBoundary } from '@/shared/ui/error-boundary/error-boundary';

function HomePageContent() {
  // Включаем suspense-режим
  const { data: cards } = useGetCardsQuery(undefined);
  const { filteredCards, applyFilters } = useFilterCards(cards ?? []);

  return (
    <ContainerMain
      left={<ContainerFilters onApply={applyFilters} />}
      right={<ContainerLending cards={filteredCards} />}
    />
  );
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Загрузка...</div>}>
        <HomePageContent />
      </Suspense>
    </ErrorBoundary>
  );
}