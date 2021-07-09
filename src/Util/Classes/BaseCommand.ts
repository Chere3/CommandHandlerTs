import { MessageEmbed, Client, Collection, Message, PermissionResolvable } from "discord.js"
import { owners } from "../assets/owners"
import { TempContext } from './Context'


interface options {
    name: string
    dev?: boolean
    guildOnly?: boolean
    nsfw?: boolean
    aliases?: string[]
    status?: boolean
    category?: string
    cooldown?: number
    description?: string
    botPermissions?: string[]
    memberPermissions?: string[]
    usage?(prefix: string): string
    example?(prefix: string): string
}


export class BaseCommand {
    bot: Client
    name: string
    dev: boolean
    guildOnly: boolean
    nsfw: boolean
    aliases: string[]
    status: boolean
    category: string
    cooldown: number
    cooldowns: Collection<string, number>
    description: string
    botPermissions: string[]
    memberPermissions: string[]
    usage: any
    example: any
    devs: typeof owners
    constructor(client: Client, options: options) {
        this.bot = client
        this.name = options.name
        this.dev = options.dev || false
        this.guildOnly = options.guildOnly || false
        this.nsfw = options.nsfw || false
        this.aliases = options.aliases || []
        this.status = options.status || true
        this.category = options.category || 'bot'
        this.cooldown = options.cooldown || 2
        this.cooldowns = new Collection()
        this.description = options.description || 'Does\'nt have description'
        this.usage = options.usage || ((prefix) => `${prefix}${options.name}`)
        this.example = options.example || ((prefix) => `${prefix}${options.name}`)
        this.botPermissions = options.botPermissions || []
        this.memberPermissions = options.memberPermissions || []
    }

    canRun(msg, isDev: boolean) {
        const e = new MessageEmbed()
            .setColor(`FF0000`)
            .setTimestamp()

        if (this.dev === true && !owners.includes(msg.author.id)) return msg.channel.send(e.setDescription(`❌ | Lo siento, pero este comando esta creado solo para owners.`))
        if (this.guildOnly === true && !msg.guild) return msg.channel.send(e.setDescription(`❌ | Este comando solo esta permitido dentro de servidores.`))
        if (!this.status && !owners.includes(msg.author.id)) return msg.channel.send(e.setDescription(`❌ | Comando bajo mantenimiento o desabilitado.`))
        if (this.checkCooldown(msg) && !owners.includes(msg.author.id)) {
            const now = Date.now()
            const time = this.cooldowns.get(msg.author.id)
            const timeLeft = (time - now) / 1000
            return msg.channel.send(e.setDescription(`❌ | Hey, tranquilo, puedes ejecutar este comando de nuevo en ${timeLeft.toFixed(1)} segundos.`))
        }
        if (this.nsfw === true && msg.channel.nsfw === false && !owners.includes(msg.author.id)) return msg.channel.send(e.setDescription(`❌ | Comando exclusivo para canales NSFW.`))
        if (msg.guild && this.botPermissions[0] && !this.botPermissions.some((x) => msg.guild.me.hasPermission(x as PermissionResolvable))) {
            return msg.channel.send(e.setDescription(`❌ | No tengo los siguientes permisos para el comando: \`${(this.botPermissions.map(x => this.parsePermission(x))).join(', ')}\``))
        }
        if (msg.guild && this.memberPermissions[0] && !this.memberPermissions.some((x) => msg.member.hasPermission(x as PermissionResolvable)) && !isDev) {
            return msg.channel.send(e.setDescription(`❌ | No tienes los suficientes permisos para correr el comando: \`${(this.memberPermissions.map(x => this.parsePermission(x))).join(', ')}\``))
        }

        return false
    }

    checkCooldown(msg: Message) {
        if (this.cooldowns.has(msg.author.id)) return true;
        this.cooldowns.set(msg.author.id, Date.now() + (this.cooldown * 1000))
        setTimeout(() => {
            this.cooldowns.delete(msg.author.id)
        }, this.cooldown * 1000);
        return false;
    }

    parsePermission(permission: string) {
        return permission.toLowerCase()
            .replace(/_/g, ' ')
            .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    }

    run(ctx: TempContext) { }
}