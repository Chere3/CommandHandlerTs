import { Collection } from 'discord.js'
import { BaseCommand } from '../Util/Classes/BaseCommand'
import Captain from 'captainjs'

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, BaseCommand>
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string
            MONGO_URI: string
        }

        interface Global {
            prettyConsole: Captain.Console
        }
    }
}