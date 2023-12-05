import TelegramBot from "node-telegram-bot-api";

const token = "6911023922:AAHP9puz4TAhId9qgypO8tIwGKeOcei6JW0";

const bot = new TelegramBot(token, { polling: true });

export const SendMessageToBot = async (templateMessageText) => {
    try {
      const channelId = "-1002145759610"; // Замініть на ідентифікатор вашого каналу
      bot.sendMessage(channelId, templateMessageText, { parse_mode: "HTML" });
    } catch (error) {
      console.error("Error in sendPeriodicMessages:", error);
    }
  };