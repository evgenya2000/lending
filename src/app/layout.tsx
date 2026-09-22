import type { Metadata } from "next";
import { AppProviders } from "./providers";
import { onest } from "./fonts";

export const metadata: Metadata = {
  title: "Macarons",
  description: "Lending Macarons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
