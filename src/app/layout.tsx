import type { Metadata } from "next";
import "./globals.css";
import { TabBar } from "../components/TabBar";

export const metadata: Metadata = {
  title: "Catch the tempo  игра-симулятор ",
  description: "гровая линия как в : coins, купон, рейтинг. икаких платежей и выигрышей.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <TabBar />
      </body>
    </html>
  );
}
