export default function Guides() {
  return (
    <main className="container">
      <div className="glass" style={{ padding: 22 }}>
        <div className="pill">бучение  ез ставок</div>
        <h1 className="h1" style={{ fontSize: 34, marginTop: 12 }}>айды</h1>
        <p className="sub">
          десь будут короткие уроки: как строить сценарии матча, как думать вероятностями, как не попадать в когнитивные ловушки.
          икаких ставок, VIP-сигналов и гарантий.
        </p>

        <div className="grid" style={{ marginTop: 16 }}>
          <div className="glass card">
            <div className="cardTitle">1) ероятности</div>
            <div className="cardText">очему уверен на 100%  плохая фраза, и как оценивать риск.</div>
          </div>
          <div className="glass card">
            <div className="cardTitle">2) Сценарии</div>
            <div className="cardText">ак описывать матч: темп, качество моментов, контратаки, стандарты.</div>
          </div>
          <div className="glass card">
            <div className="cardTitle">3) шибки</div>
            <div className="cardText">моции, выборка, подтверждение своей версии  что ломает аналитику.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <a className="btn" href="/mini">ткрыть Mini App</a>
          <a className="btn" href="/"> азад</a>
        </div>
      </div>
    </main>
  );
}
