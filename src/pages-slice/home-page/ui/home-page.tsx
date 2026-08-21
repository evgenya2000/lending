'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { fetchCardsThunk } from '@/entities/cards/model/cards-slice';
import { ContainerLending } from '@/widgets/container-lending/ui/container-lending';
import { ContainerFilters } from '@/widgets/container-filters/ui/container-filters';
import { ContainerMain } from '@/widgets/main/ui/conteiner-main';
import { useFilterCards } from '@/features/catalog-filter/useCatalogFilter';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, loading, error } = useSelector((state: RootState) => state.cards);
  const { filteredCards, applyFilters } = useFilterCards(cards);

  useEffect(() => {
    dispatch(fetchCardsThunk());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ContainerMain
      left={<ContainerFilters onApply={applyFilters} />}
      right={<ContainerLending cards={filteredCards} />}
    />
  );
}