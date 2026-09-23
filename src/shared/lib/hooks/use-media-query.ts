import { useCallback, useSyncExternalStore } from "react";

/**
 * Отслеживает соответствие media-запроса текущей ширине viewport.
 *
 * SSR-безопасно: на сервере (и при гидратации) возвращает `false`, а актуальное
 * значение подставляется после подписки. Это исключает расхождение гидратации
 * при использовании в Next.js.
 *
 * Пример:
 *   const isCompact = useMediaQuery("(max-width: 1439px)");
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);

      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
