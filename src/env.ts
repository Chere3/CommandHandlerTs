import { config as loadEnv } from "dotenv";

loadEnv();

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`[config] Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  TOKEN: required("TOKEN"),
  MONGO_URI: required("MONGO_URI"),
};
