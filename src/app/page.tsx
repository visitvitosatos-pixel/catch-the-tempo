export default function Page() {
  return (
    <main className="container" style={{ paddingTop: 18 }}>
      <div className="glass" style={{ padding: 18 }}>
        <div className="pill">ИГРА · Симулятор БК · 0 платежей · 0 выигрышей</div>

        <h1 className="h1" style={{ marginTop: 12, fontSize: 40 }}>Catch the tempo</h1>
        <p className="sub" style={{ marginTop: 8 }}>
          Это игра. Внутриигровые coins и рейтинг. Никаких пополнений, денег и вывода.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <a className="btn btnPrimary" href="/prematch">🚀 Играть (Prematch)</a>
          <a className="btn" href="/live">🔴 LIVE</a>
          <a className="btn" href="/coupon">🧾 Купон</a>
          <a className="btn" href="/leaderboard">🏆 Рейтинг</a>
          <a className="btn" href="/guides">📚 Обучение</a>
        </div>

        <div style={{ marginTop: 16 }} className="grid">
          <div className="glass card">
            <div className="cardTitle">Линия как в БК</div>
            <div className="cardText">1X2, двойной шанс, ОЗ, ТБ/ТМ 0.5–6.5, форы -3.5..+3.5 и т.д.</div>
          </div>

          <div className="glass card">
            <div className="cardTitle">Coins</div>
            <div className="cardText">Очки внутри игры. Не покупаются и не выводятся. Только прогресс.</div>
          </div>

          <div className="glass card">
            <div className="cardTitle">Рейтинг</div>
            <div className="cardText">Таблица игроков и сезоны. Позже добавим ELO по результатам.</div>
          </div>

          <div className="glass card">
            <div className="cardTitle">Дисклеймер</div>
            <div className="cardText">Это симулятор. Никаких денег, выплат и ставок у нас нет.</div>
          </div>
        </div>

        <footer className="footer" style={{ marginTop: 14 }}>
          ⚠️ Важно: coins не имеют ценности, не продаются и не обмениваются.
        </footer>
      </div>
    </main>
  );
}
