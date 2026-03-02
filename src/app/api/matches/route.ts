import { buildMarkets, type Match } from "@/lib/line";

export const runtime = "nodejs";

function mockMatches(): Match[] {
  return [
    { id: "m1", league: "Premier League", startTime: "19:30", home: "Arsenal", away: "Newcastle" },
    { id: "m2", league: "La Liga", startTime: "20:00", home: "Real Sociedad", away: "Sevilla" },
    { id: "m3", league: "Serie A", startTime: "21:45", home: "Roma", away: "Atalanta" },
    { id: "m4", league: "LIVE", startTime: "LIVE", home: "Milan", away: "Inter", isLive: true, minute: 57 },
    { id: "m5", league: "LIVE", startTime: "LIVE", home: "PSG", away: "Marseille", isLive: true, minute: 12 },
  ];
}

// небольшая “динамика” для лайва
function liveShift(minute?: number) {
  if (!minute) return 0;
  const t = Math.min(90, Math.max(1, minute));
  // -0.25..+0.25
  return Math.round((Math.sin(t / 12) * 0.25) * 100) / 100;
}

export async function GET() {
  const matches = mockMatches().map((m) => {
    const baseSkill =
      m.id === "m1" ? 0.25 :
      m.id === "m2" ? 0.05 :
      m.id === "m3" ? -0.10 :
      m.id === "m4" ? 0.15 :
      0;

    const ls = m.isLive ? liveShift(m.minute) : 0;
    const markets = buildMarkets(m, baseSkill, ls);

    return { ...m, markets };
  });

  return Response.json({ matches }, { headers: { "Cache-Control": "no-store" } });
}
