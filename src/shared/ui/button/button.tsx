"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import {
  StyledButton,
  type ButtonFontWeight,
  type ButtonVariant,
} from "./button.styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fontWeight?: ButtonFontWeight;
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  fullWidth = false,
  fontWeight = "bold",
  children,
  ...props
}: ButtonProps) => (
  <StyledButton
    $variant={variant}
    $fontWeight={fontWeight}
    $fullWidth={fullWidth}
    {...props}
  >
    {children}
  </StyledButton>
);
