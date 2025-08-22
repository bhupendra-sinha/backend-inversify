import { z } from 'zod';
import { config } from 'dotenv';
import { LogType, NodeType } from '@core/enums';

config();

export const envSchema = z.object({
	NODE_ENV: z.nativeEnum(NodeType).default(NodeType.DEVELOPMENT),
	PORT: z.coerce.number().positive().default(8080),
	SERVER_URL: z.string().url().default('http://localhost:8080'),
	FE_APP_URL: z.string().default('http://localhost:5173'),
	SERVER_LOG_LEVEL: z.nativeEnum(LogType).default(LogType.SILLY),
	// Database Config
	PG_HOST: z.string().default('localhost'),
	PG_PORT: z.coerce.number().positive().default(5432),
	PG_USER: z.string().default('postgres'),
	PG_PASSWORD: z.string().default('postgres'),
	PG_DATABASE_NAME: z.string().default('postgres'),
	PG_LOGGING: z.coerce.boolean().default(false)
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	console.error('❌ Invalid environment variables:', env.error.format());
	throw new Error('❌ Invalid environment variables');
}

export const validateEnv = env.data;
