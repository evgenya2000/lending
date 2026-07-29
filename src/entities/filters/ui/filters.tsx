"use client";
import { AppliedFilters } from "@/shared/model/types";
import { useFiltersForm } from "../hooks/useFiltersForm";
import { Controller } from "react-hook-form";

const TASTES = [
  'абрикос', 'ананас', 'арбуз', 'банан', 'белый шоколад', 'бергамот', 'голубика', 'грейпфрут', 'изюм', 'имбирь', 'инжир', 'киви', 'кленовый сироп', 'клюква', 'красный апельсин', 'крем-брюле', 'лайм', 'личи', 'манго', 'маракуйя', 'марципан', 'матча', 'мёд', 'миндаль', 'попкорн', 'роза', 'розовый перец', 'ром', 'тирамису', 'тыква', 'чай', 'чёрная смородина', 'чили'
];

export const Filters = ({onApply}: {onApply: (filters: AppliedFilters) => void}) => {
  const { control, handleSubmit, handlePriceBlur, handlePriceFocus } =
    useFiltersForm(onApply);

  return (
    <form onSubmit={handleSubmit}>
      <span>
        Цена в руб.
        От{" "}
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
        До{" "}
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
      </span>
      <fieldset>
        <legend>Вкусы</legend>
        <Controller
          name="tastes"
          control={control}
          render={({ field }) => (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {TASTES.map((taste) => (
                <label key={taste} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    value={taste}
                    checked={field.value.includes(taste)}
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
              ))}
            </div>
          )}
        />
      </fieldset>
      <input type="submit" value="Применить" />
    </form>
  );
};