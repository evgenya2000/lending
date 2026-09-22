"use client";

import { AppliedFilters } from "@/shared/model/types";
import { useGetTastesQuery } from "@/shared/api/cards-api";
import { Controller } from "react-hook-form";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import { TasteCheckboxes } from "@/entities/filters-cards/ui/taste-checkbox";
import { useFiltersForm } from "@/entities/filters-cards/hooks/useFiltersForm";
import { StyledButtons, StyledFields, StyledFieldset, StyledFiltersForm, StyledPrice, StyledWrapperLoader } from "./filters-cards.styles";


export const FiltersCards = (
  {onApply}: {onApply: (filters: AppliedFilters) => void}) => {
  const { control, handlePriceBlur, handlePriceFocus, handleTasteChange, handleReset } =
    useFiltersForm(onApply);

  const { data: tastes = [], isLoading, isError } = useGetTastesQuery();

  if (isLoading) {
    return <StyledWrapperLoader>Загрузка вкусов...</StyledWrapperLoader>;
  }

  if (isError) {
    return <StyledWrapperLoader>Ошибка загрузки вкусов</StyledWrapperLoader>;
  }

  return (
    <StyledFiltersForm>
      <StyledPrice>
        <h3>Цена ₽</h3>
        <StyledFields>
          <Controller
            name="priceFrom"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(e)}
                onBlur={handlePriceBlur("priceFrom")}
                onFocus={handlePriceFocus("priceFrom")}
                ref={field.ref}
                style={{ width: "100px" }}
              />
            )}
          />
          <Controller
            name="priceTo"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(e)}
                onBlur={handlePriceBlur("priceTo")}
                onFocus={handlePriceFocus("priceTo")}
                ref={field.ref}
                style={{ width: "100px" }}
              />
            )}
          />
        </StyledFields>
      </StyledPrice>
      <StyledFieldset>
        <h3>Вкусы</h3>
        <Controller
          name="tastes"
          control={control}
          render={({ field }) => (
            <TasteCheckboxes
              tastes={tastes}
              selected={field.value}
              onChange={handleTasteChange}
            />
          )}
        />
      </StyledFieldset>
      <StyledButtons>
        <Button type="button" onClick={handleReset} variant="secondary">
          Сбросить
        </Button>
      </StyledButtons>
    </StyledFiltersForm>
  );
};