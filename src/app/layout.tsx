import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import styles from "./fonts.module.css";

export const metadata: Metadata = {
  title: "Macarons",
  description: "Lending Macarons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={styles["onest-global"]}>
      <head>
        <link rel="icon" href="./favicon.ico"/>
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}