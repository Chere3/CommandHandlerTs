import { env } from "./env";

export const config = {
  auth: {
    token: env.TOKEN,
    mongoURI: env.MONGO_URI,
  },
  prefix: "!",
  invite: "Link invitación bot",
  serverInvite: "Link server soporte",
  owners: ["id1", "id2"] as string[],
};
