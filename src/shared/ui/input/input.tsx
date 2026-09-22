"use client";
import { forwardRef, InputHTMLAttributes } from "react";
import { StyledInput } from "./input.styles";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <StyledInput ref={ref} {...props} />
));

Input.displayName = "Input";
