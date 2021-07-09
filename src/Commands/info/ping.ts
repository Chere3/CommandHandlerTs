import { TempContext } from "../../Util/Classes/Context"
import { BaseCommand } from "../../Util/Classes/BaseCommand"
import { Client } from 'discord.js'
import {MessageEmbed } from 'discord.js';


export default class PingCommand extends BaseCommand {
    constructor(client: Client) {
        super(client, {
            name: `ping`,
            description: `Test the bot`,
            guildOnly: false,
            dev: true
        })
    }

    async run(msg: TempContext) {
        var pong = await `Calculando...` 
        var pong2 = await `Calculando...`

        const embed = new MessageEmbed()
        .setTitle(`Ping!`)
        .setDescription(`Envío de mensajes: \`${pong}\`\n$Bot: \`${pong2}\``);
        const mensaje1 = await msg.message.channel.send(`estoy midiendo el ping uwur~`)
        var mensaje2 = await msg.message.channel.send(embed)
        await mensaje1.delete()
        var pong = await `${(msg.client.ws.ping) / 10000 } segundos`
        var pong2 = await `${Math.floor(mensaje2.createdTimestamp - mensaje1.createdTimestamp) / 100} segundos`

        const embed2 = new MessageEmbed()
        .setTitle(`Ping!`)
        .setDescription(`Envío de mensajes: \`${pong2}\`\n$Bot: \`${pong}\``)
        .setColor(`PURPLE`);
        await mensaje2.delete();
        await msg.channel.send(embed2)

    }
}