import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
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
