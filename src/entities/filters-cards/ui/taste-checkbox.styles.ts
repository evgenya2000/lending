import styled, { css } from "styled-components";

export const StyledOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

export const StyledOptionLabel = styled.label<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 0.9rem;
  line-height: 1.4;
  border-radius: 10px;
  background: var(--background);
  border: 1.5px solid var(--color-border);
  color: var(--color-text-secondary);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-border-hover);
    background: var(--color-bg-hover);
  }

  ${({ $active }) =>
    $active &&
    css`
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--background);

      &:hover {
        background: var(--color-primary);
        border-color: var(--color-primary);
      }
    `}
`;

export const StyledCheckbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
