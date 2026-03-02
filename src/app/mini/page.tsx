"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

type TgUser = {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
};

function getTg() {
  if (typeof window === "undefined") return null;
  // @ts-expect-error Telegram injected global
  return window.Telegram?.WebApp ?? null;
}

export default function MiniAppPage() {
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const tg = getTg();
    if (tg?.ready) tg.ready();
    if (tg?.expand) tg.expand();

    const u = tg?.initDataUnsafe?.user as TgUser | undefined;
    if (u) setUser(u);
  }, []);

  const displayName = useMemo(() => {
    if (!user) return "гость";
    if (user.username) return "@" + user.username;
    return [user.first_name, user.last_name].filter(Boolean).join(" ");
  }, [user]);

  const matches = [
    { time: "19:30", league: "Premier League", home: "Team A", away: "Team B", tag: "Сценарий" },
    { time: "20:00", league: "La Liga", home: "Team C", away: "Team D", tag: "азбор" },
    { time: "21:45", league: "Serie A", home: "Team E", away: "Team F", tag: "рок" },
  ];

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      <main className="container" style={{ paddingTop: 18 }}>
        <div className="glass" style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div className="pill">Mini App  налитика  ез ставок</div>
              <h1 className="h1" style={{ fontSize: 28, marginTop: 10 }}>Match Center</h1>
              <p className="sub" style={{ fontSize: 14, marginTop: 8 }}>
                ривет, <b>{displayName}</b>. десь сценарии матчей, вероятности и обучение. Ставок нет.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <a className="btn" href="/guides">бучение</a>
              <a className="btn btnPrimary" href="/">ендинг</a>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <div className="glass" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>иния (информационная)</div>
              <div style={{ color: "var(--muted2)", fontSize: 13, lineHeight: 1.45 }}>
                итрина аналитики: сценарии, вероятности, аргументы. ез приема ставок и без кнопок "поставить".
              </div>
            </div>

            <div className="glass" style={{ padding: 0, overflow: "hidden", borderRadius: 14 }}>
              <div style={{ padding: 12, borderBottom: "1px solid var(--border)", fontWeight: 900 }}>
                атчи сегодня
              </div>

              <div style={{ display: "grid" }}>
                {matches.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "64px 1fr",
                      gap: 10,
                      padding: 12,
                      borderTop: idx === 0 ? "none" : "1px solid rgba(255,255,255,.06)",
                    }}
                  >
                    <div style={{ color: "var(--muted)", fontWeight: 900 }}>{m.time}</div>

                    <div style={{ display: "grid", gap: 4 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        <div style={{ color: "var(--muted2)", fontSize: 12 }}>{m.league}</div>
                        <div className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>{m.tag}</div>
                      </div>

                      <div style={{ fontWeight: 900 }}>
                        {m.home} <span style={{ color: "var(--muted2)" }}>vs</span> {m.away}
                      </div>

                      <div style={{ color: "var(--muted2)", fontSize: 13, lineHeight: 1.45 }}>
                        ример: "темп выше  больше моментов", "обе команды создают  шанс гола выше".
                      </div>

                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>ероятность: 58%</span>
                        <span className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>иск: средний</span>
                        <span className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>ричины: 3</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer">
              исклеймер: сервис для аналитики и обучения. Ставки не принимаем, выигрыши не обещаем.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

