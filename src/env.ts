import { config as loadEnv } from "dotenv";

loadEnv();

function requireEnv(name: "TOKEN" | "MONGO_URI"): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  TOKEN: requireEnv("TOKEN"),
  MONGO_URI: requireEnv("MONGO_URI"),
};
