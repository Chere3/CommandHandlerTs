import {
  Client,
  Collection,
  CommandInteraction,
  MessageEmbed,
  PermissionResolvable,
  PermissionString,
} from "discord.js";
import { config } from "../../config";
import { SlashContext } from "./slashContext";

interface options {
  name: string;
  description: string;
  category: string;
  dev?: boolean;
  nsfw?: boolean;
  cooldown?: number;
  botPermissions?: PermissionString[];
  userPermissions?: PermissionString[];
}

/**
 * @class BaseCommand
 * @param {string} name El nombre del slash command.
 * @param {string} description La descripción del slash command.
 * @param {string} category La categoría del slash command.
 * @param {boolean} dev Especifica si solo desarrolladores pueden usar este comando.
 * @param {boolean} nsfw Especifica si el slash command es solo para canales nsfw.
 * @param {number} cooldown El cooldown del slash command.
 */

export class BaseSlashCommand {
  bot: Client;
  name: string;
  description: string;
  category: string;
  dev: boolean;
  nsfw: boolean;
  cooldown: number;
  cooldowns: Collection<string, number>;
  botPermissions: PermissionString[];
  userPermissions: PermissionString[];
  constructor(client: Client, options: options) {
    this.bot = client;
    this.name = options.name;
    this.description = options.description;
    this.category = options.category;
    this.dev = options.dev || false;
    this.nsfw = options.nsfw || false;
    this.cooldown = options.cooldown || 2;
    this.cooldowns = new Collection();
    this.botPermissions = options.botPermissions || [];
    this.userPermissions = options.userPermissions || [];
  }

  canRun(int: CommandInteraction, isDev: boolean) {
    const e = new MessageEmbed()
      .setColor(0x00ff0000)
      .setAuthor(
        `No puedo ejecutar este comando.`,
        this.bot.user.displayAvatarURL()
      )
      .setTimestamp();

    int.guild.members.fetch(`${int.member.id}`).then((x) => {
      if (this.dev == true) {
        if (!config.owners.includes(x.id)) {
          return int.reply({
            embeds: [
              e.setDescription(
                `Lo siento pero solo los desarrolladores del bot\npueden ejecutar este comando.`
              ),
            ],
            ephemeral: true,
          });
        }
      }
      if (this.nsfw == true) {
        if (!int.channel.nsfw) {
          return int.reply({
            embeds: [
              e.setDescription(
                `Lo siento pero debes de estar en un canal\nnsfw para poder ejecutar este comando.`
              ),
            ],
            ephemeral: true,
          });
        }
      }
      if (this.checkCooldown(int)) {
        if (!config.owners.includes(x.id)) {
          {
            const now = Date.now();
            const time = this.cooldowns.get(int.member.id);
            const timeLeft = (time - now) / 1000;
            return int.reply({
              embeds: [
                e.setDescription(
                  `Lo siento pero debes esperar\n${timeLeft.toFixed(
                    0
                  )} segundos para poder ejecutar este comando.`
                ),
              ],
              ephemeral: true,
            });
          }
        }
      }

      if (this.botPermissions[0]) {
        if (
          !this.botPermissions.some((x) =>
            int.guild.me.permissions.has(x as PermissionResolvable)
          )
        ) {
          return int.reply({
            embeds: [
              e.setDescription(
                `Lo siento pero no tengo los permisos\nnecesarios para ejecutar este comando.\n\nPermisos que me faltan: \`${this.botPermissions
                  .map((x) => this.translatePermission(x))
                  .join(", ")}\``
              ),
            ],
            ephemeral: true,
          });
        }
      }
      if (this.userPermissions[0]) {
        if (
          !this.userPermissions.some((x) =>
            int.guild.me.permissions.has(x as PermissionResolvable)
          )
        ) {
          return int.reply({
            embeds: [
              e.setDescription(
                `Lo siento pero no tengo los permisos\nnecesarios para ejecutar este comando.\n\nPermisos que me faltan: \`${this.botPermissions
                  .map((x) => this.translatePermission(x))
                  .join(", ")}\``
              ),
            ],
            ephemeral: true,
          });
        }
      }
    });

    return false;
  }

  checkCooldown(int: CommandInteraction) {
    if (this.cooldowns.has(int.member.id)) return true;
    this.cooldowns.set(int.member.id, Date.now() + this.cooldown * 1000);
    setTimeout(() => {
      this.cooldowns.delete(int.member.id);
    }, this.cooldown * 1000);
    return false;
  }

  // translates the permissions of discord to spanish

  translatePermission(permission: string) {
    const a = permission
      .replace("CREATE_INSTANT_INVITE", "Crear invitaciones instantáneas")
      .replace("KICK_MEMBERS", "Expulsar miembros")
      .replace("BAN_MEMBERS", "Banear miembros")
      .replace("ADMINISTRATOR", "Administrador")
      .replace("MANAGE_CHANNELS", "Administrar canales")
      .replace("MANAGE_GUILD", "Administrar servidor")
      .replace("ADD_REACTIONS", "Añadir reacciones")
      .replace("VIEW_AUDIT_LOG", "Ver registro de auditoría")
      .replace("PRIORITY_SPEAKER", "Prioridad de voz")
      .replace("STREAM", "Transmitir")
      .replace("VIEW_CHANNEL", "Ver canales")
      .replace("SEND_MESSAGES", "Enviar mensajes")
      .replace("SEND_TTS_MESSAGES", "Enviar mensajes de voz por texto")
      .replace("MANAGE_MESSAGES", "Gestionar mensajes")
      .replace("EMBED_LINKS", "Enlaces incrustados")
      .replace("ATTACH_FILES", "Adjuntar archivos")
      .replace("READ_MESSAGE_HISTORY", "Leer historial de mensajes")
      .replace("MENTION_EVERYONE", "Mencionar @everyone o @here")
      .replace("USE_EXTERNAL_EMOJIS", "Usar emojis externos")
      .replace("VIEW_GUILD_INSIGHTS", "Ver información del servidor")
      .replace("CONNECT", "Conectar a canales de voz")
      .replace("SPEAK", "Hablar en canales de voz")
      .replace("MUTE_MEMBERS", "Silenciar miembros en canales de voz")
      .replace("DEAFEN_MEMBERS", "Ensordecer miembros en canales de voz")
      .replace("MOVE_MEMBERS", "Mover miembros de canales de voz")
      .replace("USE_VAD", "Usar voz activa")
      .replace("CHANGE_NICKNAME", "Cambiar su apodo")
      .replace("MANAGE_NICKNAMES", "Gestionar apodos")
      .replace("MANAGE_ROLES", "Gestionar roles")
      .replace("MANAGE_WEBHOOKS", "Gestionar webhooks")
      .replace("MANAGE_EMOJIS_AND_STICKERS", "Gestionar emojis y stickers")
      .replace("USE_APPLICATION_COMMANDS", "Usar comandos de aplicación")
      .replace("REQUEST_TO_SPEAK", "Solicitar hablar")
      .replace("MANAGE_THREADS", "Gestionar  hilos")
      .replace("USE_PUBLIC_THREADS", "Usar hilos públicos")
      .replace("USE_PRIVATE_THREADS", "Usar hilos privados")
      .replace("USE_EXTERNAL_STICKERS", "Usar stickers externos");

    return a;
  }
}
