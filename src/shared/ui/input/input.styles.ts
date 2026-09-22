import styled from "styled-components";

export const StyledInput = styled.input`
  color: var(--color-text-muted);
  height: 30px;
  padding: 4px 8px;
  font-size: 16px;
  border: 1.5px solid var(--color-border);
  transition: all 0.3s ease;
  background-color: var(--background);
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
    border-color: var(--color-border-hover);
    color: var(--color-text-primary);
    background: var(--color-bg-hover);
  }

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-text-primary);
    background: var(--color-bg-hover);
  }
`;
