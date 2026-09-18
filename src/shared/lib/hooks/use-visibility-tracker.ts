import { useRef, useState, useCallback, useEffect } from 'react';

export interface VisibilityTracker {
  observe: (element: HTMLElement | null, key: string) => void;
  isVisible: (key: string) => boolean;
}

export function useVisibilityTracker(rootMargin = "300px"): VisibilityTracker {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const observe = useCallback((element: HTMLElement | null, key: string) => {
    if (!element) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          setVisibleKeys((prev) => {
            const next = new Set(prev);
            entries.forEach((entry) => {
              const id = (entry.target as HTMLElement).dataset.cardId;
              if (!id) return;
              if (entry.isIntersecting) {
                next.add(id);
              } else {
                next.delete(id);
              }
            });
            return next;
          });
        },
        { rootMargin, threshold: 0 }
      );
    }

    element.dataset.cardId = key;
    observerRef.current.observe(element);
  }, [rootMargin]);

  const isVisible = useCallback(
    (key: string) => visibleKeys.has(key),
    [visibleKeys]
  );

  return { observe, isVisible };
}