import { z } from 'zod';
import { envSchema } from './config.validation';

export type ValidatedEnv = z.infer<typeof envSchema>;

export interface DatabaseConfig {
	port: number;
	host: string;
	username: string;
	password: string;
	database: string;
	logging: boolean;
	entities: string[];
	synchronize: boolean;
	ssl: false | { rejectUnauthorized: boolean };
}

export interface CorsConfig {
	origin: string[];
	methods: string[];
	allowedHeaders: string[];
	credentials: boolean;
	maxAge: number;
}

export interface ServerConfig {
	logLevel: string;
	port: number;
}
