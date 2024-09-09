import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import * as k from "./commands/KBot.js";
config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

function readyDiscord() {
  console.log("❤️" + client.user.tag);
}

async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "choochoo") {
    await k.execute(interaction);
  }
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);
