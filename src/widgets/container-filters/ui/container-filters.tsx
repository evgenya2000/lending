"use client";

import { Filters } from "@/entities/filters/ui/filters";
import { AppliedFilters } from "@/shared/model/types";


export const ContainerFilters = (
  {onApply}: {onApply: (filters: AppliedFilters) => void}) => {
  return (
    <Filters onApply={onApply} />
  );
};