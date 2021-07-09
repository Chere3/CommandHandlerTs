import { ShardingManager } from 'discord.js'
import { config } from './config'
import Captain from 'captainjs'
import path from 'path'
import './Typings'

global.prettyConsole = new Captain.Console({
    "use_colors": true,
    "debug": false,
    "format": "§8[§d%time%§8] [%prefix%§8] §7%message%",
    "log_prefix": "§aLog",
    "warn_prefix": "§eWarn",
    "error_prefix": "§cError",
    "info_prefix": "§bInfo",
    "debug_prefix": "§bDebug"
});

const Manager = new ShardingManager(path.join(`${__dirname}/main.ts`), {
    totalShards: "auto",
    token: config.auth.token,
    execArgv: ["node_modules/ts-node/dist/bin.js"]
})

Manager.spawn()

Manager.on("shardCreate", (shard) => {
    global.prettyConsole.log(`La shard ${shard.id + 1} fue creada.`)

    shard.on("disconnect", () => global.prettyConsole.log(`La shard ${shard.id + 1} se desconecto.`))
    shard.on("reconnecting", () => global.prettyConsole.log(`Shard ${shard.id + 1} resumida.`))
    shard.on("ready", () => global.prettyConsole.log(`La shard ${shard.id + 1} esta lista.`))
})