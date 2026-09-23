import { css } from "styled-components";

import {
  breakpoints,
  getBreakpoint,
  getNextBreakpoint,
  type Breakpoint,
} from "./breakpoints";

/** Аргументы, которые принимает `css` из styled-components. */
type CssArgs = Parameters<typeof css>;

/**
 * Миксины адаптива как функции.
 *
 * Каждая функция принимает брейкпоинт и возвращает функцию, которую можно
 * использовать как tagged template или вызвать с готовым набором стилей.
 *
 * Пример:
 *   ${media.down("md")`
 *     padding: 16px;
 *   `}
 *
 *   // или с готовым RuleSet
 *   ${media.down("md")(someRuleSet)}
 */
const mediaQuery =
  (query: string) =>
  (...styles: CssArgs) =>
    css`
      @media ${query} {
        ${css(...styles)}
      }
    `;

export const media = {
  /** Стили от указанного брейкпоинта и выше (min-width). */
  up: (breakpoint: Breakpoint) =>
    mediaQuery(`(min-width: ${getBreakpoint(breakpoint)}px)`),

  /** Стили строго ниже указанного брейкпоинта (max-width). */
  down: (breakpoint: Breakpoint) =>
    mediaQuery(`(max-width: ${getBreakpoint(breakpoint) - 1}px)`),

  /** Стили в диапазоне [min, max) — от min включительно до max не включительно. */
  between: (min: Breakpoint, max: Breakpoint) =>
    mediaQuery(
      `(min-width: ${getBreakpoint(min)}px) and (max-width: ${
        getBreakpoint(max) - 1
      }px)`,
    ),

  /** Стили только для одного диапазона брейкпоинта (от него до следующего). */
  only: (breakpoint: Breakpoint) => {
    const next = getNextBreakpoint(breakpoint);

    return next ? media.between(breakpoint, next) : media.up(breakpoint);
  },
};

/** Готовые шорткаты для частых случаев. */
export const mobile = media.down("md");
export const tablet = media.between("md", "lg");
export const desktop = media.up("lg");

export { breakpoints };
export type { Breakpoint };
