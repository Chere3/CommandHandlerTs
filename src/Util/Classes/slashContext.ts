import {
  Client,
  CommandInteraction,
  CommandInteractionOption,
} from "discord.js";
import { config } from "../../config";

export class SlashContext {
  interaction: CommandInteraction;
  client: Client;
  config: typeof config;
  options: readonly CommandInteractionOption[];
  constructor(temp: Client, interaction) {
    this.interaction = interaction;
    this.options = [];
    this.client = temp;
    this.config = config;
  }

  get author() {
    return this.interaction.user;
  }

  get channel() {
    return this.interaction.channel;
  }

  get guild() {
    return this.interaction.guild;
  }
}
