'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #ffffff;
    --background-black: #1e1e1e;
    --foreground: #171717;

    --color-primary: #96669a;
    --color-primary-hover: #5c405e;
    --color-accent: #ff7171;
    --color-accent-hover: #e86568;
    --color-surface: #ffe3e3;
    --color-text: #333333;
    --color-text-primary: #000000;
    --color-text-secondary: #444444;
    --color-text-muted: #6b6b6b;
    --color-text-muted-2: #666;
    --color-text-muted-3: #999;
    --color-border: #dcdcdc;
    --color-border-2: #dcdcdc;
    --color-border-hover: #8e8e8e;
    --color-bg-hover: #f0f0f0;
    --color-secondary: #e0e0e0;
    --color-secondary-hover: #bdbdbd;
    --color-error: #e74c3c;
    --color-text-inverse: #ffffff;
    --color-bg-subtle: #f9f9f9;
    --color-outline: #007bff;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0a0a0a;
      --foreground: #ededed;
    }
  }

  html {
    height: 100%;
    font-family: var(--font-onest);
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 16px;
  }

  html,
  body {
    max-width: 100vw;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: var(--foreground);
    background: var(--background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h3 {
    font-weight: 500;
  }

  input {
    border: 1px solid #000;
    border-radius: 6px;
    font-family: var(--font-onest);
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;
