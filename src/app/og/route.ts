export const runtime = "nodejs";

export async function GET() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0f14"/>
      <stop offset="100%" stop-color="#101a2a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="80" y="180" fill="#ffffff" font-size="64" font-family="Arial, sans-serif" font-weight="700">Catch the tempo</text>
  <text x="80" y="260" fill="#b9c3d4" font-size="34" font-family="Arial, sans-serif">налитика и обучение (без ставок)</text>
  <text x="80" y="560" fill="#6f7b91" font-size="22" font-family="Arial, sans-serif">telegram mini app</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
