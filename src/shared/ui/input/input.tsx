"use client";
import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const classes = [styles.input, className].filter(Boolean).join(" ");
    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = "Input";