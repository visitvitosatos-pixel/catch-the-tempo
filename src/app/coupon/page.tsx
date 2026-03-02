"use client";

import { useEffect, useMemo, useState } from "react";
import { calcExpressMultiplier, clearCoupon, getCoins, getCoupon, removeFromCoupon, setCoins } from "@/lib/game";

export default function CouponPage() {
  const [picks, setPicks] = useState(getCoupon());
  const [coins, setCoinsState] = useState(0);
  const [stake, setStake] = useState(50);
  const [type, setType] = useState<"single" | "express">("express");

  useEffect(() => {
    setCoinsState(getCoins());
    setPicks(getCoupon());
  }, []);

  const mult = useMemo(() => {
    if (type === "single") return picks[0]?.price ?? 1;
    return calcExpressMultiplier(picks);
  }, [picks, type]);

  const potential = useMemo(() => Math.floor(stake * mult), [stake, mult]);

  function sync() {
    setPicks(getCoupon());
    setCoinsState(getCoins());
  }

  function remove(matchId: string, marketKey: string) {
    removeFromCoupon(matchId, marketKey);
    sync();
  }

  function place() {
    // строго игра: просто уменьшаем coins и очищаем купон
    const c = getCoins();
    if (picks.length === 0) return alert("упон пуст");
    if (stake <= 0) return alert("Ставка (очки) должна быть > 0");
    if (stake > c) return alert("е хватает coins");

    setCoins(c - stake);
    clearCoupon();
    sync();

    alert(
      "✅ ринято (игра)\n\n" +
      `Тип: ${type}\n` +
      `Событий: ${picks.length}\n` +
      `оэф (мультипликатор): ${mult.toFixed(2)}\n` +
      `чки риска: ${stake}\n` +
      `отенциал (если сыграло): ${potential}\n\n` +
      "альше сделаем расчет результата по завершению матчей."
    );
  }

  return (
    <main className="container" style={{ paddingTop: 16 }}>
      <div className="glass" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div className="pill"> · упон · Coins: {coins}</div>
            <h1 className="h1" style={{ marginTop: 10 }}>упон</h1>
            <p className="sub" style={{ marginTop: 6 }}>то симулятор: “ставка” = очки. ез денег и вывода.</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a className="btn" href="/prematch">Prematch</a>
            <a className="btn" href="/live">LIVE</a>
            <a className="btn btnPrimary" href="/leaderboard">ейтинг</a>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 340px", gap: 12 }}>
          <div className="glass" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>События</div>
            {picks.length === 0 && <div style={{ color: "var(--muted2)" }}>усто. обавь исходы из линии.</div>}
            {picks.map((p) => (
              <div key={`${p.matchId}:${p.marketKey}`} className="glass" style={{ padding: 10, borderRadius: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{p.label}</div>
                    <div style={{ color: "var(--muted2)", fontSize: 12 }}>коэф: {p.price.toFixed(2)}</div>
                  </div>
                  <button className="btn" onClick={() => remove(p.matchId, p.marketKey)}>брать</button>
                </div>
              </div>
            ))}
            {picks.length > 0 && (
              <button className="btn" onClick={() => { clearCoupon(); sync(); }} style={{ marginTop: 6 }}>
                чистить купон
              </button>
            )}
          </div>

          <div className="glass" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>араметры</div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              <button className="btn" onClick={() => setType("single")} style={{ opacity: type === "single" ? 1 : 0.7 }}>динар</button>
              <button className="btn" onClick={() => setType("express")} style={{ opacity: type === "express" ? 1 : 0.7 }}>кспресс</button>
            </div>

            <label style={{ display: "grid", gap: 6 }}>
              <div style={{ color: "var(--muted2)", fontSize: 12 }}>чки риска</div>
              <input
                value={stake}
                onChange={(e) => setStake(Math.max(0, Math.floor(Number(e.target.value))))}
                className="glass"
                style={{ padding: 10, borderRadius: 12, border: "1px solid var(--border)", background: "transparent", color: "inherit" }}
                type="number"
                min={0}
              />
            </label>

            <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
              <div className="pill">ультипликатор: {mult.toFixed(2)}</div>
              <div className="pill">отенциал: {potential}</div>
            </div>

            <button className="btn btnPrimary" onClick={place} style={{ width: "100%", marginTop: 12 }}>
              ринять (игра)
            </button>

            <div className="footer" style={{ marginTop: 12 }}>
              Coins — внутриигровые. е продаются и не выводятся.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
