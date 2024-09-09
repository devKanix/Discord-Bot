import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("choochoo")
  .setDescription("This is Demo of KBot!");

export async function execute(interaction) {
  try {
    await interaction.reply("Hello User!");
  } catch (error) {
    console.error("Error executing 'choochoo' command:", error);
    await interaction.reply("An error occurred while executing this command.");
  }
}
