export const runtime = "nodejs";

export async function GET() {
  // Vercel добавляет эти env на билде. сли нет  просто покажем "unknown".
  const sha = process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown";
  const msg = process.env.VERCEL_GIT_COMMIT_MESSAGE ?? "";
  return Response.json({ sha, msg });
}
