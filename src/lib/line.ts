export type Match = {
  id: string;
  league: string;
  startTime: string; // "19:30"
  home: string;
  away: string;
  isLive?: boolean;
  minute?: number;
};

export type Outcome = {
  key: string;
  label: string;
  price: number;
};

export type Market = {
  title: string;      // "1X2", "Тоталы", ...
  key: string;        // stable key group
  outcomes: Outcome[];
};

function roundPrice(x: number) {
  // “как ”: 1.01..20.00
  const v = Math.max(1.01, Math.min(20, x));
  return Math.round(v * 100) / 100;
}

// ростая генерация "линии" (пока мок):
// baseSkill: -1..+1 (дом сильнее/слабее), liveShift: -0.3..+0.3
function priceFromProb(p: number, margin = 0.06) {
  // добавим маржу (игровую, для экономики)
  const pm = Math.min(0.98, Math.max(0.02, p * (1 - margin)));
  return roundPrice(1 / pm);
}

export function buildMarkets(m: Match, baseSkill = 0, liveShift = 0): Market[] {
  // 1X2 вероятности (очень грубо, но достаточно для MVP)
  const ph = 0.45 + 0.18 * baseSkill + 0.10 * liveShift;
  const pd = 0.27 - 0.06 * baseSkill;
  const pa = 1 - ph - pd;

  const pHome = clamp(ph, 0.12, 0.75);
  const pDraw = clamp(pd, 0.10, 0.40);
  const pAway = clamp(pa, 0.12, 0.75);

  const m1x2: Market = {
    title: "1X2",
    key: "1X2",
    outcomes: [
      { key: "HOME", label: "1", price: priceFromProb(pHome) },
      { key: "DRAW", label: "X", price: priceFromProb(pDraw) },
      { key: "AWAY", label: "2", price: priceFromProb(pAway) },
    ],
  };

  const p1x = clamp(pHome + pDraw, 0.2, 0.95);
  const p12 = clamp(pHome + pAway, 0.2, 0.95);
  const px2 = clamp(pAway + pDraw, 0.2, 0.95);

  const doubleChance: Market = {
    title: "войной шанс",
    key: "DC",
    outcomes: [
      { key: "1X", label: "1X", price: priceFromProb(p1x) },
      { key: "12", label: "12", price: priceFromProb(p12) },
      { key: "X2", label: "X2", price: priceFromProb(px2) },
    ],
  };

  //  (обе забьют)
  const pBttsYes = clamp(0.48 + 0.10 * (1 - Math.abs(baseSkill)) + 0.06 * liveShift, 0.2, 0.8);
  const btts: Market = {
    title: "бе забьют",
    key: "BTTS",
    outcomes: [
      { key: "YES", label: " — а", price: priceFromProb(pBttsYes) },
      { key: "NO", label: " — ет", price: priceFromProb(1 - pBttsYes) },
    ],
  };

  // Тоталы 0.5..6.5
  const totals: Market = {
    title: "Тотал (Т/Т)",
    key: "OU",
    outcomes: buildTotals(baseSkill, liveShift),
  };

  // оры -3.5..+3.5
  const handicaps: Market = {
    title: "ора (AH)",
    key: "AH",
    outcomes: buildHandicaps(baseSkill, liveShift),
  };

  return [m1x2, doubleChance, btts, totals, handicaps];
}

function buildTotals(baseSkill: number, liveShift: number): Outcome[] {
  const lines = [0.5,1.5,2.5,3.5,4.5,5.5,6.5];
  // “ожидаемая результативность” грубо
  const goalMood = clamp(0.5 + 0.2 * (1 - Math.abs(baseSkill)) + 0.15 * liveShift, 0.2, 0.9);

  return lines.flatMap((t) => {
    // чем выше линия, тем меньше шанс Т
    const pOver = clamp(goalMood - 0.10 * (t - 2.5), 0.05, 0.95);
    const pUnder = 1 - pOver;
    return [
      { key: `OVER:${t}`, label: `Т ${t}`, price: priceFromProb(pOver) },
      { key: `UNDER:${t}`, label: `Т ${t}`, price: priceFromProb(pUnder) },
    ];
  });
}

function buildHandicaps(baseSkill: number, liveShift: number): Outcome[] {
  const lines = [-3.5,-2.5,-1.5,-0.5,0.5,1.5,2.5,3.5];
  const form = clamp(0.5 + 0.25 * baseSkill + 0.12 * liveShift, 0.05, 0.95);

  return lines.flatMap((h) => {
    // если h отрицательная (дом -1.5), то шанс “дом с форой” ниже
    const shift = -0.08 * h; // -1.5 -> +0.12 (тяжелее), +1.5 -> -0.12 (легче)
    const pHomeH = clamp(form - shift, 0.05, 0.95);
    const pAwayH = 1 - pHomeH;

    const sign = h > 0 ? `+${h}` : `${h}`;
    return [
      { key: `HOME:${h}`, label: `1 ${sign}`, price: priceFromProb(pHomeH) },
      { key: `AWAY:${h}`, label: `2 ${-h > 0 ? `+${-h}` : `${-h}`}`, price: priceFromProb(pAwayH) },
    ];
  });
}

function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(b, x));
}
