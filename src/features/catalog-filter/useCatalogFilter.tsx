import { AppliedFilters, Card } from "@/shared/model/types";
import { useCallback, useMemo, useState } from "react";

export const useFilterCards = (cards: Card[]) => {
    const [filters, setFilters] = useState<AppliedFilters>({});

    const filteredCards = useMemo(() => {
        if (
            filters.priceFrom === undefined &&
            filters.priceTo === undefined &&
            (!filters.tastes || filters.tastes.length === 0)
        ) {
            return cards;
        }

        return cards.filter((card) => {
            if (filters.priceFrom !== undefined && card.price < filters.priceFrom) return false;
            if (filters.priceTo !== undefined && card.price > filters.priceTo) return false;
            if (filters.tastes?.length && !card.tastes.some((t) => filters.tastes!.includes(t))) {
                return false;
            }
            return true;
        });
    }, [cards, filters]);

    const applyFilters = useCallback((newFilters: AppliedFilters) => {
        setFilters(newFilters);
    }, []);

    return { filteredCards, applyFilters };
};