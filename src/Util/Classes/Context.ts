import { config } from "../../config";
import { Message, MessageEmbed, Client } from "discord.js";

type options = "boterror" | "error" | "info" | "good" | undefined;

export class TempContext {
  message: Message;
  client: Client;
  config: typeof config;
  args: string[];
  constructor(Temp: Client, message: Message) {
    this.message = message;
    this.client = Temp;
    this.config = config;
    this.args = [];
  }

  get channel() {
    return this.message.channel;
  }
  get guild() {
    return this.message.guild;
  }
  get user() {
    return this.message.author;
  }
  get member() {
    return this.message.member;
  }

  send(content: any, adds?: any) {
    return this.channel.send(content).catch((e) => {
      console.log(e);
    });
  }
}
