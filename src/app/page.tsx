const BOT_URL = process.env.NEXT_PUBLIC_TG_BOT_URL ?? "https://t.me/catchthetempo_bot";

export default function Page() {
  return (
    <main className="container">
      <header style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
        <div>
          <div className="pill">налитика  бучение  ез ставок</div>
          <h1 className="h1" style={{ marginTop: 14 }}> Catch the tempo</h1>
          <p className="sub">
            ини-приложение в Telegram: сценарии матчей, вероятности и разборы как в матч-центре , но без приёма ставок.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a className="btn" href="/mini">ткрыть Mini App </a>
          <a className="btn" href="/guides">бучение </a>
          <a className="btn btnPrimary" href={BOT_URL}>ткрыть бота</a>
        </div>
      </header>

      <section className="grid">
        <div className="glass card">
          <div className="cardTitle">Сценарии матчей</div>
          <div className="cardText">ишем что вероятнее произойдёт и почему: темп, моменты, состав, форма.</div>
        </div>

        <div className="glass card">
          <div className="cardTitle">ероятности</div>
          <div className="cardText">ценка вероятности по логике и данным (когда будут). ез обещаний и без гарантий.</div>
        </div>

        <div className="glass card">
          <div className="cardTitle">атч-центр</div>
          <div className="cardText">Табличный стиль как у : удобно смотреть лиги, матчи, обновления и разборы.</div>
        </div>

        <div className="glass card">
          <div className="cardTitle">бучение</div>
          <div className="cardText">ороткие уроки: как мыслить вероятностями, ошибки новичков, дисциплина, риск.</div>
        </div>
      </section>

      <footer className="footer">
         исклеймер: это аналитика и обучение. Ставки не принимаем. ичего не гарантируем.
      </footer>
    </main>
  );
}
