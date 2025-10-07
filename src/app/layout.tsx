import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import Header from "@/widgets/header/Header";

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
        <Header />
        <main style={{ paddingTop: 106 }}>{children}</main>
      </body>
    </html>
  );
}
