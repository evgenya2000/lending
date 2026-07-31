import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header/ui/header";
import { Footer } from "@/widgets/footer/ui/footer";
import StoreProvider from "./store-provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["cyrillic"],
});

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
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
