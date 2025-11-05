import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import "react-photo-view/dist/react-photo-view.css";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";
import { Providers } from "./providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Зерно",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
