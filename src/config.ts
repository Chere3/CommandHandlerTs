import { config as envconfig } from 'dotenv'

envconfig()

export const config = {
    auth: {
        token: process.env.TOKEN,
        mongoURI: process.env.MONGO_URI
    },
    prefix: "!",
    invite: "Link invitación bot",
    serverInvite: "Link server soporte"
}