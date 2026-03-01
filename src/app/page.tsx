const BOT_URL = process.env.NEXT_PUBLIC_TG_BOT_URL ?? "https://t.me/catchthetempo_bot";

export default function Page() {
  return (
    <main className="container">
      <header style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
        <div>
          <div className="pill">VIP Radar · Футбол</div>
          <h1 className="h1" style={{ marginTop: 14 }}>📡 Catch the tempo</h1>
          <p className="sub">Премиум-шортлисты и алерты: ТБ, ИТБ, ОЗ — под темп лайва.</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a className="btn" href="/guides">Гайды →</a>
          <a className="btn btnPrimary" href={BOT_URL}>Открыть в Telegram</a>
        </div>
      </header>

      <section className="grid">
        <div className="glass card">
          <div className="cardTitle">Тоталы (ТБ/ТМ)</div>
          <div className="cardText">Шортлист по лигам/командам + лайв-подтверждение.</div>
        </div>

        <div className="glass card">
          <div className="cardTitle">ИТБ (инд. тоталы)</div>
          <div className="cardText">Берём “кто забьёт”, когда исход шумный.</div>
        </div>

        <div className="glass card">
          <div className="cardTitle">ОЗ (оба забьют)</div>
          <div className="cardText">Только когда моменты есть у обеих.</div>
        </div>

        <div className="glass card">
          <div className="cardTitle">Лайв-алерты</div>
          <div className="cardText">Гол, перерыв/конец, красная — трекаем выбранное.</div>
        </div>
      </section>

      <footer className="footer">Ставки — это риск. Только аналитика, без гарантий.</footer>
    </main>
  );
}