"use client";
import { AppliedFilters } from "@/shared/model/types";
import { useFiltersForm } from "../hooks/useFiltersForm";
import { Controller } from "react-hook-form";
import styles from "./filters.module.css";

const TASTES = [
  'абрикос', 'ананас', 'арбуз', 'банан', 'белый шоколад', 'бергамот', 'голубика', 'грейпфрут', 'изюм', 'имбирь', 'инжир', 'киви', 'кленовый сироп', 'клюква', 'красный апельсин', 'крем-брюле', 'лайм', 'личи', 'манго', 'маракуйя', 'марципан', 'матча', 'мёд', 'миндаль', 'попкорн', 'роза', 'розовый перец', 'ром', 'тирамису', 'тыква', 'чай', 'чёрная смородина', 'чили'
];

export const Filters = ({ onApply }: { onApply: (filters: AppliedFilters) => void }) => {
  const { control, handleSubmit, handlePriceBlur, handlePriceFocus } =
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
            <div className={styles.optionsContainer}>
              {TASTES.map((taste) => {
                const isActive = field.value.includes(taste);
                return (
                  <label
                    key={taste}
                    className={`${styles.optionLabel} ${isActive ? styles.optionLabelActive : ''}`}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      value={taste}
                      checked={isActive}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const newValue = checked
                          ? [...field.value, taste]
                          : field.value.filter((v) => v !== taste);
                        field.onChange(newValue);
                      }}
                    />
                    {taste}
                  </label>
                );
              })}
            </div>
          )}
        />
      </fieldset>
      <button type="submit" className={styles["button"]}>Применить</button>
    </form>
  );
};