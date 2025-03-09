// Run with: deno run --allow-net --allow-read=.env bot.ts

import "https://deno.land/std@0.220.1/dotenv/load.ts"; // Load environment variables
import { Bot } from "https://deno.land/x/grammy@v1.20.3/mod.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")!;
const GROQ_API_URL = Deno.env.get("GROQ_API_URL")!;
const WHISPER_API_URL = Deno.env.get("WHISPER_API_URL")!;
const TEXT_MODEL = Deno.env.get("TEXT_MODEL")!;
const WHISPER_MODEL = Deno.env.get("WHISPER_MODEL")!;

const bot = new Bot(BOT_TOKEN);

// Start command
bot.command("start", (ctx) => {
  ctx.reply("👋 Hello! Send me a message, and I'll reply using AI.");
});

// Handle text messages
bot.on("message:text", async (ctx) => {
  const userMessage = ctx.message.text;
  const messageId = ctx.message.message_id;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [
          { role: "system", content: "Reply in the same language as the user's message." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    const botResponse = data.choices?.[0]?.message?.content || "⚠️ Error: Unexpected AI response.";
    await ctx.reply(botResponse, { reply_to_message_id: messageId });

  } catch (error) {
    console.error("Error generating response:", error);
    ctx.reply("⚠️ Sorry, I encountered an error processing your request.");
  }
});

// Handle voice messages (transcription)
bot.on("message:voice", async (ctx) => {
  try {
    const file = await ctx.getFile();
    const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;

    const response = await fetch(WHISPER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: WHISPER_MODEL,
        file: fileUrl,
        language: "auto",
      }),
    });

    const data = await response.json();
    const transcription = data.text || "⚠️ Error transcribing audio.";
    ctx.reply(`🗣 Transcription: ${transcription}`, { reply_to_message_id: ctx.message.message_id });

  } catch (error) {
    console.error("Error processing voice message:", error);
    ctx.reply("⚠️ Sorry, I encountered an error transcribing your audio.");
  }
});

// Start the bot
await bot.start();
console.log("✅ Telegram bot started successfully.");
