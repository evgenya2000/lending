import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/widgets/header/ui/header";
import { Footer } from "@/widgets/footer/ui/footer";
import StoreProvider from "./store-provider";
import styles from "./fonts.module.css"

export const metadata: Metadata = {
  title: "Macarons",
  description: "Lending Macarons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={styles["onest-global"]}>
      <head>
        <link rel="icon" href="./favicon.ico"/>
      </head>

      <body>
        <StoreProvider>
          <Header/>
          {children}
          <Footer/>
        </StoreProvider>
      </body>
    </html>
  );
}
