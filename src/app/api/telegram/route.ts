import { Bot, InlineKeyboard } from "grammy";

export const runtime = "nodejs"; // важно для стабильности на Vercel

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const token = mustEnv("TG_BOT_TOKEN");
const secret = mustEnv("TG_WEBHOOK_SECRET");

const bot = new Bot(token);

bot.command("start", async (ctx) => {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://catch-the-tempo.vercel.app";
  const kb = new InlineKeyboard()
    .url("📡 Открыть сайт", site)
    .url("🚀 Открыть Mini App", site); // позже заменим на WebApp кнопку

  await ctx.reply(
    "📡 Catch the tempo\n\nЯ буду давать шортлисты/алерты и открывать миниап.\n\nВыбирай кнопку ниже:",
    { reply_markup: kb }
  );
});

bot.on("message:text", async (ctx) => {
  await ctx.reply("Напиши /start 🙂");
});

export async function POST(req: Request) {
  // Telegram будет присылать этот заголовок, если мы зададим secret_token при setWebhook
  const incomingSecret = req.headers.get("x-telegram-bot-api-secret-token");
  if (incomingSecret !== secret) {
    return new Response("unauthorized", { status: 401 });
  }

  const update = await req.json();
  await bot.handleUpdate(update);
  return new Response("ok");
}