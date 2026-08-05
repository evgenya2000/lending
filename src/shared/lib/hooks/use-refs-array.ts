// src/shared/lib/hooks/use-refs-array.ts
import { useMemo, createRef, RefObject } from 'react';

/**
 * Создаёт массив рефов фиксированной длины.
 * Полезно для привязки 3D-сцен к DOM-элементам.
 *
 * @template T - тип HTML-элемента (по умолчанию HTMLElement)
 * @param length - количество рефов
 * @returns массив рефов с типом RefObject<T>[]
 *
 * @example
 * const refs = useRefsArray<HTMLDivElement>(cards.length);
 */
export function useRefsArray<T extends HTMLElement = HTMLElement>(
  length: number
): RefObject<T>[] {
  return useMemo(
    () => Array.from({ length }, () => createRef<T>() as RefObject<T>),
    [length]
  );
}