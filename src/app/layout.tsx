import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catch the tempo  аналитика матчей (без ставок)",
  description: "Telegram Mini App: сценарии матчей, вероятности и обучение. ез приёма ставок.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
