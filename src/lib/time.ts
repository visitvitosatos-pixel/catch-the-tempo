export function parseHHMM(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return { h, m };
}

export function secondsToHHMMSS(s: number) {
  const x = Math.max(0, Math.floor(s));
  const hh = String(Math.floor(x / 3600)).padStart(2, "0");
  const mm = String(Math.floor((x % 3600) / 60)).padStart(2, "0");
  const ss = String(x % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function getCountdownSeconds(hhmm: string) {
  const t = parseHHMM(hhmm);
  if (!t) return null;

  const now = new Date();
  const start = new Date();
  start.setHours(t.h, t.m, 0, 0);

  const diff = Math.floor((start.getTime() - now.getTime()) / 1000);
  return diff;
}
