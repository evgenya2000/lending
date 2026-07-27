"use client";

import { Filters } from "@/entities/filters/ui/filters";
import { AppliedFilters } from "@/helps/interface";


export const ContainerFilters = (
  {onApply}: {onApply: (filters: AppliedFilters) => void}) => {
  return (
    <Filters onApply={onApply} />
  );
};