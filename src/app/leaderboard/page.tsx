"use client";

export default function LeaderboardPage() {
  const rows = [
    { place: 1, name: "PlayerOne", rating: 1840, roi: "+12.4%" },
    { place: 2, name: "TempoKing", rating: 1795, roi: "+8.1%" },
    { place: 3, name: "AnalystX", rating: 1750, roi: "+6.7%" },
    { place: 4, name: "ColdMind", rating: 1688, roi: "+2.9%" },
    { place: 5, name: "Newbie", rating: 1510, roi: "-1.2%" },
  ];

  return (
    <main className="container" style={{ paddingTop: 16 }}>
      <div className="glass" style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div className="pill"> · ейтинг</div>
            <h1 className="h1" style={{ marginTop: 10 }}>Leaderboard</h1>
            <p className="sub" style={{ marginTop: 6 }}>
              Скоро сделаем реальный рейтинг по результатам прогнозов. Сейчас — мок.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a className="btn" href="/prematch">Prematch</a>
            <a className="btn" href="/live">LIVE</a>
            <a className="btn btnPrimary" href="/coupon">упон</a>
          </div>
        </div>

        <div style={{ marginTop: 14 }} className="glass">
          <div style={{ padding: 12, borderBottom: "1px solid var(--border)", fontWeight: 900 }}>
            гроки (сезон)
          </div>

          <div style={{ display: "grid" }}>
            {rows.map((r) => (
              <div key={r.place} style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 120px", gap: 10, padding: 12, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontWeight: 900 }}>#{r.place}</div>
                <div style={{ fontWeight: 900 }}>{r.name}</div>
                <div className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>ELO {r.rating}</div>
                <div className="pill" style={{ padding: "4px 10px", fontSize: 12 }}>{r.roi}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer" style={{ marginTop: 12 }}>
          исклеймер: игра-симулятор. икаких денег/платежей/вывода.
        </div>
      </div>
    </main>
  );
}
