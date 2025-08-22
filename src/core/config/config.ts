import { injectable } from 'inversify';
import { CorsConfig, DatabaseConfig, ServerConfig, ValidatedEnv } from './config.types';
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
		const entities = ['src/modules/**/entities/*.entity.ts'];

		return {
			port: this.env.PG_PORT,
			host: this.env.PG_HOST,
			username: this.env.PG_USER,
			password: this.env.PG_PASSWORD,
			database: this.env.PG_DATABASE_NAME,
			logging: false,
			entities,
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
}
