# 🤖 Telegram AI Bot with Groq API (Deno)

This repository contains a Telegram bot built using Deno and the [grammY](https://grammy.dev/) library. The bot integrates Groq's API to generate AI-powered responses and transcribe voice messages using Whisper.

## 🚀 Features

- 💬 **AI Chat** – Uses **LLaMA-3** (70B) for intelligent replies.
- 🎙 **Voice Transcription** – Converts voice messages into text using **Whisper v3**.
- 🌎 **Language-Aware** – Replies in the same language as the user's message.
- ⚡ **Lightweight & Fast** – Runs on Deno, requiring no complex setup.

## 🛠 Setup & Installation

### 1️⃣ Install Deno (if not installed)
Download and install Deno from [deno.land](https://deno.land/).

### 2️⃣ Clone this repository
```sh
git clone https://github.com/yourusername/telegram-groq-bot.git
cd telegram-groq-bot

3️⃣ Create a Telegram Bot

Open BotFather on Telegram.

Create a new bot and get the BOT_TOKEN.


4️⃣ Get a Groq API Key

Sign up at Groq API.

Get your API Key for AI responses.


5️⃣ Configure Your Bot

Open bot.ts and replace:

const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const GROQ_API_KEY = "YOUR_GROQ_API_KEY";

6️⃣ Run the Bot

Start the bot using:

deno run --allow-net bot.ts

📜 Commands & Usage

/start – Start the bot.

Send a text message – Get an AI-generated response.

Send a voice message – Get a transcribed text response.


🏗 Built With

Deno – Secure runtime for JavaScript & TypeScript.

grammY – Telegram Bot Framework.

Groq API – AI chat & voice transcription.


📜 License

This project is licensed under the MIT License.


---

👨‍💻 Author: victorgeel
⭐ If you like this project, consider giving it a star!


