import styled from 'styled-components';

/** Кнопка открытия фильтров: в потоке, перед контейнером с карточками. */
export const StyledFilterToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin: 16px 0 0 16px;
  padding: 10px 10px;
  border-radius: 999px;
  border: none;
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: var(--color-accent-hover);
    border-color: var(--color-border-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }
`;

/** Затемнение фона под панелью фильтров. */
export const StyledDrawerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: var(--header-height) 0 0 0;
  z-index: 45;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.25s ease, visibility 0.25s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/** Выезжающая слева панель с фильтрами. */
export const StyledFiltersDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: var(--header-height);
  left: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  width: min(360px, 85vw);
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  background-color: var(--background);
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.2);
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  /* На узких экранах (< 425px) панель занимает всю ширину. */
  @media (max-width: 424px) {
    width: 100%;
    box-shadow: none;
  }
`;


export const StyledDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 0;
`;

export const StyledDrawerTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: var(--color-text-primary);
`;

export const StyledDrawerClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: none;
  color: var(--color-text-muted);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background-color: var(--color-bg-hover);
    color: var(--color-text);
  }
`;
