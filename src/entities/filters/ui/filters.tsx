"use client";
import { AppliedFilters } from "@/shared/model/types";
import { useFiltersForm } from "../hooks/useFiltersForm";
import { Controller } from "react-hook-form";
import styles from "./filters.module.css";
import { TasteCheckboxes } from "./taste-checkbox";

const TASTES = [
  'абрикос', 'ананас', 'арбуз', 'банан', 'белый шоколад', 'бергамот', 'голубика', 'грейпфрут', 'изюм', 'имбирь', 'инжир', 'киви', 'кленовый сироп', 'клюква', 'красный апельсин', 'крем-брюле', 'лайм', 'личи', 'манго', 'маракуйя', 'марципан', 'матча', 'мёд', 'миндаль', 'попкорн', 'роза', 'розовый перец', 'ром', 'тирамису', 'тыква', 'чай', 'чёрная смородина', 'чили'
];

export const Filters = ({ onApply }: { onApply: (filters: AppliedFilters) => void }) => {
  const { control, handleSubmit, handlePriceBlur, handlePriceFocus, handleReset } =
    useFiltersForm(onApply);

  return (
    <form onSubmit={handleSubmit} className={styles.filtersForm}>
      <div className={styles.price}>
        <h3>
          Цена ₽
        </h3>
        <div className={styles.fields}>
          <Controller
            name="priceFrom"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(e)}
                onBlur={handlePriceBlur('priceFrom')}
                onFocus={handlePriceFocus('priceFrom')}
                ref={field.ref}
              />
            )}
          />
          <Controller
            name="priceTo"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(e)}
                onBlur={handlePriceBlur('priceTo')}
                onFocus={handlePriceFocus('priceTo')}
                ref={field.ref}
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
              tastes={TASTES}
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </fieldset>
      <div className={styles["buttons"]}>
        <button type="submit" className={styles["button"]}>Применить</button>
        <button type="button" onClick={handleReset} className={styles["button"]}>Сбросить</button>
      </div>
    </form>
  );
};