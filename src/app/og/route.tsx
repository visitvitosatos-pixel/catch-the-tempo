import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{
        width:"1200px",height:"630px",display:"flex",alignItems:"center",justifyContent:"center",
        background:
          "radial-gradient(900px 520px at 20% 10%, rgba(119,182,255,.22), transparent 55%)," +
          "radial-gradient(760px 520px at 78% 18%, rgba(167,139,250,.20), transparent 60%)," +
          "linear-gradient(180deg, #07080a, #0b0d12)",
        color:"rgba(255,255,255,.92)",
        fontFamily:"ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}>
        <div style={{
          width:1040,height:450,borderRadius:28,border:"1px solid rgba(255,255,255,.14)",
          background:"linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03))",
          boxShadow:"0 18px 80px rgba(0,0,0,.6)",
          display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"42px 46px",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{
              padding:"10px 14px", borderRadius:999, border:"1px solid rgba(255,255,255,.16)",
              background:"rgba(255,255,255,.05)", fontSize:18, fontWeight:800, letterSpacing:0.2,
            }}>
              📡 VIP Radar · Football
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ fontSize:76, fontWeight:900, letterSpacing:-1.2 }}>
              📡 Catch the tempo
            </div>
            <div style={{ fontSize:26, color:"rgba(255,255,255,.72)", lineHeight:1.35, maxWidth:900 }}>
              Shortlists & alerts for live tempo:
              <span style={{ color:"rgba(255,255,255,.9)", fontWeight:800 }}> Totals · Team Totals · BTTS</span>
            </div>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            {["⚡ Live alerts","🎯 Smart shortlists","🖤 Noir UI"].map((tag) => (
              <div key={tag} style={{
                padding:"10px 14px", borderRadius:999, border:"1px solid rgba(255,255,255,.14)",
                background:"rgba(255,255,255,.045)", fontSize:18, fontWeight:800,
                color:"rgba(255,255,255,.84)",
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}