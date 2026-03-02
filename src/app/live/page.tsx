"use client";

import { useEffect, useState } from "react";
import type { Market, Match, Outcome } from "@/lib/line";
import { addToCoupon, getCoupon, getCoins } from "@/lib/game";

type ApiMatch = Match & { markets: Market[] };

export default function LivePage() {
  const [data, setData] = useState<ApiMatch[]>([]);
  const [couponCount, setCouponCount] = useState(0);
  const [coins, setCoins] = useState(0);

  async function load() {
    const j = await fetch("/api/matches", { cache: "no-store" }).then(r => r.json());
    setData((j?.matches ?? []).filter((m: ApiMatch) => m.isLive));
    setCouponCount(getCoupon().length);
    setCoins(getCoins());
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 8000); // “лайв”: обновляем каждые 8 сек
    return () => clearInterval(t);
  }, []);

  function pick(match: ApiMatch, market: Market, o: Outcome) {
    addToCoupon({
      matchId: match.id,
      marketKey: `${market.key}:${o.key}`,
      label: `${match.home} vs ${match.away} · ${o.label} (LIVE)`,
      price: o.price,
    });
    setCouponCount(getCoupon().length);
  }

  return (
    <main className="container" style={{ paddingTop: 16 }}>
      <div className="glass" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div className="pill"> · LIVE · Coins: {coins} ·  купоне: {couponCount}</div>
            <h1 className="h1" style={{ marginTop: 10 }}>Live</h1>
            <p className="sub" style={{ marginTop: 6 }}>иния двигается (мок). икаких денег, только очки.</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a className="btn" href="/prematch">Prematch</a>
            <a className="btn" href="/coupon">упон</a>
            <a className="btn btnPrimary" href="/leaderboard">ейтинг</a>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
          {data.map((m) => (
            <div key={m.id} className="glass" style={{ padding: 12, borderRadius: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div>
                  <div className="pill">LIVE · {m.minute}'</div>
                  <div style={{ fontSize: 20, fontWeight: 900, marginTop: 6 }}>
                    {m.home} <span style={{ color: "var(--muted2)" }}>vs</span> {m.away}
                  </div>
                </div>
                <div style={{ color: "var(--muted2)", fontSize: 12 }}>обновление каждые 8 сек</div>
              </div>

              <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                {m.markets.slice(0, 3).map((mk) => (
                  <div key={mk.key}>
                    <div style={{ fontWeight: 900, marginBottom: 8 }}>{mk.title}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
                      {mk.outcomes.slice(0, 6).map((o) => (
                        <button key={o.key} onClick={() => pick(m, mk, o)} className="btn" style={{ justifyContent: "space-between" }}>
                          <span style={{ fontWeight: 900 }}>{o.label}</span>
                          <span className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>{o.price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="footer">
            исклеймер: игра-симулятор. Coins не продаются и не выводятся.
          </div>
        </div>
      </div>
    </main>
  );
}
