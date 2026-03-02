"use client";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/prematch", label: "иния", icon: "" },
  { href: "/live", label: "LIVE", icon: "" },
  { href: "/coupon", label: "упон", icon: "" },
  { href: "/leaderboard", label: "Топ", icon: "" },
  { href: "/guides", label: "айды", icon: "" },
];

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="tabbar">
      {tabs.map((t) => {
        const active = path === t.href;
        return (
          <a key={t.href} href={t.href} className={`tab ${active ? "tabActive" : ""}`}>
            <div style={{ fontSize: 16 }}>{t.icon}</div>
            <div>{t.label}</div>
          </a>
        );
      })}
    </nav>
  );
}
