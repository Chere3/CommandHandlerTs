import { TempContext } from "../Util/Classes/Context"
import { config } from "../config"

const { prefix } = config;

export const run = async (bot, msg) => {
    if (msg.author.bot) return;     
    if (!msg.content.startsWith(prefix)) return;
    const message = new TempContext(bot, msg);

    message.args = msg.content.slice(prefix.length).trim().split(/ +/g)

    const args = message.args,
        command = args.shift().toLowerCase();

    let cmd = message.client.commands.get(command) || message.client.commands.find(c => c.aliases && c.aliases.includes(command))
    if (!cmd) return;
    if (cmd.canRun(msg, false)) return;
    

    cmd.run(message)
}