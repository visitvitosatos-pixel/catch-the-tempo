export default function Guides() {
  return (
    <main className="container" style={{ paddingTop: 16 }}>
      <div className="glass" style={{ padding: 16 }}>
        <div className="pill">  бучение</div>
        <h1 className="h1" style={{ marginTop: 10 }}>айды</h1>
        <p className="sub" style={{ marginTop: 6 }}>
          оротко и по делу: как читать линию, как не тильтовать и как мыслить вероятностями.
          то симулятор  денег нет.
        </p>

        <div className="grid" style={{ marginTop: 14 }}>
          <div className="glass card">
            <div className="cardTitle">1) ероятности</div>
            <div className="cardText">очему 100% не бывает. ак оценивать риск и выбирать рынки.</div>
          </div>
          <div className="glass card">
            <div className="cardTitle">2) ынки</div>
            <div className="cardText">1X2, , Т/Т, форы  что означает каждая линия и как читать.</div>
          </div>
          <div className="glass card">
            <div className="cardTitle">3) исциплина</div>
            <div className="cardText">лавное  стабильность. икаких догонов и эмоций.</div>
          </div>
          <div className="glass card">
            <div className="cardTitle">4) налитика</div>
            <div className="cardText">орма, темп, моменты, состав. очему хайп часто обманывает.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <a className="btn btnPrimary" href="/prematch"> игру (Prematch)</a>
          <a className="btn" href="/live">LIVE</a>
          <a className="btn" href="/">а главную</a>
        </div>

        <div className="footer" style={{ marginTop: 14 }}>
          исклеймер: это игра-симулятор. Coins не продаются и не выводятся.
        </div>
      </div>
    </main>
  );
}
