/**
 * Общие точки останова проекта (в пикселях).
 *
 * Значения — это нижняя граница диапазона (mobile-first).
 * Используйте их через миксины из `./mixins`, а не напрямую в media-запросах,
 * чтобы адаптив во всём проекте оставался согласованным.
 */
export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Упорядоченный список брейкпоинтов от меньшего к большему. */
export const breakpointOrder = Object.keys(breakpoints) as Breakpoint[];

/** Значение брейкпоинта в пикселях. */
export const getBreakpoint = (breakpoint: Breakpoint): number =>
  breakpoints[breakpoint];

/** Следующий брейкпоинт в порядке возрастания (или undefined для последнего). */
export const getNextBreakpoint = (
  breakpoint: Breakpoint,
): Breakpoint | undefined => {
  const index = breakpointOrder.indexOf(breakpoint);
  return breakpointOrder[index + 1];
};
