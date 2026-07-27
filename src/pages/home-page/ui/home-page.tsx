'use client';

import { ContainerLending } from "@/widgets/container-lending/ui/container-lending";
import { cards } from "../config/cards.setup";
import { ContainerFilters } from "@/widgets/container-filters/ui/container-filters";
import { ContainerMain } from "@/widgets/main/ui/conteiner-main";
import { useFilterCards } from "@/features/catalog-filter/useCatalogFilter";

export default function HomePage() {
  const { filteredCards, applyFilters } = useFilterCards(cards);
  return (
    <ContainerMain
      left={
        <ContainerFilters
          onApply={applyFilters}
        />
      }
      right={
        <ContainerLending cards={filteredCards}/>
      }
    />
  );
}