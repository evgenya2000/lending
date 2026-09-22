import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "quantity" | "delete";
export type ButtonFontWeight = "regular" | "bold";

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: #96669a;

    &:hover:not(:disabled) {
      background-color: #5c405e;
    }
  `,
  secondary: css`
    background-color: #e0e0e0;
    color: #333;

    &:hover:not(:disabled) {
      background-color: #bdbdbd;
    }
  `,
  quantity: css`
    width: 28px;
    height: 28px;
    padding: 0;
    font-size: 16px;
    border-radius: 10px;
    background-color: #96669a;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      background-color: #5c405e;
    }
  `,
  delete: css`
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    color: #ff7171;
    padding: 0;
    border-radius: 0;

    &:hover:not(:disabled) {
      color: #e86568;
      background: none;
    }
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $fontWeight: ButtonFontWeight;
  $fullWidth: boolean;
}>`
  font-size: 14px;
  color: #fff;
  background-color: #96669a;
  border-radius: 14px;
  border: none;
  padding: 0 16px;
  height: 36px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #5c405e;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $variant }) => variantStyles[$variant]}

  ${({ $fontWeight }) =>
    $fontWeight === "bold"
      ? css`
          font-weight: 600;
        `
      : css`
          font-weight: 500;
        `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;
