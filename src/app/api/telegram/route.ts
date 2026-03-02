import { Bot, InlineKeyboard } from "grammy";

export const runtime = "nodejs";

const token = process.env.TG_BOT_TOKEN!;
if (!token) {
  throw new Error("TG_BOT_TOKEN is missing");
}

const bot = new Bot(token);

// Инициализация один раз
let isInitialized = false;

async function initBot() {
  if (!isInitialized) {
    await bot.init();
    isInitialized = true;
  }
}

bot.command("start", async (ctx) => {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://catch-the-tempo.vercel.app";

  const kb = new InlineKeyboard()
    .url("📡 Открыть сайт", site)
    .url("🚀 Открыть Mini App", site);

  await ctx.reply(
    "📡 Catch the tempo\n\nЯ буду давать шортлисты и алерты.\n\nВыбирай кнопку ниже:",
    { reply_markup: kb }
  );
});

bot.on("message:text", async (ctx) => {
  await ctx.reply("Напиши /start 🙂");
});

export async function POST(req: Request) {
  await initBot(); // <<< ВАЖНО

  const update = await req.json();
  await bot.handleUpdate(update);

  return new Response("ok", { status: 200 });
}