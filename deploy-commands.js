import { REST } from "discord.js";
import { config } from "dotenv";
import { Routes } from "discord-api-types/v9";
import fs from "fs";

config();

(async () => {
  const commands = [];
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const { data, execute } = await import(`./commands/${file}`);
    if (data && execute) {
      commands.push(data.toJSON());
    } else {
      console.log(
        `[WARNING] The command ${file} is missing a required "data" or "execute" property.`
      );
    }
  }

  const rest = new REST().setToken(process.env.TOKEN);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENTID,
        process.env.SERVERID
      ),
      {
        body: commands,
      }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
