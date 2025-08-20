import { z } from "zod";
import { config } from "dotenv";
import LogType from "../enums";

config();

export const envSchema = z.object({
  SERVER_LOG_LEVEL: z.nativeEnum(LogType).default(LogType.INFO),
  // Database Config
  PG_HOST: z.string().default("localhost"),
  PG_PORT: z.coerce.number().positive().default(5432),
  PG_USER: z.string().default("postgres"),
  PG_PASSWORD: z.string().default("postgres"),
  PG_DATABASE_NAME: z.string().default("postgres"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  throw new Error("❌ Invalid environment variables");
}

export const validateEnv = env.data;
