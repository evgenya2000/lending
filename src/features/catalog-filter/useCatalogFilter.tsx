import { AppliedFilters, Card } from "@/helps/interface";
import { useMemo, useState } from "react";

export const useFilterCards = (cards: Card[]) => {
    const [filters, setFilters] = useState<AppliedFilters>({});

    const filteredCards = useMemo(() => {
        let result = cards;

        if (filters.priceFrom !== undefined) {
            result = result.filter(card => card.price >= filters.priceFrom!);
        }
        if (filters.priceTo !== undefined) {
            result = result.filter(card => card.price <= filters.priceTo!);
        }
        if (filters.tastes && filters.tastes.length > 0) {
            result = result.filter(card =>
                card.tastes.some(taste => filters.tastes!.includes(taste))
            );
        }

        return result;
    }, [cards, filters]);

    const applyFilters = (newFilters: AppliedFilters) => {
        setFilters(newFilters);
    };

    return {
        filteredCards,
        applyFilters,
    };
};