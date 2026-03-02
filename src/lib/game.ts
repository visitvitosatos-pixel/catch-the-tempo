export type MarketPick = {
  matchId: string;
  marketKey: string;   // e.g. "1X2:HOME", "OU:2.5:OVER"
  label: string;       // text shown to user
  price: number;       // "odds"-like multiplier
};

export type Ticket = {
  id: string;
  createdAt: number;
  stake: number;       // coins
  picks: MarketPick[];
  type: "single" | "express";
};

const COINS_KEY = "ctt_coins";
const COUPON_KEY = "ctt_coupon";

export function getCoins(): number {
  const v = localStorage.getItem(COINS_KEY);
  const n = v ? Number(v) : 0;
  if (!Number.isFinite(n) || n <= 0) return 1000; // стартовый банк
  return Math.floor(n);
}

export function setCoins(n: number) {
  localStorage.setItem(COINS_KEY, String(Math.max(0, Math.floor(n))));
}

export function getCoupon(): MarketPick[] {
  const raw = localStorage.getItem(COUPON_KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter(Boolean);
  } catch {
    return [];
  }
}

export function setCoupon(picks: MarketPick[]) {
  localStorage.setItem(COUPON_KEY, JSON.stringify(picks));
}

export function addToCoupon(p: MarketPick) {
  const c = getCoupon();
  // убираем дубликат по matchId+marketKey (как в  — одно событие на купон)
  const next = c.filter(x => !(x.matchId === p.matchId && x.marketKey === p.marketKey));
  next.push(p);
  setCoupon(next);
}

export function removeFromCoupon(matchId: string, marketKey: string) {
  const c = getCoupon();
  setCoupon(c.filter(x => !(x.matchId === matchId && x.marketKey === marketKey)));
}

export function clearCoupon() {
  setCoupon([]);
}

export function calcExpressMultiplier(picks: MarketPick[]) {
  return picks.reduce((acc, p) => acc * (p.price || 1), 1);
}

export function uid(prefix = "t") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}
