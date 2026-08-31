"use client";

import { AppliedFilters } from "@/shared/model/types";
import styles from "./filters-cards.module.css"
import { useGetTastesQuery } from "@/shared/api/cards-api";
import { Controller } from "react-hook-form";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import { TasteCheckboxes } from "@/entities/filters-cards/ui/taste-checkbox";
import { useFiltersForm } from "@/entities/filters-cards/hooks/useFiltersForm";


export const FiltersCards = (
  {onApply}: {onApply: (filters: AppliedFilters) => void}) => {
  const { control, handlePriceBlur, handlePriceFocus, handleTasteChange, handleReset } =
    useFiltersForm(onApply);

  const { data: tastes = [], isLoading, isError } = useGetTastesQuery();

  if (isLoading) {
    return <h3 className={styles.filtersForm}>Загрузка вкусов...</h3>;
  }

  if (isError) {
    return <h3 className={styles.filtersForm}>Ошибка загрузки вкусов</h3>;
  }

  return (
    <form className={styles.filtersForm}>
      <div className={styles.price}>
        <h3>Цена ₽</h3>
        <div className={styles.fields}>
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
        </div>
      </div>
      <fieldset className={styles.fieldset}>
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
      </fieldset>
      <div className={styles["buttons"]}>
        <Button type="button" onClick={handleReset} variant="secondary">
          Сбросить
        </Button>
      </div>
    </form>
  );
};