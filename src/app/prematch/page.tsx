"use client";

import { useEffect, useMemo, useState } from "react";
import type { Market, Match, Outcome } from "@/lib/line";
import { addToCoupon, getCoins, getCoupon } from "@/lib/game";

type ApiMatch = Match & { markets: Market[] };

export default function PrematchPage() {
  const [data, setData] = useState<ApiMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [couponCount, setCouponCount] = useState(0);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    setCoins(getCoins());
    setCouponCount(getCoupon().length);

    fetch("/api/matches")
      .then((r) => r.json())
      .then((j) => setData((j?.matches ?? []).filter((m: ApiMatch) => !m.isLive)))
      .finally(() => setLoading(false));
  }, []);

  const active = useMemo(() => {
    if (!activeMatchId && data.length) return data[0];
    return data.find((m) => m.id === activeMatchId) ?? null;
  }, [data, activeMatchId]);

  function pick(match: ApiMatch, market: Market, o: Outcome) {
    addToCoupon({
      matchId: match.id,
      marketKey: `${market.key}:${o.key}`,
      label: `${match.home} vs ${match.away} · ${o.label}`,
      price: o.price,
    });
    setCouponCount(getCoupon().length);
  }

  return (
    <main className="container" style={{ paddingTop: 16 }}>
      <div className="glass" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div className="pill"> · иния prematch · Coins: {coins} ·  купоне: {couponCount}</div>
            <h1 className="h1" style={{ marginTop: 10 }}>Prematch</h1>
            <p className="sub" style={{ marginTop: 6 }}>
              олностью игровая механика: никаких платежей, выигрышей и вывода. Только очки и рейтинг.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a className="btn" href="/live">LIVE</a>
            <a className="btn" href="/coupon">упон</a>
            <a className="btn btnPrimary" href="/leaderboard">ейтинг</a>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "320px 1fr", gap: 12 }}>
          <div className="glass" style={{ padding: 10 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>атчи</div>
            {loading && <div style={{ color: "var(--muted2)" }}>агрузка...</div>}
            {!loading && data.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMatchId(m.id)}
                className="btn"
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  opacity: active?.id === m.id ? 1 : 0.85
                }}
              >
                <span style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 900 }}>{m.home} vs {m.away}</div>
                  <div style={{ fontSize: 12, color: "var(--muted2)" }}>{m.league} · {m.startTime}</div>
                </span>
                <span className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>иния</span>
              </button>
            ))}
          </div>

          <div className="glass" style={{ padding: 12 }}>
            {!active && <div style={{ color: "var(--muted2)" }}>ет матча</div>}
            {active && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div className="pill">{active.league} · {active.startTime}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>
                      {active.home} <span style={{ color: "var(--muted2)" }}>vs</span> {active.away}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <a className="btn" href="/mini">Mini</a>
                    <a className="btn" href="/">ендинг</a>
                  </div>
                </div>

                <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                  {active.markets.map((mk) => (
                    <div key={mk.key} className="glass" style={{ padding: 12, borderRadius: 14 }}>
                      <div style={{ fontWeight: 900, marginBottom: 8 }}>{mk.title}</div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
                        {mk.outcomes.map((o) => (
                          <button
                            key={o.key}
                            onClick={() => pick(active, mk, o)}
                            className="btn"
                            style={{ justifyContent: "space-between" }}
                            title="обавить в купон (игра)"
                          >
                            <span style={{ fontWeight: 900 }}>{o.label}</span>
                            <span className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>{o.price.toFixed(2)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="footer" style={{ marginTop: 12 }}>
                  исклеймер: это игра-симулятор. Coins не имеют ценности, не продаются и не выводятся.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
