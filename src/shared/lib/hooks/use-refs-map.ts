// src/shared/lib/hooks/use-refs-map.ts

import { useReducer, RefObject, createRef } from 'react';

/**
 * Создаёт Map стабильных рефов по уникальным ключам.
 * При изменении набора ключей рефы для существующих элементов не пересоздаются.
 * Не нарушает правило react-hooks/refs.
 *
 * @template T - тип HTML-элемента
 * @param keys - массив строковых ключей (id карточек)
 * @returns Map, где ключ — id, а значение — RefObject<T>
 */
export function useRefsMap<T extends HTMLElement = HTMLElement>(
  keys: string[]
): Map<string, RefObject<T>> {
  // Редьюсер добавляет отсутствующие рефы, сохраняя уже существующие
  const [map, dispatch] = useReducer(
    (prevMap: Map<string, RefObject<T>>, newKeys: string[]) => {
      const nextMap = new Map(prevMap);
      newKeys.forEach(key => {
        if (!nextMap.has(key)) {
          nextMap.set(key, createRef<T>() as RefObject<T>);
        }
      });
      return nextMap;
    },
    new Map<string, RefObject<T>>()
  );

  // Если есть ключи, для которых ещё нет рефа — инициируем синхронное обновление стейта
  const needsUpdate = keys.some(key => !map.has(key));
  if (needsUpdate) {
    dispatch(keys);
  }

  return map;
}