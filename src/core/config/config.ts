import { injectable } from 'inversify';
import { AIServerConfig, CorsConfig, DatabaseConfig, RedisConfig, ServerConfig, ValidatedEnv } from './config.types';
import { validateEnv } from './config.validation';

@injectable()
export class ConfigService {
	private readonly env: ValidatedEnv;

	constructor() {
		this.env = validateEnv;
	}

	getServerConfig(): ServerConfig {
		return {
			port: this.env.PORT,
			logLevel: this.env.SERVER_LOG_LEVEL
		};
	}

	getDatabaseConfig(): DatabaseConfig {
		const isLocal = this.env.NODE_ENV == 'local';
		const entities = isLocal ? ['src/modules/**/entities/*.entity.ts'] : ['build/src/modules/**/entities/*.entity.js'];

		return {
			port: this.env.PG_PORT,
			host: this.env.PG_HOST,
			username: this.env.PG_USER,
			password: this.env.PG_PASSWORD,
			database: this.env.PG_DATABASE_NAME,
			// logging: this.env.PG_LOGGING,
			logging: false,
			entities,
			synchronize: false,
			ssl: { rejectUnauthorized: false }
		};
	}

	getCorsConfig(): CorsConfig {
		const allowedOrigins = [this.env.FE_APP_URL, this.env.SERVER_URL];

		return {
			origin: allowedOrigins,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
			credentials: true,
			maxAge: 3600
		};
	}

	getAIServerConfig(): AIServerConfig {
		return {
			BASE_URL: this.env.AI_SERVER_URL
		};
	}

	getRedisConfig(): RedisConfig {
		return {
			BASE_URL: this.env.REDIS_HOST,
			PORT: this.env.REDIS_PORT,
			USERNAME: this.env.REDIS_USERNAME,
			PASSWORD: this.env.REDIS_PASSWORD
		};
	}
}
