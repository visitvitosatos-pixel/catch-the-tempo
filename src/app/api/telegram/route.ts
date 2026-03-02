import { Bot, InlineKeyboard } from "grammy";

export const runtime = "nodejs";

function createBotOrNull() {
  const token = process.env.TG_BOT_TOKEN;
  if (!token) return null;

  const bot = new Bot(token);

  bot.command("start", async (ctx) => {
    const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://catch-the-tempo.vercel.app";
    const miniUrl = `${site}/mini`;

    const botUrl = process.env.NEXT_PUBLIC_TG_BOT_URL ?? "https://t.me/catchthetempo_bot";
    const deepLink = `${botUrl}?startapp`;

    const kb = new InlineKeyboard()
      .webApp(" ткрыть Mini App", miniUrl)
      .row()
      .url(" Ссылка для канала (deeplink)", deepLink)
      .row()
      .url(" ткрыть сайт", site);

    await ctx.reply(
      " Catch the tempo\n\nналитика и обучение (без ставок).\n\nткрывай Mini App кнопкой ниже ",
      { reply_markup: kb }
    );
  });

  bot.on("message:text", async (ctx) => {
    await ctx.reply("апиши /start ");
  });

  return bot;
}

let cachedBot: Bot | null | undefined;
let isInitialized = false;

async function getBotReady() {
  if (cachedBot === undefined) {
    cachedBot = createBotOrNull();
  }
  if (!cachedBot) return null;

  if (!isInitialized) {
    await cachedBot.init();
    isInitialized = true;
  }
  return cachedBot;
}

export async function POST(req: Request) {
  const bot = await getBotReady();
  if (!bot) {
    return new Response("TG_BOT_TOKEN is missing (bot not configured)", { status: 503 });
  }

  const update = await req.json();
  await bot.handleUpdate(update);
  return new Response("ok", { status: 200 });
}

export async function GET() {
  const hasToken = !!process.env.TG_BOT_TOKEN;
  return new Response(
    hasToken
      ? "telegram webhook endpoint is configured"
      : "telegram webhook endpoint is NOT configured (set TG_BOT_TOKEN)",
    { status: hasToken ? 200 : 503 }
  );
}
