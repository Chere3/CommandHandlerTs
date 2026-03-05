import { config as envconfig } from "dotenv";

envconfig();

function required(name: "TOKEN" | "MONGO_URI"): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`[config] Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  auth: {
    token: required("TOKEN"),
    mongoURI: required("MONGO_URI"),
  },
  prefix: "!",
  invite: "Link invitación bot",
  serverInvite: "Link server soporte",
  owners: ["id1", "id2"],
};
