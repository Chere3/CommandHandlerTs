import { Collection, Client } from "discord.js";
import { config } from "./config";
import { handlers } from "./Util/Functions/handlers";
import Captain from "captainjs";
import login from "./Database/login";
import "./Typings";

global.prettyConsole = new Captain.Console({
  use_colors: true,
  debug: false,
  format: "§8[§d%time%§8] [%prefix%§8] §7%message%",
  log_prefix: "§aLog",
  warn_prefix: "§eWarn",
  error_prefix: "§cError",
  info_prefix: "§bInfo",
  debug_prefix: "§bDebug",
});

const TempoClient = new Client({
  intents: [
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
    "GUILDS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILD_WEBHOOKS",
  ],
  allowedMentions: { repliedUser: false, parse: ["users"] },
});

TempoClient.slashCommands = new Collection();
TempoClient.commands = new Collection();

handlers(TempoClient);

login.then(() => {
  global.prettyConsole.log(`Se ha conectado a la database satisfactoriamente.`);
});

TempoClient.login(config.auth.token);
